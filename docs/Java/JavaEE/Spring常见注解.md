---
title: Spring常见注解
author: 熊滔
commentid: javaee:spring-annotation
---


介绍 `Spring` 框架中的常见注解(**`NO XML`**)，在介绍 `Spring` 注解之前，简要的介绍一下 `IoC`。

## IoC简要介绍

`IoC(Inverse of Control)` 的意思是控制反转，意思就是控制权发生转换，以前我们需要某个类的对象，都是直接 `new` 出来的，现在有了` IoC`，对象创建的控制权交给 `Spring`，如果我们需要某个对象，向 `IoC` 容器拿，如下

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/IoC202005201751.png" width="60%"/>
</center>

上面将 `Dog` 类对象放入容器的过程我们成为**注入**，容器我们一般称为 `IoC` 容器或者 `Spring` 容器。上面做的好处可以减少类与类之间的耦合性，耦合性这个词可能高大尚，我举个例子，比如 `Dog` 类发生了改变，高耦合性意味着如果有类依赖 `Dog` 类的话，那么相应的该类有可能也要发生改变，如果耦合度低的话，也就是根本察觉不到自己依赖了 `Dog` 类，根本就不需要改变。

我们在像容器要某个对象时，察觉不到某个类的所在(因为一般使用接口去接收从容器中拿的对象)，比如

```java
Animal animal = ioc.getObject('dog');
```

假设 `Dog` 实现了 `Animal` 接口，`ioc` 对象表示 `IoC` 容器，`getObject()` 表示从容器中获得对象的方法，而传入的参数表示对象在容器中的 `id`。如果 `Dog` 类发生改变(但是他在容器中的 `id` 是不会变的)，我们获取 `Dog` 对象的方式还是和上面一样，不需要发生改变。假设如果是直接 `new Dog()` 的话，如果 `Dog` 的类名变了，那么所有直接依赖 `Dog` 类的所有类都要发生改变，这就是低耦合的好处。

> **注意**：要使用 `Spring IoC`，记得在 `pom.xml(Maven)` 中导入坐标
>
> ```xml
> <dependency>
>     <groupId>org.springframework</groupId>
>     <artifactId>spring-context</artifactId>
>     <version>5.2.0.RELEASE</version>
> </dependency>
> ```

## @Configuration

`@Configuration` 的定义：

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component
public @interface Configuration {
    @AliasFor(
        annotation = Component.class
    )
    String value() default "";

    boolean proxyBeanMethods() default true;
}
```

被 `@Configuration` 修饰的类是 `Spring` 的配置类，所谓的配置类就是用来配置用的，可以配置扫描哪些包，将这些包下的类注入到 `IoC` 容器中，也可以配置将特定的类注入到 `IoC` 容器中。

被 `@Configuration` 修饰的类也会被注入到 `IoC` 容器中，`@Configuration` 有一个 `value` 值，它是用来设置该类对象在 `IoC` 容器中的 `id`，如果不设置，那么默认是类名，不过首字母要改为小写，比如

```java
package config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfiguration {
}
```

`SpringConfiguration` 是 `Spring` 的配置类，由于 `@Configuration` 没有配置`id`，所以它在 `IoC` 容器中的 `id` 为 `springConfiguration`，我们可以在测试类中测试，如下

```java
import config.SpringConfiguration;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        SpringConfiguration springConfiguration = ac.getBean("springConfiguration", SpringConfiguration.class);
        System.out.println(springConfiguration);
    }
}
```

`AnnotationConfigApplicationContext` 可以看做是 `IoC` 容器，我们传入配置类所在的包 `config` 给它，它会扫描该包找到配置类，然后根据配置类为容器注入对象，在上面我们在配置类中什么都没有做，所以不会向 `IoC` 容器注入别的对象。

接着我们通过获得对象的方法 `getBean()` 获得了配置类 `SpringConfiguration` 的对象，该方法需要传入在 `IoC` 容器中的 `id`，因为没有指定，默认是 `springConfiguration`。

## @ComponentScan

`@ComponentScan` 注解的定义

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE})
@Documented
@Repeatable(ComponentScans.class)
public @interface ComponentScan {
    @AliasFor("basePackages")
    String[] value() default {};

    @AliasFor("value")
    String[] basePackages() default {};

    Class<?>[] basePackageClasses() default {};

    Class<? extends BeanNameGenerator> nameGenerator() default BeanNameGenerator.class;

    Class<? extends ScopeMetadataResolver> scopeResolver() default AnnotationScopeMetadataResolver.class;

    ScopedProxyMode scopedProxy() default ScopedProxyMode.DEFAULT;

    String resourcePattern() default "**/*.class";

    boolean useDefaultFilters() default true;

    ComponentScan.Filter[] includeFilters() default {};

    ComponentScan.Filter[] excludeFilters() default {};

    boolean lazyInit() default false;

    @Retention(RetentionPolicy.RUNTIME)
    @Target({})
    public @interface Filter {
        FilterType type() default FilterType.ANNOTATION;

        @AliasFor("classes")
        Class<?>[] value() default {};

        @AliasFor("value")
        Class<?>[] classes() default {};

        String[] pattern() default {};
    }
}
```

该注解的作用是扫描包或者类，将扫描到类注入到 `IoC` 容器中。由上面可见，该类的属性还是挺多的，这里介绍几个重要的属性。

### value和basepackages

这两个属性放在一起讲是因为他们互为别名

```java
@AliasFor("basePackages")
String[] value() default {};
@AliasFor("value")
String[] basePackages() default {};
```

它们的作用是一样的，规定要扫描哪些包，从定义看，它们的值都是字符串数组，我们在 `com.xt.service` 下定义 `ServiceTest` 类如下

```java
package com.xt.service;

public class ServiceTest {
    public void service() {
        System.out.println("service...");
    }
}
```

`Spring` 的配置类如下

```java
package config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("com.xt.service")
public class SpringConfiguration {
}
```

我们在配置类中规定了要扫描的包为`com.xt.service`，接着我们在测试类中测试

