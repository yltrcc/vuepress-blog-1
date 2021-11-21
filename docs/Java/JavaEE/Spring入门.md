---
title: Spring入门
author: 熊滔
commentid: javaee:spring-start
---


## 概述

Spring是一个什么东西? 简单的理解就是一个容器。既然是容器，那就是装东西的，装什么的呢? 里面装的都是对象。以前对象都是由我们自己管理，比如我们在User类中使用Student对象，那么我们会直接new，比如

```java
// User.java
Student student = new Student();
```

那如果使用Spring的话，会将Student对象放在Spring容器中，如果在User类中使用Student对象，那么就向Spring容器要。我们把这个称之为IOC(控制反转)，即控制权由程序员交给了Spring容器。

所以接下来就要讲如何将对象交给Spring容器，或者说Spring容器如何创建对象，主要是在创建对象时如何为对象里面的成员变量注入值。

## 入门

首先新建一个Maven工程，在pom.xml中导入依赖。说实话Spring框架是一个大家族，它有非常多的包，这里我们导入spring-webmvc，该包依赖了很多其他Spring的包，这样我们需要的包都会被导入，所以我们只要导入这一个包就可以，如下

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.2.0.RELEASE</version>
</dependency>
```

在src/main/java下新建pojo.Hello.java，如下

```java
package pojo;

public class Hello {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Hello{" +
                "name='" + name + '\'' +
                '}';
    }
}
```

现在我们要将这个Hello对象交给Spring，首先在resources下新建Spring的配置文件beans.xml(名字随便，官方名字是applicationContext.xml)，内容如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="hello" class="pojo.Hello">
        <property name="name" value="Hello"/>
    </bean>
</beans>
```

其中

```xml
<bean id="hello" class="pojo.Hello">
    <property name="name" value="Hello"/>
</bean>
```

就是在Spring容器中注册Hello，其中id是我们向Spring容器获取Hello对象用的，class是Hello类的全限定类名。在bean标签中的peoperty标签的作用是设置在创建Hello对象时其成员变量的值。上面设置为成员变量name注入值Hello。

现在在test/java下新建TestHello.java，内容如下

```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import pojo.Hello;

public class TestHello {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        Hello hello = (Hello) applicationContext.getBean("hello");
        System.out.println(hello);
    }
}
```

运行结果为

```java
Hello{name='Hello'}
```

其中

```java
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
```

是根据配置文件beans.xml得到Spring容器，接着我们根据在beans,xml中配置的id获取Hello对象

```java
Hello hello = (Hello) applicationContext.getBean("hello");
```

接着我们打印出Hello对象，发现这个对象的成员变量name已经有值Hello，这是我们在beans.xml中注入的。


## IOC创建对象

IOC创建对象的过程，其实关键就是向对象的成员变量注入值，我们把这个东西叫做装配，而接下来就是介绍如何为成员变量注入值。

### 构造器注入

第一种方法就是通过构造函数注入(初始化)，上面那个例子IOC在创建对象时是调用的是无参构造函数，所以上面那个例子的装配不是通过构造函数装配的，为了演示构造函数装配，首先新建一个User类

```java
package pojo;

public class User {
    private String userName;
    private int age;

    public User(String userName, int age) {
        this.userName = userName;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "userName='" + userName + '\'' +
                ", age=" + age +
                '}';
    }
}
```

接着在beans.xml注册该类(就是将它交给Spring容器)，如下

```xml
<bean id="user" class="pojo.User">
    <constructor-arg index="0" value="奥特曼"/>
    <constructor-arg index="1" value="1"/>
</bean>
```

其中constructor-arg标签就是通过构造函数注入值，这里是通过参数的位置注入值的，比如为第一个参数即index = 0的位置注入"奥特曼"，为第二个参数即index = 1的位置注入1。

接着我们可以在test/java中新建TestUser类，内容如下

```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import pojo.User;

public class TestUser {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        User user = (User) applicationContext.getBean("user");
        System.out.println(user);
    }
}
```

