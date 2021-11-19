<template>
  <div>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
/* 选择前两个 */
li:nth-child(-n + 2) {
  color: red;
}
/* 跳过前三个 */
li:nth-child(n + 4) {
  color: green;
}
</style>