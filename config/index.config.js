'use strict'

import PropertiesReader from "properties-reader"

const propertiesPath = './config/properties/config.properties'
const properties = PropertiesReader(propertiesPath);
export default properties;