上面的代码想必无需解释，上面的结果为

```java
User{userName='奥特曼', age=1}
```

可见是注入成功了。

通过构造器注入，还有两种方法，比如通过类型注入，修改上面的constructor-arg标签如下

```xml
<bean id="user" class="pojo.User">
    <constructor-arg type="java.lang.String" value="奥特曼"/>
    <constructor-arg type="int" value="1"/>
</bean>
```

上面的配置就是根据构造函数参数类型进行配置，再次运行代码，得到的结果还是一样的。

>**注意:** 如果有多个成员变量的类型是相同的，那么此方法就不适用了。

最后一种就是根据成员变量的名字进行配置，如下

```xml
<bean id="user" class="pojo.User">
    <constructor-arg name="userName" value="奥特曼"/>
    <constructor-arg name="age" value="1"/>
</bean>
```

### set方法注入

set方法注入就是指通过无参构造函数创建对象以后，通过set方法将值注入到成员变量中，所以使用该方法注入就需要为每个成员变量写set方法，修改上面的User类如下

```java
package pojo;

public class User {
    private String userName;
    private int age;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "userName='" + userName + '\'' +
                ", age=" + age +
                '}';
    }
}
```

现在在beans.xml中进行配置如下

```xml
<bean id="user" class="pojo.User">
    <property name="userName" value="奥特曼"/>
    <property name="age" value="1"/>
</bean>
```

我们通过property标签向对象注入值，这是通过成员变量的名字进行配置的。

### 其它配置方法

#### p命名空间注入

要使用p命名空间，就得导入约束，修改beans.xml的约束

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- ... ... -->

</beans>
```

所谓p命名空间注入与set方法注入是相同的，只不过写法不同，写法如下

```xml
<bean id="user" class="pojo.User" p:userName="奥特曼" p:age="1"/>
```

#### c命名空间注入

要使用c命名空间同样要导入约束，再次修改beans.xml如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:c="http://www.springframework.org/schema/c"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- ... ... -->

</beans>
```

c命名空间注入与构造函数注入是相同的，写法同p命名空间注入，如下

```xml
<bean id="user" class="pojo.User" c:userName="奥特曼" c:age="1"/>
```

或者

```xml
<bean id="user" class="pojo.User" c:_0="奥特曼" c:_1="1"/>
```

上面的0和1代表的是构造函数中参数的位置。

### 各种类型成员变量的注入

这里以set的方式讲解怎么注入各种类型成员变量，比如复杂类型，数组，List等集合，首先新建一个Student类如下

```java
package pojo;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Student {
    private String name;
    private Address address;
    private String[] hobbies;
    private List<String> games;
    private Set<String> toys;
    private Map<String, Integer> scores;
    private String wife;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String[] getHobbies() {
        return hobbies;
    }

    public void setHobbies(String[] hobbies) {
        this.hobbies = hobbies;
    }

    public List<String> getGames() {
        return games;
    }

    public void setGames(List<String> games) {
        this.games = games;
    }

    public Set<String> getToys() {
        return toys;
    }

    public void setToys(Set<String> toys) {
        this.toys = toys;
    }

    public Map<String, Integer> getScores() {
        return scores;
    }

    public void setScores(Map<String, Integer> scores) {
        this.scores = scores;
    }

    public String getWife() {
        return wife;
    }

    public void setWife(String wife) {
        this.wife = wife;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", address=" + address +
                ", hobbies=" + Arrays.toString(hobbies) +
                ", games=" + games +
                ", toys=" + toys +
                ", scores=" + scores +
                ", wife='" + wife + '\'' +
                '}';
    }
}
```

上面的成员变量类型有String，复杂类型Address，数组，List, Map, Set集合，以及最后一个String类型的wife，我们将通过wife演示如果注入null。因为这里用到了复杂类型Address，所以新建类Address如下

```java
package pojo;

public class Address {
    private String address;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Address{" +
                "address='" + address + '\'' +
                '}';
    }
}
```

