const express = require('express');
const router = express.Router();
const { SERVER } = process.env;
/* GET home page. */
router.get('/', function (req, res, next) {
  const data = {
    success: true,
    message: `Test DII ${SERVER ? `${SERVER} Active` : 'Active'}`,
  };
  return res.json(data).end();
});

module.exports = router;
