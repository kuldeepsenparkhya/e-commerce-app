const express = require('express')
const app = express();

require('dotenv').config();

const cors = require('cors')
const bodyParser = require('body-parser');

const { PORT } = require('./app/config/config');
const port = PORT;

app.use(cors({
    origin: ["*",],
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(bodyParser.json())

const { authJWT } = require('./app/middleware/auth');
const { handleError } = require('./app/utils/helper');
app.use(authJWT);


require('./app/router/user')(app);
require('./app/router/auth')(app);
require('./app/router/address')(app);

require('./app/router/product/brand')(app);
require('./app/router/product/productCategory')(app);
require('./app/router/product/product')(app);




app.get('*', (req, res) => handleError('Hunnn smart!', 400, res,));



app.listen(port, () => console.log(`Server is running port on ${port}`))