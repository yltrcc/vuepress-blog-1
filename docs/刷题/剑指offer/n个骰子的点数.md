---
title: n个骰子的点数
author: 熊滔
category: 剑指offer
---

> 题目：把 $n$ 个骰子扔在地上，所有骰子朝上一面的点数之和为 $s$。输入 $n$，打印出 $s$ 所有可能的值出现的概率。

一个骰子总共有 $6$ 面，所以总共有 $6^n$ 总情况，所以我们需要统计出所以 $s$ 可能出现的次数，然后除以 $6 ^ n$ 就可以得到所以值出现的概率。

现在的问题就是怎么统计 $s$ 点出现的次数，我们以 $f(i, s)$ 表示 $i$ 个骰子投出 $s$ 点的次数，因为第 $i$ 个骰子能够投出 $1, 2, 3, 4, 5, 6$ 点 $6$ 种情况，所以只要前 $i - 1$ 个骰子投出 $s-1, s-2, s-3, s-4, s-5, s-6$ 的点数，均可以使得 $i$ 个骰子投出 $s$ 点，所以我们可以得到这样的关系式

$$
f(i,s) = f(i-1, s-1) + f(i-1, s-2) + f(i-1, s-3) + f(i-1, s-4) + f(i-1, s-5)+ f(i-1, s-6)
$$

```java
public static double[] probability(int n) {
    if (n < 1) {
        return new double[]{0};
    }
    // 有n个骰子，为了方便从1开始，所以设置 n + 1 个数组，点数最大为 6n，也是从 1 开始
    int[][] numbers = new int[n + 1][6*n + 1];
    for (int i = 1; i <= 6; i++) {
        numbers[1][i] = 1;
    }
    // i 表示骰子数
    for (int i = 2; i <= n; i++) {
        // s 表示 i 个骰子投出的点数
        for (int s = i; s <= 6 * i; s++) {
            // cur 表示第 i 个骰子投出的点数
            for (int cur = 1; cur <= 6; cur++) {
                // s - cur 表示前 i - 1 个骰子应该投出的点数
                // 前 i - 1 个骰子投出的点数最小值为 i - 1
                // 如果 s - cur 小于 i - 1 说明不可能
                if (s - cur < i - 1) {
                    break;
                }
                numbers[i][s] += numbers[i - 1][s - cur];
            }
        }
    }
    double total = Math.pow(6, n);
    // 最小点数为 n，最大点数为 6n，总共有 6n - n + 1 = 5n + 1种可能
    double[] ans = new double[5 * n + 1];
    for (int i = n; i <= 6 * n; i++) {
        ans[i - n] = numbers[n][i] / total;
    }
    return ans;
}
```

<Disqus />