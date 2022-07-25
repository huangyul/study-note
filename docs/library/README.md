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