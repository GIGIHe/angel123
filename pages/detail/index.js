// pages/detail/index.js
const config = require('../../config.js')
const WXApi = require("../../utils/Api.js")
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  item_id:'',
  pics:[],
  indicatorDots: true,
  autoplay: true,
  interval: 2000,
  duration: 500,
  ms:'',
  basic_info:'',
  isMask:false,
  gwc:true,
  car_num:0,
  isCur:false
  // shops:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      item_id: options.item_id
      
    })
  },
  getData:function(){
    WXApi.detail({ id:this.data.item_id}).then((res)=>{
      if(res.code==0){
        this.setData({
          pics:res.data.pics,
          basic_info: res.data.basicInfo
        })
        WxParse.wxParse('con', 'html', res.data.content, this, 1);
        let _data = {}
         _data = {
           goodsId: this.data.basic_info.id,//商品id
           gotScore: this.data.basic_info.gotScore,//库存
           minPri: this.data.basic_info.minPrice,//售价
           name: this.data.basic_info.name,
           pic: this.data.basic_info.pic,
           goodsNum: (this.data.basic_info.stores > 0) ? 1 : 0,//购买数量
         }
         this.setData(_data)
        this.badge()
      }
      console.log("id", this.data.basic_info)
    }).catch(err=>{
      wx.showToast({
        title: "网络出错",
      })
      console.log(err)
    })
  
  },
  badge:function(){
    let car_nus = wx.getStorageSync('shopInfo')
    let car_del = {}
    let cars_num = 0
    if (car_nus.length) {
      car_nus.forEach((item, index) => {
        if (item.goodsId == this.data.basic_info.id) {
          car_del = item;
         this.setData({
           isCur:true
         })
        }
      })
      let cars_num = car_del.goodsNum
      if (this.data.isCur) {
        this.setData({
          car_num: cars_num
        })
      } else {
        this.setData({
          car_num: 0
        })
      }
    }
    console.log(this.data.car_num)
  },
  go_cate:function(){
    wx.switchTab({
      url: '/pages/shopCar/index',
    })
  },
  collect:function(e){
    // console.log(e)
    if (e.currentTarget.dataset.flag == 1){
      this.setData({
        gwc:false
      })
    }else{
      this.setData({
        gwc: true
      })
    }
    this.setData({
      isMask:true
    })
  },
  bind_close: function () {
    this.setData({
      isMask:false
    })
  },
  // 加
  add:function(){
    let tep2 = this.data.goodsNum
    console.log(this.data.basic_info.stores)
    if(this.data.basic_info.stores>tep2){
      ++tep2
      this.setData({
        goodsNum:tep2
      })
    }
  },
  // 减
  sub:function(){
    let tep1 = this.data.goodsNum
    if (tep1>1) {
      tep1--
      this.setData({
        goodsNum:tep1 
      })
    }else{
      this.setData({
        goodsNum:1
      })
    }
  },
  // 组建购物车信息
  shopCar:function(){
    let shopInfo = {};
    shopInfo={
      goodsId: this.data.basic_info.id,//商品id
      gotScore:this.data.basic_info.gotScore,//库存
      minPri: this.data.basic_info.minPrice,//售价
      name:this.data.basic_info.name,
      pic: this.data.basic_info.pic,
      goodsNum: this.data.goodsNum,
      active:true//是否选择（默认选择）
    }
    return shopInfo;
  },
  // 加入购物车
  add_gwc:function(){
    let that = this
    let shops = that.shopCar()
    let shopCars = []
    let info = wx.getStorageSync('shopInfo')
    // console.log("strorage",shopCars)
    let tep = that.data.goodsNum
    let id = that.data.basic_info.id
    let badge_num = this.data.car_num
    console.log(badge_num,'badge')
    // console.log('tep',tep)
    // let tep_num = tep
   if(that.data.goodsNum){
    //  购物车的数量不能为0
    // 首先判断缓存中有没有存储
    //  console.log('info',info)
    //  console.log('infol', info.length)
     if (info.length){
       shopCars = info
       for(let i = 0; i < info.length;i++){
         if(shopCars[i].goodsId == id){
           shopCars[i].goodsNum = shopCars[i].goodsNum + tep
           badge_num = shopCars[i].goodsNum
           break;
         } else if (i == (info.length - 1) && (shopCars[i].goodsId) != id) {//必须加上后面这句，要不然到最后一个对象的时候还是会加上一条已存在的一个对象
           console.log(i, info.length - 1, shopCars[i].goodsId, id)
           shopCars.unshift(shops)
           badge_num = 1 //首次加入为1
           this.setData({
             car_num:1
           })
           break;
         }
       }
     }else{
        shopCars.unshift(shops)
     }
     wx.setStorageSync("shopInfo", shopCars)
     wx.getStorage({
       key: 'shopInfo',
       success: function (res) {
         console.log('aiyo', res.data)
       },
     })
     
   }
    this.setData({
      isMask:false,
      car_num: badge_num
    })
    console.log('car_num', this.data.car_num)
    wx.showToast({
      title: '加入购物车成功',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})