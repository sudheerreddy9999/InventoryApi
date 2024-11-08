'use strict';
import express from 'express';
import multer from 'multer';
import ProductsController from '../controllers/product.controller.js';

const upload = multer({ storage: multer.memoryStorage() });
const Router = express.Router();

Router.get('/products', ProductsController.GetProductsController);

Router.get('/products/id', ProductsController.GetProductByIdController);

Router.post(
  '/products',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 2 },
  ]),
  ProductsController.PostProductController,
);

Router.put(
  '/products',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 2 },
  ]),
  ProductsController.UpdateProductController,
);
export default Router;
