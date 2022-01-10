# Typescript

> 2022-1-9

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

> 2022-1-10

### 元组

元组表示特定类型和长度的数组

###### 定义

```ts
let x: [string, number]

x = ['1', 1]
x = [1, 2] // 报错，一定要保持一致
```

###### 解构

```ts
let x: [string, number] = ['1', 1]

let [s, n] = x
```

###### 可选元素

加上`?`表示可选

```ts
let x: [string, number?] = ['1']
```

###### 只读

readonly 字段

```ts
const point: readonly [string, number] = ['123', 123]
```

### never

表示永不存在的值的类型,值永不存在的两种情况：

1. 函数**抛出异常**
2. 进入**死循环**

### any

`any`是类型系统的顶级类型，可以被赋值为任意类型，也能调用任何方法，**尽量不要使用 any**

### unknown

与`any`的区别：

1. 任何类型可以给`any`赋值，也可以赋值给任何类型
2. 任何类型可以给`unkonwn`赋值，但只能赋值给`unkonwn`和`any`

### object、Object、{}

1. `object`表示所有非原始类型，不能把原始类型赋值给 object
2. `Object`表示所有类型，可以把原始类型、非原始类型赋值给 Object
3. `{}`与`Object`一致

## 类型推断

一般情况下，不需要每个变量都写类型，系统会自动帮我们推断出来

```ts
// 等价
let str: string = '123'
let str1 = '123'

// 不等价
const n: number = 123
const n2 = 123 // 此时类型是123
```

## 类型断言

但自己知道某一步的确定类型时，可以使用类型断言

```ts
type StringOrNumber = string | number

function add(x: StringOrNumber) {
  return (x as string).toUpperCase() // 此处断言为string
}
```

###### 语法

有两种方法表达，但推荐使用`as`，因为尖括号模式会与`react`的`jsx`有冲突

```ts
// 尖括号 语法
let someValue: any = 'this is a string'
let strLength: number = (<string>someValue).length

// as 语法
let someValue: any = 'this is a string'
let strLength: number = (someValue as string).length
```

###### 非空断言

可以排除掉`null`和`undefined`

```ts
let m: null | undefined | string
m!.toUpperCase()
```

## 字面量类型

字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型

```ts
let str: 'this is string' = 'this is string' // 表示this is string
let num: 1 = 1
let bool: true = true
```

以上三种类型都是各自类型的子集

###### let 和 const

```ts
let str = 'aaa' // 类型为string
const str1 = 'aaa' // 类型为aaa
```

## 类型拓宽

所有通过 let 或 var 定义的变量、函数的形参、对象的非只读属性，如果满足指定了初始值且未显示添加类型注解的条件，那么它们推断出来的类型就是指定的初始值字面量类型拓宽后的类型

```ts
const str = 'this is string' // 类型是 this is string
let str2 = str // 类型是 string

const str3: 'this is string' = 'this is string'
let str4 = str3 // 类型是 this is string
```

###### 使用 const 确定类型

```ts
// const obj: {
//   readonly x: 1;
// }
const obj = {
  x: 1,
} as const

let n = 3 as const // n: 3
```

## 类型缩小

###### 类型守卫

将类型明确缩小

```ts
let func = (anything: any) => {
  if (typeof anything === 'string') {
    return anything // 类型是string
  } else if (typeof anything === 'number') {
    return anything // 类型是number
  }
  return null
}
```

## 联合类型

联合类型表示取值可以为多种类型的中的一种，使用`|`分割

```ts
let x: string | number = 123
```

## 类型别名

给类型起一个新的名字，而不是新创建一种类型

```ts
type NewType = string
type NewType2 = string | number
```

## 交叉类型

将多个类型合并为一个类型，一般用于将多个接口类型合并成一个类型，实现接口继承的效果

```ts
type InterfaceType = { id: number; name: string } & { sex: string }

const mixType: InterfaceType = { id: 1, name: '123', sex: 'xx' }
```

## 接口

可以用于**对类的一部分进行抽象**，也可以用于**对象的形状进行描述**

