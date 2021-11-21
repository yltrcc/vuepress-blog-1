---
title: SpringBoot入门
author: 熊滔
commentid: javaee:springboot-start
---

本篇文章需要有 `Spring` 的使用经验，在本篇文章中，对于 `Spring` 的基本概念如 `IOC` `DI` `AOP` 不会进行介绍，以及对于在 `Spring` 中的常用注解，如 `@Component` `@Autowired` `@Bean` 等等注解默认你已经掌握，否则学习本篇文章会比较困难。

如果使用过 `Spring` 的话，我们一般要写 `xml` 配置文件，或者使用 `@Configuration` 注解来配置 `Spring`，这个过程非常的惹人讨厌，给我们带来很大的负担，比如对于我来说，`Spring` 的 `xml` 配置文件的头部我就记不下来，每次都要从官网复制或者从自己的博客笔记中复制，这种不能完全掌握的感觉我觉得很糟糕。

`Spring Boot` 的出现，使得我们不需要写这种繁琐的配置文件，它的优点就是约定大于配置，所谓约定，即默认使用大家一致认可的配置，而程序员只需要配置不符合约定部分，所以其实 `Spring Boot` 可以是零配置的，在下面的入门小节我们将看到不编写任何的配置文件搭建一个 `Web` 服务。

## 入门

我们在这个小节中快速的搭建一个 `Spring Boot` 项目，有两种方法

