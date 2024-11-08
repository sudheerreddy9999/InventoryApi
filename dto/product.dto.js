'use strict';

import QUERY from '../config/app/query.config.js';
import pgsql from '../config/database/database.config.js';
import { QueryTypes } from 'sequelize';

const GetProductsDTO = async () => {
  try {
    const data = await pgsql.query(QUERY.GETALLPRODUCTS, { type: pgsql.QueryTypes.SELECT });
    return data;
  } catch (error) {
    console.error({ GetProductsDTO: error.message });
    throw new Error(error.message);
  }
};

const PostProductDTO = async (productData) => {
  try {
    const query = QUERY.POST_PRODUCT;
    const [result] = await pgsql.query(query, {
      type: QueryTypes.INSERT,
      replacements: productData,
    });
    return result[0].product_id;
  } catch (error) {
    console.error({ PostProductDTO: error.message });
    throw new Error(error.message);
  }
};

const PostProductImageDTO = async (imageData) => {
  try {
    const query = QUERY.POST_PRODUCT_IMAGE;
    const [result] = await pgsql.query(query, {
      type: QueryTypes.INSERT,
      replacements: imageData,
    });

    return result;
  } catch (error) {
    console.error({ PostProductImageDTO: error.message });
    throw new Error(error.message);
  }
};

const GetProductByIdDTO = async (product_id) => {
  try {
    const query = QUERY.GET_PRODUCT_BY_ID;
    const [result] = await pgsql.query(query, {
      type: QueryTypes.SELECT,
      replacements: { product_id },
    });
    return result;
  } catch (error) {
    console.error({ GetProductByIdDTO: error.message });
    throw new Error(error.message);
  }
};

const GetProductImagesByIdDTO = async (product_id) => {
  try {
    const query = QUERY.GET_PRODUCT_IMAGES_BY_ID;
    const result = await pgsql.query(query, {
      type: QueryTypes.SELECT,
      replacements: { product_id },
    });

    return result;
  } catch (error) {
    console.error({ GetProductImagesByIdDTO: error.message });
    throw new Error(error.message);
  }
};

const UpdateProductDTO = async (productData) => {
  try {
    const query = QUERY.UPDATE_PRODUCTS;
    const [result] = await pgsql.query(query, {
      type: QueryTypes.UPDATE,
      replacements: productData,
    });
    return result;
  } catch (error) {
    console.error({ UpdateProductDTO: error.message });
    throw new Error(error.message);
  }
};

const ProductsDTO = {
  GetProductsDTO,
  PostProductDTO,
  PostProductImageDTO,
  GetProductByIdDTO,
  GetProductImagesByIdDTO,
  UpdateProductDTO,
};

export default ProductsDTO;
