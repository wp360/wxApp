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