```java
import com.xt.service.ServiceTest;
import config.SpringConfiguration;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        ServiceTest serviceTest = ac.getBean("serviceTest", ServiceTest.class);
        serviceTest.service();
    }
}

```

但是却发生异常，在容器中没有名为 `serviceTest` 的对象

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200520180852.png"/>
</center>

这是因为即使扫描了 `ServiceTest` 所在的包，但并不是该包下所有的类都会被注入到容器中，而是被 `@Component` 注解所修饰的类才会被注入到容器中，所以我们要为 `ServiceTest` 加上 `@Component` 注解，如下

```java
package com.xt.service;

import org.springframework.stereotype.Component;

@Component
public class ServiceTest {
    public void service() {
        System.out.println("service...");
    }
}
```

再次运行测试类，结果如下

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200520181342.png" width="40%"/>
</center>

> 注意：`@Component` 还有几个衍生注解，`@Controller`，`@Service`，`@Repository`，这些注解的作用与 `@Component` 一毛一样，那为什么要创建这些注解，主要是他们所代表的的语义，`@Controller` 主要用在 `Web` 层的类上，`@Service` 主要用在 `Service` 层上，而 `@Repository` 主要用在 `Dao` 层上，程序员看到某类被什么注解修饰，就可以明白该类的职责是什么了。

如果 `@ComponentScan` 没有指定任何值，那么默认会扫描该类所在的包及其子包，如

```java
package config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
public class SpringConfiguration {
}
```

`@ComponentScan` 没有指定任何值，那么就会默认扫描 `config` 包下的类及其子包下的类。

### basePackageClasses

`basePackageClasses` 的定义如下：

```java
Class<?>[] basePackageClasses() default {};
```

该属性的值是一个字节码数组，当设置指定字节码时，会扫描指定字节码所在包及其子包，假设有如下结构

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200520215316.png" width="30%"/>
</center>

`UserServiceImpl` 实现了 `UserService` 接口，二者内容如下

```java
package com.xt.service;

public interface UserService {
    void doService();
}
```

```java
package com.xt.service.impl;

import com.xt.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    public void doService() {
        System.out.println("do service...");
    }
}

```

`Spring` 的配置类如下

```java
package config;

import com.xt.service.UserService;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackageClasses = UserService.class)
public class SpringConfiguration {
}
```

我们配置 `basePackageClasses` 为 `UserService.class`，所以会扫描 `UserService` 所在的包及其子包，所以 `UserServiceImpl` 会被注入到容器中，我们在测试类中测试如下

```java
import com.xt.service.UserService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        UserService userService = ac.getBean("userServiceImpl", UserService.class);
        userService.doService();
    }
}
```

结果如下

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200520215806.png" width="30%"/>
</center>

### nameGenerator

该属性的作用是设置注入到容器中的对象(我们一般称这个对象为 `bean`)的 `id` 名称的生成规则，如下

```java
Class<? extends BeanNameGenerator> nameGenerator() default BeanNameGenerator.class;
```

在上面我们可以看到，默认使用了 `BeanNameGenerator` 这个类去生成 `id` 的名称，而生成的规则在上面介绍过，即 `id` 为类名，不过首字母要小写， `Spring` 中的有关默认 `id` 名称生成的部分源码如下

```java
public static String decapitalize(String name) {
    if (name == null || name.length() == 0) {
        return name;
    }
    if (name.length() > 1 && Character.isUpperCase(name.charAt(1)) &&
                    Character.isUpperCase(name.charAt(0))){
        return name;
    }
    char chars[] = name.toCharArray();
    chars[0] = Character.toLowerCase(chars[0]);
    return new String(chars);
}
```

我们可以看到，如果对于第一个字母和第二个字母都为大写的这种特殊的类名是不会将首字母变为小写的。

除了可以使用默认的生成规则，我们还可以自己自定义 `id` 的生成规则，在 `custom` 包下新建 `CustomBeanNameGenerator` 类，该类的作用就是 `id` 名称的生成规则，该类需要实现 `BeanNameGenerator` 接口，详细如下

```java
package custom;

import org.springframework.beans.factory.annotation.AnnotatedBeanDefinition;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.BeanNameGenerator;
import org.springframework.core.annotation.AnnotationAttributes;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.lang.Nullable;
import org.springframework.util.Assert;
import org.springframework.util.ClassUtils;
import org.springframework.util.StringUtils;

import java.beans.Introspector;
import java.util.Map;
import java.util.Set;

public class CustomBeanNameGenerator implements BeanNameGenerator {
    public String generateBeanName(BeanDefinition beanDefinition, BeanDefinitionRegistry beanDefinitionRegistry) {
        String beanName = null;
        // 判断该类是否是由注解注入的
        if (beanDefinition instanceof AnnotatedBeanDefinition) {
            // 如果是强转为 AnnotatedBeanDefinition 以获得有关注解的信息
            AnnotatedBeanDefinition annotatedBeanDefinition = (AnnotatedBeanDefinition) beanDefinition;
            // 获得注解的信息
            AnnotationMetadata annotationMetadata = annotatedBeanDefinition.getMetadata();
            // 获得所有注解
            Set<String> types = annotationMetadata.getAnnotationTypes();
            // 遍历所有注解
            for (String type: types) {
                // 获得注解的属性
                AnnotationAttributes annotationAttributes = AnnotationAttributes.fromMap(annotationMetadata.getAnnotationAttributes(type, false));
                // 如果该注解为Component或其衍生注解(暂不考虑 JSR 规范，如 @Resource)且value属性有值
                // 并且 annotationAttributes 不为null
                if (annotationAttributes != null && isStereotypeWithNameValue(type, annotationMetadata.getMetaAnnotationTypes(type), annotationAttributes)) {
                    // 获得 value 属性的值
                    Object value = annotationAttributes.get("value");
                    // 如果value为String，则强转
                    if (value instanceof String) {
                        String strValue = (String) value;
                        // value 值长度不为 0
                        if (StringUtils.hasLength(strValue)) {
                            // 如果 beanName 有值，说明已经设置过了 此时 value 与 beanName 不同，说明产生了冲突，抛出异常
                            if (beanName != null && !strValue.equals(beanName)) {
                                throw new IllegalArgumentException("多个注解设置了value，产生了冲突");
                            } else {
                                beanName = strValue;
                            }
                        }

                    }
                }

            }
        }
		
        // 没有 Component 及其衍生注解或者没有设置 value 值，则采用默认自定义的类名生成规则
        return beanName != null ? beanName : buildDefaultBeanName(beanDefinition);
    }

    // 判断该注解是否是Component及其衍生注解 并且有 value 属性
    private boolean isStereotypeWithNameValue(String annotationType, Set<String> metaAnnotationTypes, @Nullable Map<String, Object> attributes) {
        boolean isStereotype = annotationType.equals("org.springframework.stereotype.Component") || metaAnnotationTypes.contains("org.springframework.stereotype.Component") || annotationType.equals("javax.annotation.ManagedBean") || annotationType.equals("javax.inject.Named");
        return isStereotype && attributes != null && attributes.containsKey("value");
    }

    // 默认 bean id 生成
    private String buildDefaultBeanName(BeanDefinition beanDefinition) {
        // 获得全限定类名，如com.xt.service.impl.UserServiceImpl
        String beanClassName = beanDefinition.getBeanClassName();
        // 获得类名 如UserServiceImpl
        String shortClassName = ClassUtils.getShortName(beanClassName);
        // 默认生成规则为 my + 类名
        return "my" + shortClassName;
    }
}

```

