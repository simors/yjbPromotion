var express = require('express');
var router = express.Router();
var AV = require('leancloud-storage')


router.get('/:id', function(req, res, next) {
  let userInfo = undefined
  var userId = req.params.id
  AV.Cloud.run('authRequestUserInfo', {userId: userId}).then((result) => {
    if(!result) {
      res.render('error', {
        title: "用户不存在",
        description: "用户信息不存在，请联系客服"
      })
      return
    }
    userInfo = result
    return AV.Cloud.run('promGetValidScoreExProm', {userId: userId})
  }).then((promotion) => {
    if(!promotion) {
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
  }).catch((error) => {
    res.render('error', {
      title: "获取信息获取失败",
      description: "错误代码：" + error.code
    })
  })
});

module.exports = router;
