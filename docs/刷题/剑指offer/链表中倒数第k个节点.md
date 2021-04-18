---
title: 链表中倒数第k个节点
author: 熊滔
category: 剑指offer
---

> 题目：输入一个链表，输出该链表的倒数第 $k$ 个节点。为了符合大多数人的习惯，本题从 $1$ 开始计数，即链表的尾节点是倒数第一个节点。例如，一个链表有 $6$ 个节点，如下 `1->2->3->4->5->6`，这个链表的倒数第 $3$ 个节点是值为 $4$ 的节点。链表的定义如下：
>
> ```java
> private static class ListNode {
>     public ListNode next;
>     public int value;
>     public ListNode(int value) {
>         this.next = null;
>         this.value = value;
>     }
> }
> ```

我们的第一个思路就是先遍历链表，直到结尾，接着回溯 $k - 1$ 步即可获得倒数第 $k$ 个节点

<img src="https://gitee.com/lastknightcoder/blogimage/raw/master/202006161340.svg"/>

但是从上面链表的定义可以看出，该链表是一个单向的链表，我们根本无法进行回溯。

所以我们自然的想到了第二种办法，首先遍历一遍链表，并且统计链表中节点的个数 $n$，这样我们只要向前走 $n - k$ 步即可到倒数第 $k$ 个节点

<img src="https://gitee.com/lastknightcoder/blogimage/raw/master/202006161344.svg"/>

这种方法需要遍历两遍链表，如果面试官告诉你只需要遍历一遍即可，我们应当怎么做。这个时候我们可以定义两个前后指针，首先第一个指针先走 $k - 1$ 步，然后两个指针同时向前走，当第一个指针到达尾节点时，第二个指针也就到达了倒数第 $k$ 个节点，该种方法只需要遍历一遍链表

<img src="https://gitee.com/lastknightcoder/blogimage/raw/master/202006161351.svg"/>

代码如下：

```java
public class FindKthToTail {
    private class ListNode {
        public ListNode next;
        public int value;

        public ListNode(int value) {
            this.next = null;
            this.value = value;
        }
    }

    public ListNode findKthToTail(ListNode root, int k) {
        if (root == null || k <= 0) {
            return null;
        }

        ListNode ahead = root;
        ListNode after = root;

        // 第一个指针先走 k - 1 步，如果链表的长度小于 k ，则返回 null
        for (int i = 0; i < k - 1; i++) {
            if (ahead.next == null) {
                return null;
            }
            ahead = ahead.next;
        }

        // 二者同时走，当第一个指针到达尾节点，第二个指针到达倒数第 k 个节点
        while(ahead.next != null) {
            ahead = ahead.next;
            after = after.next;
        }

        return after;
    }
}
```



<Disqus />