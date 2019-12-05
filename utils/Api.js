const CONFIG = require("..//config.js");
const BASE_URL = "https://api.it120.cc/";
const request = (url, needSubDomain,method,data)=>{
  var _url = BASE_URL +(needSubDomain ? '' + CONFIG.subDomain : '') +"/"+ url
  return new Promise((resolve,reject)=>{
    wx.request({
      url: _url,
      method,
      needSubDomain,
      data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },  
      success:(res)=>{
        resolve(res.data)
      },
      fail: (error)=>{
        reject(error)
      }
    })
  })
}
/**
 * 小程序的promise没有finally方法，自己扩展下
 */
// Promise.prototype.finally = function (callback) {
//   var Promise = this.constructor;
//   return this.then(
//     function (value) {
//       Promise.resolve(callback()).then(
//         function () {
//           return value;
//         }
//       );
//     },
//     function (reason) {
//       Promise.resolve(callback()).then(
//         function () {
//           throw reason;
//         }
//       );
//     }
//   );
// }
module.exports = {
  // request,不知道啥用的，，，，
  banners:(data)=>{
    return request('banner/list',true,'get',data)
  },
  notice: (data) => {
    return request('notice/list', true, 'post', data)
},
  notice_desc: (data) => {
    return request('notice/detail', true, 'get', data)
  },
  shops: (data) => {
    return request('shop/goods/category/all', true, 'get', data)
  },
  banner: (data) => {
    return request('banner/list', true, 'get', data)
  },
  // 所有的商品
  goods: (data) => {
    return request('shop/goods/list', true, 'post', data)
  },
  // 爆品推荐
  hotGoods: (data) => {
    return request('shop/goods/list', true, 'post', data)
  },
  // 拼团商品
  bargain: (data) => {
    return request('shop/goods/list', true, 'post', data)
  },
  // 同类商品
  cate: (data) => {
    return request('shop/goods/list', true, 'post', data)
  },
  detail: (data) => {
    return request('shop/goods/detail', true, 'GET', data)
  }
}