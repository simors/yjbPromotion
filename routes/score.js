var express = require('express');
var router = express.Router();
var AV = require('leancloud-storage')


router.get('/:id', function(req, res, next) {
  let userInfo = undefined
  var userId = req.params.id
  AV.Cloud.run('authFuncTest', {userId: userId}).then((result) => {
    userInfo = result
    return AV.Cloud.run('promGetValidScoreExProm', {userId: userId})
  }).then((promotion) => {
    console.log("promotion", promotion)
    let gifts = promotion.awards.gifts
    console.log("gifts", gifts)
    res.render('score', {
      userId: userId,
      promotionId: promotion.id,
      nickname: userInfo.nickname,
      avatar: userInfo.avatar,
      score: userInfo.score,
      gifts: gifts,
    })
  })
});

module.exports = router;
