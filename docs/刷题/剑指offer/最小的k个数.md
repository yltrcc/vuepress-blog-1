---
title: 最小的k个数
author: 熊滔
category: 剑指offer
---

> 题目：输入 $n$ 个整数，找出其中最小的 $k$ 个数。例如，输入 $4, 5, 1, 6, 2, 7, 3, 8$ 这 $8$ 个数字，则最小的 $4$ 个数字是 $1, 2, 3, 4$。

我们最容易想到的办法就是对数组进行排序，然后取前面 $k$ 个数字即是最小的 $k$ 个数字，该种办法的时间复杂度是 $O(n \log n)$，我们还有更快的算法。

第一种算法是利用 $partition$ 算法，它能够将数组分为前后两部分，前部分的数字小于后部分的数字，返回两部分分界处的下标 $index$，如果 $index$ 等于 $k - 1$，那么前半部分就是最小的 $k$ 个数，如果 $index$ 大于 $k - 1$，那么最小的 $k$ 个数在前半部分，我们继续对前半部分使用 $partition$ 算法，如果 $index$ 小于 $k - 1$，那么最小的 $k$ 个数在后半部分，则对后半部分使用 $partition$ 算法，直到 $index$ 等于 $k - 1$ 为止。

```java
private static int partition(int[] data, int start, int end) {
    if (end < start) {
        throw new RuntimeException("参数错误");
    }
    int num = data[end];
    int more = end + 1;
    int cur = start;
    while (cur < more) {
        if (data[cur] <= num) {
            cur++;
        } else {
            int number = data[cur];
            data[cur] = data[--more];
            data[more] = number;
        }
    }
    return cur - 1;
}
public static int[] getLeastNumbers(int[] data, int k) {
    if (data.length < k) {
        throw new RuntimeException("数组的长度小于k");
    }
    int start = 0;
    int end = data.length - 1;
    int index = partition(data, start, end);
    while (index != (k - 1)) {
        if (index < (k - 1)) {
            start = index + 1;
            index = partition(data, start, end);
        } else {
            end = index - 1;
            index = partition(data, start, end);
        }
    }
    int[] results = new int[k];
    for (int i = 0; i < k; i++) {
        results[i] = data[i];
    }
    return results;
}
```

上面的思路有个限制，就是会对数组进行更改，并且不能处理流数据，即数组中的数字的个数在不断的增加，一般处理海量数据时，我们的数据是分批次读取的，数组的长度并不固定，但是上面的算法明显只能处理数组长度固定的情况。

下面介绍的算法可以处理海量数据，并且不会对原先的数组进行更改，这个算法要使用到堆这种数据结构。我们使用一个容量为 $k$ 的最大堆来存储数据，对于最大堆来说，堆顶的元素是堆中最大的元素。我们的算法是，首先将数组的前 $k$ 个数字添加到堆中，接着遍历数组，如果数组中的数字小于堆顶数字，那么将堆顶数字弹出，将这个数组中的数字添加进堆，当我们遍历完数组时，堆中的 $k$ 个数字就是最小的 $k$ 个数字。

```java
public static int[] getLeastKNumber(int[] data, int k) {
    if (data.length < k) {
        throw new RuntimeException("数组的长度小于k");
    }
    // 最大堆
    PriorityQueue<Integer> maxHeap = new PriorityQueue<>(new MaxComparator());
    // 首先先添加 k 个数字
    for (int i =0; i < k; i++) {
        maxHeap.add(data[i]);
    }
    for (int i = k; i < data.length; i++) {
        // 如果数组中的数组比堆顶小
        if (data[k] < maxHeap.peek()) {
            // 弹出堆顶元素
            maxHeap.poll();
            // 添加数组中的数字到堆中
            maxHeap.add(data[i]);
        }
    }
    
    // 将堆中元素转换为数组返回
    int[] results = new int[k];
    for (int i = 0; i < k; i++) {
        results[i] = maxHeap.poll();
    }
    return results;
}

private static class MaxComparator implements Comparator<Integer> {
    @Override
    public int compare(Integer num1, Integer num2) {
        return num2 - num1;
    }
}
```

<Disqus />