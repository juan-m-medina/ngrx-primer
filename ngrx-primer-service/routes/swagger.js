var express = require('express');
var router = express.Router();

var swaggerUi = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');

var swaggerDefinition = {
  info: {
    // API informations (required)
    title: 'NGRX Primer Service',
    version: '1.0.0', 
    description: 'A basic API for wrapping db operations', 
  },
  basePath: '/' 
}

var swaggerJSDocOptions = {
  swaggerDefinition,
  apis: [
    './routes/*.js'
  ]
}

var swaggerSpec = swaggerJSDoc(swaggerJSDocOptions);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
