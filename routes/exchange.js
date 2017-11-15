var express = require('express');
var router = express.Router();


router.get('/:userId/:promotionId/:giftId', function(req, res, next) {
  var userId = req.params.userId
  var promotionId = req.params.promotionId
  var giftId = req.params.giftId
  res.render('exchange', {
    userId: userId,
    promotionId: promotionId,
    giftId: giftId,
  })
});

module.exports = router;
