var express = require('express');
var router = express.Router();
var yiijiabao = require('promotionsdk')

router.get('/:id', function(req, res, next) {
  let userInfo = undefined
  var userId = req.params.id
  yiijiabao.fetchUserInfo(userId, function (err, result) {
    if(err) {
      res.render('error', {
        title: "用户不存在",
        description: "用户信息不存在，请联系客服"
      })
      return
    }
    userInfo = result
    yiijiabao.fetchPromotion(userId, function (err, promotion) {
      if(err) {
        res.render('error', {
          title: "活动已失效",
          description: "积分兑换活动已经失效"
        })
        return
      }
      let gifts = promotion.awards.gifts
      res.render('score', {
        userId: userId,
        promotionId: promotion.id,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        score: userInfo.score,
        gifts: gifts,
      })
    })
  })
});

module.exports = router;
