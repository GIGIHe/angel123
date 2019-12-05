//index.js
//获取应用实例
const config = require('../../config.js')
const WXApi = require("../../utils/Api.js")
const app = getApp()

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    notice: [],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    vertical:true,
    category:[],
    banner:[],
    all_goods:[],
    all:[],
    goods:[],
    pts:[],
    c_id:0,
    page:1,
    pageNum:5,
    nameLike:'',
    isShow:false,
    isReachBottom:true
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  onLoad: function () {
    this.getNotice()
    this.getCategory()
    this.getBanner()
    this.getGoods()
    this.bargain()
    this.hotGoods()
  },
  // 广告
  getNotice: function(){
    WXApi.notice({ pageSize: 3 }).then(res => {
      if(res.code == 0){
        this.setData({
          notice: res.data.dataList 
        })
      }
    })
  },
  getCategory: function () {
    WXApi.shops().then(res => {
      // console.log(res)
      if (res.code == 0) {
        this.setData({
          category: res.data
        })
      }
    })
  },
  getBanner: function () {
    WXApi.banner({type:"new"}).then(res => {
      // console.log(res)
      if (res.code == 0) {
        this.setData({
          banner: res.data
        })
      }
    })
  },
  getGoods:function(){
    if(this.data.c_id==0){
      this.setData({
        c_id:''
      })
    }
    WXApi.goods({ categoryId: this.data.c_id, page: this.data.page, pageSize: this.data.pageNum, nameLike:''}).then(res=>{
      if(res.code == 0){
        let gds1 = [];
        let gds2 = [];
        let datas = res.data
        let data_now = this.data.all_goods
          this.setData({
            all_goods: data_now.concat(datas),
          })
          // console.log(this.data.all_goods)
          // console.log('还有哦。。。。')
      }else if(res.code == 700){
          this.setData({
            isShow: true,
            isReachBottom:false
          })
          // console.log('木有啦。。。。')
      }
    }).catch(err=>{
      wx.showToast({
        title: err,
      })
    })
  },
  classify: function (e) {
    let categoryId = e.currentTarget.dataset.id;
    let cate_goods = []
    let $this = this
    $this.setData({
      c_id: categoryId,
      page:1,
      all_goods:[]
    })
    wx.pageScrollTo({
          scrollTop: 950,
          duration: 600
        })
   this.getGoods()
  },
  hotGoods: function () {
    WXApi.hotGoods({ recommendStatus:1}).then(res => {
    if (res.code == 0) {
      this.setData({
        goods: res.data
      })
    }
  }).catch(err => {
    wx.showToast({
      title: err,
    })
  })
  },
  bargain: function () {
    WXApi.bargain({ pingtuan: true }).then(res => {
      if (res.code == 0) {
        this.setData({
          pts: res.data
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err,
      })
    })
  },
   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
    })
    this.getGoods()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { 
    let p = this.data.page
    ++p
    this.setData({
      page:p,
    })
    // console.log('页码',this.data.page)
    if(this.data.isReachBottom){
      this.getGoods()
    }else{
      wx.showToast({
        title: '已全部加载',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
