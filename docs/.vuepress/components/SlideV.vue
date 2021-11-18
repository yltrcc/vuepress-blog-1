<template>
  <div class="slidev-container">
    <iframe :src="src" frameborder="0" class="iframe" width="100%" height="100%"></iframe>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>


<style scoped>
.slidev-container {
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  position: relative;
}
.iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>