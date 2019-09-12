## 表单验证
```
在我们完成表单页面的显示后，还需要对用户输入的表单数据进行校验及错误提示，比如对必须输入内容的组件判断用户是否未输入内容，如用户未输入内容在界面中提示用户该组件是必填项。

微信官方并未提供表单验证功能，但目前在 GitHub 上已经有了一些开源的小程序表单验证组件。其中一个比较完善的表单验证组件是"WxValidate - 表单验证"。

该组件的源代码可从如下地址获取： https://github.com/skyvow/wx-extend，在该组件的 GitHub 项目主页有组件的使用介绍。
```
```
基础知识：
1、onPullDownRefresh()下拉是在顶部向下拉触发监听用户下拉刷新事件。

需要在app.json的window选项中或页面配置中开启enablePullDownRefresh。
可以通过wx.startPullDownRefresh触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。

page设置  
"enablePullDownRefresh": true,
"backgroundTextStyle": "dark",


2、onReachBottom() 上拉是划到页面底部
监听用户上拉触底事件。

可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
在触发距离内滑动期间，本事件只会被触发一次。

3、wx.showNavigationBarLoading(Object object)
在当前页面显示导航条加载动画

wx.hideNavigationBarLoading(Object object)
在当前页面隐藏导航条加载动画

4、skip、limit传入参数不能小于1

5、wx:for 需要带上wx:key 否则会warn提示

6、程序的核心是数据结构

7、js处理和计算数据，wxml只负责显示不应该有机算，选择合适的数据结构作为ViewModel是MVVM很重要的一点
```

## git 上传

git remote add origin https://github.com/wp360/wxApp.git

git checkout -b cloud

git status

git add .

git commit -m "小程序云开发数据库操作"

git push

git push --set-upstream origin cloud