上面的 `id` 生成规则为如果 `@Component` 及其衍生注解设置了 `id` 名称，则使用设置的名称，否则默认的 `id` 名称为 `my +` 类名。现在将 `SpringConfiguration` 的 `@ComponentScan` 的 `nameGenerator` 设置为 `CustomBeanNameGenerator.class`，如下

```java
package config;

import com.xt.service.UserService;
import custom.CustomBeanNameGenerator;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(nameGenerator = CustomBeanNameGenerator.class, basePackages = "com.xt.service.impl")
public class SpringConfiguration {
}
```

`UserServiceImpl` 的内容如下

```java
package com.xt.service.impl;

import com.xt.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    public void doService() {
        System.out.println("do service...");
    }
}
```

可见使用 `@Service` 修饰了，但是没用设置 `value` 值，所以默认生成的 `id` 是 `myUserServiceImpl`，在测试类中测试如下

```java
import com.xt.service.UserService;
        import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        // id 已经改为了 myUserServiceImpl
        UserService userService = ac.getBean("myUserServiceImpl", UserService.class);
        userService.doService();
    }
}

```

输出如下

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200520215806.png" width="30%"/>
</center>

可见我们的自定义 `id` 生成规则生效了，现在修改 `UserServiceImpl` 如下，这次设置 `id` 值

```java
package com.xt.service.impl;

import com.xt.service.UserService;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService {
    public void doService() {
        System.out.println("do service...");
    }
}
```

根据我们的规则，这时的 `id` 名为设定的值，即 `userService`，修改测试类

```java
UserService userService = ac.getBean("userService", UserService.class);
```

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200520215806.png" width="30%"/>
</center>

在此修改 `UserServiceImpl`，这次使用多个注解修饰，如下

```java
package com.xt.service.impl;

import com.xt.service.UserService;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service("userService")
@Component("userServiceImpl")
public class UserServiceImpl implements UserService {
    public void doService() {
        System.out.println("do service...");
    }
}
```

运行测试类，这时会抛出异常，如下

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200520233312.png"/>
</center>

### useDefaultFilters

在 `@ComponentScan` 中有一个属性 `useDefaultFilters`

```java
boolean useDefaultFilters() default true;
```

它的值默认为 `true`，即如果被扫描的类被 `@Component`，`@Controller`，`@Service`，`@Repository`这四个注解修饰时，那么将该类对象注入到容器中，如果为 `false`，那么被这四个注解修饰的类

### includeFilters

`includeFilters` 属性的作用是允许符合过滤规则的类对象注入到容器中，它的值是一个 `Filter` 注解

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({})
public @interface Filter {
    FilterType type() default FilterType.ANNOTATION;
    @AliasFor("classes")
    Class<?>[] value() default {};
    @AliasFor("value")
    Class<?>[] classes() default {};
    String[] pattern() default {};
}
```

该注解有一个 `type` 属性，它的默认取值为 `FilterType.ANNOTATION`，表示过滤的规则为注解，如果我们设置 `value` 属性为某注解的字节码对象，那么被该注解修饰的类对象可以注入到容器中，比如允许自定义 `@MyAnno` 注解所修饰的类注入到容器中

```java
@ComponentScan(includeFilters = @ComponentScan.Filter(MyAnno.class))
```

在扫描的类中，如果该类被自定义注解 `@MyAnno` 修饰，那么该类对象会被注入到容器中。

### excludeFilters

与 `includeFilters` 的作用相反，对于符合过滤规则的类对象不能被注入到容器中，如

```java
@ComponentScan(excludeFilters = @ComponentScan.Filter(Service.class))
```

上面的注解的作用是，扫描到的类如果被 `@Service` 修饰，那么该类对象不能被加入到容器中。

在上面我们知道 `Filter` 注解中，它的 `type` 属性为 `FilterType.ANNOTATION`，即被某注解修饰，他会(`includeFilters`)/不可以(`excludeFilters`)加入到容器中，其实 `type` 还可以有多种取值，如下

```java
package org.springframework.context.annotation;

public enum FilterType {
    ANNOTATION,
    ASSIGNABLE_TYPE,
    ASPECTJ,
    REGEX,
    CUSTOM;

    private FilterType() {
    }
}

```

在这里我们在介绍 `FilterType.CUSTOM`，这表示我们可以自定义过滤规则，定义过滤规则的类需要实现 `TypeFilter` 接口。在 `custom` 中新建 `CustomFilter` 类

```java
package custom;

import org.springframework.core.type.classreading.MetadataReader;
import org.springframework.core.type.classreading.MetadataReaderFactory;
import org.springframework.core.type.filter.TypeFilter;

