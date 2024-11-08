'use strict';

import properties from '../index.config.js';

const STATUSMESSAGE = {
  200: 'Request successful',
  201: 'Record created successfully',
  204: 'No content',
  400: 'Bad request',
  401: 'Unauthorized access',
  403: 'Forbidden',
  404: 'Resource not found',
  405: 'Method not allowed',
  409: 'Conflict occurred',
  422: 'Unprocessable entity',
  429: 'Too many requests',
  500: 'Internal server error',
  502: 'Bad gateway',
  503: 'Service unavailable',
  504: 'Gateway timeout',
};

const appConfig = {
  STATUSMESSAGE: STATUSMESSAGE,
  PORT: properties.get('app.port'),
  APPNAME: properties.get('app.appName'),
};
export default appConfig;
