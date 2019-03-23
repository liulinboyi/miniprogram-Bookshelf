// 工具函数库
import config from './config.js'
//http get 工具函数 获取数据
export function get(url, data) {
  // return new Promise((resolve, reject) => {
  //   wx.request({
  //     // data:
  //     url: config.host + url,
  //     success: function (res) {
  //       if (res.data.code === 0) {
  //         resolve(res.data.data)
  //       } else {
  //         reject(res.data)
  //       }
  //     }
  //   })
  // })
  return request(url,'GET',data)
}
function request(url,method,data){
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          wx.hideLoading()//添加失败取消提示弹窗
          // showModal('诶呀！失败了',res.data.data.msg)
          reject(res.data)
        }
      }
    })
  })
}
//http post 工具函数 获取数据
export function post(url,data){
  return request(url,'POST',data)
}
export function showSuccess(text){
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 2000
  })
}

export function showModal(title,content){
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
