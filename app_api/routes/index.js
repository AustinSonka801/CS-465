const express = require('express');
const router = express.Router();
const tripsRouter = require('./trips');
const authRouter = require('./authentication')

router.use('/trips', tripsRouter);

module.exports = router;