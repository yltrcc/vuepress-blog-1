---
title: MyBatis学习入门
author: 熊滔
commentid: javaee:mybatis
---

## MyBatis入门

新建Maven工程，在其中引入所需要的包，如mybatis, mysql-connector-java, junit。配置pom.xml如下

<!--more-->

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>xt.mybatis</groupId>
    <artifactId>simple</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.3.0</version>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.38</version>
        </dependency>
    </dependencies>


</project>
```

在MySQL中新建一个mybatis的库

```sql
CREATE DATABASE mybatis;
```

然后使用该数据库并建一个book表

```sql
USE mybatis;
CREATE TABLE BOOK(
ID INT AUTO_INCREMENT PRIMARY KEY,
NAME VARCHAR(20),
NUMBER int );
insert into BOOK(NAME,NUMBER) VALUES
('Java程序设计',10),
('数据结构',10),
('设计模式',10);
```

如果出现由于中文不能插入的问题，输入以下语句然后插入数据

```sql
alter table mybatis change name name varchar(20) character set utf8;
```

在src/java中新建包com.xt.entity，新建Book实体类，实体类是用来保存数据库中查询到的结果，在这里实体类的属性要保持和数据库中的列名一致(后续会讲解不一致会出现什么以及解决办法)

```java
package com.xt.entity;

public class Book {
    private int id;
    private String name;
    private int number;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", number=" + number +
                '}';
    }

}
```

在src/java中新建包com.xt.dao，新建一个接口BookDao

```java
package com.xt.dao;

import com.xt.entity.Book;

import java.util.List;

public interface BookDao {
    public List<Book> findAll();
}
```

在src/resources下新建mybatis-config.xml文件配置如下

```java
<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis"/>
                <property name="username" value="root"/>
                <property name="password" value="root"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <mapper resource="com/xt/dao/bookDao.xml"/>
    </mappers>
</configuration>
```

mybatis-config.xml是mybatis的配置文件，我们在其中配置数据源，连接数据库的驱动，连接哪个数据库，以及用户和密码。

在src/resources下新建目录结构com/xt/dao，在dao文件夹中新建BookDao.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.xt.mapper.BookMapper">
    <select id="findAll" resultType="com.xt.entity.Book">
        select * from book
    </select>
</mapper>
```

在test/java下新建类MyBatisTest

```java
import com.xt.mapper.BookDao;
import com.xt.entity.Book;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.*;
import java.util.List;

public class BookMapperTest {
    @Test
    public void testFindAll() {
        SqlSession sqlSession = null;
        SqlSessionFactory sqlSessionFactory = null;
        InputStream is = null;
        try {
            String resource = "mybatis-config.xml";
            is = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
            sqlSession = sqlSessionFactory.openSession();

            BookMapper bookMapper = sqlSession.getMapper(BookMapper.class);

            List<Book> list = bookMapper.findAll();
            System.out.println(list);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                is.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            if (sqlSession != null) {
                sqlSession.close();
            }
        }
    }
}
```

输出为

```java
[Book{id=1, name='Java程序设计', number=10}, Book{id=2, name='数据结构', number=10}, Book{id=3, name='设计模式', number=10}]
```

如果能够顺利输出以上数据，说明配置没有问题了。

## MyBatis的CRUD

### 保存操作

在BookDao中添加方法saveBook(Book book)

```java
void saveBook(Book book);
```

然后在BookDao.xml中添加下面的语句

```sql
<insert id="saveBook" parameterType="com.xt.entity.Book">
      insert into book(name, number) values (#{Book.name}, #{Book.number});
</insert>
```

上面的parameterType说明该方法传入的参数类型，需要写全类名。我们在下面一行sql语句中使用了传入Book对象的属性

```sql
#{Book.name}, #{Book.number}
```

由于已经指定了传入的是Book类，所以Book.可以不写，即

```sql
<insert id="saveBook" parameterType="com.xt.entity.Book">
      insert into book(name, number) values (#{name}, #{number});
</insert>
```

接在在test/java下的测试类MybatisTest.java，加入下面的代码

```java
private SqlSession sqlSession;
private BookDao bookDao;

@Before
public void init() throws Exception{
    SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
    sqlSession = sqlSessionFactory.openSession();
    bookDao = sqlSession.getMapper(BookDao.class);
}

@After
public void destroy() {
    sqlSession.close();
}

@Test
public void testSaveBook() {
    Book book = new Book();
    book.setName("C++");
    book.setNumber(5);
    bookDao.saveBook(book);
}
```

对以上的程序做几点声明：

- init()添加了@Before注解，表示该方法会在被@Test注解的方法执行前执行；destroy()添加了@After注解，表示在被@Test注解的方法后执行
- init()中是一些初始化的代码，因为SqlSession和BookDao对象会在@Test注解的方法中用到，为了不每次都初始化，我们把SqlSession和BookDao抽离出来作为成员变量，然后在init()方法中初始化；destroy()中是释放资源的代码

