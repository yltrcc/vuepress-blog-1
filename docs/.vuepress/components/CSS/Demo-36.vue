<template>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
  </ul>
</template>

<script>
export default {

}
</script>

<style scoped>
/* 选择倒数第一个标签 */
li:nth-last-child(1) {
  color: red;
}
/* 跳过最后两个标签 */
li:nth-last-child(n + 3) {
  color: green;
}
</style>