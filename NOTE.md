# 微信分享与支付

## Node升级和安装

* npm install -g n / 查看版本： n -V
* 安装稳定版本： n stable
* 安装指定版本： n 9.10.0

## vue-cli安装

* npm install -g @vue/cli
* 或者使用yarn安装
* yarn global add @vue/cli

[vue-cli使用文档](https://cli.vuejs.org)

## 项目创建

* 命令行创建：  vue create pay_share
* GUI创建:     vue ui
* 安装插件:    axios、vue-axios、vue-cookie、vue-router、weixin-js-sdk

`npm i axios@0.18.0 vue-axios@2.1.4 vue-cookie@1.1.4 vue-router@3.0.2 weixin-js-sdk@1.3.2 --save`

## 架构设计

* 目录结构设计
* 公共函数编写
* 开发规范定义
* 环境设置、统一请求处理、错误机制、Loading机制
* 组件封装

## H5响应式方案设计

> PC响应式

* 媒体查询
* flex、百分比
* 栅格布局

> 媒体查询

* @media screen and (max-width: 768px)
* @media screen and (min-width: 768px) and (max-width: 1280px)
* @media screen and (min-width: 1281px) and (max-width: 1600px)
* @media screen and (min-width: 1600px)

> H5响应式

* 字体大小
* 元素大小、布局
* 元素边距、内填充

> 相关方案

* [https://github.com/amfe/lib-flexible](https://github.com/amfe/lib-flexible)
* 对视图进行放大缩小
* rem+flex
* 媒体查询+百分比+flex

> Rem布局方案

* viewport 视窗
* 物理像素和网页像素
* 设计尺寸和开发尺寸

## UI设计稿还原

* 静态网页开发、UI设计稿100%还原
* 考虑网页的自适应
* 考虑网页的兼容性

## 项目开发

* 1. 页面构建
> pages >> index、activity、pay

* 2. 路由设置

## 公众号测试号注册链接

[https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)

## 微信授权流程

> 概念理解

* 业务域名、js接口安全域名、网页授权域名
* 开发者工具（添加开发者微信号）、人员设置（添加运营者微信号）
* 网页授权access_token和普通access_token
* UnionID