将Address注册到Spring容器中，在beans.xml中添加如下

```xml
<bean id="address" class="pojo.Address">
    <property name="address" value="China"/>
</bean>
```

现在直接演示如果为Student中的成员变量注入

```xml
<bean id="student" class="pojo.Student">
    <property name="name" value="张三"/>
    <property name="address" ref="address"/>
    <property name="hobbies">
        <array>
            <value>打球</value>
            <value>游泳</value>
        </array>
    </property>
    <property name="games">
        <list>
            <value>王者荣耀</value>
            <value>吃鸡</value>
        </list>
    </property>
    <property name="toys">
        <set>
            <value>飞机</value>
            <value>大炮</value>
        </set>
    </property>
    <property name="scores">
        <map>
            <entry key="math" value="20"></entry>
            <entry key="english" value="50"></entry>
        </map>
    </property>
    <property name="wife">
        <null></null>
    </property>
</bean>
```

对于Address复杂类型，我们使用ref属性引用已经在Spring中注册过的类，其值就是它注册时的id。剩下的应该很容易看懂，就不解释了。

## Spring配置

| 标签| 作用|
|:--| :--|
|alias| 别名|
|bean | 向Spring容器注册类|
|import| 导入其它配置文件 |

## Bean的作用域

bean标签有一个scope属性，可以设置作用域，这里只介绍两种取值

- singleton：单例模式，从Spring容器中得到的对象是同一对象，默认值
- prototype：原型模式，从Spring容器中得到的对象是不同对象

```xml
<bean id="user" class="pojo.User" c:userName="奥特曼" c:age="1" scope="singleton"/>
```

比如在TestUser中修改如下

```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import pojo.User;

public class TestUser {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        User user = (User) applicationContext.getBean("user");
        // 第二个参数传了User.class就不用强转了
        User user2 = applicationContext.getBean("user", User.class);
        System.out.println(user == user2); // true
    }
}
```

现在修改scope为prototype，再次运行打印出的结果就是false了。

## 自动装配Bean

首先准备几个类，新建Man.java

```java
package com.pojo;

public class Man {
    private Dog dog;
    private Cat cat;

    public Dog getDog() {
        return dog;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }

    public Cat getCat() {
        return cat;
    }

    public void setCat(Cat cat) {
        this.cat = cat;
    }
}
```

其中Man有两个宠物，一个为Cat，一个为Dog，新建这两个类

```java
package com.pojo;

public class Cat {
    public void shout() {
        System.out.println("miao");
    }
}
```

```java
package com.pojo;

public class Dog {
    public void shout() {
        System.out.println("wang");
    }
}
```

在beans.xml中注册Dog和Cat

```xml
<bean id="cat" class="com.pojo.Cat"/>
<bean id="dog" class="com.pojo.Dog"/>
```

现在考虑怎么向Man中注入Cat和Dog。

### 按名字自动注入

在beans.xml添加如下

```java
<bean id="man" class="com.pojo.Man" autowire="byName"/>
```

autowire就是用来设置自动注入的，这里设置为按名字自动注入(byName)。它会在Spring容器寻找到id与setXxx中Xxx名字相同的类注入，比如在Man中有setDog()方法，它会在Spring容器中找到id为dog的类(在Spring中注册的类，一般都称为bean)自动为它注入。

### 按类型注入

修改Man的bean为

```xml
<bean id="man" class="com.pojo.Man" autowire="byType"/>
```

这时会在Spring容器中寻找类型为Dog和Cat的bean为Man中的Dog和Cat自动注入，但是如果Spring容器中有多个类型相同的bean，那么就不能注入，比如我们向Spring容器中在注入一个Dog如下

```xml
<bean id="dog2" class="com.pojo.Dog"/>
```
这时我们发现在beans.xml中报错了

<center>
<img src="https://raw.githubusercontent.com/LastKnightCoder/img/master/20200226111001.png">
</center>

### 使用注解注入