import java.io.IOException;

public class CustomFilter implements TypeFilter {
    public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory) throws IOException {
        return true;
    }
}
```

修改配置类如下

```java
package config;

import custom.CustomFilter;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Service;

@Configuration
@ComponentScan(
        basePackages = "com.xt.service", 
        includeFilters = 
        @ComponentScan.Filter(
                type = FilterType.CUSTOM, 
                classes = CustomFilter.class
        )
)
public class SpringConfiguration {
}
```

因为 `CustomFilter` 实现的 `match` 始终返回 `true`，所以被扫描到的类对象会被无条件的注入到容器中，我们修改 `com.xt.service.impl.UserServiceImpl` 如下

```java
package com.xt.service.impl;

import com.xt.service.UserService;

public class UserServiceImpl implements UserService {
    public void doService() {
        System.out.println("do service...");
    }
}
```

该类没有被任何注解修饰，就是一个普通的类，但是它的对象还是会注入到容器中，测试类如下

```java
import com.xt.service.UserService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        UserService userService = ac.getBean("userServiceImpl", UserService.class);
        userService.doService();
    }
}
```

输出为

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200520215806.png" width="30%"/>
</center>

## @Bean

对于我们自己写的类，我们可以通过 `@Component` 及其衍生注解，使得被扫描到时被注入到容器中，但是对于第三方的类库，由于已经被编译为了字节码，我们已经无法修改，即不能再别人的源码上加上注解，那么我们如果想将第三方类库对象注入到容器，我们该怎么办呢，使用 `@Bean` 可以解决这个问题。`@Bean` 的定义为

```java
@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Bean {
    @AliasFor("name")
    String[] value() default {};

    @AliasFor("value")
    String[] name() default {};

    /** @deprecated */
    @Deprecated
    Autowire autowire() default Autowire.NO;

    boolean autowireCandidate() default true;

    String initMethod() default "";

    String destroyMethod() default "(inferred)";
}
```

以数据源对象 `DataSource` 对象为例，首先导入坐标

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.2.0.RELEASE</version>
</dependency>
```

配置类如下

```java
package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class SpringConfiguration {
    @Bean
    public DataSource createDataSource() {
        return new DriverManagerDataSource();
    }
}
```

在扫描配置类时，会扫描配置类中被 `@Bean` 注解的方法，会将该方法返回的对象注入到容器中，这是默认的 `id` 名称为**方法名**。测试类如下

```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import javax.sql.DataSource;

public class SpringTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        DataSource dataSource = ac.getBean("createDataSource", DataSource.class);
        System.out.println(dataSource);
    }
}
```

输出为

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200521154944.png" width="70%"/>
</center>

可见容器中有 `DataSource` 对象了。

> 如果被 `@Bean` 注解的方法重载了的话，那么会将重载的方法返回的对象注入容器，如
>
> ```java
> package config;
> 
> import org.springframework.beans.factory.annotation.Autowired;
> import org.springframework.context.annotation.Bean;
> import org.springframework.context.annotation.Configuration;
> import org.springframework.jdbc.core.JdbcTemplate;
> import org.springframework.jdbc.datasource.DriverManagerDataSource;
> 
> import javax.sql.DataSource;
> 
> @Configuration
> public class SpringConfiguration {
>  @Autowired
>  private DataSource dataSource;
> 
>  @Bean
>  public DataSource createDataSource() {
>      return new DriverManagerDataSource();
>  }
> 
>  @Bean
>  public JdbcTemplate createJdbcTemplate() {
>      System.out.println("无参函数");
>      return new JdbcTemplate(dataSource);
>  }
> 
>  @Bean
>  public JdbcTemplate createJdbcTemplate(DataSource dataSource) {
>      System.out.println("有参函数");
>      return new JdbcTemplate(dataSource);
>  }
> }
> ```
>
> 有两个 `createJdbcTemplate` 方法，根据上面所说，重载的方法，即下面那个有参数的函数返回的对象会被注入到容器中，可以在测试类中测试如下
>
> ```java
> import org.springframework.context.annotation.AnnotationConfigApplicationContext;
> import org.springframework.jdbc.core.JdbcTemplate;
> 
> public class SpringTest {
>  public static void main(String[] args) {
>      AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
>      JdbcTemplate jdbcTemplate = ac.getBean("createJdbcTemplate", JdbcTemplate.class);
>      System.out.println(jdbcTemplate);
>  }
> }
> ```
>
> <center>
>     <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200521163655.png" width="50%"/>
> </center>

### name和value

```java
@AliasFor("name")
String[] value() default {};
@AliasFor("value")
String[] name() default {};
```

按照上面的定义，`name` 和 `value` 互为别名，它们的作用就是设置注入到容器对象的 `id` 名称。

### autowireCandidate

```java
boolean autowireCandidate() default true;
```

该属性的作用与 `@Autowired` 有关，当我们使用 `@Autowired` 自动注入时，如

```java
@Autowired
private DataSource dataSource;
```

容器会将其中的 `dataSource` 对象注入到成员变量中，但是如果 `autowireCandidate` 设置为 `false`，那么该对象就不能使用 `@Autowired` 自动注入，如

```java
@Autowired
private DataSource dataSource;

@Bean(autowireCandidate = false)
public DataSource createDataSource() {
    return new DriverManagerDataSource();
}
```

这时就不能将 `dataSource` 对象通过 `@Autowired` 注解自动注入到成员变量 `dataSource` 中，再次运行测试代码，会抛出异常。

## @Import

在实际的开发中，可能有多个配置类，比如数据库的配置类，那么主配置类就要导入数据库配置类的配置，这时就需要用到 `@Import` 注解。`@Import` 注解的定义如下

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Import {
    Class<?>[] value();
}
```

`@Import` 注解的作用是导入 `value` 属性所指明的类，将这些类对象注入到容器中，如有下面的数据库配置类

```java
package config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

public class JdbcConfiguration {
    @Bean("dataSource")
    public DataSource createDataSource() {
        return new DriverManagerDataSource();
    }
    