```ts
interface Person {
  name: string
  age: number
}

let tom: Person = {
  name: 'tom',
  age: 123,
}
```

接口名一般大写开头，属性不能多，也不能少

### 可选与只读

```ts
interface Person {
  name: string
  age?: number // 可选
  readonly sex: string // 只读
}
```

`ReanonlyArray<T>`，保证数组创建不能被修改

```ts
let arr: Array<number> = [1, 2, 3]
let arr2: ReadonlyArray<number> = arr
```

### 任意属性

```ts
interface Person {
  name: string
  age: number
  [propName: string]: any
}

let tom: Person = {
  name: 'tom',
  age: 123,
  sex: 'men',
  address: '123',
}
```

?> 注意：一旦定义了任意属性，那么确定属性和可选属性的类型的必须是它的类型的子集

```ts
interface Person {
  name: string
  age?: number // Error number类型不能赋值给string
  [propName: string]: string
}

// 可以扩大类型
interface Person {
  name: string
  age?: number // 这里实际上是 number | undefined
  [propName: string]: string | number | undefined
}
```

## 鸭式辨形法

**像鸭子一样走路并且嘎嘎叫的就叫鸭子**，即具有鸭子特征的认为它就是鸭子

```ts
interface LabeledValue {
  label: string
}

function printLabel(labelObj: LabeledValue) {
  console.log(labelObj.label)
}

let myObj = { label: '12', size: 10 }
printLabel(myObj) // OK

printLabel({ label: '12', size: 10 }) // Error
```

上面代码，在参数里写对象就相当于是直接给`labeledObj`赋值，这个对象有严格的类型定义，所以不能多参或少参。而当你在外面将该对象用另一个变量`myObj`接收`myObj`不会经过额外属性检查，但会根据类型推论为`let myObj: { size: number; label: string } = { size: 10, label: "Size 10 Object" }`;，然后将这个`myObj`再赋值给`labeledObj`，此时根据类型的兼容性，两种类型对象，参照鸭式辨型法，因为都具有 label 属性，所以被认定为两个相同，故而可以用此法来绕开多余的类型检查。

## 绕过额外属性检查的方法

1. 鸭式辩型法
2. 类型断言 `as`
3. 索引签名 `[propName: string]: any`

## 接口（interface）与类型别名（type）的区别

在大多数的情况下，二者基本没有区别，只有一下的特殊情况

###### Object/Function

```ts
interface Point {
  x: number
  y: number
}

interface Func {
  (x: number, y: number): number
}

type Point2 = { x: number; y: number }
type Func2 = (x: number, y: number) => number
```

###### 接口可以多次定义，类型别名不行

###### 扩展

接口可以扩展类型别名，类型别名也能扩展接口  
接口使用`extends`实现，类型别名通过`&`实现

```ts
interface Int1 {
  number: number
}

interface Int2 extends Int1 {
  str: string
}

type Type1 = { n: number }

type Type2 = Type1 & { str: string }

interface Int3 extends Type1 {
  y: string
}

type Type3 = Int1 & { y: string }
```

## 泛型

使用一个类型 T，**T 是一个抽象类型，只有在调用的时候才能确定它的值**

```ts
function identity<T>(arg: T): T {
  return arg
}
```

常用泛型变量代表的意思：

- T(type):表示类型
- V(value)：表示对象中的值类型
- K(key):表示对象中的键类型
- E(Element):表示元素类型

多个泛型使用例子

```ts
function identity<T, U>(arg: T, arg2: U): T {
  console.log(arg2)
  return arg
}

console.log(identity(2, 'sss'))
```

### 泛型约束

使用`extends`

```ts
function trace<T>(arg: T): T {
  console.log(arg.size) // Error，不一定有size
  return arg
}

interface Sizeable {
  size: number
}

function tran<T extends Sizeable>(arg: T): T {
  console.log(arg.size)
  return arg
}
```

### 泛型工具

##### typeof

主要用于获取类型上下文中获取变量或者属性的类型

```ts
interface Person {
  name: string
  age: number
}

const tom: Person = { name: 'tom', age: 12 }
type Tom = typeof tom // type Tom = Person
```

