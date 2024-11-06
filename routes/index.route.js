'use strict'
import express from 'express';
import productsController from '../controllers/product.controller.js';

const Router = express.Router();

Router.get('/products',productsController.getProductsController)
export default Router