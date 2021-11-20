<template>
  <div>
    <div class="box">Hello World!</div>
    <div class="box"><p>Welcome!</p></div>
    <div class="box"> </div>
    <div class="box"></div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.box {
  width: 150px;
  height: 50px;
  border: 1px dashed black;
}
div:empty:not(:nth-child(3)) {
  background-color: green;
}
</style>