<template>
  <div>
    <input type="number" min="0" max="100" value="50" /><br /><br />
    <input type="number" min="0" max="10" value="50" />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
input:in-range {
  color: green;
}
input:out-of-range {
  color: red;
}
</style>