##### keyof

用于获取某种类型的所有键，返回类型是联合类型

```ts
interface Person {
  name: string
  age: number
}

type K1 = keyof Person // "name" | "age"

type Todo = {
  id: number
  text: string
}

const todo: Todo = {
  id: 12,
  text: 'text',
}

function prop<T extends Todo, K extends keyof Todo>(obj: T, key: K) {
  return obj[key]
}

const id = prop(todo, 'id')
const date = prop(todo, 'date') // Error 不存在date
console.log(id)
```

##### in

用来遍历枚举类型

```ts
type Keys = 'a' | 'b' | 'c'

type Obj = {
  [p in Keys]: any
}
// type Obj = {
//   a: any;
//   b: any;
//   c: any;
// }
```

##### infer

在条件类型语句中，可以用`infer`声明一个类型变量并且使用它

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any
```

以上代码中 infer R 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用。

##### extends

对泛型进行约束或者继承

```ts
interface Lengthwise {
  length: number
}

function func<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

// 就需要有length属性的才可以
func(3) // Error 没有length属性
func({ length: 10, value: 3 }) // OK
```

##### 索引类型

```ts
interface Person {
  name: string
  age: number
}

const person: Person = {
  name: 'name',
  age: 12,
}

function getV<T, K extends keyof T>(person: T, keys: K[]): T[K][] {
  return keys.map((key) => person[key])
}

getV(person, ['name'])
getV(person, ['sdf']) // Error
```

##### 映射类型

根据旧的类型创建新的类型，称为映射类型

```ts
interface TestInterface {
  name: string
  age: number
}

// 通过+/-来指定添加还是删除

type OptionalInterface<T> = {
  [p in keyof T]+?: T[p]
}

type NewInterface = OptionalInterface<TestInterface>

// 加上自读readonly
type ReadonlyInterface<T> = {
  +readonly [p in keyof T]: T[p]
}

type NewInterface2 = ReadonlyInterface<TestInterface>
```

##### Partial

可以将类型的属性变成可选（只支持第一层）

```ts
// 定义
type Partial1<T> = {
  [P in keyof T]+?: T[P]
}

type TestType = {
  name: string
  age: number
}

type types = Partial1<TestType>
```

##### Required

将类型的属性变为必选

```ts
type Required1<T> = {
  [P in keyof T]-?: T[P]
}
type Person = {
  name: string
  age: number
}

type P = Required1<Person>
```

###### Readonly

将类型变成只读

```ts
type Readonly1<T> = {
  +readonly [P in keyof T]: T[P]
}

type Person = {
  name: string
  age: number
}

type P = Readonly1<Person>
```

###### Pick

将某个类型中挑出一些属性出来

```ts
type Pick1<T, K extends keyof T> = {
  [P in K]: T[P]
}

interface Person {
  name: string
  age: number
}

type P = Pick1<Person, 'name'>
```

##### Record

`Record<K extends keyof any, T>`的作用是将`K`中所有的属性的值转化为 `T` 类型

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T
}
interface PageInfo {
  title: string
}

type Page = 'home' | 'about' | 'contact'

const x: Record<Page, PageInfo> = {
  about: { title: 'about' },
  contact: { title: 'contact' },
  home: { title: 'home' },
}
```

##### RetureType

得到一个函数的返回值类型

```ts
type Func = (value: number) => string

const foo: ReturnType<Func> = '123'
```

##### Exclude

`Exclude<T,U>`将某个类型中属于另一个的类型移除掉

```ts
type Exclude1<T, U> = T extends U ? never : T

type T0 = Exclude1<1 | 2, 1> // 2
```

##### Extract

`Extract<T, U>`作用是从`T`中提取出`U`

```ts
type Extract2<T, U> = T extends U ? T : never
type T0 = Extract2<1 | 2, 1>
```

##### Omit

`Omit<T, K extends keyof any>`的作用是将 `T` 类型中与 `K` 类型匹配的属性去掉

```ts
interface Todo {
  title: string
  desc: string
  completed: boolean
}

type Todo2 = Omit<Todo, 'desc'>
```

// TODO Omit
