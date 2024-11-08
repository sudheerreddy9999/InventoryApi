'use strict';
import ProductsDTO from '../dto/product.dto.js';
import pgsql from '../config/database/database.config.js';
import QUERY from '../config/app/query.config.js';
import { QueryTypes } from 'sequelize';

const GetProductService = async () => {
  try {
    const data = await ProductsDTO.GetProductsDTO();
    const formatedData = data.map((d) => {
      return {
        product_id: d.product_id ? d.product_id : null,
        product_name: d.product_name ? d.product_name : null,
        product_category: d.product_category ? d.product_category : null,
        cost_price: d.cost_price ? d.cost_price : null,
        quantity_in_stock: d.quantity_in_stock ? d.quantity_in_stock : null,
        discount_type: d.discount_type ? d.discount_type : null,
        discount_value: d.discount_value ? d.discount_value : null,
        action: d.action ? d.action : null,
        status: d.status ? d.status : null,
        image_data: d.image_data ? d.image_data.toString('base64') : null,
        image_extension: d.image_extension ? d.image_extension : null,
        image_name: d.image_name ? d.image_name : null,
      };
    });
    return formatedData;
  } catch (error) {
    console.error({ GetProductService: error.message });
    throw new Error(error.message);
  }
};

const PostProductService = async (request) => {
  const t = await pgsql.transaction();
  try {
    const {
      productName,
      productCategory,
      sellingPrice,
      costPrice,
      quantityInStock,
      orderType,
      discountType,
      discountValue,
      expiryDate,
      shortDescription,
      longDescription,
      returnPolicyTime,
    } = request.body;

    const files = request.files;

    const productData = {
      productName,
      productCategory,
      sellingPrice,
      costPrice,
      quantityInStock,
      orderType,
      discountType,
      discountValue,
      expiryDate,
      shortDescription,
      longDescription,
      returnPolicyTime,
      createdBy: 1,
      updatedBy: 1,
    };

    const productId = await ProductsDTO.PostProductDTO(productData);

    if (files.coverImage) {
      const coverImageFile = files.coverImage[0];
      await ProductsDTO.PostProductImageDTO({
        productId,
        imageData: coverImageFile.buffer,
        imageExtension: coverImageFile.mimetype.split('/')[1],
        imageName: coverImageFile.originalname,
        isBanner: 'Y',
      });
    }

    if (files.additionalImages) {
      for (const image of files.additionalImages) {
        await ProductsDTO.PostProductImageDTO({
          productId,
          imageData: image.buffer,
          imageExtension: image.mimetype.split('/')[1],
          imageName: image.originalname,
          isBanner: 'N',
        });
      }
    }

    await t.commit();
    return { productId };
  } catch (error) {
    await t.rollback();
    console.error({ PostProductService: error.message });
    throw new Error(error.message);
  }
};

const GetProductByIdService = async (request) => {
  try {
    const { product_id } = request.headers;
    const data = await ProductsDTO.GetProductByIdDTO(product_id);
    if (data.length === 0) {
      return [];
    }

    const imagedata = await ProductsDTO.GetProductImagesByIdDTO(product_id);
    const formatedImageData = imagedata.map((i) => {
      return {
        image_data: i.image_data ? i.image_data.toString('base64') : null,
        image_extension: i.image_extension ? i.image_extension : null,
        is_banner: i.is_banner ? i.is_banner : null,
        image_name: i.image_name ? i.image_name : null,
      };
    });
    const formatedData = {
      ...data,
      imagedata: formatedImageData,
    };
    return formatedData;
  } catch (error) {
    console.error({ GetProductByIdService: error.message });
    throw new Error(error.message);
  }
};

const UpdateProductService = async (request) => {
  const t = await pgsql.transaction();
  try {
    const {
      productId,
      productName,
      productCategory,
      sellingPrice,
      costPrice,
      quantityInStock,
      orderType,
      discountType,
      discountValue,
      expiryDate,
      shortDescription,
      longDescription,
      returnPolicyTime,
    } = request.body;

    const files = request.files;

    const productData = {
      productId,
      productName,
      productCategory,
      sellingPrice,
      costPrice,
      quantityInStock,
      orderType,
      discountType,
      discountValue,
      expiryDate,
      shortDescription,
      longDescription,
      returnPolicyTime,
      updatedBy: 1,
    };

    const result = await ProductsDTO.UpdateProductDTO(productData);
    if (result) {
      await pgsql.query(QUERY.DELETE_PRODUCT_IMAGES, {
        type: QueryTypes.DELETE,
        replacements: { productId },
      });
      if (files.coverImage) {
        const coverImageFile = files.coverImage[0];
        await ProductsDTO.PostProductImageDTO({
          productId,
          imageData: coverImageFile.buffer,
          imageExtension: coverImageFile.mimetype.split('/')[1],
          imageName: coverImageFile.originalname,
          isBanner: 'Y',
        });
      }

      if (files.additionalImages) {
        for (const image of files.additionalImages) {
          await ProductsDTO.PostProductImageDTO({
            productId,
            imageData: image.buffer,
            imageExtension: image.mimetype.split('/')[1],
            imageName: image.originalname,
            isBanner: 'N',
          });
        }
      }
    }
    await t.commit();
    return result;
  } catch (error) {
    await t.rollback();
    console.error({ PostProductService: error.message });
    throw new Error(error.message);
  }
};

const ProductService = { GetProductService, PostProductService, GetProductByIdService, UpdateProductService };

export default ProductService;
