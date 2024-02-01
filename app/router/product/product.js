const { products } = require('../../controller');

var router = require('express').Router();

module.exports = app => {
    router.post('/products', products.create);


    app.use('/api', router);
};