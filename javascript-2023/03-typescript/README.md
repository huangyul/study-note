# typescript

## 起步

安装:`pnpm add typescript -D`

编译:`pnpx tsc index.ts`

## 配置文件

生成默认配置文件

`npx tsc --init`

## 原始类型

```ts
const a: string = '123'
const b: number = 23
const c: boolean = true
const arr: string[] = ['sdf']
const e: void = undefined
const f: null = null
const g: undefined = undefined
const h: symbol = Symbol()

```

## 标准库声明

在`tsconfig.json`中，`target`可以修改标准库，例如如果要使用`Promise`，如果`target`设置为`es3`，那就会报错没有`promise`的错误，这时有两种解决方法：
1. 将`target`改为`es2015`，此时已经有`promise`了
2. 如果仍然要将target改为`es3`，可以加lib中声明`es2015`

```json
{
  "target": "es5",
  "lib": ["ES2015", "DOM"],  
}
```

## Object

所有的非原始类型

```ts
const foo: object = ['234']
const foo: object = function() {}
const foo: { name: string } = {name: "huang"}
```

## 数组

```ts
const arr: number[] = [1]
const sum = (...arg: number[]) => {
  return arg.reduce((prev, cur) => prev + cur, 0)
}
sum(3,4,5)

```

## 元组（tuple）

明确元素数量和元素类型的数组

```ts
const tuple: [number, string] = [18, 'huang']
```

## 枚举类型

```ts
enum PostStatus {
  Success = '成功',
  Error = '失败',
}
const post = {
  status: PostStatus.Error
}
```
- 如果没有指定第一个值，会默认从零开始，后面的每个自加一
- 枚举会入侵生成的代码，而使用`const enum`会解决这个问题

```ts
const enum Status{
}
```

## 函数类型

两种定义的方式

```ts
function fun1(a: number, b: number) {
  return a + b
}
const fun2: (a: number, b: number) => number = (a, b) => {
  return a + b
}
```

## 接口

```ts
interface Person {
  name: string
  age: number
}
function newPerson(p: Person) {
  console.log(p.age)
  console.log(p.name)
}
```

可选成员，只读成员
```ts
interface Person {
  name?: string
  readonly age: number
}
```

## 类

```ts
class Person {
  // 定义好属性的类型
  public name: string // 默认就是public
  age: number
  private id: number // 私有，不能被访问
  protected gender: string // 受保持成员，只允许子类访问
  constructor() {
    // 属性必须初始化
    this.name = '3434'
    this.age = 34
    this.id = 123123
    this.gender = 'man'
  }

  sayHi(msg: string): void {
    console.log(this.name + msg)
  }
}

class Student extends Person {
  constructor() {
    super()
    console.log(this.gender)
  }
}

```

### 类与接口

使用接口来约束类的行为

```ts
// 最好一个接口只实现一个约束
interface Eat {
  eat(food: string): void
}
interface Run {
  run(distance: number): void
}

class Person implements Eat, Run {
  eat(food: string): void {
  }
  run(distance: number): void {
  }
}

class Animal implements Eat, Run {
  eat(food: string): void {
  }
  run(distance: number): void { }
}
```

### 抽象类

只能被继承，不能使用`new`实例化

```ts
abstract class Animal {
  abstract run(distance: number): void
}

class Dog extends Animal {
  run(distance: number): void {
    throw new Error("Method not implemented.");
  }
}
```

## 泛型

不具体指定某个类型

```ts
function createArr<T>(length: number, value: T): T[] {
  return Array(length).fill(value)
}

const numberArr = createArr(10, 10)
const strArr = createArr(10, 'p')
```

## 泛型声明

如果遇到没有明确类型的东西，可以自定义声明，在遇到没有使用ts编写的库时，可以使用这种方式

```ts
import {xxFunc} from 'xxxx'

declare function xxFunc(str: string): string

const res = xxFunc('xxx')
```
