'use strict'

import QUERY from "../config/app/query.config.js";
import pgsql from "../config/database/database.config.js";

const getProductsDto = async()=>{
    try {
        const data = await pgsql.query(QUERY.GETALLPRODUCTS,{type:pgsql.QueryTypes.SELECT})
        return data;
    } catch (error) {
        console.error({getProductsDto:error.message});
        throw new Error(error.message)
    }
}

const productsDto ={getProductsDto}

export default productsDto