1. 在 [Spring 官网](https://start.spring.io/) 在线创建一个项目

   ![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200901171038.png)

   上面的选项还是很容易看懂的，我们使用 `Maven` 来管理项目依赖，使用的语言是 `Java`，使用的版本是 `2.3.3`，以及项目的一些信息。因为我们需要搭建一个 `Web` 服务，所以还需要 `web` 的依赖，我们点击右上角的 `ADD DEPENDENCIES`

   <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/20200901171605.png" width="60%"/>

   我们选择 `Spring Web` 这个依赖，选择好以后，我们点击 `GENERATE` 生成一个 `zip` 文件，我们下载下来

   ![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200901171808.png)

   我们将它解压，然后使用 `IDE`，比如我使用的是 `IDEA` 去打开该文件夹

   <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/20200901172257.png" width="50%">

   然后就可以快乐的写程序了。

2. 使用 `IDEA` 来创建一个 `Spring Boot` 项目

   首先打开 `IDEA`，新建一个 `Project`

   <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/20200901172606.png" width="80%">

   然后我们选择 `Spring Initializr`

   ![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200901172726.png)

   观察右侧的 `Default` 所对应的 `URL`，其实 `IDEA` 也是在 `Spring` 官网来生成一个 `Spring Boot` 项目的，不过在 `IDEA` 中直接创建 `Spring Boot` 方便了很多。

   点击 `Next`，接着我们就要设置项目的一些信息，这些项目信息的选项同我们在官网看到的选项是一样的

   ![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200901173123.png)

   配置好项目信息以后，我们点击 `Next`，这个页面是来添加依赖的

   ![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200901173243.png)

   我们需要添加 `Web` 依赖，我们点击左侧的 `Web` 选项，接着勾选 `Spring Web`，如下

   ![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200901173425.png)

   点击 `Next`，来到最后一项，设置项目的名称

   ![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200901173549.png)

   点击 `FINISH`，完成项目的创建，可以愉快的写代码了。

接下来我们就来看生成的 `Spring Boot` 项目的文件结构，如下

<img src="https://gitee.com/lastknightcoder/blogimage/raw/master/20200901174453.png" alt="image-20200901174452937" style="zoom:50%;" />

我们不去看 `.gitignore` 等等配置文件，我们关注的是 `src` 文件夹的结构

```
src
	main
		java
		resources
			static
			templates
			application.properties
	test
		java
```

很明显这是一个典型的 `Maven` 项目的结构。我们的代码是放在 `main/java` 目录下的，`main/resources` 文件夹放的是资源文件，在该文件夹下有两个文件夹和一个文件

| 文件(夹)                 | 作用                                       |
| ------------------------ | ------------------------------------------ |
| `static`                 | 放置静态资源文件，如 `js` 文件，`css` 文件 |
| `templates`              | 放置模板文件，在模板引擎小节讲述           |
| `application.properties` | `SpringBoot` 的配置文件                    |

接下来我们来到 `main/java` 目录下，首先里面有一个包，如 `com.xt.start`，这是你在生成一个 `Spring Boot` 项目时填写好的，在这个包下有一个 `Java` 类 `StartApplication`，内容如下

```java
package com.xt.start;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StartApplication {

    public static void main(String[] args) {
        SpringApplication.run(StartApplication.class, args);
    }

}
```

这个类就是我们 `Spring Boot` 的启动类，我们运行这个类，就会将这个 `Spring Boot` 项目启动起来

![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200902124316.png)

这个项目启动在 `8080` 端口，我们可以通过 `localhost:8080` 访问该项目

![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200902124454.png)

因为我们没有对访问的路径做处理，所以只会得到上面的错误页面。

> 读到这里，你可能会疑惑，以往我们都是将项目打包，然后放在 `tomcat` 放置项目的路径下，然后启动 `tomcat` 访问项目，怎么我们没有配置 `tomcat` 就可以启动一个服务呢? 这是因为 `Spring Boot` 内部包含了 `tomcat`，如果仔细观察上面的日志，可以观察到 `Spring Boot` 也是使用了 `tomcat` 的。

接着我们来对一些请求路径做处理，我们需要注意的是，`Spring Boot` 会默认扫描 `StartApplication`(即启动类)所在的包及其子包下的类，所以我们的类都要写在 `com.xt.start` 包下，这样我们的类才有可能会被添加到 `IOC` 容器中。

我们在 `com.xt.start` 下新建一个包 `controller`，并在此包下新建一个类 `HelloController`

```java
package com.xt.start.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {
    @GetMapping("/")
    @ResponseBody
    public String hello() {
        return "Hello World!";
    }
}
```

我假设你有使用 `Spring MVC` 的基础，所以上面的注解你是看的懂得。当我们访问项目的根目录时，会返回一个字符串`Hello World!`。重新启动项目，你可以直接在浏览器地址栏输入 `localhost:8080/` 直接访问，在页面会呈现一个字符串 `Hello World!`，在这里我使用 `PostMan` 来访问该项目，如下

![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200902125820.png)

我们没有编写任何的配置文件，就创建一个 `Web` 项目，所以说 `Spring Boot` 大大的解放了我们的生产力。

> 关于 `JSP`：
>
> 在以往都是前端写好 `html` 页面，然后后端拿去修改为 `JSP` 页面，根据前端发送的请求返回相应的经过渲染的页面，这种开发方式需要前端写好页面，后端才能进行修改，前端与后端的开发并不是并行的，效率不能够最大化；并且像 `JSP` 前后端代码混杂在一起的情况，职责不清晰，代码混乱，没有限制。
>
> 现在的开发一般都是前后端分离了，前端只需要向后端请求所需要的数据就可以，而后端只需要发送数据即可，只要后端与前端开发之间规定好请求的接口，以及数据的格式，二者可以同时并行开发，效率可以得到最大化；并且此时前后端的职责更加的清晰，前端负责维护好前端页面，后端维护好后端的逻辑，减少了二者之间的协作，也就意味着可以有更高的开发效率。
>
> 所以在本篇中不会介绍有关使用模板引擎开发的内容，例如 `Thymeleaf`。

## 配置文件

虽然我们说 `Spring Boot` 不需要配置文件，但是我们要配置一些特有的信息时我们还是需要写配置文件的，比如配置数据库的用户和密码等等信息。

在上面我们提到过，`application.properties` 文件是项目的配置文件，我们使用 `properties` 文件的格式写配置信息，比写 `XML` 配置文件好多了，如我们配置项目的端口号为 `8081`

```properties
server.port=8081
```

重新启动项目

![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200902163430.png)

端口号已经变为了 `8081`。

### YAML配置文件

在之前我们使用 `properties`，但是使用 `properties` 配置文件没有层级关系，如果上面配置端口换成使用 `XML` 配置，那么可能是如下的形式

```xml
<server>
	<port>8081</port>
</server>
```

使用 `XML` 配置文件虽然结构层次清晰，但是 `XML` 文件冗余信息太多，表达相同的信息需要更大的空间，以及还有那讨人厌的命名空间。所以有没有一种配置文件，能简单的表示信息，并且还能够有层级关系，那就是本小节所要讲的 `YAML` 配置文件。

如果使用 `YAML` 来配置上面的端口号，它是这样的

```yaml
server:
	port: 8081
```

通过缩进可以清晰的表示层级关系，并且没有冗余的信息，在 `:` 的左边表示要配置的选项，在 `:` 的右边表示配置的具体值，需要注意的是，**`:` 与值之间需要跟一个空格，**如 `port: 8081`。

#### YAML表示数组和列表

在 `YAML` 配置文件中如何表示一个数组，有两种方法，第一种是行内表示，如

```yaml
scores: [97, 98, 99]
```

或者使用行间的表示，在每一项的前面加上 `-`，如下

```yaml
scores:
  - 97
  - 98
  - 99
```

#### YAML表示对象

假设我们使用 `YAML` 配置一个 `Person` 对象，它包含 `name` `age` `gender` 属性，那么我们可以使用下面的方式进行配置

```yaml
person: 
  name: Bob
  age: 21"
  gender: male
```

需要注意的是，我们在配置字符串类型的值时，并不需要加上 `"`。我们还可以通过行内的方式配置对象，如下

```yaml
person: {name: Bob, age: 21,gender: male}
```

#### YAML引用

当我们想引用已经配置过的值时，我们可以通过 `&` 设定锚点，然后通过 `*` 进行引用，例如

```yaml
default: &default
  username: root
  password: root

mysql:
  database: mysql
  <<: *default
```

首先我们通过 `&default` 定义了一个锚点，然后我们在 `mysql` 通过 `*default` 引用了该锚点，`<<` 表示合并到此处，所以上面的配置等效于

```yaml
default: &default
  username: root
  password: root

mysql:
  database: mysql
  username: root
  password: root
```

### 配置文件的位置

配置文件默认是放在类路径下的，即 `application.properties` 所在的位置，除此以外，还可以放在另外三个位置，这三个位置下的 `application.properties` 或 `application.yml` 都会被作为配置文件

- `classpath:/`
- `classpath:/config`
- `file:/`
- `file:/config/`

下面这张图注明了上面的四个位置

<img src="https://gitee.com/lastknightcoder/blogimage/raw/master/20200902215815.png" alt="image-20200902215815215" style="zoom:50%;" />

既然四个位置都可以配置，那么当这四个位置发生冲突时，以谁的为准呢? 所以这四个位置是有优先级的关系的，如下

```
file:/config/ > file:/ > classpath:/config/ > classpath:/(默认)
```


## 数据访问

在本小节中来讲如何使用 `SpringBoot` 访问数据库，在此之前，我们需要先在数据库中创建一个表，相关 `sql` 语句如下

```sql
create database test;
use test;
create table account
(
	id int auto_increment,
	name varchar(20) not null,
	money double default 0 not null,
	constraint account_pk
		primary key (id)
);

insert into account(name, money) values ('Alice', 2000.0), ('Bob', 3000.0)
```

上面我们创建了数据库 `test`，并在下面新建了一个 `account` 表，执行完上面的语句后，`account` 表的内容如下

<img src="https://gitee.com/lastknightcoder/blogimage/raw/master/20200903165618.png" alt="image-20200903165618730" style="zoom:50%;" />

### JDBC

配置好数据库的内容以后，我们就新建一个项目，新建一个项目的步骤在文章的开头，不同的是，我们在添加依赖的部分需要添加 `JDBC API` 以及 `MySQL Driver`，如下

![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200903170925.png)

接着我们在配置文件中配置数据库的相关配置，如下

```yaml
spring:
  datasource:
    username: root
    password: root
    url: jdbc:mysql:///test
    driver-class-name: com.mysql.jdbc.Driver
```

接着我们在启动类所在包下新建包 `controller` 并新建类 `HelloController`

```java
package com.xt.jdbc.controller;

import com.xt.jdbc.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HelloController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/account/{id}")
    public Map getAccountById(@PathVariable("id") Integer id) {
         Map map = jdbcTemplate.queryForMap("select * from account where id = ?", id);
         return map;
    }
}

```

![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200903171946.png)

### MyBatis

新建一个工程，在添加依赖的部分，添加如下依赖

![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200903172158.png)

在 `application.yml` 配置数据源，同上 `JDBC`。接着我们新建一个包 `entity` 放置与表 `account` 对象的实体类，如下

```java
package com.example.mybatis.entity;

public class Account {
    private Integer id;
    private String name;
    private Double money;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", money=" + money +
                '}';
    }
}
```

接着新建包 `mapper`，该包下放置的有关 `MyBatis` 操作数据库的接口，我们新建 `AccountMapper` 如下

```java
package com.example.mybatis.mapper;

import com.example.mybatis.entity.Account;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface AccountMapper {
    @Select("select * from account where id = #{id}")
    public Account findById(Integer id);
    
    @Update("update account set money = #{money} where id = #{id}")
    public void updateById(Integer id, Double money);
}
```

我们使用 `@Mapper` 表示这是一个 `MyBatis` 的 `Mapper` 类，接着我们新建一个 `controller` 以及一个类，如下

```java
package com.example.mybatis.controller;

import com.example.mybatis.entity.Account;
import com.example.mybatis.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    
    @Autowired
    private AccountMapper accountMapper;
    
    @GetMapping("/account/{id}")
    public Account getAccountById(@PathVariable Integer id) {
        return accountMapper.findById(id);
    }
    
    @PostMapping("/account/{id}/{money}")
    public void updateMoneyById(@PathVariable("id") Integer id, @PathVariable("money") Double money) {
        accountMapper.updateById(id, money);
    }
}
```

首先我们发现一个请求查询 `id` 为 `2` 的用户信息

![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200903173630.png)

接着我们发起请求修改 `id` 为 `2` 的账户的 `money`

![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200903173822.png)

最后我们再次查询 `id` 为 `2` 的账户，观察数据是否已经修改

![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200903173945.png)

### JPA

新建一个项目，并且添加如下依赖

![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200903174146.png)

使用 `JPA` 操作数据库，它会根据我们创建的实体类来自动的生成对应的表，不需要我们写创建表的 `sql` 语句，另外它提供了简单的 `sql` 语句，对于简单的查询，更新我们不需要写任何的 `sql` 语句，所以使用 `JPA` 操作数据库我们只需要编写实体类即可。

在 `application.yml` 中编写配置如下

```yaml
spring:
  datasource:
    username: root
    password: root
    url: jdbc:mysql:///test
    driver-class-name: com.mysql.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

在这里我们多添加了两项配置，其中 `show-sql` 设置为 `true` 表示在控制台显示 `sql` 语句，没什么说的，`ddl-auto` 的值设置为 `update`，我们讲一下，`ddl-auto` 有四种取值

| 取值          | 功能                                                         |
| ------------- | ------------------------------------------------------------ |
| `create`      | 会根据实体类创建表，如果数据库已有表，则会删除               |
| `create-drop` | 在 `create` 的基础上，在应用关闭前删除表                     |
| `update`      | 如果数据库中已有表，不会删除已有的表，在已有的表上进行更新操作 |
| `validate`    | 会对数据库中已有的表进行验证，是否与实体类规定的结构相符     |

前面两个通常会导致数据消失，所以我们一般使用的是 `update` 和 `validate`，在这里我们使用了 `update`。接着我们新建一个实体类，`JPA` 会根据该实体类创建表

```java
package com.example.jpa.entity;

import javax.persistence.*;

@Entity
@Table(name = "account")
public class Account {
    @Id  // 设置主键
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 主键自增长
    private Integer id;

    @Column(name = "name") // 设置列名
    private String name;

    @Column(name = "money")
    private Double money;
}

```

我们使用 `@Entity` 表示这是一个实体类，使用 `@Table` 设置了该实体类对应的表名，使用 `@Id` 设置该属性为主键，使用 `@GeneratedValue(strategy = GenerationType.IDENTITY)` 来设置主键自增，使用 `@Column` 设置属性对于的列名。

接着我们新建包 `repository`，并且在该包下新建接口 `AccountRepository`

```java
package com.example.jpa.repository;

import com.example.jpa.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer> {
}
```

我们可以使用此接口来操作数据库。

接着我们新建 `controller` 包，并新建类如下

```java
package com.example.jpa.controller;

import com.example.jpa.entity.Account;
import com.example.jpa.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {
    @Autowired
    private AccountRepository accountRepository;
    
    @PostMapping("/account/{id}/{name}/{money}")
    public List<Account> saveAccount(Account account) {
        accountRepository.save(account);
        return accountRepository.findAll();
    }
}
```

上面的程序会在接到请求以后会自动将参数封装为一个 `Account` 对象，然后存储到数据库中，接着返回数据库中的所有 `Account` 对象

![](https://gitee.com/lastknightcoder/blogimage/raw/master/20200903190939.png)