使用@AutoWired注解在成员变量上，会在Spring容器找到符合条件的，自动注入，首先在beans.xml中注册Man类

```xml
<bean id="man" class="com.pojo.Man"/>
```

在Man.java中为成员变量加上注解

```java
@Autowired
private Dog dog;
@Autowired
private Cat cat;
```

这时还是不行的，因为要在beans.xml中开启注解支持，首先导入约束，修改约束如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">
    <!-- ... ... -->
</beans>
```

接着开启注解支持，在beans.xml中添加如下

```xml
<context:annotation-config/>
```

@AutoWired注解首先通过byType即类型寻找符合条件的bean，如果找到多个类型相同的bean符合条件，那么接着在这些bean中byName寻找符合条件的。

我们可以给成员变量加上@Qualifier注解，这样就会按照@Qualifier规定的name取寻找符合条件的bean。

```java
@Autowired
@Qualifier("dog")
private Dog dog;
@Autowired
@Qualifier("cat")
private Cat cat;
```

@AutoWired也可以在setXxx方法上使用，并且如果在成员变量上使用，则可以不写setter方法了。

除了使用@AutoWired注解，我们还可以使用@Resource注解，这个注解不是Spring的，是J2EE的，我们修改注解如下

```java
@Resource
private Dog dog;
@Resource
private Cat cat;
```

@Resource是默认byName去寻找符合条件的bean的，如果找不到则byType。

## Spring注解开发

要使用注解，首先导入约束(在上面演示过了)，并且开启注解支持，最后设置要扫描的包(即哪些包下的类是使用注解的)，beans.xml的内容如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">


    <context:annotation-config/>
    <context:component-scan base-package="com.pojo"/>
</beans>
```

在上面定义扫描com.pojo下的包，首先新建Student类和Address类

```java
package com.pojo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

public class Student {
    private String name;
    private Address address;

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", address=" + address +
                '}';
    }
}
```

```java
package com.pojo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

public class Address {
    private String address;

    @Override
    public String toString() {
        return "Address{" +
                "address='" + address + '\'' +
                '}';
    }
}
```

### @Component

接下来本应该是在beans.xml中注册，但是这次我们不使用xml配置了，而是使用注解，要向Spring容器中注册，我们只需要在类上面加入@Component注解，而注入则可以使用我们在上面介绍的@AutoWired，如下

```java
package com.pojo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Student {
    @Value("Alice")
    private String name;
    @Autowired
    private Address address;

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", address=" + address +
                '}';
    }
}
```

```java
package com.pojo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Address {
    @Value("American")
    private String address;

    @Override
    public String toString() {
        return "Address{" +
                "address='" + address + '\'' +
                '}';
    }
}
```

其中@Value注解是向其中注入普通值的，如String，int等等，对于一些其他一些复杂类型，如数组，集合等，建议使用xml配置，更清晰。

接下来在test/java/TestStudent.java中进行测试

```java
import com.pojo.Student;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestStudent {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        Student student = applicationContext.getBean("student", Student.class);
        System.out.println(student);
    }
}
```

输出为

```java
Student{name='Alice', address=Address{address='American'}}
```

>**@Component衍生的注解:**
>下面介绍@Component衍生的注解，这些注解的作用与@Component相同，只不过语义不同，如
>
>- @Controller：使用在Web层(servlet)
>- @Service：使用在业务层(service)
>- @Repository：使用在持久层(dao)
>
>这些注解的功能相同，就是将类配置在Spring容器中。

### @Scope

@Scope是用来设置bean的范围的，上面我们介绍过两种取值，一种是singleton，另一种是prototype，如

```java
@Component
@Scope("singleton")
```

## 通过JavaConfig实现配置

新建工程并新建一个User类，如下

```java
package com.pojo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class User {
    @Value("biu")
    private String name;
    @Value("1")
    private int age;

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

这其中的内容都不洗解释了。之前我们的配置都是通过xml文件配置的，这次我们将彻底不需要xml文件，而是通过Java类来进行配置，在com.config包下新建JavaConfig.java，内容如下

```java
package com.config;