在执行前我们先看数据库中的数据，以观察该保存操作是否执行成功

```sql
+----+--------------+--------+
| ID | name         | NUMBER |
+----+--------------+--------+
|  1 | Java程序设计 |     10 |
|  2 | 数据结构     |     10 |
|  3 | 设计模式     |     10 |
+----+--------------+--------+
```

执行程序之后，数据库中的数据为

```sql
+----+--------------+--------+
| ID | name         | NUMBER |
+----+--------------+--------+
|  1 | Java程序设计 |     10 |
|  2 | 数据结构     |     10 |
|  3 | 设计模式     |     10 |
+----+--------------+--------+
```

发现数据库中的数据并没有发现改变，难道是程序写错了。其实是因为autocommit被设置为false了，所以进行回滚操作了，我们在destroy中加入下面的语句

```java
@After
public void destroy() {
    sqlSession.commit();
    sqlSession.close();
}
```

再次执行程序观察数据库中的数据

```sql
+----+--------------+--------+
| ID | name         | NUMBER |
+----+--------------+--------+
|  1 | Java程序设计 |     10 |
|  2 | 数据结构     |     10 |
|  3 | 设计模式     |     10 |
|  5 | C++          |      5 |
+----+--------------+--------+
```

我们保存对象时并没有设置id的值，因为id是自增长的。如果我们在保存数据后希望获得自增长的id值，我们可以修改BookDao.xml为

```sql
<insert id="saveBook" parameterType="com.xt.entity.Book">
  <selectKey keyProperty="id" keyColumn="id" resultType="int" order="AFTER">
      select last_insert_id();
  </selectKey>
  insert into book(name, number) values (#{name}, #{number});
</insert>
```

接着修改测试类中的方法

```java
@Test
public void testSaveBook() {
    Book book = new Book();
    book.setName("C++");
    book.setNumber(5);
    System.out.println("更新前的Book对象");
    System.out.println(book);
    bookDao.saveBook(book);
    System.out.println("更新后的Book对象");
    System.out.println(book);
}
```

运行结果为

```java
更新前的Book对象
Book{id=null, name='C++', number=5}
更新后的Book对象
Book{id=6, name='C++', number=5}
```

可见已经获得了自增长的id。

### 更新操作

在BookDao中添加updateBook(Book book)方法

```java
void updateBook(Book book);
```

然后在BookDao.xml中添加如下

```sql
<update id="updateBook" parameterType="com.xt.entity.Book">
    update book set name = #{name}, number = #{number} where id = #{id};
</update>
```

现在在测试类中添加测试方法

```java
@Test
public void testUpdateBook() {
    Book book = new Book();
    book.setId(5);
    book.setName("PHP");
    book.setNumber(20);
    bookDao.updateBook(book);
}
```

执行并观察数据库中的数据

```sql
+----+--------------+--------+
| ID | name         | NUMBER |
+----+--------------+--------+
|  1 | Java程序设计 |     10 |
|  2 | 数据结构     |     10 |
|  3 | 设计模式     |     10 |
|  5 | PHP          |     20 |
+----+--------------+--------+
```

### 删除操作

在BookDao中添加deleteBook(Integer id)方法

```java
void deleteBook(Integer id);
```

在BookDao.xml中添加如下

```sql
<delete id="deleteBook" parameterType="int">
    delete from book where id = #{id};
</delete>
```

这里的parameterType写为了int，其实这里可以写为INT,integer,Integer均可，在sql语句中使用了#{id}，其实这里可以随便写，如#{uid},#{bookId}，因为只传入一个值，不管写什么都会被认为是这个传入的值。现在在测试类中添加测试方法

```java
@Test
public void testDeleteBook() {
    bookDao.deleteBook(5);
}
```

执行并且查看数据库中的数据如下

```sql
+----+--------------+--------+
| ID | name         | NUMBER |
+----+--------------+--------+
|  1 | Java程序设计 |     10 |
|  2 | 数据结构     |     10 |
|  3 | 设计模式     |     10 |
+----+--------------+--------+
```

### 查询操作

#### 查询一个

在BookDao中添加findById(Integer id)方法

```java
Book findById(Integer id);
```

在BookDao.xml中添加如下

```sql
<select id="findById" parameterType="int" resultType="com.xt.entity.Book">
    select * from book where id = #{id};
</select>
```

上面的resultType声明了返回的数据类型，接下来在测试了中添加测试方法

```java
@Test
public void testFindById() {
    Book book = bookDao.findById(1);
    System.out.println(book);
}
```

输出结果为

```java
Book{id=1, name='Java程序设计', number=10}
```

#### 模糊查询

在BookDao中添加findByName(String name)方法

```java
List<Book> findByName(String name);
```

在BookDao.xml中添加如下

```sql
<select id="findByName" parameterType="string" resultType="com.xt.entity.Book">
    select * from book where name like #{name}
</select>
```

接下来在测试了中添加测试方法

