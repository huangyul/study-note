# 日常开发小笔记

?> 记录日常开发遇到的问题

**2022-7-23**

**scss函数**

如果要创建例如`.mt-6`（表示`margin-top: 6px;`）这样的类名，使用传统的写法需要写很多遍相似的代码，这时可以使用**变量**和**遍历**

```scss
@for $i from 1 through 30 {
  .mt#{$i} {
    margin-top: #{$i}px !important;
  }
}
```

**2022-7-25**

**浏览器打印**

在开发过程中，会遇到一些特殊的打印需要，比如需要把数据重新整理再打印出来，这时候直接使用打印的方法是不太行的，此时的处理方式是用字符串写好一个`html`，再通过新打开窗口完成打印功能，具体代码如下

```js
onPrint() {
      // 构建空白页面
    const printStr =
      "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head>"
    // 构建样式
    const style = `<style>@page{margin: 1em;}table{font-size:12px;width:100%;}
    table tr th span{transform:scale(0.6);display:inline-block;
    white-space:nowrap;}
    table tr th {background: #99CEFF;-webkit-print-color-adjust: exact;}
    table tr td span{transform:scale(0.6);display:inline-block;white-space:nowrap;}
    .title{width:100%;text-align:center;margin:5px auto;}
    </style><body><div class="title">采购和退货打印</div>`
    const content = printStr + style + tableHeaderStr + '</body></html>'
    let pwin = window.open('_blank')
    pwin.document.write(content)
    pwin.document.close()
    pwin.focus()
    setTimeout(() => {
      pwin.print() // 打印功能。 例如 window.print() 直接打印当前整个页面。
      pwin.close() // 关闭 打印创建的当前页面
    }, 500)
}
```