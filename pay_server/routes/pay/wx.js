let express = require('express');
let router = express.Router();

router.get('/test', (req, res) => {
  res.json({
    code: 0,
    data: 'test',
    message: ''
  });
});

module.exports = router;