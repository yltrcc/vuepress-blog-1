---
title: SpringMVC入门
author: 熊滔
commentid: javaee:springmvc-start
---

本片文章是我记录学习Spring MVC的学习笔记，作为初学者，对于这个框架的理解可能并不深刻，所以这篇文章主要讲述的是Spring MVC框架的使用，所以对于有些内容为什么要这么做，这么做有什么好处，由于才疏学浅，却不是我能解释的，所以本篇文章以代码偏多，文字解释偏少。

<!--more-->

## Hello Spring MVC

先简单的的把Spring MVC用起来，然后在解释一下Spring MVC的用法。首先在pom.xml中导入需要的包

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.2.0.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>servlet-api</artifactId>
        <version>2.5</version>
    </dependency>
    <dependency>
        <groupId>javax.servlet.jsp</groupId>
        <artifactId>jsp-api</artifactId>
        <version>2.2</version>
    </dependency>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
        <version>1.2</version>
    </dependency>
</dependencies>
```

spring-webmvc就是我们需要的包，而junit不用说，是用来测试用的。Java底层对浏览器做出响应是基于Servlet，所以Spring MVC也是基于Servlet的，所以我们还导入了Servlet的包，以及对JSP的支持和JSTL语言的支持的包。

由于我们建立的只是一个普通的Maven工程，我们要对项目添加支持，使其成为一个Web项目，单击项目右键选择Add Framework Support...，如下

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200229235310.png"/>
</center>

接着勾选WebApplication，点击OK

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200229235625.png"/>
</center>

这时会在你的项目中为你生成一个web目录，如下

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200301000150.png"/>
</center>

这时我们配置web.xml如下

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
            <param-value>classpath:springmvc-config.xml</param-value>
        </init-param>
    </servlet>
    <servlet-mapping>
        <servlet-name>dispatch</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
    
</web-app>
```

我们知道JavaWeb的工作流程是根据浏览器的请求地址去找对应的Servlet去做处理，这里我们配置对所有的请求(`/`)都会使用Spring提供的DispatchServlet进行处理。具体的处理流程稍后会介绍，从上面的配置看出，DispatchServlet还需要一个配置文件地址的参数，这里我们写为了classpath:springmvc-config.xml，而这个文件还没有，所以我们在src/main/resources中新建springmvc-config.xml，内容如下

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
        <property name="prefix" value="WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

