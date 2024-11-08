'use strict';

import properties from '../index.config.js';

const QUERY = {
  GETALLPRODUCTS: properties.get('query.getAllProducts'),
  POST_PRODUCT: properties.get('query.post_product'),
  POST_PRODUCT_IMAGE: properties.get('query.post_product_image'),
  GET_PRODUCT_BY_ID: properties.get('query.get_product_by_id'),
  GET_PRODUCT_IMAGES_BY_ID: properties.get('query.get_product_images_by_id'),
  UPDATE_PRODUCTS: properties.get('query.update_products'),
  DELETE_PRODUCT_IMAGES: properties.get('query.delete_product_images')
};

export default QUERY;
