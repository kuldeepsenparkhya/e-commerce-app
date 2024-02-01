const { productCategories } = require('../../controller');

var router = require('express').Router();

module.exports = app => {
    router.post('/product-categories', productCategories.create);


    app.use('/api', router);
};