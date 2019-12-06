// pages/shopCar/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_data: {
      isBj: true,
      selcted:true,
      goumai:true,
      totap_pri:0,
      goods_list: [],
    },
    showShop: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
    // this.getData()
     this.onShow()
    // wx.removeStorageSync('shopInfo')
  },
  navagate: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  operate:function(){
    this.setData({
      ['shop_data.isBj']:!this.data.shop_data.isBj
    })
  },
  workout: function () {
    this.setData({
      ['shop_data.isBj']: !this.data.shop_data.isBj
    })
  },
  sel_btn: function (option) {
    var $this = this
    var index = parseInt(option.currentTarget.dataset.index)
    var goods_list = $this.data.shop_data.goods_list;
    var money = 0;
    for(var i = 0 ; i < goods_list.length;i++){
      if(index == i){
        goods_list[i].active = !goods_list[i].active
      }
    }
    $this.setData({
      ['shop_data.goods_list']: goods_list
    })
   for(var j = 0 ;j < goods_list.length;j++){
     if (goods_list[j].active == false){
       this.setData({
         ['shop_data.selcted']: false
       })
     break;
     }else{
       this.setData({
         ['shop_data.selcted']: true
       })
     }
   }
    var gds_list = goods_list.filter(item => item.active)
    gds_list.forEach(i => {
      money += parseFloat(i.minPri)
    })
    $this.setData({
      ['shop_data.totap_pri']: money
    })
    return ;
  },
 not_all:function(){
    var $this = this
    var goods_list = $this.data.shop_data.goods_list;
    var money = 0;
    for (var i = 0; i < goods_list.length; i++) {
        goods_list[i].active = true
    }
   var gds_list = goods_list.filter(item => item.active)
   gds_list.forEach(i => {
     money += parseFloat(i.minPri)
   })
    $this.setData({
      ['shop_data.goods_list']: goods_list,
      ['shop_data.selcted']: true,
      ['shop_data.totap_pri']: money
    })
  },
 all_sel: function (option) {
    var $this = this
    var goods_list = $this.data.shop_data.goods_list;
    var money = 0;
    for (var i = 0; i < goods_list.length; i++) {
        goods_list[i].active = false
    }
    $this.setData({
      ['shop_data.goods_list']: goods_list,
      ['shop_data.selcted']: false,
      ['shop_data.totap_pri']: money
    })
  },
  // 删除购物车信息
  delete:function(){
    var $this = this
    var goods_list =  this.data.shop_data.goods_list
    // for (var m = 0; m < goods_list.length; m++) {
    //   if (goods_list[m].active = true) {
    //     console.log(m)
    //     goods_list.splice(m,1)
    //     break;
    //   }
    // } I was confused by the bad method for a noon
    let new_arr = goods_list.filter(item => !item.active)
    console.log(new_arr)
    $this.setData({
      ['shop_data.goods_list']: new_arr,
    })
    wx.setStorageSync('shopInfo', $this.data.shop_data)
    // wx.showModal({
    //   title: '购物车',
    //   content: '确定删除？', 
    //   success:res=>{
    //    if(res.confirm){
    //      wx.setStorageSync('shopInfo', this.data.shop_data)
    //    }else if(res.cancel){        
    //    }
    //   }
    // })
  },
  // 结算
  gomai:function(){
    var gmai = this.data.shop_data
    console.log(gmai)
  },
//  getData:function(){
//    let info = wx.getStorageSync('shopInfo')
//    this.setData({
//      goods_list: info
//    })
//    console.log('goods_list2',this.data.goods_list)
//  },
  // 加
  add: function (e) {
    let index = e.currentTarget.dataset.index
    let tep1 = this.data.shop_data.goods_list[index]
    let tep1_num = tep1.goodsNum;
    let temp = this.data.shop_data.goods_list
    let that = this
    var money = this.data.shop_data.totap_pri;
    tep1_num++
    if (tep1 >= tep1.stores){
      tep1_num == tep1.stores
    }
    var carInfo = {}
    carInfo = tep1
    carInfo.goodsNum = tep1_num;
    temp.map(item=>{
      if (item.goodsId == tep1.goodsId){
        item = carInfo
      }
    })
    money += tep1.minPri
    // var gds_list = temp.filter(item => item.active)
    // gds_list.forEach(i => {
    //   money += parseFloat(i.minPri) * tep1_num
    // })
    let obj1={
      goods_list: temp,
      isBj: this.data.shop_data.isBj,
      goumai:this.data.shop_data.goumai,
      selcted: this.data.shop_data.selcted,
      totap_pri: money
    }
    this.setData({
      shop_data: obj1
    })
    // this.data.shop_data.goods_list = temp
    wx.setStorageSync('shopInfo', temp)
    wx.getStorage({
      key: 'shopInfo',
      success: function(res) {
        console.log('缓存',res.data)
      },
    })
    console.log(index)
    console.log("carInfo",carInfo)
    console.log('list', temp)
  },
  // 减
  sub: function (e) {
    let index1 = e.currentTarget.dataset.index
    let tep2 = this.data.shop_data.goods_list[index1]
    let tep2_num = tep2.goodsNum;
    let temp1 = this.data.shop_data.goods_list
    var money = this.data.shop_data.totap_pri;
    tep2_num--
    if(tep2_num<1){
      tep2_num=1
    }
    var carInfo1 = {}
    carInfo1 = tep2
    // console.log("tep2", tep2)
    carInfo1.goodsNum = tep2_num;
    temp1.map(item => {
      if (item.goodsId == tep2.goodsId) {
        item = carInfo1
      }
    })
    
    if(money>=tep2.minPri){
      money -= tep2.minPri
    }else{
      money = tep2_num
    }
    // var gds_list = temp1.filter(item => item.active)
    // gds_list.forEach(i => {
    //   money += parseFloat(i.minPri) * tep2_num
    // })
    let obj2 = {
      goods_list: temp1,
      isBj: this.data.shop_data.isBj,
      goumai: this.data.shop_data.goumai,
      selcted: this.data.shop_data.selcted,
      totap_pri: money
    }
    this.setData({
      shop_data: obj2
    })
    // this.data.shop_data.goods_list = temp1
    wx.setStorageSync("shopInfo", temp1)
    console.log(index1)
    console.log("carInfo1", carInfo1)
    console.log('list', this.data.goods_list)
    wx.getStorage({
      key: 'shopInfo',
      success(res) {
        console.log('shopInfo', res.data)
      }
    })
  },
 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let info = wx.getStorageSync('shopInfo')
    var money=0;
    let info_a = info.filter(item=>item.active)
    info_a.forEach(i=>{
      money += parseFloat(i.minPri)
    })
    let info_arr = {
      goods_list: info,
      isBj: this.data.shop_data.isBj,
      goumai: this.data.shop_data.goumai,
      selcted: this.data.shop_data.selcted,
      totap_pri: money,
    }
    this.setData({
      shop_data: info_arr
    })
  },
  onReady:function(){

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