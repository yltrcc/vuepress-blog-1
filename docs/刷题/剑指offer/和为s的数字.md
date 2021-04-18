---
title: 和为s的数字
author: 熊滔
category: 剑指offer
---

> 题目：输入一个递增排序的数组和一个数字 $s$，在数组中查找两个数，使得它们的和正好是 $s$。如果有多对数字的和等于 $s$，则输出任意一对即可。例如输入数字 $[1, 2, 4, 7, 11, 15]$ 和数字 $15$，因为 $4 + 11 = 15$，所以输出 $4$ 和 $11$。

我们使用两个指针分别指向数组的首尾，如果这两个数字相加大于输入的数，那么将尾指针向前移动，如果小于输入的数，那么将首指针向后移动，如果等于输入的数，返回。

我们以数组 $[1, 2, 4, 7, 11, 15]$，输入数字 $15$ 为例，图示上面的过程

<img src="https://gitee.com/lastknightcoder/blogimage/raw/master/202007011157.svg"/>


代码如下

```java
public static  int[] towNumberSum(int[] data, int sum) {
    if (data == null || data.length == 0) {
        return null;
    }
    int start = 0;
    int end = data.length - 1;
    while (start < end) {
        int curSum = data[start] + data[end];
        if (curSum == sum) {
            return new int[]{data[start], data[end]};
        } else if (curSum < sum) {
            start++;
        } else {
            end--;
        }
    }
    return null;
}
```

> 题目：输入一个正数 $s$，打印出所有和为 $s$ 的连续正数序列(至少包含有两个数)。例如，输入 $15$，由于 $1 + 2 + 3 + 4 + 5 = 4 + 5 + 6 = 7 + 8 = 15$，所以打印出 $3$ 个连续序列 $1-5、4-6$ 和 $7-8$。

受到上题的经验，我们同样使用两个数 `small` 和 `big` 分别表示序列中的最小值和最大值，我们的策略是这样的，对于 `[small, big]` 表示的序列和如果大于输入的数，那么将  `small` 向前移动，如果小于输入的数，那么将 `big` 向前移动，如果等于，那么打印出来，并且将 `big` 向前移动并重复前面的过程，结束的标志是 `small < (s + 1)/2`。

```java
public void continuousSequenceSum(int sum) {
    int small = 1;
    int big = 2;
    
    int middle = (sum + 1) / 2;
    int curSum = small + big;
    while (small < middle) {
        if (curSum == sum) {
            printContinuousSequence(small, big, sum);
        }
        while (curSum > sum && small < middle) {
            curSum -= small;
            small++;
            if (curSum == sum) {
                printContinuousSequence(small, big, sum);
            }
        }
        big++;
        curSum += big;
    }
}
private void printContinuousSequence(int small, int big, int sum) {
    for (int i = small; i <= big; i++) {
        if (i == big) {
            System.out.println(i + " = " + sum);
        } else {
            System.out.print(i + " + ");
        }
    }
}
```

<Disqus />