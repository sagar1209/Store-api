const express = require('express');
const router = express();
const {getAllProducts,getAllProductsstatic} = require('../controllers/products');

router.get('/static',getAllProductsstatic);
router.get('/',getAllProducts);

module.exports = router;