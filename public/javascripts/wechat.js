/**
 * Created by wanpeng on 2017/11/14.
 */
var GLOBAL_CONFIG = require('../../config')
var OAuth = require('wechat-oauth');
var mysqlUtil = require('./mysqlUtil')

function getOauthTokenFromMysql(openid, callback) {
  var sql = ""
  var mysqlConn = undefined

  mysqlUtil.getConnection().then((conn) => {
    mysqlConn = conn
    sql = 'SELECT * FROM token WHERE openid = ?'
    return mysqlUtil.query(conn, sql, [openid])
  }).then((queryRes) => {
    callback(null, queryRes.results[0])
  }).catch((error) => {
    callback(error)
  }).finally(() => {
    if (mysqlConn) {
      mysqlUtil.release(mysqlConn)
    }
  })
}

function setOauthTokenToMysql(openid, token, callback) {
  var sql = ""
  var mysqlConn = undefined

  mysqlUtil.getConnection().then((conn) => {
    mysqlConn = conn
    sql = 'REPLACE INTO token(access_token, expires_in, refresh_token, openid, scope, create_at) VALUES(?, ?, ?, ?, ?, ?)';
    var fields = [token.access_token, token.expires_in, token.refresh_token, token.openid, token.scope, token.create_at];
    return mysqlUtil.query(conn, sql, fields)
  }).then(() => {
    callback()
  }).catch((error) => {
    callback(error)
  }).finally(() => {
    if (mysqlConn) {
      mysqlUtil.release(mysqlConn)
    }
  })
}

var oauth_client = new OAuth(GLOBAL_CONFIG.wxConfig.appid, GLOBAL_CONFIG.wxConfig.appSecret, getOauthTokenFromMysql, setOauthTokenToMysql);


function userAuthRequest(req, res) {
  var domain = GLOBAL_CONFIG.MP_SERVER_DOMAIN
  var auth_callback_url = domain + '/wxOauth/callback'
  var url = oauth_client.getAuthorizeURL(auth_callback_url, '', 'snsapi_userinfo');
  res.redirect(url)
}