    @Bean("jdbcTemplate")
    public JdbcTemplate createJdbcTemplate(@Autowired DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
```

我们在主配置类中导入该配置类

```java
package config;

import org.springframework.context.annotation.Import;

@Configuration
@Import(JdbcConfiguration.class)
public class SpringConfiguration {
}
```

我们在导入 `JdbcConfiguration` 时，会扫描 `JdbcConfiguration` 中的方法，将被 `@Bean` 注解的方法返回的对象注入到容器中，所以这时 `DataSource` 对象和 `JdbcTemplate` 对象会被注入到容器中，在测试类测试如下

```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

public class SpringTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        DataSource dataSource = ac.getBean("dataSource", DataSource.class);
        JdbcTemplate jdbcTemplate = ac.getBean("jdbcTemplate", JdbcTemplate.class);
        assert dataSource != null;
        assert jdbcTemplate != null;
    }
}
```

运行测试类顺利运行，没有报错

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200521171027.png" width="40%"/>
</center>

> `JdbcConfiguration` 它也会被注入容器中，这时它的 `id` 为它的全限定类名，而不是类名首字母小写，即`config.JdbcConfiguration`

### ImportSelector

当我们需要动态的决定导入哪些类时，或者需要大量导入类时，我们可以为 `@Import` 传入自定义导入类，该类需要实现 `ImportSelector` 接口。该接口中有一个方法 `String[] selectImports(AnnotationMetadata annotationMetadata)`，该方法返回一个字符串数组，这个数组包含的是要添加到容器中的类名。

因为我们过滤规则使用 `AspectJ` 表达式，所以需要导入相关坐标

```xml
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.8.13</version>
</dependency>
```

现在我们完成这么一个功能，读取配置文件中的过滤规则和要扫描的包，将扫描包中符合过滤规则的类对象添加到容器中，在 `resources` 下新建 `customImport.properties` 如下

```properties
custom.expression=com.xt.service.impl.*
custom.basePackage=com.xt
```

过滤规则使用 `ASPECTJ` 格式的过滤规则，扫描的包为 `com.xt`，新建类 `custom.CustomImport` 如下

```java
package custom;

import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.context.annotation.ImportSelector;
import org.springframework.core.io.support.PropertiesLoaderSupport;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.core.type.filter.AspectJTypeFilter;
import org.springframework.core.type.filter.TypeFilter;

import java.util.HashSet;
import java.util.Properties;
import java.util.Set;

public class CustomImport implements ImportSelector {
    // 使用 AspectJ 表达式表示过滤规则
    private String expression;
    // 扫描的包
    private String basePackage;
    public CustomImport() {
        // 读取配置文件 初始化
        try {
            // 根据配置文件获得过滤规则和扫描的包
            Properties properties = PropertiesLoaderUtils.loadAllProperties("customImport.properties");
            expression = properties.getProperty("custom.expression");
            basePackage = properties.getProperty("custom.basePackage");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    // 实现的方法
    public String[] selectImports(AnnotationMetadata annotationMetadata) {
        ClassPathScanningCandidateComponentProvider scanner = new ClassPathScanningCandidateComponentProvider(false);
        // 根据 aspectj 表达式转换为对应的过滤器
        TypeFilter typeFilter = new AspectJTypeFilter(expression, CustomImport.class.getClassLoader());
        // 将过滤器添加到扫描器中
        scanner.addIncludeFilter(typeFilter);
        // 创建 Set 集合保存扫描到的符合过滤规则的类
        Set<String> classes = new HashSet<String>();
        // 使用过滤器扫描指定包，得到符合过滤规则的类 并添加到 classes 中
        scanner.findCandidateComponents(basePackage).forEach(beanDefinition -> classes.add(beanDefinition.getBeanClassName()));
        // 将 classes 转换为字符串数组返回
        return classes.toArray(new String[classes.size()]);
    }
}
```

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200521205507.png" width="25%"/>
</center>

根据上面的过滤规则，只有 `UserServiceImpl` 会被添加到容器中(除配置类)，在测试类中测试一番

```java
import config.SpringConfiguration;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(SpringConfiguration.class);
        String[] names = ac.getBeanDefinitionNames();
        for (String name: names) {
            System.out.println(name);
        }
    }
}
```

测试类是获得容器所有对象的 `id`，并打印出来，如下

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200521205739.png" width="70%"/>
</center>

除了前面五个做初始化工作的对象以及配置类对象，只有 `UserServiceImpl` 被添加到容器中，这次我们修改过滤规则为

```java
custom.expression=com.xt..*
custom.basePackage=com.xt
```

`Aspectj` 表达式为将 `com.xt` 包及其子孙包下的所有类都添加到容器中，再次运算测试类，输出为

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200521210557.png" width="85%"/>
</center>

这时 `com.xt.utils.Logger` 对象也被添加到容器中了。

> 注意：上面的 `UserServiceImpl` 和 `Logger` 都没有使用任何注解进行修饰，就是一个普通的 `Java` 类。

### ImportBeanDefinitionRegistrar

`ImportBeanDefinitionRegistrar` 的功能同 `ImportSelector`，不过二者的返回值不同，`ImportSelector` 返回一个要添加到容器中类名名称组成的数组，而 `ImportBeanDefinitionRegistrar` 什么都不返回，说明在 `ImportBeanDefinitionRegistrar` 内部已经将扫描包下符合规则的类添加到容器中去了。现在我们要实现与上面相同的功能，新建 `custom.CustomImportBeanDefinitionRegistrar`，如下

```java
package custom;

import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.context.annotation.ClassPathBeanDefinitionScanner;
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.core.type.filter.AspectJTypeFilter;
import org.springframework.core.type.filter.TypeFilter;

import java.util.Properties;

public class CustomImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {
    private String expression;
    private String basePackage;

