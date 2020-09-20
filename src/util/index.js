/**
 * @description 公共函数定义
 */
export default {
  getUrlParam(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r =window.location.search.substr(1).match(reg);
    if(r!=null) return decodeURIComponent(r[2]);
  },
  // 分享信息
  initShareInfo () {
    let shareInfo = {
      title: '分享标题', // 分享标题
      desc: '分享描述', // 分享描述
      link: 'http://m.imooc.com/#/index', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: '', // 分享图标
    }
    wx.onMenuShareTimeline(shareInfo)
    wx.onMenuShareAppMessage(shareInfo)
    wx.onMenuShareQQ(shareInfo)
    wx.onMenuShareQZone(shareInfo)
    // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
    wx.updateAppMessageShareData(shareInfo)
    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
    wx.updateTimelineShareData(shareInfo)
  }
};
