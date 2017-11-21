var express = require('express');
var router = express.Router();
var GLOBAL_CONFIG = require('../config')

router.get('/:userId/:promotionId/:giftId', function(req, res, next) {
  var userId = req.params.userId
  var promotionId = req.params.promotionId
  var giftId = req.params.giftId
  res.render('exchange', {
    appId: GLOBAL_CONFIG.LC_APP_ID,
    appKey: GLOBAL_CONFIG.LC_APP_KEY,
    userId: userId,
    promotionId: promotionId,
    giftId: giftId,
  })
});

module.exports = router;
