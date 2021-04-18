---
title: 二叉树的第k大节点
author: 熊滔
category: 剑指offer
---

> 题目：给定一棵二叉搜索树，请找出其中第 $k$ 大的节点。例如，下图的二叉搜索树中，第 $3$ 大的节点是 $7$
>
> <img src="https://gitee.com/lastknightcoder/blogimage/raw/master/202007010947.svg"/>
> 

其实解决这道题的算法十分的简单，因为对于二叉搜索树来说，它的中序遍历是排好序的结果，我们要查找第 $k$ 大的节点，只要中序遍历到第 $k$ 个节点即可，这个节点即是第 $k$ 大的节点

```java
public class GetKthNode {
    // 以全局变量表示以遍历过的节点数目
    private int count;

    private class BinaryTreeNode {
        BinaryTreeNode left;
        BinaryTreeNode right;
        int value;
        public BinaryTreeNode(int value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }

    public BinaryTreeNode getKthNode(BinaryTreeNode root, int k) {
        if (root == null || k <= 0) {
            return null;
        }
        count = k;
        return getKthNode(root);
    }

    private BinaryTreeNode getKthNode(BinaryTreeNode root) {
        BinaryTreeNode target = null;
        if (root.left != null) {
            target = getKthNode(root.left);
        }
        
        if (target == null) {
            if (count == 1) {
                target = root;
            }
            count--;
        }

        if (target == null && root.right != null) {
            target = getKthNode(root.right);
        }

        return target;
    }
}
```

<Disqus />