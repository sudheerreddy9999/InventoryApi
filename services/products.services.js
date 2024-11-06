"use strict";
import productsDto from "../dto/product.dto.js";

const getProductService = async() => {
  try {
    const data = await productsDto.getProductsDto();
    return data
  } catch (error) {
    console.error({getProductServic:error.message});
    throw new Error(error.message)
  }
};

const productService = {getProductService}

export default productService;
