'use strict';

import ProductService from '../services/products.services.js';
import appConfig from '../config/app/app.config.js';
const { STATUSMESSAGE } = appConfig;
const GetProductsController = async (request, response) => {
  try {
    const data = await ProductService.GetProductService();
    return response.status(200).json({ message: STATUSMESSAGE[200], data });
  } catch (error) {
    console.error({ getProductsController: error.message });
    return response.status(500).json({ message: STATUSMESSAGE[500] });
  }
};

const PostProductController = async (request, response) => {
  try {
    const data = await ProductService.PostProductService(request);
    return response.status(200).json({message: STATUSMESSAGE[200], productId: data})
  } catch (error) {
    console.error({ PostProductController: error.message });
    return response.status(500).json({ message: STATUSMESSAGE[500] });
  }
};
const productsController = { GetProductsController, PostProductController };

export default productsController;