import com.pojo.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("com.pojo")
public class JavaConfig {
    @Bean
    public User getUser() {
        return new User();
    }
}
```

在此类中我们使用了一个@Configuration注解，代表这是一个配置类。@ComponentScan定义了扫描包的范围。@Bean注解就是相当于bean标签，其方法名就相当于是id，返回值类型就是class。

接在我们在test/java/TestUser中进行使用如下

```java
import com.config.JavaConfig;
import com.pojo.User;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class TestUser {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(JavaConfig.class);
        User user = applicationContext.getBean("getUser", User.class);
        System.out.println(user);
    }
}
```

输出为

```java
User{name='biu', age=1}
```

我们可以通过@Bean注解来设置id，比如上面JavaConfig中的@Bean修改如下

```java
@Bean("user")
```

那么我们就可以通过"user"去Spring容器中拿User对象

```java
User user = applicationContext.getBean("user", User.class);
```

>**注意:** 这时不能通过方法名获得对象了。

## AOP

现在假设有这么一个需求，有下面这么一个dao类，如下

```java
package com.dao;

public class UserDao {
    public void add() {
        System.out.println("add");
    }
    
    public void update() {
        System.out.println("update");
    }
    
    public void query() {
        System.out.println("query");
    }
    
    public void delete() {
        System.out.println("delete");
    }
}
```

我们希望每次在调用该类的方法的前后都打印出日志，我们当然不能在UserDao类中的每个方法中手动打印，如

```java
public void add() {
    System.out.println("add方法执行前");
    System.out.println("add");
    System.out.println("add方法执行后");
}
```

这样将日志的代码与业务的代码揉在一起，不好；另一个对于每个方法都要写这样的代码，又累又low。

### AOP概念

Spring框架自诞生之日就拯救我等程序员于水火之中，它有两大法宝，一个是IoC控制反转，另一个便是AOP面向切面编程。AOP全名Aspect-oriented programming面向切面编程。

#### 切面(Aspect)

切面是一个横切关注点的模块化，一个切面能够包含同一个类型的不同增强方法，比如说事务处理和日志处理可以理解为两个切面。切面由切入点和通知组成，它既包含了横切逻辑的定义，也包括了切入点的定义。 Spring AOP就是负责实施切面的框架，它将切面所定义的横切逻辑织入到切面所指定的连接点中。

#### 目标对象(Target)

目标对象指将要被增强的对象，即包含主业务逻辑的类对象。或者说是被一个或者多个切面所通知的对象。

#### 连接点(JoinPoint)

程序执行过程中明确的点，如方法的调用或特定的异常被抛出。连接点由两个信息确定：

- 方法(表示程序执行点，即在哪个目标方法)
- 相对点(表示方位，即目标方法的什么位置，比如调用前，后等)

简单来说，连接点就是被拦截到的程序执行点，因为Spring只支持方法类型的连接点，所以在Spring中连接点就是被拦截到的方法。

#### 切入点(PointCut)

切入点是对连接点进行拦截的条件定义。切入点表达式如何和连接点匹配是AOP的核心，Spring缺省使用AspectJ切入点语法。 一般认为，所有的方法都可以认为是连接点，但是我们并不希望在所有的方法上都添加通知，而切入点的作用就是提供一组规则(使用 AspectJ pointcut expression language 来描述) 来匹配连接点，给满足规则的连接点添加通知。

#### 通知(Advice)

通知是指拦截到连接点之后要执行的代码，包括了“around”、“before”和“after”等不同类型的通知。Spring AOP框架以拦截器来实现通知模型，并维护一个以连接点为中心的拦截器链。

#### 织入(Weaving)

织入是将切面和业务逻辑对象连接起来, 并创建通知代理的过程。织入可以在编译时，类加载时和运行时完成。在编译时进行织入就是静态代理，而在运行时进行织入则是动态代理。

#### 增强器(Adviser)

Advisor是切面的另外一种实现，能够将通知以更为复杂的方式织入到目标对象中，是将通知包装为更复杂切面的装配器。Advisor由切入点和Advice组成。 Advisor这个概念来自于Spring对AOP的支撑，在AspectJ中是没有等价的概念的。Advisor就像是一个小的自包含的切面，这个切面只有一个通知。切面自身通过一个Bean表示，并且必须实现一个默认接口。

### Spring AOP

我们将使用AOP来实现上面的需求，要使用AOP，首先要导入一个包aspectj，如下

```java
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.4</version>
</dependency>
```

两个日志类分别表示在方法执行之前和执行之后

```java
package com.log;

