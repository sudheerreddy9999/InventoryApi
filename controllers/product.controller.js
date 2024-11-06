'use strict'

import productService from "../services/products.services.js"
import appConfig from "../config/app/app.config.js";
const {STATUSMESSAGE}=appConfig
const getProductsController = async(req,res)=>{
    try {
        const data = await productService.getProductService();
        return res.status(200).json({message:STATUSMESSAGE[200],data})
    } catch (error) {
        console.error({getProductsController:error.message})
        return res.status(500).json({message:STATUSMESSAGE[500]})
    }
}
const productsController = {getProductsController}

export default productsController