    public CustomImportBeanDefinitionRegistrar() {
        try {
            Properties properties = PropertiesLoaderUtils.loadAllProperties("customImport.properties");
            expression = properties.getProperty("custom.expression");
            basePackage = properties.getProperty("custom.basePackage");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        // 得到扫描器
        ClassPathBeanDefinitionScanner scanner = new ClassPathBeanDefinitionScanner(registry, false);
        // 得到过滤器
        TypeFilter typeFilter = new AspectJTypeFilter(expression, CustomImportBeanDefinitionRegistrar.class.getClassLoader());
        scanner.addIncludeFilter(typeFilter);
        // 扫描指定包 将符合过滤规则的类对象直接注入到容器中
        scanner.scan(basePackage);
}
```

该类的大部分工作与 `CustomImport` 是一样的，就是最后使用了 `ClassPathBeanDefinitionScanner` 对象直接扫描包，将符合过滤规则的类对象注入到容器中。配置文件和配置类如下

```properties
custom.expression=com.xt..*
custom.basePackage=com.xt
```

```java
package config;

import custom.CustomImportBeanDefinitionRegistrar;
import org.springframework.context.annotation.Import;

@Import(CustomImportBeanDefinitionRegistrar.class)
public class SpringConfiguration {
}
```

测试类与上面相同，运行测试类，结果如下

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200521213142.png" width="70%"/>
</center>

与 `ImportSelector` 实现的效果相同，不过有一点不同的是，`ImportSelector` 的 `id` 生成规则为**全限定类名**，而 `ImportBeanDefinitionRegistrar` 的 `id` 为**类名首字母小写**。

## @PropertySource

`@PropertySource` 注解的作用是用来读取资源文件，该注解的定义如下

```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Repeatable(PropertySources.class)
public @interface PropertySource {
    String name() default "";

    String[] value();

    boolean ignoreResourceNotFound() default false;

    String encoding() default "";

    Class<? extends PropertySourceFactory> factory() default PropertySourceFactory.class;
}
```

他不仅可以读取 `properties` 文件，还可以读取 `xml` 文件，甚至可以通过自定义 `yml` 文件解析器读取 `yml` 文件。

主配置类如下

```java
package config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("jdbc.properties")
@Import({JdbcConfig.class})
public class SpringConfiguration {
}
```

在主配置类中读取了配置文件 `jdbc.properties`，配置文件和 `JDBC` 配置类 `JdbcConfig` 如下所示

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/sb
jdbc.username=root
jdbc.password=root
```

```java
package config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

public class JdbcConfig {
    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;

    @Bean("dataSource")
    public DataSource createDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }

    @Bean("jdbcTemplate")
    public JdbcTemplate createJdbcTemplate(@Autowired DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
```

我们将通过 `PropertySource` 读取到的资源，通过 `@Value` 注解，以 `Spring EL` 表达式的形式注入到了成员变量中。同时也可以读取 `xml ` 文件，我们新建 `jdbc.xml`， 内容如下

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <entry key="jdbc.driver">com.mysql.jdbc.Driver</entry>
    <entry key="jdbc.url">jdbc:mysql://localhost:3306/sb</entry>
    <entry key="jdbc.username">root</entry>
    <entry key="jdbc.password">root</entry>
</properties>
```

修改 `@PropertySource` 的值

```java
@PropertySource("jdbc.xml")
```

由上面可以看出，`xml` 文件相对于 `properties` 有更加明显的层级关系，结构比较清楚，但是这种优点的代价就是冗余性性很高，为了表达真正有用的信息，加入很多无用的内容。为了整合 `properties` 和 `xml` 的优点，人们提出了一个新的格式的文件 `YAML`(文件后缀名为`.yml`)，它不仅书写简单，并且可以表达层级关系，新建 `jdbc.yml` 如下

```yaml
jdbc:
  driver: com.mysql.jdbc.driver
  url: jdbc:mysql://localhost:3306/sb
  username: root
  password: root
```

但是 `@PropertySource` 默认只支持 `propeties` 和 `xml` 文件的读取，如果要支持 `yml` 文件的读取，就需要自己定义解析类，我们可以借助第三方的类库来解析 `yml` 文件，在 `pom.xml` 中导入解析 `yml` 类库的坐标

```xml
<dependency>
    <groupId>org.yaml</groupId>
    <artifactId>snakeyaml</artifactId>
    <version>1.23</version>
</dependency>
```

然后在配置类中修改如下

```java
@PropertySource(value = "jdbc.yml", factory = CustomYAMLPropertySourceFactory.class)
```

新建 `custom.CustomYAMLPropertySourceFactory` 实现 `PropertySourceFactory` 接口，如下

```java
package custom;

import org.springframework.beans.factory.config.YamlPropertiesFactoryBean;
import org.springframework.core.env.PropertiesPropertySource;
import org.springframework.core.env.PropertySource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.core.io.support.PropertySourceFactory;

import java.io.IOException;
import java.util.Properties;

public class CustomYAMLPropertySourceFactory implements PropertySourceFactory {
    public PropertySource<?> createPropertySource(String name, EncodedResource encodedResource) throws IOException {
        YamlPropertiesFactoryBean factoryBean = new YamlPropertiesFactoryBean();
        // 解析 yaml 文件
        factoryBean.setResources(encodedResource.getResource());
        // 将解析的文件转换为 properties
        Properties properties = factoryBean.getObject();
        // spring 默认能解析 properties，使用 spring 源码的类去解析
        return name != null ? new PropertiesPropertySource(name, properties) : new PropertiesPropertySource(encodedResource.getResource().getFilename() ,properties);
    }
}
```

## @DependsOn

有的时候一个 `Bean` 对象需要在另一个 `Bean` 对象注入到容器之后才能注入到容器，比如 `One` 类对 `Two` 类有依赖关系，在逻辑上需要先注入 `Two` 对象，`One, Two` 的定义如下

```java
package example;

import org.springframework.stereotype.Component;

@Component
public class One {
    public One() {
        System.out.println("one被创建了");
    }
}
```

```java
package example;

import org.springframework.stereotype.Component;

@Component
public class Two {
    public Two() {
        System.out.println("Two被创建了");
    }
}
```

主配置类如下

```java
package config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("example")
public class SpringConfiguration {
}
```

测试类如下

```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
    }
}
```

运行输出为

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200522114839.png" width="20%"/>
</center>

`One` 先于 `Two` 先注入容器中，如果需要 `One` 在 `Two` 后，可以加上 `@DependsOn`,如下

```java
package example;

