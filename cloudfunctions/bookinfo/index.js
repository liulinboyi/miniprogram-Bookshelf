// 云函数入口文件
const cloud = require('wx-server-sdk')
const rq = require("request-promise")
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var options = {
    uri: `https://api.douban.com/v2/book/isbn/:${event.isbn}?apikey=${你的apikey,如果没有可以到网上找找}`,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
    },
    json: true // Automatically parses the JSON string in the response
};

  const res = rq(options).then(success=> {
    return success
  }).catch(err=>{
    return err
  })
  // console.log(event)
  // const wxContext = cloud.getWXContext()
return res
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}