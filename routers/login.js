const express = require('express');
const router = express.Router();

const loginHandle = require('../routerHandle/login');
const valid = require ('../middleware/valid');
const { loginSchema } = require('../schema/login');


router.post('/',valid(loginSchema),loginHandle);

module.exports = router;