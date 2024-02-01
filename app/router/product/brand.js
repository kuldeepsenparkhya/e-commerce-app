const { brands } = require('../../controller');

var router = require('express').Router();

module.exports = app => {
    router.post('/brands', brands.create);


    app.use('/api', router);
};