---
title: Java异常
author: 熊滔
commentid: javase:exception
---

所谓的异常就是不正常，我们在之前很多地方有碰到异常，比如对象向下转型时有碰到ClassCastException。所有的异常都继承自Exception类。Exception下面有一个重要的的子类叫做RuntimeException。

异常分为编译期异常和运行时异常，如Exception就是编译期异常，而RuntimeException是运行时异常，如果在方法中抛出了一个编译期异常，那么必须处理该异常，继续向上抛出或者就地处理，而对于运行异常可以选择不处理，那么就会默认交给JVM处理。

## 处理异常的过程

首先JVM检测到了异常，这时JVM会创建一个异常对象，该对象包含发生错误的内容、原因和位置。如果在发生异常处的方法内没有异常处理逻辑，那么JVM会把该异常抛给这个方法的调用者，如果该调用者也没有异常处理逻辑，那么就会一直向上抛出，直到遇到main方法，如果main方法也没有异常处理逻辑，那么这时异常就会抛给JVM，JVM会打印红色字体至控制台，并且终止Java程序的运行。

与异常有关的关键字有五个，分别为throw, throws, try, catch, finally。下面介绍这五个关键字的作用。

## throw

throw关键字用于在方法中抛出一个异常，如下

```java
public static double divide(double a, double b) {
    if (b == 0) {
        throw new ArithmeticException("除0");
    }
    return a/b;
}
```

这个方法的作用是a/b，在检测到b=0时，我们抛出了一个异常，并给出提示信息"除0"。现在我们在main方法中调用该方法

```java
System.out.println(divide(5,0));
```

由于我们没有对异常进行处理，所以程序会进行终结并在控制台打印出信息：

<center>
     <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/Java32.png"/>
</center>

**注意：**

- `throw`必须写在方法的内部
- `new`的必须是`Exception`或其子类

## throws

throws的作用是声明异常，或者说叫把异常抛给调用者，我们知道，编译期异常是必须要进行处理，那么处理的办法有两种，一种就是把继续向上抛出，另一种就是使用try-catch进行处理。而throws就是将异常继续抛出，现在我们将上面的ArithmeticException改为Exception，由于Exception为编译期异常，必须进行处理，否则编译不通过

<center>
     <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/Java33.png"/>
</center>


由图片可以知道，由于我们没有对该异常处理，所以编译没有通过，我们这里的处理办法就是继续抛出

<center>
     <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/Java34.png"/>
</center>


我们通过throws关键字抛出异常了，但是我们发现在main方法处又出现了问题，这是因为main方法没有处理divide()方法可能抛出的异常，因为divide()抛出的异常为编译期异常，必须进行处理，这里我们继续向上抛出，如下

<center>
     <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/Java35.png"/>
</center>


这时代码就不会报错了。

**注意：**

- 使用`throws`时可以抛出多个异常，异常与异常之间使用逗号隔开
- 如果抛出的多个异常具有父子类关系，那么抛出父类异常就可以了

## try-catch

虽然我们通过throws可以向上抛出异常，但是如果不进行处理的话，最终还是会抛出给JVM，而JVM的处理方法就是打印异常信息然后终止程序。我们应该在异常发生时进行捕获，这个时候就不会将异常最终抛给JVM，程序就不会终止，而是会继续的执行下去。进行捕获的代码就是try-catch。具体格式为

```java
try {
    //可能发生异常的代码
} catch {接收异常的变量} {
    //对异常进行处理
}
```

所以我们重写上面的那个方法为

```java
public class TestException {
    public static void main(String[] args) {
        try {
            //可能发生异常的代码
            System.out.println(divide(5,0));
        } catch (ArithmeticException e) {
            //这里对异常的处理只是将异常打印出来
            //处理异常后并不会终止程序，所以后面的代码还是可以执行
            System.out.println(e);
        }
        
        System.out.println("后续代码");
    }
    public static double divide(double a, double b) {
        
        if (b == 0) {
            throw new ArithmeticException("除0"); 
        }
        
        return a/b;
    }
}
```

