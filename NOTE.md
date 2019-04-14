#### 添加插槽
1. 组件页面
```
<!-- components/tag/index.wxml -->
<slot name="slotName"></slot>
```
2. pages页面
```
<!--pages/book-detail/book-detail.wxml-->
<text class="num" slot="after">{{ '+' + item.nums}}</text>
```
3. 组件index.js
```js
  options: {
    multipleSlots: true
  },
```