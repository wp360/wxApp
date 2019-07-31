// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // itemid: window.pageConfig.product.itemid,
    // skuid: window.pageConfig.product.skuid,
    // spuid: window.pageConfig.product.spuid,
    itemid: 10549,
    spuid: 1000001,
    pagesize: 20,
    cartno: 0,
    // productImgUrls: [
    //   'http://s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg',
    //   'http://s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/ecc254c9-a194-44a2-85db-0b2bcddb00db.jpg_400x400.jpg',
    //   'http://s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg'
    // ],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    rule: ["消费1元=1积分", "订单出库后7天积分自动累计入账户，如发生退货，则扣除相应积分。", "积分有效期为到账后的365天，请及时兑换", "积分兑换现金券每人每月限3张", "积分查看：会员中心——我的钱包——我的积分。", "如发现疑似恶意订单，飞鹤保留对订单和积分进行限制及处理的权利", "最终解释权归飞鹤所有。"],
    objectArray: [{
        id: 5,
        unique: 'unique_5'
      },
      {
        id: 4,
        unique: 'unique_4'
      },
      {
        id: 3,
        unique: 'unique_3'
      },
      {
        id: 2,
        unique: 'unique_2'
      },
      {
        id: 1,
        unique: 'unique_1'
      },
      {
        id: 0,
        unique: 'unique_0'
      },
    ],
    numberArray: [1, 2, 3, 4],
    number: 1,
    tipsList: [{
        url: "/detail",
        image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg",
        price: '368',
        text: "星飞帆 1段 700g"
      },
      {
        url: "/detail",
        image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/48ebedc8-932f-4029-b61a-cc5a87fdef06.jpg_400x400.jpg",
        price: '308',
        text: "星飞帆 2段 700g"
      },
      {
        url: "/detail",
        image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg",
        price: '368',
        text: "星飞帆 3段 700g"
      },
      {
        url: "/detail",
        image: "//s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/48ebedc8-932f-4029-b61a-cc5a87fdef06.jpg_400x400.jpg",
        price: '308',
        text: "星飞帆 4段 700g"
      }
    ],
    uid: '',
    goods: null
  },
  switch (e) {
    const length = this.data.objectArray.length
    for (let i = 0; i < length; ++i) {
      const x = Math.floor(Math.random() * length)
      const y = Math.floor(Math.random() * length)
      const temp = this.data.objectArray[x]
      this.data.objectArray[x] = this.data.objectArray[y]
      this.data.objectArray[y] = temp
    }
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addToFront(e) {
    const length = this.data.objectArray.length
    this.data.objectArray = [{
      id: length,
      unique: 'unique_' + length
    }].concat(this.data.objectArray)
    this.setData({
      objectArray: this.data.objectArray
    })
  },
  addNumberToFront(e) {
    this.data.numberArray = [this.data.numberArray.length + 1].concat(this.data.numberArray)
    this.setData({
      numberArray: this.data.numberArray
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      uid: options.bid
    });
    // 加载商品详情
    var that = this;
    that.goodsInfoShow();
    wx.request({
      url: 'http://m.feihe.com/Item/GetReviewList',
      data: {
        itemid: this.itemid,
        spuid: this.spuid,
        page: 1,
        pagesize: this.pagesize
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  goodsInfoShow: function (success) {
    // 获取商品信息
    var that = this;
    that.goods = {
      imgUrls: [
        'http://s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg',
        'http://s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/ecc254c9-a194-44a2-85db-0b2bcddb00db.jpg_400x400.jpg',
        'http://s0.feiheimg.com//n27/tfs/2017/12/27/ItemProImg/635fe4b0-1f6a-4a42-a7ab-217f1468fedc.jpg_400x400.jpg'
      ],
      title: '星飞帆 1段 700g',
      info: '水解乳清蛋白、OPO珍稀结构脂',
      price: 368,
      goodsId: this.uid,
      count: 1
      // totalMoney: goodsItem.price,
    }

    that.setData({
      goods: that.goods
    });
    // wx.request({
    //   url: '',
    //   data: {},
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success(res) {
    //     console.log(res.data)
    //   },
    //   fail(err) {
    //     console.log(err)
    //   }
    // });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //打开规则提示
  showRule: function () {
    this.setData({
      isRuleTrue: true
    })
  },
  //关闭规则提示
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
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

  },
  toBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  decreaseNum() {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  increaseNum() {
    this.setData({
      number: this.data.number + 1
    });
  },
  addToCart() {
    // this.setData({
    //   cartno: this.data.cartno + 1
    // });
    var goods = this.data.goods;
    goods.isSelect = false;
    var count = this.data.goods.count;
    var title = this.data.goods.title;
    if (title.length > 13) {
      goods.title = title.substring(0, 13) + '...';
    }
    // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
    var arr = wx.getStorageSync('cart') || [];
    console.log("arr,{}", arr);
    if (arr.length > 0) {
        // 遍历购物车数组  
        for (var j in arr) {
            // 判断购物车内的item的id，和事件传递过来的id，是否相等  
            if (arr[j].goodsId == this.uid) {
                // 相等的话，给count+1（即再次添加入购物车，数量+1）  
                arr[j].count = arr[j].count + 1;
                // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
                try {
                    wx.setStorageSync('cart', arr)
                } catch (e) {
                    console.log(e)
                }
                //关闭窗口
                wx.showToast({
                    title: '加入购物车成功！',
                    icon: 'success',
                    duration: 2000
                });
                // this.closeDialog();
                // 返回（在if内使用return，跳出循环节约运算，节约性能） 
                return;
            }
        }
        // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组  
        arr.push(goods);
    } else {
        arr.push(goods);
    }
    // 最后，把购物车数据，存放入缓存  
    try {
        wx.setStorageSync('cart', arr)
        // 返回（在if内使用return，跳出循环节约运算，节约性能） 
        //关闭窗口
        wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
        });
        // this.closeDialog();
        return;
    } catch (e) {
        console.log(e)
    }
  },
  quickBuy() {
    // console.log(this.data.uid.bid)
    // const uid = this.data.uid.bid
    wx.switchTab({
      url: '/pages/shop-cart/index?uid=' + this.uid
    })
  }
})