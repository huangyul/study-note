# Typescript

## 基础数据类型

```ts
let str: string = '123'
let num: number = 123
let bool: boolean = false
let n: null = null
let u: undefined = undefined
let obj: object = {}
let big: bigint = 100n
let sym: symbol = Symbol('me')
```

###### 注意点:

1. 在默认情况下，`null`和`undefined`是所有类型的子类型，可以把`null`和`undefined`赋值给其他类型
2. 虽然`number`和`bigint`都表示数字，但两种类型不兼容

## 其他类型

### Array

1. 数组的定义有两种方式

```ts
let arr: Array<string> = ['1']
let arr2: string[] = ['2']
```

2. 联合数组的定义

```ts
let arr: (number | string)[] = [1, 2, '1']
let arr2: Array<number | string> = [1, 2, 3, '2']
```

3. 对象数组的定义

```ts
interface Arrobj {
  name: string
  age: number
}

let arr: Array<Arrobj> = [{ name: '123', age: 123 }]
```

### 函数

###### 函数声明

```typescript
function sum(x: number, y: number): number {
  return x + y
}
```

###### 函数表达式

```ts
let mySum: (x: number, y: number) => number = (
  x: number,
  y: number
): number => {
  return x + y
}
```

###### 可选参数

可选参数后不能跟必填参数

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ',' + lastName
  } else {
    return firstName
  }
}
```

###### 默认参数

```ts
function buildName(firstName: string, lastName: string = 'cat') {
  if (lastName) {
    return firstName + ',' + lastName
  } else {
    return firstName
  }
}
```

###### 剩余参数

```ts
function push(array: any[], ...items: any[]) {
  items.forEach((item) => {
    array.push(item)
  })
}
```
