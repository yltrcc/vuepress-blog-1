---
title: Java反射
author: 熊滔
commentid: javase:reflect
---

反射是框架设计的灵魂，通过反射我们可以在程序运行时读取配置文件动态的创建一个类，也可以通过读取注解来达到我们想到的功能。与反射有关的类是Class类。

<!--more-->

### Class类对象的获取方法

Class类对象的获取方法有三种

- Class.forName(String name)
  - 参数是类的全类名(包名+类名)，可以获得该类的Class对象
- 类名.class
  - 通过类的静态属性class可以获取Class对象
- 对象.getClass()
  - 通过对象的getClass()方法可以获取Class对象

假设一个Animal类

```java
public class Animal {
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public Animal() {
    }

    public String name;
    private int age;

    public void eat() {
        System.out.println("eat ...");
    }
    
    public void eat(String string) {
        System.out.println("eat " + string);
    }

    private void sleep() {
        System.out.println("sleep ...");
    }

    @Override
    public String toString() {
        return "Animal{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

现在要通过上面的三种方法获取该类的Class对象

```java
//通过全类名获取Class对象
Class cls1 = Class.forName("Animal");
//通过类的静态属性class获取Class对象
Class cls2 = Animal.class;
//通过对象的getClass()获取静态对象
Animal animal = new Animal();
Class cls3 = animal.getClass();
```

另外需要注意的是，通过上面三种方法获取的Class对象是同一个对象

```java
System.out.println(cls1 == cls2); //true
System.out.println(cls1 == cls3); //true
```

### Class类的常见成员方法

#### 与成员变量有关的方法

- getFields()
  - 获取public修饰的所有成员变量，返回一个Field[]
- getField(String name)
  - 获取指定名称被public修饰的成员变量
- getDeclaredFields()
  - 同getFields()，不过任意修饰符修饰的都可以获取
- getDeclaredField(String name)
  - 同getField(String name)，不过任意修饰符修饰的都可以获取

```java
Field[] fields1 = cls1.getFields();
//public java.lang.String Animal.name
for (Field field : fields1) {
    System.out.println(field);
}
Field[] fields2 = cls1.getDeclaredFields();
//public java.lang.String Animal.name
//private int Animal.age
for (Field field : fields2) {
    System.out.println(field);
}
Field field1 = cls1.getDeclaredField("age");
//private int Animal.age
System.out.println(field1);
```

可以通过set(Object obj, Object value)方法对指定的对象设定值，也可以通过get(Object obj)方法来获取值

```java
Field field2 = cls1.getDeclaredField("name");
field2.set(animal,"Dog");
System.out.println(animal.name); //Dog
System.out.println(field2.get(animal)); //Dog
```

如果我们要对age进行赋值，因为age变量是private修饰的，是不能在类外面直接访问的，我们可以调用setAccessible(true)方法，来忽略访问修饰符的安全检查(暴力反射)

```java
Field field1 = cls1.getDeclaredField("age");
field1.setAccessible(true);
field1.set(animal,10);
System.out.println(field1.get(animal)); //10
//System.out.println(animal.age); //会报错，不能这么访问
```

#### 与构造方法有关的方法

- getConstructors()
  - 得到由public修饰的所有构造方法
- getConstructor()
  - 获取指定参数的构造函数，如
    - getConstructor()：获取无参构造函数
    - getConstructor(String.class, int.class)：获得第一个参数类型为String类型和第二个参数类型为int类型的构造方法
- cls1.getDeclaredConstructors()
  - 参照Field
- cls1.getDeclaredConstructor()
  - 参照Field

```java
//获得无参的构造方法
Constructor cons1 = cls1.getConstructor();
Stream.of(cons1).forEach(System.out::println); //public Animal()
//获得参数类型分别为String类型和int类型的构造方法
Constructor cons2 = cls1.getConstructor(String.class, int.class);
Stream.of(cons1).forEach(System.out::println); //public Animal()
```

现在获得了构造方法，那么构造方法的作用就是创造对象，我们可以通过Contructor对象的的newInstance()方法创建一个对象，如

```java
//newInstance方法返回的是一个Object对象
Animal animal1 = (Animal) cons1.newInstance();
Animal animal2 = (Animal) cons2.newInstance("Cat", 2);
System.out.println(animal1);
System.out.println(animal2);
```

输出为

```java
Animal{name='null', age=0}
Animal{name='Cat', age=2}
```

如果想创建一个无参的对象，可以直接通过Class对象的newInsatance()方法创建，如

```java
Animal animal3 = (Animal) cls1.newInstance();
```

#### 与成员方法有关的方法

- getMethods
  - 获取所有public修饰的方法
- getMethod()
  - 通过方法名和参数类型(区别重载的方法)获取public修饰的指定方法
- getDeclaredMethods
  - 忽略修饰符
- getDeclaredMethod
  - 忽略修饰符

```java
//获取不带参数的eat方法
Method eat1 = cls1.getMethod("eat");
//获取带一个参数类型为String的eat方法
Method eat2 = cls1.getMethod("eat",String.class);
//获取private修饰的sleep方法
Method sleep = cls1.getDeclaredMethod("sleep");
```

获取到了方法，那么接下来就是怎么使用的问题，我们可以使用invoke()方法来执行方法，需要传入相应的对象和需要的参数，如果方法不需要参数，那么可以不传，如

```java
eat1.invoke(animal);
//需要传入参数
eat2.invoke(animal,"饭");
//因为sleep是private修饰的，要执行就要执行下面这一步
sleep.setAccessible(true);
sleep.invoke(animal);
```

输出为

```java
eat ...
eat 饭
sleep ...
```

我们还可以通过getName()方法获得方法名，如

```java
System.out.println(eat1.getName()); //eat
```

我们可以通过Class对象的getName()方法获得该类的全类名(包名+类名)

```java
System.out.println(cls1.getName()); //Animal
```

### 使用反射读取配置文件动态创建任意的对象

我们现在有这么一个需求，那就是希望创建任意一个类的对象，并且调用相应的方法，要求不能更改代码，而只需要更改配置文件即可。现在我们创建一个config.properties的配置文件，内容如下

```java
className=Animal
methodName=eat
```

我们要做的就是读取配置文件，然后根据配置文件创建相应类的对象并且调用其方法

```java
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.lang.reflect.Method;
import java.util.Properties;

public class ReflectDemo {
    public static void main(String[] args) throws Exception {
        //创建Properties读取配置文件
        Properties pro = new Properties();
        pro.load(new FileReader("G:\\JavaProject\\Fourth\\src\\config.properties"));
        
        //获得类名和方法名
        String className = pro.getProperty("className");
        String methodName = pro.getProperty("methodName");
        
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

现在我们运行一下

```java
eat ...
```

现在我们要创建什么类的对象并且要调用什么方法，只需要修改配置文件就可以了，不用修改代码了。虽然还有很多的问题，比如只能使用无参构造方法创建对象，只能调用无参的方法，不过即使是这样也让我们感受到了反射的强大。

<Disqus />