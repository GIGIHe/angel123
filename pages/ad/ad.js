// pages/ad/ad.js
const config = require('../../config.js')
const WXApi = require("../../utils/Api.js")
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  id:'',
  data_:'',
  con:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  console.log(options)
   this.setData({
     id: options.id
   })
    this.getData()
  },
  getData:function(){
    let exp = []
    WXApi.notice_desc({id:this.data.id}).then((res) =>{
      if(res.code == 0){
        this.setData({
          data_: res.data,
        })
        WxParse.wxParse('con', 'html', res.data.content,this,1);
      }
      exp = res.data
      this.setData(exp)
      console.log('1',exp)
      console.log('2',this.data.exp)
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