</beans>
```

我们在这个配置文件中对com.controller中的类开启了mvc注解支持。还配置了一个ServletHandler和ViewResolver，这两个东西与后面讲的Spring MVC执行流程有关，后面再说。

现在新建com.controller.HandleRequest.java，内容如下

```java
package com.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HandleRequest {
    
    @RequestMapping("/hello")
    public String sayHello() {
        return "Hello Spring MVC";
    }
}
```

该类的作用是当浏览器访问`/hello`时，会返回浏览器一个字符串"Hello Spring MVC"，现在使用tomcat服务器启动该项目，并且在地址栏后输入`/hello`，这时我们会得到一个错误如下

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200301004227.png"/>
</center>

这是因为我们没有在项目中加入所依赖的包，这时我们在IDEA中的左上角找到File并点击，选择Project Structure，接着在Project Structure中选择Artifacts

<img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200301110550.png"/>

这时选择你的项目，比如我的是mvc-hello，右键选择Put into Output Root

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/2020-03-01_11-39-48.png"/>
</center>

接下来重新启动Tomcat，然后在浏览器地址栏后输入`/hello`

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200301114644.png"/>
</center>

就可以看到Hello Spring MVC在浏览器上显示了出来。

## Spring MVC的执行流程

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200301130123.png"/>
</center>

上图演示了Spring MVC执行的流程，在这里稍作解释

1. 用户发送请求至前端控制器DispatcherServlet
2. DispatcherServlet收到请求调用处理器映射器HandlerMapping
3. 处理器映射器根据请求url找到具体的处理器，生成处理器执行链HandlerExecutionChain(包括处理器对象和处理器拦截器)一并返回给DispatcherServlet。
4. DispatcherServlet根据处理器Handler获取处理器适配器HandlerAdapter，执行HandlerAdapter处理一系列的操作，如：参数封装，数据格式转换，数据验证等操作
5. 执行处理器Handler(Controller，也叫页面控制器)
6. Handler执行完成返回ModelAndView
7. HandlerAdapter将Handler执行结果ModelAndView返回到DispatcherServlet
8. DispatcherServlet将ModelAndView传给ViewReslover视图解析器
9. ViewReslover解析后返回具体View
10. DispatcherServlet对View进行渲染视图(即将模型数据model填充至视图中)
11. DispatcherServlet响应用户

现在稍加解释上面牵涉到的组件：

1. DispatcherServlet：前端控制器，用户请求到达前端控制器，它就相当于MVC模式中的C，DispatcherServlet是整个流程控制的中心，由它调用其它组件处理用户的请求，DispatcherServlet的存在降低了组件之间的耦合性,系统扩展性提高
2. HandlerMapping：处理器映射器，HandlerMapping负责根据用户请求的url找到Handler即处理器，SpringMVC提供了不同的映射器实现不同的映射方式，根据一定的规则去查找,例如：xml配置方式，实现接口方式，注解方式等
3. Handler：处理器,Handler 是继DispatcherServlet前端控制器的后端控制器，在DispatcherServlet的控制下Handler对具体的用户请求进行处理。由于Handler涉及到具体的用户业务请求，所以一般情况需要程序员根据业务需求开发Handler
4. HandlAdapter：处理器适配器,通过HandlerAdapter对处理器进行执行，这是适配器模式的应用，通过扩展适配器可以对更多类型的处理器进行执行
5. ModelAndView是SpringMVC的封装对象，将Model和View封装在一起。
6. ViewResolver：视图解析器,ViewResolver负责将处理结果生成View视图，ViewResolver首先根据逻辑视图名解析成物理视图名即具体的页面地址，再生成View视图对象，最后对View进行渲染将处理结果通过页面展示给用户。
7. View:是SpringMVC的封装对象，是一个接口, SpringMVC框架提供了很多的View视图类型，包括：jspview，pdfview,jstlView、freemarkerView、pdfView等。一般情况下需要通过页面标签或页面模版技术将模型数据通过页面展示给用户，需要由程序员根据业务需求开发具体的页面。

## Spring MVC注解

### @Controller

@Controller注解表明了一个类是作为控制器的角色而存在的。Spring不要求你去继承任何控制器基类，也不要求你去实现Servlet的那套API。当然，如果你需要的话也可以去使用任何与Servlet相关的特性和设施。

@Controller注解可以认为是被标注类的原型(stereotype)，表明了这个类所承担的角色。分派器(DispatcherServlet)会扫描所有注解了@Controller的类，检测其中通过@RequestMapping注解配置的方法(详见下一小节)。

当然，你也可以不使用@Controller注解而显式地去定义被注解的bean，这点通过标准的Spring bean的定义方式，在dispather的上下文属性下配置即可做到。但是@Controller原型是可以被框架自动检测的，Spring支持classpath路径下组件类的自动检测，以及对已定义bean的自动注册。

### @RestController

这里说的是与@Controller，被@Controller注解的类，如果在方法中方法字符串，则会被视图解析器解析，即如下

```java
package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HandleRequest {

    @RequestMapping("/hello")
    public String sayHello() {
        return "hello";
    }
}
```

当访问`/hello`时，会执行sayHello方法，这时返回的hello会被视图解析器解析，视图解析器会根据在springmvc-config.xml中的配置进行拼接

```xml
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="WEB-INF/jsp/"/>
    <property name="suffix" value=".jsp"/>
</bean>
```

所以上面方法的hello会被拼接成WEB-INF/jsp/hello.jsp，接着会返回该jsp页面。

而使用@RestController注解，则不会经过视图解析器，而是会将该结果直接返回，就像在前一节演示的例子一样。因为最近流行前后端分离，所以后端不需要写页面了，只需要将前端请求的数据返回，而前端负责渲染展示数据，所以@RestController类用的还是比较多的。

### @RequestMapping

你可以使用@RequestMapping注解来将请求URL，如/appointments等，映射到整个类上或某个特定的处理器方法上。一般来说，类级别的注解负责将一个特定(或符合某种模式)的请求路径映射到一个控制器上，同时通过方法级别的注解来细化映射，即根据特定的HTTP请求方法（"GET" "POST"方法等）、HTTP请求中是否携带特定参数等条件，将请求映射到匹配的方法上。

现在来讲一下@RequestMapping中的属性，@RequestMapping的源码如下

```java
public @interface RequestMapping {
    String name() default "";

    @AliasFor("path")
    String[] value() default {};

    @AliasFor("value")
    String[] path() default {};

    RequestMethod[] method() default {};

    String[] params() default {};

    String[] headers() default {};

    String[] consumes() default {};

    String[] produces() default {};
}
```

- name, value, path：是用来设置匹配的url路径的
- method：指定请求的method类型, GET、POST、PUT、DELETE等
- consumes：指定处理请求的提交内容类型(Content-Type)，例如application/json, text/html
- produces：指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
- params：指定request中必须包含某些参数值时，才让该方法处理
- headers：指定request中必须包含某些指定的header值，才能让该方法处理请求

给个例子：

```java
@RequestMapping(value="/hello",
                method = RequestMethod.GET,
                params = "myParam=myValue",
                headers="Referer=www.baidu.com",
                consumes="application/json",
                produces="application/json")
