<template>
    <form action="">
        <p><input type="text" class="username"></p>
        <p><input type="password"></p>
        <p><input type="button" value="click me" class="btn"></p>
    </form>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    input[class^="user"] {
        /* 为类名以 user 开头的 input 标签添加样式 */
        color: red;
    }

    input[type$="word"] {
        /* 为类名以 word 结尾的 input 标签添加样式 */
        color: green;
    }

    input[class*="b"] {
        /* 为类名包含 b 的 input 标签添加样式 */
        color: blue;
    }
</style>