import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

@Component
@DependsOn("two")
public class One {
    public One() {
        System.out.println("one被创建了");
    }
}
```

再次运行测试类

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200522115044.png" width="20%"/>
</center>

这时 `Two` 类对象先被创建。

## @Lazy

`@Lazy` 是用来延迟加载时机的，一般我们在初始化容器时，就会将扫描到的类对象注入到容器中，如果对于一个大型的项目，可能会有成千上万个类，如果在一开始就将全部的对象注入到容器，会大大的延缓项目的启动时间，所以为了提高效率，我们可以在需要该类对象时才把对象注入到容器中，还是在上例中，新建 `Three`

```java
package example;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class Three {
    public Three() {
        System.out.println("three被创建了");
    }
}
```

运行测试类

```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
    }
}

```

输出为

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200522115609.png" width="40%"/>
</center>

我们只是在测试类中初始化了容器，但是 `Three` 类对象已经被注入到容器中了。这时我们对 `Three` 使用 `@Lazy` 注解，再次运行测试类

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200522115834.png" width="40%"/>
</center>

这时 `Three` 类对象并没有被创建，只有我们第一次向容器获取所需对象时，才会被注入到容器中，修改测试类如下

```java
import example.Three;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        System.out.println("===========================");
        Three three = ac.getBean("three", Three.class);
    }
}

```

结果为

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200522120057.png" width="40%"/>
</center>

> **注意：**`@Lazy` 注解对于范围为单例的类有效。

## @Conditional

`@Conditional` 注解是用来设定注入条件的，当扫描到某类或者方法时，是否将该类对象或返回对象注入到容器，根据 `@Conditional` 指定的条件决定。`@Conditional` 注解的定义如下

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Conditional {
	Class<? extends Condition>[] value();
}
```

该注解只有一个 `value` 属性，该属性的值是一个继承了 `Condition` 接口的字节码对象，`Condition` 接口有一个 `match` 方法，该方法返回一个布尔值，当返回 `true` 时，可以将对象注入到容器中，否则不行。

现在我们有两个数据源，一个是 `Windows` 下的数据源，一个是 `Linux` 下的数据源，现在我们的任务根据操作系统来决定使用哪个数据源注入到容器中，`JdbcConfig` 类定义如下

```java
package config;

import condition.LinuxCondition;
import condition.WindowsCondition;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

public class JdbcConfig {
    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;
    
    @Bean("dataSource")
    @Conditional(WindowsCondition.class)
    public DataSource createWindowsDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        // 用以观察哪个数据源被注入到容器中
        System.out.println("Windows Env");
        return dataSource;
    }

    @Bean("dataSource")
    @Conditional(LinuxCondition.class)
    public DataSource createLinuxDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        // 用以观察哪个数据源被注入到容器中
        System.out.println("Linux Env");
        return dataSource;
    }
}
```

在上面我们对 `Windows` 和 `Linux` 的数据源都使用了 `Conditional` 注解，分别使用 `WindowsCondition` 和 `LinuxCondition` 类来决定是否注入到容器中，二类的内容如下

```java
package condition;

import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.env.Environment;
import org.springframework.core.type.AnnotatedTypeMetadata;

public class WindowsCondition implements Condition {
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        // 获得环境对象
        Environment environment = context.getEnvironment();
        // 获得操作系统名称
        String osName = environment.getProperty("os.name");
        System.out.println(osName);
        // 如果包含 Windows 则可以注入
        if (osName.contains("Windows")) {
            return true;
        }
        return false;
    }
}
```

```java
package condition;

import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.env.Environment;
import org.springframework.core.type.AnnotatedTypeMetadata;

public class LinuxCondition implements Condition {
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        Environment environment = context.getEnvironment();
        String osName = environment.getProperty("os.name");
        System.out.println(osName);
        if (osName.contains("Linux")) {
            return true;
        }
        return false;
    }
}
```

配置类和测试类如下所示

```java
package config;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:jdbc.properties")
@Import(JdbcConfig.class)
public class SpringConfiguration {
}
```

```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import javax.sql.DataSource;

public class SpringTest {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        DataSource dataSource = ac.getBean("dataSource", DataSource.class);
    }
}
```

运行测试类，输出为

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200522130104.png" width="40%"/>
</center>

## @Profile

有的时候我们在不同的环境下注入到容器中的类是不同的，比如开发环境、测试环境和生产环境下三者注入的类是不同的，要实现这样的效果，我们可以使用上面提及的 `@Conditional` 注解，但是考虑到上述问题比较常见，所以 `Spring` 为我们提供了 `@Profile` 注解来实现这样的功能， `@Profile` 的定义如下

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(ProfileCondition.class)
public @interface Profile {
	String[] value();
}
```

可以观察到 `@Profile` 的底层也是使用了 `@Conditional` 注解，`@Profile` 注解只有一个属性值 `value`，它是用来定义环境名称的，比如我们一般使用 `dev` 代表开发环境，`test` 代表测试环境，`prod` 代表生产环境。

在配置好类属于哪个环境后，可以通过容器对象中环境对象中的`setActiveProfiles()`方法来激活对应的环境，这样只有对应环境的类会被注入到容器中，我们新建三个测试类

```java
package example;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("dev")
@Component
public class Dev {
    public Dev() {
        System.out.println("开发环境");
    }
}
```

```java
package example;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("test")
@Component
public class Test {
    public Test() {
        System.out.println("测试环境");
    }
}
```

```java
package example;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("prod")
@Component
public class Prod {
    public Prod() {
        System.out.println("生产环境");
    }
}
```

配置类如下

```java
package config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("example")
public class SpringConfiguration {
}
```

测试类如下

```java
import config.SpringConfiguration;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringTest {
    public static void main(String[] args) {
        // 不能传入配置类的所在包 或者配置字节码对象 否则所有三个类都不会被注入
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext();
        // 设置激活的环境
        ac.getEnvironment().setActiveProfiles("dev");
        // 设置配置类
        ac.register(SpringConfiguration.class);
        // 刷新容器
        ac.refresh();
    }
}
```

输出为

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200522132300.png" width="30%"/>
</center>

## 自动注入

我们一般在 `Service` 层中会用到 `Dao` 层中的对象，所以在 `Service` 中一般会有一个 `Dao` 层的成员变量，这个对象一般是在容器中的，所以 `Service` 层需要向容器索取对象，我们可以使用注解使得容器中的对象自动注入到对应的成员变量中，下面就介绍几个常用的自动注入注解。

### @Autowired和@Qualifier

`@Autowired` 注解首先会根据成员变量的类型去容器中找对应类型的注解，如果有多个相同类型的对象，那么会使用成员变量的名称作为 `id` 去容器中寻找对应的对象。

`JdbcConfig` 类如下

```java
package config;