```

除了可以使用method属性指定请求办法外，还可以使用注解：

- @GetMapping("/hello")
- @PostMapping("/hello")
- ......

这些注解与RequestMapping具有相同的属性，除了method属性。

### @RequestParam

该注解类型用于将指定的请求参数赋值给方法中的形参，那么@RequestParam注解有什么属性呢? 它有4种属性，下面将逐一介绍这四种属性：
- name属性：该属性的类型是String类型，它可以指定请求头绑定的名称
- value属性：该属性的类型是String类型，它可以设置是name属性的别名
- required属性：该属性的类型是boolean类型，它可以设置指定参数是否必须绑定
- defalutValue属性：该属性的类型是String类型，它可以设置如果没有传递参数可以使用默认值

```java
@RequestMapping(value="/hello")
public String hello(
	@RequestParam("loginname") String loginname,
	@RequestParam("password") String password) {
	
    return "hello";
}
```

### @PathVaribale

@PathVaribale注解，该注解类型可以非常方便的获得请求url中的动态参数。 @PathVaribale注解只支持一个属性value，类型String，表示绑定的名称，如果省略则默认绑定同名参数

```java
@RequestMapping(value="/pathVariableTest/{userId}")
public void pathVariableTest(@PathVaribale Integer userId)
```

### @CookieValue

绑定cookie的值到Controller方法参数

```java
@RequestMapping ( "/hello" )
public String testCookieValue( @CookieValue("hello") String cookieValue) {
   return "cookieValue" ;
}
```

### @RequestHeader

@RequestHeader注解，该注解类型用于将请求的头的信息区域数据映射到功能处理方法的参数上。那么@RequestHeader注解有什么属性呢? 它和@RequestParam注解一样，也有4种属性，分别如下

- name属性：该属性的类型是String类型，它可以指定请求头绑定的名称
- value属性：该属性的类型是String类型，它可以设置是name属性的别名
- required属性：该属性的类型是boolean类型，它可以设置指定参数是否必须绑定
- defalutValue属性：该属性的类型是String类型，它可以设置如果没有传递参数可以使用默认值

```java
@RequestMapping(value="/requestHeaderTest")
public void requestHeaderTest(
	@RequestHeader("User-Agent") String userAgent,
	@RequestHeader(value="Accept") String[] accepts) {
}
```

### @RequestBody

@RequestBody注解是将HTTP请求正文插入方法中

```java
@RequestMapping(value = "/login")
public String login(@RequestBody Person person) {

	return "..."; 
}
```

@RequestBody注解常用来处理Content-type不是默认的application/x-www-form-urlcoded编码的内容，比如说：application/json或者是application/xml等。一般情况下来说常用其来处理application/json类型。

对于前端使用而言，form表单的enctype属性为编码方式，常用有两种：application/x-www-form-urlencoded和multipart/form-data，默认为application/x-www-form-urlencoded，所以在前端传输数据时，需要将Content-type显示指定为application/json。

**总结：**

- ReuqestBody主要是处理json串格式的请求参数，要求使用方指定header Content-type:application/json
- RequestBody通常要求调用方使用post请求


### @ResponseBody

@ResponseBody注解的作用是将Controller的方法返回的对象通过适当的转换器转换为指定的格式之后，写入到response对象的body区，通常用来返回JSON数据或者是XML数据，需要注意的呢，在使用此注解之后不会再走视图处理器，而是直接将数据写入到输入流中，它的效果等同于通过response对象输出指定格式的数据。

```java
@RequestMapping("/login")
@ResponseBody
public User login(User user){
    //User字段：userName pwd
    //那么在前台接收到的数据为：'{"userName":"xxx","pwd":"xxx"}'
　　return user;
}

//效果等同于如下代码：
@RequestMapping("/login")
public void login(User user, HttpServletResponse response){
　　　response.getWriter.write(JSONObject.fromObject(user).toString());
    }
}
```

## 参考资料

- [SpringMVC执行流程及工作原理](https://www.jianshu.com/p/8a20c547e245)
- [RequestMapping 属性解释](https://wuyujia.github.io/2017/01/18/requestMapping/)
- [Spring之RequestBody的使用姿势小结](https://juejin.im/post/5b5efff0e51d45198469acea#heading-0)
- [@responseBody注解的使用](https://www.jianshu.com/p/1233b22738d8)