```java
@Test
public void testFindByName() {
    List<Book> list = bookDao.findByName("%设计%");
    for(Book book:list) {
        System.out.println(book);
    }
}
```

输出为

```java
Book{id=1, name='Java程序设计', number=10}
Book{id=3, name='设计模式', number=10}
```

当初我在使用中文模糊查询时查询不出来，使用英文可以，去网上查了一下，解决办法是是在my.ini文件的最后加上

```ini
character-set-server = utf8 
collation-server = utf8_general_ci
```

然后重启mysql服务器。具体可以参考这个链接[中文模糊查询](https://blog.csdn.net/tjzhaomengyi/article/details/52924729)。

#### 查询一个值

比如我想查询数据库中有多少条数据，在BookDao中添加findTotal()方法

```java
int findTotal();
```

在BookDao.xml中添加如下

```sql
<select id="findTotal" resultType="int">
    select count(id) from book;
</select>
```

接下来在测试了中添加测试方法

```java
@Test
public void testFindTotal() {
    int numbers = bookDao.findTotal();
    System.out.println(numbers);
}
```

输出为

```java
3
```

## resultMap

上面我们要求实体类Book的属性要与数据库中类的列名相同，如果列名不同呢? 我们修改Book的实体类

```java
package com.xt.entity;

import java.io.Serializable;

public class Book implements Serializable {
    private Integer bookId;
    private String bookName;
    private int bookNumber;

    //省略getter和setter以及toString方法
}
```

现在修改测试类中的Setxxx方法，以及BookDao.xml中的#{Xxx}，如修改#{name}为#{bookName}，接着运行findAll的测试方法，得到

```java
null
null
null
null
```

可见数据没有封装。这个时候有两种解决办法

- 起别名
- resultMap

先介绍起别名，我们修改findAll的sql语句为

```sql
<select id="findAll" resultType="com.xt.entity.Book">
    select id bookId, name bookName, number bookNumber from book
</select>
```

接着运行findAll的测试方法，结果为

```java
Book{bookId=1, bookName='Java程序设计', bookNumber=10}
Book{bookId=2, bookName='数据结构', bookNumber=10}
Book{bookId=3, bookName='设计模式', bookNumber=10}
Book{bookId=6, bookName='C++', bookNumber=5}
```

可见数据封装好了。这种方法执行效率很高，但是所有的select语句都需要起别名，这里介绍resultMap，只要将实体类的属性名与数据库列名对应好，下面只需要引用即可，只需要写一次，在

```xml
<mapper namespace="com.xt.dao.BookDao">
    <!--id是resultMap唯一标识，方便下面引用 type是要对应的实体类名称-->
    <resultMap id="bookMap" type="com.xt.entity.Book">
        <!--主键的对应规则 property是实体类的属性名 column是数据库的列名-->
        <id property="bookId" column="id"></id>
        <result property="bookName" column="name"></result>
        <result property="bookNumber" column="number"></result>
    </resultMap>

    <!--这里就不需要些resultType了，直接引用上面写的resultMap 下面同理-->
    <select id="findAll" resultMap="bookMap">
        select * from book
    </select>

    <select id="findById" parameterType="int" resultMap="bookMap">
        select * from book where id = #{id};
    </select>

    <select id="findByName" parameterType="string" resultMap="bookMap">
        select * from book where name like #{bookName}
    </select>
    
    ... ...
</mapper>
```

再次运行findAll的测试方法，输出为

```java
Book{bookId=1, bookName='Java程序设计', bookNumber=10}
Book{bookId=2, bookName='数据结构', bookNumber=10}
Book{bookId=3, bookName='设计模式', bookNumber=10}
Book{bookId=6, bookName='C++', bookNumber=5}
```

## 动态SQL

所谓的动态SQL指的是SQL语句不是不变的，比如根据是否传入age以决定是否加入age验证项，下面介绍三种动态SQL。

加入有下面User表

```sql
+-----------+------+
| user_name | age  |
+-----------+------+
| 张三      |   18 |
| 李四      |   19 |
+-----------+------+
```

实体类以及UserDao接口就不演示了。

### if

首先在UserDao中创建下面的方法

```java
List<User> findByCondition(User user);
```

该方法根据传入的User对象去查询，主要是根据该User对象所包含的userName和age去查询，但是这个User对象不一定设置了这两个属性，如

```java
User user = new User();
user.setAge(18);
userDao.findByCondition(user);
```

上面的Java代码只设置了age的值，这意味着我们在userDao.xml中的select语句不能写成这样

```sql
select user_name userName, age from user where user_name = #{userName} and age = #{age}
```

假设如果userName没有设置的话，那么where后面的结果永远是false，意味着查不到结果，而我们希望的是，如果存在什么，则根据什么是查，比如如果不存在userName，存在age，则相应的SQL语句应该是

```sql
select user_name userName, age from user where age = #{age}
```

如果存在userName而不存在age，则只根据userName查，如果都不存在，则得到所有的User，即

```sql
select user_name userName, age from user
```

这个时候仅仅靠我们上面的手段是得不到的，因为这时的SQL语句是动态的。明显，我们需要对userName和age进行判断，以决定是否加入到SQL语句中，而判断使用的就是if。满足上面要求的SQL语句如下

```sql
<select id="findByCondition" parameterType="com.xt.domain.User" resultType="com.xt.domain.User">
    select user_name userName, age from user where 1 = 1
    <if test="userName != null">
        and user_name = #{userName}
    </if>
    <if test="age != null">
        and age = #{age}
    </if>
</select>
```

上面的if标签就是对User对象中的属性进行判断，判断语句要写在if标签的test属性中，如果为真，则if标签包含的内容则会添加到SQL语句后，否则不会添加。

### where

大家注意上面的SQL语句中有

```sql
where 1 = 1
```

那么为什么要加上1 = 1呢? 假设如果不加1 = 1，并且传过来的User对象的userName和age都为null，那么最后的SQL语句是什么样子?

```sql
select user_name userName, age from user where
```

这明显是一个错误的SQL语句，但是如果加上1 = 1，即使userName和age都为null，SQL也是正确的SQL语句

```sql
select user_name userName, age from user where 1 = 1
```

但是这样未免有点hack的意味，像是一种奇淫技巧，那mybatis有没有提供比较好的写法，答案就是where标签了，现在我们将上面的sql语句改为

```sql
select user_name userName, age from user
<where>
    <if test="userName != null">
        and user_name = #{userName}
    </if>
    <if test="age != null">
        and age = #{age}
    </if>
</where>
```

我们将所有的if标签都放到了where标签里面，如果所有的if都不满足的话，那么在SQL语句中就不会出现where，如果if至少有一个成立的话，则会去掉第一个成立if标签中包含的and。假设该User对象包含userName不包含age，则最后的SQL语句是

```sql
select user_name userName, age from user where user_name = #{userName}
```

### forEach

现在有一种的新的情况，如果传过来的参数是一个集合或者数组，那怎么处理呢? 在UserDao接口中添加下面的方法

```java
List<User> findByAges(List<Integer> ages);
```

该方法会接收一个List集合，我们的要求是去查询用户年龄在ages集合中的用户，相应的SQL语句如下

```sql
<select id="findByAges" resultType="com.xt.domain.User" parameterType="java.util.List">
    select user_name userName, age from user
    <where>
        <if test="list != null">
            <foreach collection="list" item="age" open="and age in(" close=")" separator=",">
                #{age}
            </foreach>
        </if>
    </where>
</select>
```

上面的where和if标签想必不用再解释了，重点是forEach标签。forEach的作用就是遍历集合创建一个SQL语句。forEach中的collection标签的值就是传过来的list集合，item就是集合中的元素，forEach会遍历该集合拿到这些item，open是指创建的SQL语句以什么开头，close是以什么结尾，而separator是指分隔符是什么，而forEach中包含的内容即是分隔符分隔的一个个元素。所以假设传来这么一个List

```java
List<Integer> list = new ArrayList<Integer>();
list.append(15);
list.append(18);
```

那么上面的SQL语句最后会被生成为

```sql
select user_name userName, age from user where age in (15, 18)
```

### sql片段

在上面，我们发现上面的SQL语句都包含这么一条SQL语句

```sql
select user_name userName, age from user
```

既然这是重复的内容，那我们就可以将其抽离出来成一个SQL片段，然后在SQL语句中引用该片段，在userDao.xml中的mapper标签下，我们加入以下内容

```sql
<sql id="default">
    select user_name userName, age from user
</sql>
```

上面的id名可以任意的取，这里的id是为了在后面引用该SQL片段。接下来将所有select中的

```sql
select user_name userName, age from user
```

替换为

```sql
<include refid="default"></include>
```

如

```sql
<select id="findByAges" resultType="com.xt.domain.User" parameterType="java.util.List">
    <include refid="selectAll"></include>
    <where>
        <if test="list != null">
            <foreach collection="list" item="age" open="and age in(" close=")" separator=",">
                #{age}
            </foreach>
        </if>
    </where>
</select>
```

## 多表查询

### 一对多与多对一

假设有两张表，用户表和账户表，二者之间的关系为

- 一个用户可以有多个账户
- 一个账户对应一个用户

现在我们的需求的是当我们查询用户时，同时查询它所包含的所有账户，当我们查询账户时，同时查询它所对应的用户。

现在创建两张表user和account。

```sql
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(32) NOT NULL COMMENT '用户名称',
  `birthday` datetime default NULL COMMENT '生日',
  `sex` char(1) default NULL COMMENT '性别',
  `address` varchar(256) default NULL COMMENT '地址',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert  into `user`(`id`,`username`,`birthday`,`sex`,`address`) values (41,'老王','2018-02-27 17:47:08','男','北京'), (42,'小王','2018-03-02 15:09:37','女','北京金燕龙'), (45,'张三','2018-03-07 17:37:26','男','北京'),(46,'超级玛丽','2018-03-08 11:44:00','女','北京修正');

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `ID` int(11) NOT NULL COMMENT '编号',
  `UID` int(11) default NULL COMMENT '用户编号',
  `MONEY` double default NULL COMMENT '金额',
  PRIMARY KEY  (`ID`),
  KEY `FK_Reference_8` (`UID`),
  CONSTRAINT `FK_Reference_8` FOREIGN KEY (`UID`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert  into `account`(`ID`,`UID`,`MONEY`) values (1,46,1000),(2,45,1000),(3,46,2000);
```

现在这两张表的内容为

```sql
# user
+----+----------+---------------------+------+------------+
| id | username | birthday            | sex  | address    |
+----+----------+---------------------+------+------------+
| 41 | 老王     | 2018-02-27 17:47:08 | 男   | 北京       |
| 42 | 小王     | 2018-03-02 15:09:37 | 女   | 北京金燕龙 |
| 45 | 张三     | 2018-03-07 17:37:26 | 男   | 北京       |
| 46 | 超级玛丽 | 2018-03-08 11:44:00 | 女   | 北京修正   |
+----+----------+---------------------+------+------------+

# account
+----+------+-------+
| ID | UID  | MONEY |
+----+------+-------+
|  1 |   46 |  1000 |
|  2 |   45 |  1000 |
|  3 |   46 |  2000 |
+----+------+-------+
```

现在创建对应的实体类以及对应的接口以及相应的xml文件。二者的实体类如下

```java
package entity;

import java.util.Date;
import java.util.List;

public class User {
    private Integer id;
    private String name;
    private String sex;
    private Date birthday;
    private String address;
    
    private List<Account> accounts;

    public List<Account> getAccounts() {
        return accounts;
    }

    public void setAccounts(List<Account> accounts) {
        this.accounts = accounts;
    }

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

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", sex='" + sex + '\'' +
                ", birthday=" + birthday +
                ", address='" + address + '\'' +
                ", accounts=" + accounts +
                '}';
    }
}
```

```java
package entity;

public class Account {
    private Integer id;
    private Integer uid;
    private Double money;

    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUid() {
        return uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
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
                ", uid=" + uid +
                ", money=" + money +
                ", user=" + user +
                '}';
    }
}
```

仔细注意这两个实体类，发现在User实体类中有一个Account的List列表，因为一个用户可以有多个账户。而在Account中有一个User对象，因为一个账户对应一个用户。

现在我们来实现第一个需求，当查询所有用户时，同时显示每个用户下的所有账户信息，在UserDao中加入下面的方法

```java
List<User> findAllUsers();
```

下面在userDao.xml中加入下面的查询语句

```sql
<mapper namespace="dao.UserDao">

    <resultMap id="users" type="entity.User">
        <id column="id" property="id"></id>
        <result column="username" property="userName"></result>
        <result column="sex" property="sex"></result>
        <result column="birthday" property="birthday"></result>
        <result column="address" property="address"></result>

        <collection property="accounts" ofType="entity.Account">
            <id column="aid" property="id"></id>
            <result column="uid" property="uid"></result>
            <result column="money" property="money"></result>
        </collection>

    </resultMap>

    <select id="findAllUsers" resultMap="users">
        select user.*, account.id aid, account.uid, account.money from user, account where user.id = account.uid
    </select>
</mapper>
```

由于User中包含一个Account类型的List，所以要设置这个List的对应规则，正是上面collection标签的部分，property是User中List对象的名称，ofType是List集合的类型。collection包含的部分就是List元素对应的规则。

现在实现第二个需求，当查询账户时，同时查询出对应的User信息，在AccountDao中添加下面的方法

```java
List<Account> findAllAccounts();
```

在accountDao.xml添加内容如下

```sql
<mapper namespace="dao.AccountDao">
    <resultMap id="accounts" type="entity.Account">
        <id property="id" column="aid"></id>
        <result property="uid" column="uid"></result>
        <result property="money" column="money"></result>

        <association property="user" javaType="entity.User">
            <id property="id" column="id"></id>
            <result property="userName" column="username"></result>
            <result property="sex" column="sex"></result>
            <result property="birthday" column="birthday"></result>
            <result property="address" column="address"></result>
        </association>
    </resultMap>

    <select id="findAllAccounts" resultMap="accounts">
        select user.*, account.id aid, account.uid, account.money from account 
        left join user on user.id = account.uid
    </select>

</mapper>
```

在Account中有一个User对象，我们要设置这个的对应规则，使用的就是association，property就是Account中User对象的名称，javaType是指对应的实体类。

### 多对多

其实多对多查询与一对多的查询是一样的，上述我们在User类中添加了一个类型为Account的List集合，已表示一对多，在Account中有一个User对象，已表示一对一。

那要如果表示多对多，假设一个账户对应多个用户，那么只要在Account中将一个User对象改为一个类型为User的List列表。

## 延迟加载

延迟加载又称为懒加载，又称按需加载，指的就是在需要的时候才加载，比如上面查询所有的User，但是这时不需要立即加载对应的账户信息，而是等我们使用账户信息时在进行加载，比如

```java
user.getAccounts();
```

这时再向数据库发起查询。

MyBatis根据对关联对象查询的select语句的执行时机，分为三种类型：直接加载、侵入式加载与深度延迟加载

- 直接加载：执行完对主加载对象的select语句，马上执行对关联对象的select查询。
- 侵入式延迟：执行对主加载对象的查询时，不会执行对关联对象的查询。但当要访问主加载对象的某个属性（该属性不是关联对象的属性）时，就会马上执行关联对象的select查询。
- 深度延迟：执行对主加载对象的查询时，不会执行对关联对象的查询。访问主加载对象的详情时也不会执行关联对象的select查询。只有当真正访问关联对象的详情时，才会执行对关联对象的select查询。

Mybatis的延迟加载，需要通过resultMap标签中的association和collection子标签才能演示成功。

要设置延迟加载，需要在mybatis-config.xml中设置，如下

```xml
<configuration>
    
    <settings>
        <setting name="lazyLoadingEnabled" value="true"/>
        <setting name="aggressiveLazyLoading" value="false"/>
    </settings>
    ... ...
</configuration>
```

lazyLoadingEnabled是设置是否深度延迟，当设置为true，就是设置为深度延迟，即当访问关联对象的详细信息时才会进行查询。aggressiveLazyLoading是用来设置侵入式延迟，默认为false，这里本应不用设置，只是为了演示。

### 一对一延时加载

这里演示当查询账户时，同时查询对应的用户信息。首先我们看原先的查询语句

```sql
select user.*, account.id aid, account.uid, account.money from account left join user on user.id = account.uid
```

如果这么写的话，会立即查询相应User的信息，所以必须更改上面的sql语句

```sql
select * from account
```

同时修改resultMap如下

```sql
<resultMap id="accounts" type="entity.Account">
    <id property="id" column="id"></id>
    <result property="uid" column="uid"></result>
    <result property="money" column="money"></result>

    <association property="user" javaType="entity.User" select="dao.UserDao.findById" column="uid">

    </association>
</resultMap>
```

注意到我们将association中的对应规则删除了，因为在上面的sql语句中我们只查询了account的内容。但是我们增加了两个属性，一个是select属性，这个是当我们使用account对象访问其中的User属性时会调用的sql语句，比如

```java
account.getUser();
```

这时因为会访问Account关联对象User的具体信息，会调用userDao的findbyId(Integer id)进行查询，从而得到相应的User信息。

第二个参数是column，其值是上面findById方法所需要的id。

这里向UserDao中增加下面的方法

```java
User findById(Integer id);
```

并且在userDao.xml中增加select标签

```sql
<select id="findById" resultType="entity.User" parameterType="Integer">
    select * from user where id = #{id}
</select>
```

此刻万事大吉，这里贴出accountDao.xml中的内容

```sql
<resultMap id="accounts" type="entity.Account">
    <id property="id" column="id"></id>
    <result property="uid" column="uid"></result>
    <result property="money" column="money"></result>

    <association property="user" javaType="entity.User" select="dao.UserDao.findById" column="uid">

    </association>
</resultMap>

<select id="findAllAccounts" resultMap="accounts">
    select * from account
</select>
```

### 一对多延时加载

一对多延时加载与一对一延时加载是一样，只不过association换成了collection。

这里我们以查询User信息时，同时查询该用户包含的所有账户，这里修改findAllUsers对应的sql语句为

```sql
<select id="findAllUsers" resultMap="users">
    select * from user
</select>
```

修改对应的resultMap为

```sql
<resultMap id="users" type="entity.User">
    <id column="id" property="id"></id>
    <result column="username" property="userName"></result>
    <result column="sex" property="sex"></result>
    <result column="birthday" property="birthday"></result>
    <result column="address" property="address"></result>
    <collection column="id" property="accounts" ofType="entity.Account" select="dao.AccountDao.findByUid">
    </collection>
</resultMap>
```

这时上面的代码已经不需要解释了，在AccountDao中添加findByUid的方法

```java
List<Account> findByUid(Integer uid);
```

同时在accountDao.xml中添加对应的select标签

```sql
<select id="findByUid" resultType="entity.Account" parameterType="Integer">
    select * from account where uid = #{uid}
</select>
```

## 缓存

所谓缓存，指的就是当我们向数据库查询数据时，将数据保存在内存中，当第二次查询时，不再向数据库进行查询，而是直接从内存拿数据，这就是缓存。由于数据在内存中，从内存中拿数据比从数据库中拿数据快很多，并且也可以减少数据库的压力。

### 一级缓存

MyBatis中的一级缓存的范围是sqlSession，即相当于在sqlSession中有一个localCache，当sqlSession查询数据时会将数据保存在这个cache中，当该sqlSession再次查询数据时，会先在这个cache中查询数据，如果有，则会直接拿内存中的数据，如果没有，则会去数据库查询。

那怎么保证拿到的数据不会错呢? 比如当更新数据后，如果继续从缓存中拿数据，这时拿到的数据就会是错的，所以当发生更新、删除、commit()等操作时，就会将一级缓存清空，这就意味着当更新数据后，就得直接去数据库中拿数据了。当SqlSession对象调用clearCache()，也会清除sqlSession的缓存。

那么怎么开启一级缓存呢? 在mybatis-config.xml中添加下面的setting

```xml
<setting name="localCacheScope" value="SESSION"/>
```

localCacheScope有两种取值，一种是SESSION，即在一个MyBatis会话中执行的所有语句，都会共享这一个缓存；一种是STATEMENT级别，可以理解为缓存只对当前执行的这一个Statement有效。默认是SESSION级别，这就意味着一级缓存默认是开启的，上面的设置不用写。

### 二级缓存

想象有两个sqlSession，暂且称之为sqlSession1和sqlSession2，二者连接了同一个表，假设sqlSession1对表进行了更新，sqlSession2向数据库查询数据，但是由于一级缓存的存在，并且sqlSession2没有进行增加、删除等等操作，意味着sqlSession2没有清楚缓存，所以sqlSession2拿到的是缓存中的数据，这种数据称之为脏数据。

那怎么解决这个问题? 这个时候就要使用二级缓存。二级缓存开启后，同一个namespace下的所有操作语句，都影响着同一个Cache，即二级缓存被多个SqlSession共享，是一个全局的变量。

<center>
<img src="https://raw.githubusercontent.com/LastKnightCoder/img/master/20200223232415.png">
</center>

当开启缓存后，数据的查询执行的流程就是 二级缓存 -> 一级缓存 -> 数据库。

那怎么开启二级缓存呢? 首先在mybatis-config.xml加入下面的设置

```xml
<setting name="cacheEnabled" value="true"/>
```

接着在xxxDao.xml中的namespace(mapper标签内中)加入

```xml
<cache/>
```

如果希望局部关闭二级缓存时，比如某查询标签关闭二级缓存，则在标签的属性useCache设置为false，如

```sql
<select id="findAllUsers" resultMap="users" useCache="false">
    select * from user
</select>
```

二级缓存对于不同的命名空间namespace的数据是互不干扰的，倘若多个namespace中对一个表进行操作的话，就会导致这不同的namespace中的数据不一致的情况。例如，在单表上使用二级缓存 在做关联关系查询时，就会发生多表的操作，此时有可能这些表存在于多个namespace中，这就会出现上面出现的问题了。

**总结:**

- MyBatis的二级缓存相对于一级缓存来说，实现了SqlSession之间缓存数据的共享，同时粒度更加的细，能够到namespace级别，通过Cache接口实现类不同的组合，对Cache的可控性也更强。
- MyBatis在多表查询时，极大可能会出现脏数据，有设计上的缺陷，安全使用二级缓存的条件比较苛刻。

## 使用注解开发

使用注解开发，不需要对应的xxxDao.xml文件，因为我们将sql语句写在XxxDao接口的注解中。

### 简单使用

新建一个工程，配置好pom.xml文件以及mybatis-config.xml的主配置文件，在entity包下新建User实体类，在dao包下新建UserDao接口，内容如下

```java
package dao;

import entity.User;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface UserDao {
    @Select("select * from user")
    List<User> findAll();
}
```

在test/java/TestUser类中进行单元测试

```java
import dao.UserDao;
import entity.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.InputStream;
import java.util.List;

public class TestUser {
    private UserDao userDao;
    private SqlSession sqlSession;
    private InputStream inputStream;

    @Before
    public void init() throws Exception{
        String resource = "mybatis-config.xml";
        inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        sqlSession = sqlSessionFactory.openSession();
        userDao = sqlSession.getMapper(UserDao.class);
    }

    @Test
    public void testFindAll() {
        List<User> users = userDao.findAll();
        System.out.println(users);
    }

    @After
    public void destroy() throws Exception{
        if (sqlSession != null) {
            sqlSession.close();
        }
        if (inputStream != null) {
            inputStream.close();
        }
    }
}
```

输出为

```java
[User{id=41, userName='老王', sex='男', birthday=Tue Feb 27 17:47:08 CST 2018, address='北京'}, User{id=42, userName='小王', sex='女', birthday=Fri Mar 02 15:09:37 CST 2018, address='北京金燕龙'}, User{id=45, userName='张三', sex='男', birthday=Wed Mar 07 17:37:26 CST 2018, address='北京'}, User{id=46, userName='超级玛丽', sex='女', birthday=Thu Mar 08 11:44:00 CST 2018, address='北京修正'}]
```

### 其他CRUD

这里简单的演示实验其他的CRUD操作。

#### 更新操作

在UserDao中添加如下方法

```java
@Update("update user set username = #{userName} where id = #{id}")
void updateUser(User user);
```

在测试类中进行测试

```java
@Test
public void testUpdateUser() {
    User user = new User();
    user.setId(45);
    user.setUserName("李四");
    userDao.updateUser(user);
    System.out.println(userDao.findAll());
}
```

输出为

```java
[User{id=41, userName='老王', sex='男', birthday=Tue Feb 27 17:47:08 CST 2018, address='北京'}, User{id=42, userName='小王', sex='女', birthday=Fri Mar 02 15:09:37 CST 2018, address='北京金燕龙'}, User{id=45, userName='李四', sex='男', birthday=Wed Mar 07 17:37:26 CST 2018, address='北京'}, User{id=46, userName='超级玛丽', sex='女', birthday=Thu Mar 08 11:44:00 CST 2018, address='北京修正'}]
```

如果发现不能插入中文，则修改mybatis-config.xml中的dataSource中的url为

```xml
<property name="url" value="jdbc:mysql://localhost:3306/mybatis?useUnicode=true&amp;characterEncoding=utf8"/>
```

#### 插入操作

在UserDao中添加下面的方法

```java
@Insert("insert into user(username, sex, address, birthday) values(#{userName}, #{sex}, #{address}, #{birthday})")
void insertUser(User user);
```

在测试类中进行测试

```java
@Test
public void testInsertUser() {
    User user = new User();
    user.setUserName("奥特曼");
    user.setSex("男");
    user.setAddress("M78");
    user.setBirthday(new Date());
    userDao.insertUser(user);
    System.out.println(userDao.findAll());
}
```

#### 删除操作

在UserDao中添加下面的方法

```java
@Delete("delete from user where id = #{id}")
void deleteUserById(Integer id);
```

在测试类中进行测试

```java
@Test
public void testDeleteUserById() {
    userDao.deleteUserById(48);
    for (User user: userDao.findAll()) {
        System.out.println(user);
    }
}
```

### 在注解中配置resultMap

如下

```java
@Select("select * from user")
@Results(value = {
        @Result(id=true, column = "id", property = "id"),
        @Result(column = "username", property = "userName"),
        @Result(column = "sex", property = "sex"),
        @Result(column = "birthday", property = "birthday"),
        @Result(column = "address", property = "address")
})
List<User> findAll();
```

如果直接将Results写在方法上，那就意味则如果还有方法需要些resultMap，那么就还需要在写一遍，我们希望就是只写一遍resultMap，然后通过id引用即可，我们给上面的Results添加id

```java
@Results(id = "users", value = {
        @Result(id=true, column = "id", property = "id"),
        @Result(column = "username", property = "userName"),
        @Result(column = "sex", property = "sex"),
        @Result(column = "birthday", property = "birthday"),
        @Result(column = "address", property = "address")
})
```

然后在需要resultMap的方法上添加如下的注解

```java
@Results(value = {"users"})
```

或者简写为

```java
@Results("users")
```

### 多表查询

#### 一对一

```java
@Select("select * from account")
@Results(id = "accounts", value = {
        @Result(id = true, column = "id", property = "id"),
        @Result(column = "uid", property = "uid"),
        @Result(column = "money", property = "money"),
        @Result(column = "uid", property = "entity.User", one = @One(select = "dao.UserDao.findById", fetchType = FetchType.EAGER)),
})
List<Account> findAll();
```

- Result中的one就是用来设置一对一查询的，其值是一个One注解，其中的select不用解释，与在xml中association设置的select相同功能
- fetchType是用来设置是立即加载还是延迟加载的
    - FetchType.EAGER：立即加载
    - FetchType.LAZY：延迟加载

>注意，如果要使用延迟加载，得先在mybatis-config.xml中开启延迟加载(方法同xml配置方式)。

#### 一对多

```java
@Select("select * from user")
@Results(value = {
        @Result(id=true, column = "id", property = "id"),
        @Result(column = "username", property = "userName"),
        @Result(column = "sex", property = "sex"),
        @Result(column = "birthday", property = "birthday"),
        @Result(column = "address", property = "address"),
        @Result(column = "id", property = "accounts", many = @Many(select = "dao.AccountDao.findByUid", fetchType = FetchType.LAZY))
})
List<User> findAll();
```

- 将one换成了many，对应的Many注解里面的内容不用多加解释。

### 缓存

如何在注解中使用缓存，对于一级缓存来说，与xml相同，不用设置，默认是SESSION。

对于二级缓存，首先在mybatis-config.xml开启缓存，与在xml中相同。

```xml
<setting name="cacheEnabled" value="true"></setting>
```

在xml中，我们是在namespace中设置

```xml
<cache/>
```

但是在注解中，我们在UserDao接口上添加@CacheNameSpace注解，设置其blocking属性为true，如下

```java
@CacheNamespace(blocking = true)
public interface UserDao {
    ...
}
```

这样就开启二级缓存了。