import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

public class JdbcConfig {
    @Bean("dataSource1")
    public DataSource createDataSource1() {
        return new DriverManagerDataSource();
    }

    @Bean("dataSource2")
    public DataSource createDataSource2() {
        return new DriverManagerDataSource();
    }
}
```

我们向容器中注入了两个 `DataSource` 对象，这时我们在 `TestAutowired` 中使用 `@AutoWired` 注解，如下

```java
package test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
public class TestAutowired {
    @Autowired
    DataSource dataSource;
}
```

由于在容器中有两个 `DataSource` 类型的对象，所以 `@Autowired` 无法根据类型自动注入，所以 `@Autowired` 会根据变量名 `dataSource` 作为 `id` 去容器中寻找对象注入，但是在容器中并没有 `id` 为 `dataSource` 的对象，所以不能够成功注入。

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200522203827.png"/>
</center>

为了解决上面 `@Autowired` 注解存在的问题，我们可以通过 `@Qualifier` 注解指定自动注入的 `id` 名称，如

```java
@Autowired
@Qualifier("dataSource1")
DataSource dataSource;
```

> **注意：**
>
> - `@Qualifier` 注解不能单独使用，必须配合 `@Autowired` 注解或后面提到的 `@Inject` 注解使用
> - `@Autowired` 有一个属性为 `required`，该属性是规定是否要求一定要注入成功，默认为 `true`，即必须注入成功，否则抛出异常。

### @Inject和@Named

使用 `@Inject` 和 `@Named` 需要导入对象的坐标

```xml
<dependency>
    <groupId>javax.inject</groupId>
    <artifactId>javax.inject</artifactId>
    <version>1</version>
</dependency>
```

`@Inject` 注解是 `JSR330` 规范规定的注解，它的作用也是实现自动注入注解，它的规则是根据类型自动注入，如果有多个相同类型的对象，那么会保错，与 `@Autowired` 注解不同，并不会以变量名作为 `id` 继续寻找。

`@Named` 注解也是 `JSR330` 规范规定的注解，它可以和 `@Inject` 注解配合使用，它是用来设置在容器中的 `id` 名称的，与 `@Qualifier` 注解一样，`@Named` 注解不能单独使用，必须配合 `@Autowired` 注解或 `@Inject` 使用

```java
@Inject
@Named("dataSource1")
DataSource dataSource;
```

### @Resource

`@Resource` 注解是 `JSR250` 规范规定的注解，它有一个 `name` 属性，该属性是用来指定自动注入对象在容器中的 `id`，同 `@Named` 和 `@Qualifier` 不同，他可以单独使用，如

```java
@Resource(name = "dataSource1")
DataSource dataSource;
```

## @Primary

当我们仅仅使用 `Autowired` 时，如果容器中有多个相同类型的对象且容器没有与成员变量名相同的对象，那么注入是会失败的，如

```java
package config;

import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

public class JdbcConfig {
    @Bean
    public DataSource createDataSource1() {
        return new DriverManagerDataSource();
    }

    @Bean
    public DataSource createDataSource2() {
        return new DriverManagerDataSource();
    }
}
```

```java
@Autowired
DataSource dataSource;
```

这时自动注入会失败，这时我们可以使用 `@Primary` 来表明那个对象时主要的，当有多个类型相同的对象时，优先注入该对象，如

```java
@Bean
@Primary
public DataSource createDataSource1() {
    return new DriverManagerDataSource();
}
```

这时使用 `@Autowired` 注解，会默认注入这个 `DataSource` 对象。

## @PostConstruct和@PreDestroy

在创建 `Bean` 后，可能需要做一些初始化的工作，这时我们可以使用 `@PostConstruct` 注解，在对象被销毁前，可能需要做一些资源的回收工作，这时我们可以使用 `@PreDestroy`，这两个注解只能放在方法上，新建一个 `utils.Logger` 类如下

```java
package utils;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Component
public class Logger {
    public Logger() {
        System.out.println("对象创建");
    }
    
    @PostConstruct
    public void init() {
        System.out.println("初始化工作...");
    }
    
    @PreDestroy
    public void destroy() {
        System.out.println("资源回收工作...");
    }
}
```

我们使用 `@PostContruct` 注解了 `init` 方法和使用 `PreDestroy` 注解了 `destroy` 方法，这意味着当创建`Logger` 对象后会执行 `init` 方法进行初始化，在 `Logger` 对象销毁前，会执行 `destroy` 执行资源回收工作。现进行验证，配置类如下

```java
package config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("utils")
public class SpringConfiguration {
}
```

测试类如下

```java
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringTest {
    public static void main(String[] args) {
        // 在创建容器时 会创建 Logger 对象并注入，创建对象后会执行 init 方法
        AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext("config");
        // 销毁容器， Logger 对象会被一同销毁 在销毁前会执行 destroy 方法
        ac.close();
    }
}
```

结果如下

<center>
    <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/img/20200522213747.png" width="50%"/>
</center>

## 参考资料

- [Spring高级之注解驱动开发](https://www.bilibili.com/video/BV1hE411o7w7)
- [@Profile进行环境切换](https://blog.csdn.net/baidu_37107022/article/details/89163959)