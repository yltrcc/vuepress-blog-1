---
title: SSM整合
author: 熊滔
commentid: javaee:ssm-integrated
---

在学习完Spring, SpringMVC, MyBatis三大框架后，现在将记录如何整合这三个框架。

## 准备工作

首先新建一个Maven工程，在pom.xml中导入以下包

```xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.4.5</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.2.0.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.2.0.RELEASE</version>
</dependency>
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
</dependency>
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis-spring</artifactId>
    <version>2.0.2</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.47</version>
</dependency>
<dependency>
    <groupId>com.mchange</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.5.2</version>
</dependency>
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>servlet-api</artifactId>
    <version>2.5</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.2.0.RELEASE</version>
</dependency>
```

接着创建一个User表

```sql
use mybatis;
drop table if exists user;
create table user(username varchar(20), age int, sex varchar(10)) character set utf8;
insert into user values("张三", 18, "male");
insert into user values("李四", 19, "male");
```

此时的user表为

```sql
+----------+------+------+
| username | age  | sex  |
+----------+------+------+
| 张三     |   18 | male |
| 李四     |   19 | male |
+----------+------+------+
```

## Spring整合Dao层

首先在包com.pojo下新建实体类User如下

```java
package com.pojo;

public class User {
    private String userName;
    private Integer age;
    private String sex;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    @Override
    public String toString() {
        return "User{" +
                "userName='" + userName + '\'' +
                ", age=" + age +
                ", sex='" + sex + '\'' +
                '}';
    }
}
```

接下来在com.dao包下新建UserDao接口，如下

```java
package com.dao;

import com.pojo.User;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface UserDao {
    @Select("select * from user")
    List<User> findAll();
}
```

接下来在resources目录下新建MyBatis的配置文件mybatis-config.xml

```xml
<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <typeAliases>
        <package name="com.pojo"/>
    </typeAliases>
</configuration>
```

只是在其中配置了别名，数据源的配置会在Spring配置文件中配置，现在在resources下新建database.properties文件，如下

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/mybatis?useUnicode=true&characterEncoding=utf8
jdbc.username=root
jdbc.password=root
```

最后新建spring-dao.xml文件，这是Spring整合MyBatis的配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <!--  读取数据库信息  -->
    <context:property-placeholder location="classpath:database.properties"/>
    <!-- 配置连接池 -->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="${jdbc.driver}"/>
        <property name="jdbcUrl" value="${jdbc.url}"/>
        <property name="user" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
    <!-- sqlSessionFactory -->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <property name="configLocation" value="classpath:mybatis-config.xml"/>
    </bean>
    <!--  扫描com.dao下的包 动态生成实现类注册到Spring中  -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
        <property name="basePackage" value="com.dao"/>
    </bean>

</beans>
```

在resources下新建applicationContext.xml配置文件，将spring-dao.xml导入，该文件是Spring的主配置文件，主要的功能就是导入配置文件，如spring-dao.xml, spring-service.xml以及spring-mvc.xml，如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <import resource="classpath:spring-dao.xml"/>
</beans>
```

现在便是在test/java下新建TestSpringDao测试类，来验证Spring是否整合了MyBatis，如下

```java
import com.dao.UserDao;
import com.pojo.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class TestSpringDao {

    @Autowired
    private UserDao userDao;

    @Test
    public void testFindAll() {
        List<User> users = userDao.findAll();
        for (User user: users) {
            System.out.println(user);
        }
    }
}
```

输出为

```java
User{userName='张三', age=18, sex='male'}
User{userName='李四', age=19, sex='male'}
```

可见Spring以及整合MyBatis成功了。

## Spring整合Service层

简单的模拟业务层，在com.service下新建UserService接口如下

```java
package com.com.service;

import com.pojo.User;

import java.util.List;

public interface UserService {
    List<User> findAll();
}
```

接着建立它的实现类UserServiceImpl，如下

```java
package com.com.service;

import com.dao.UserDao;
import com.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    
    public List<User> findAll() {
        return userDao.findAll();
    }
}
```

接着新建spring-service.xml，如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="com.service"/>
</beans>
```

在applicationContext.xml中导入该配置文件

```xml
<import resource="classpath:spring-service.xml"/>
```

接着新建TestSpringService测试类

```java
import com.pojo.User;
import com.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class TestSpringService {
    @Autowired
    private UserService userService;

    @Test
    public void testUserService() {
        List<User> users = userService.findAll();
        for (User user: users) {
            System.out.println(user);
        }
    }
}
```

输出为

```java
User{userName='张三', age=18, sex='male'}
User{userName='李四', age=19, sex='male'}
```

Spring Service层整合成功。

## Spring整合Controller层

首先点击项目，右键选择Add Framework Support...，并选择Web Application

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/2020-03-02000314.png"/>
</center>


这时的项目就成为了一个Web项目，我们在web.xml中配置如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <servlet>
        <servlet-name>dispatch</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:applicationContext.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>dispatch</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <filter>
        <filter-name>encodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
    </filter>

    <filter-mapping>
        <filter-name>encodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

</web-app>
```

在resources下新建spring-mvc.xml，内容如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <mvc:annotation-driven/>
    <mvc:default-servlet-handler/>
    <context:component-scan base-package="com.controller"/>

    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
</beans>
```

并且在applicationContext.xml中导入该配置文件

```xml
<import resource="classpath:spring-mvc.xml"/>
```

在com.controller包下新建UserController类，如下

```java
package com.controller;

import com.pojo.User;
import com.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/users", produces = "text/html;charset=utf-8")
    public String getUsers() {
        List<User> users = userService.findAll();
        return users.toString();
    }
}
```

接着启动Tomcat(在启动Tomcat之前记得添加依赖的包)，在地址栏后输入`/users`

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/2020-03-02_00-25-30.png"/>
</center>

至此，SSM整合结束。