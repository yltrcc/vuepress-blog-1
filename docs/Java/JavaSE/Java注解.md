---
title: Java注解
author: 熊滔
commentid: javase:annotation
---

我们在之前就有接触过注解，比如@Override，它可以帮我们检查是否重写了方法，如果没有，它在编译阶段就会报错。注解一般有下面三个功能

- 编译检查
  - 比如@Override
- 代码分析
  - 读取注解的属性，然后使用反射技术进行分析
- 编写文档
  - 比如javadoc

## 系统自定的注解

下面介绍三个系统自定义的注解

- @Override
  - 检查方法是否是重写父类的方法
- @Deprecated
  - 将该注解标记的内容显示为已过时
- @SuppressWarnings("all")
  - 压制所有的警告

如果有一个方法被@Deprecated修饰了，如

```java
@Deprecated
public static void show() {
    System.out.println("show ...");
}
```

那么在调用时会这样

<center>
<img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/Java44.png"/>
</center>

代表这个方法已经过时了，但是你想调用还是可以调用的。

在我们写代码时，经常会弹出一些警告，如

<center>
<img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/Java45.png"/>
</center>

我们可以使用@SuppressWarnings("all")表示压制所有的警告

<center>
<img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/Java46.png"/>
</center>

这时类里面所有的警告都压制了。

## 自定义注解

### 格式

要定义一个注解，首先我们看它的格式是什么

```java
元注解
public @interface 注解名称 {

}
```

其实注解本质是一个接口，所以我们可以在里面定义抽象方法，这些抽象方法我们又把它叫做属性，这些抽象方法的返回值只能是下面这些类型

- 基本数据类型
- String
- 枚举
- 注解
- 以上类型的数组

下面定义了一个MyAnno的注解，里面有两个属性，name和age

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

//元注解暂时不必关注
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnno {
    String name();
    int age();
}
```

下面我们使用MyAnno

```java
@MyAnno(name="小明",age=18)
public static void show() {
    System.out.println("show ...");
}
```

使用注解时，要为属性赋值，否则会报错，并且格式为属性名=值的形式，我们可以在MyAnno中设定默认值，这样在使用注解时就可以不赋值，如

```java
String name() default "小明";
int age() default 18;
```

现在我们在使用时可以不赋值

```java
@MyAnno()
public static void show() {
    System.out.println("show ...");
}
```

如果注解里面只有一个属性，并且属性名为value，那么在使用注解时可以省略value直接赋值，如

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnno {
    int value();
}
```

那么使用时直接赋值

```java
@MyAnno(12)
public static void show() {
    System.out.println("show ...");
}
```

数组的赋值为属性名 = {}的形式，如果里面只有一个值，那么花括号可以省略。

### 元注解

元注解就是描述注解的注解，这里只介绍两个

- @Target()
  - 表示注解能作用的位置，比如作用在类上
  - 它有一个value属性，类型是ElementType枚举类型
  - 我们一般使用TYPE, FIELD, METHOD分别表示能够作用在类、成员变量、方法上
- @RETENTION()
  - 表示注解被保留的阶段
  - 它也有一个value属性，类型是RetentionPolicy枚举类型
  - 我们一般使用RetentionPolicy.RUNTIME表示保留到运行时

## 解析注解

在反射那里根据配置文件来创建一个类的对象，并且调用方法，现在我们将根据注解的属性来创建一个类的对象和调用相应的方法，现在有以下注解

```java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnno {
    String className();
    String methodName();
}
```

新建类使用该注解

```java
import java.lang.annotation.Annotation;
import java.lang.annotation.Target;
import java.lang.reflect.Method;

@MyAnno(className = "Animal", methodName = "eat")
public class TestAnno {
    public static void main(String[] args) throws Exception {
        //获取该类的Class对象
        Class<TestAnno> cla = TestAnno.class;
        //获取注解 会在内存中生成一个该注解的子类实现对象
        MyAnno an = cla.getAnnotation(MyAnno.class);

        //调用方法会将属性值返回
        String className = an.className();
        String methodName = an.methodName();

        //根据类名获取Class对象
        Class cls = Class.forName(className);
        //获取方法
        Method method = cls.getMethod(methodName);
        //使用无参构造方法创建对象
        Object o = cls.newInstance();
        //调用方法
        method.invoke(o);

    }
}
```

运行结果为

```java
eat ...
```

这时我们只要改变注解的属性值，就可以创建任意类的对象，并且调用相应的方法。



<Disqus />