'use strict';

import properties from '../index.config.js';

const QUERY = {
  GETALLPRODUCTS: properties.get('query.getAllProducts'),
  POST_PRODUCT: properties.get('query.post_product'),
  POST_PRODUCT_IMAGE: properties.get('query.post_product_image'),
};

export default QUERY;