运行结果为

```java
java.lang.ArithmeticException: 除0
后续代码
```

可见后面的代码执行了。

Throwable(它是Exception的父类)中有三个处理异常的方法

- getMessage
  - 打印简短信息
- toString
  - 就是上面的直接打印对象
- printStackTrace
  - JVM向控制台输出的信息就是调用这个方法，该方法打印的信息很全

## finally

其实在try-catch后面还可以跟一个finally块，我们知道如果没有发生异常的话，catch里面的代码块是不会执行的，而finally里的代码块，无论是是否抛出异常，都一定会执行的，所以finally里面的代码多用来释放资源的。我们来看一个例子

```java
try {
    System.out.println(divide(5,0));
} catch (ArithmeticException e) {
    e.printStackTrace();
}finally {
    System.out.println("finally代码块");
}
```

这时是会抛出异常的，输出的结果为

<center>
     <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/Java36.png"/>
</center>


可见finally里面的代码执行了，现在修改上面的代码为

```java
try {
    System.out.println(divide(5,1));
} catch (ArithmeticException e) {
    e.printStackTrace();
}finally {
    System.out.println("finally代码块");
}
```

这时是不会抛出异常的，所以catch代码块里面的程序不会被执行，但是finally里面的代码始终会被执行，执行的结果为

<center>
     <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/Java37.png"/>
</center>


**注意：**

- 由于finally里面的代码一定是会执行的，所以要避免在finally里面写return语句，否则返回的一直是finally里面的结果。

## 多异常捕获

### 多次捕获，多次处理

即使用多个try-catch语句块

```java
try {
    //可能发生异常的代码
} catch(异常1 e) {
    //处理异常1
}

try {
    //可能发生异常的代码
} catch(异常2 e) {
    //处理异常2
}

...
```

### 一次捕获，多次处理

即一个try匹配多个catch

```java
try {
    //可能发生异常的代码
} catch (异常1 e) {
    //处理异常1
} catch (异常2 e) {
    //处理异常2
} ...
```

如果在try中发生了异常，那么首先会判断这个异常能不能被异常1接收，如果能那么就在第一个catch中进行处理，如果不能，那么就判断能不能被异常2接收，以此类推。

这里需要注意的点是，父类异常必须子类异常后面。假设父类异常写在前面，如果发生了子类异常，根据多态，父类能够接收这个异常，所以写在后面的子类异常永远接受=收不到这个异常，就相当于是死代码了。

### 一次捕获，一次处理

就是在catch中使用Exception变量接收异常，因为所有的异常都是Exception的子类，所以可以接收所有的异常

```java
try {
    //可能发生异常的代码
} catch (Exception e) {
    //处理异常
}
```

## 子类注意事项

如果父类方法抛出多个异常，子类重写了该方法，那么子类方法有三种方案

- 抛出相同异常
- 抛出父类异常的子类
- 不抛出异常

如果父类的方法没有抛出异常，那么子类重写的方法也不能抛出异常。该子类产生的异常只能try-catch捕获处理，不能使用throws抛出。

## 自定义异常

自定义的异常必须继承一个异常类。如果继承的是Exception，那么该异常就是编译期异常，如果继承的是RuntimeException，那么就是运行时异常。下面简单的演示

```java
public class MyException extends RuntimeException{
    //一个空参构造方法
    public MyException(){}
    //一个带异常信息的构造方法
    public MyException(String message) {
        super(message);
    }
}
```

现在进行测试

```java
public class TestMyException {
    public static void main(String[] args) {
        divide(5,0);
    }

    public static double divide(double a, double b) {
        if (b == 0) {
            //继承至RuntimeException，是运行时异常，可以不进行处理
            throw new MyException("除0");
        }
        return a / b;
    }
}
```

结果为

<center>
     <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/Java38.png"/>
</center>




<Disqus />