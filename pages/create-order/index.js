const WXApi = require("../../utils/Api.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      orderData:[],
    items: [
      { name: '1', value: '快递' },
      { name: '2', value: '到店自取', checked: 'true' },
    ],
    ps: "",
    bz:'',
    total_price:0,
    jifen:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getData:function(){
    var $this = this
   let orders =   wx.getStorageSync("orderInfo")
   console.log(orders)
   let total = 0
   orders.forEach((item,index)=>{
     total += item.minPri * (item.goodsNum)
   })
    $this.setData({
      orderData: orders,
      total_price:total,
      // jifen:0
    })
  },
  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      ps: e.detail.value
    })
  },
  hanlde:function(e){
    this.setData({
      bz: e.detail.value
    })
    console.log(this.data.bz)
  },
  submit:function(){
    WXApi.createOrder({})
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