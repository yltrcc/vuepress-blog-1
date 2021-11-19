<template>
  <div>
    <div>
      <p>p1</p>
      <p>p2</p>
    </div>
    <div>
      <p>p</p>
      <div>div</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
p:only-of-type {
  color: red;
}
</style>