import org.springframework.aop.MethodBeforeAdvice;

import java.lang.reflect.Method;

public class LogBefore implements MethodBeforeAdvice {
    public void before(Method method, Object[] objects, Object o) throws Throwable {
        System.out.println("在" + method.getName() + "之前执行");
    }
}
```

```java
package com.log;

import org.springframework.aop.AfterReturningAdvice;

import java.lang.reflect.Method;

public class LogAfter implements AfterReturningAdvice {

    public void afterReturning(Object o, Method method, Object[] objects, Object o1) throws Throwable {
        System.out.println("在" + method.getName() + "执行后， 返回值为" + o);
    }
}
```

接着在beans.xml中注册这三个类，为了使用AOP，我们要导入约束，beans.xml全部内容如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">

    <bean id="userDao" class="com.dao.UserDao"/>
    <bean id="beforeLog" class="com.log.LogBefore"/>
    <bean id="afterLog" class="com.log.LogAfter"/>

    <aop:config>
        <aop:pointcut id="pointcut" expression="execution(* com.dao.*.*(..))"/>

        <aop:advisor advice-ref="beforeLog" pointcut-ref="pointcut"/>
        <aop:advisor advice-ref="afterLog" pointcut-ref="pointcut"/>
    </aop:config>

</beans>
```

现在在TestUserDao中进行测试

```java
import com.dao.UserDao;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestUserDao {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beans.xml");
        UserDao userDao = applicationContext.getBean("userDao", UserDao.class);
        userDao.add();
    }
}
```

输出为

```java
在add之前执行
add
在add执行后， 返回值为null
```

### 自定义类 AOP

现在我们将使用另一种用法实现上面的效果，这次我们新建一个Log类，如下

```java
package com.log;

public class Log {
    public void before() {
        System.out.println("before");
    }
    public void after() {
        System.out.println("after");
    }
}
```

修改beans.xml如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">

    <bean id="userDao" class="com.dao.UserDao"/>
    <bean id="log" class="com.log.Log"/>

    <aop:config>
        <aop:aspect ref="log">
            <aop:pointcut id="pointcut" expression="execution(* com.dao.*.*(..))"/>
            <aop:before method="before" pointcut-ref="pointcut"/>
            <aop:after method="after" pointcut-ref="pointcut"/>
        </aop:aspect>
    </aop:config>

</beans>
```

再次运行TestUserDao类，输出为

```java
before
add
after
```

### 注解 AOP

修改beans.xml为

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <context:annotation-config/>
    <context:component-scan base-package="com"/>

    <aop:aspectj-autoproxy/>
</beans>
```

修改Log.java为

```java
package com.log;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class Log {

    @Before("execution(* com.dao.*.*(..))")
    public void before() {
        System.out.println("before");
    }
    @After("execution(* com.dao.*.*(..))")
    public void after() {
        System.out.println("after");
    }
}
```

UserDao.java

```java
package com.dao;

import org.springframework.stereotype.Component;

@Component
public class UserDao {
    public void add() {
        System.out.println("add");
    }

    public void update() {
        System.out.println("update");
    }

    public void query() {
        System.out.println("query");
    }

    public void delete() {
        System.out.println("delete");
    }
}
```

再次运行TestUserDao，输出如下

```java
before
add
after
```
