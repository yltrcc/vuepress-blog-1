<template>
  <div>
    <div class="class1"><p><span>Hello World!</span></p></div>
    <div class="class2"><p><span>Hello World!</span></p></div>
    <div class="class3"><p><span>Hello World!</span></p></div>
    <div class="class4"><p><span>Hello World!</span></p></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
/* 相当于 1 个类选择其和 2 个标签选择器 */
:is(.class1, .class3, .class4) p span{
  color: red;
}
/* 相当于 2 个标签选择器 */
:where(.class1, .class3, .class4) p span {
  color: green;
}
</style>