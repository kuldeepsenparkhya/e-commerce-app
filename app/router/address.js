const { addresses } = require('../controller');
const { adminAccess } = require('../middleware/auth');

var router = require('express').Router();

module.exports = app => {
    router.post('/addresses', addresses.create);
    router.get('/addresses/:userID', addresses.findAll);
    router.get('/addresses/:id', addresses.findOne);

    router.patch('/addresses/:id', addresses.updateAddress);

    router.delete('/addresses/:id', addresses.delete);
    router.delete('/addresses/:id', adminAccess, addresses.parmanentDeleted);

    app.use('/api', router);
};