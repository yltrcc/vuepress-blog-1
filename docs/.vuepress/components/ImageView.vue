<template>
  <img :src="src" ref="img" />
</template>

<script>
export default {
  props: {
    src : String
  },
  mounted() {
    this.$refs.img.onerror = function () {
      if (this.src.startsWith('https://cdn.jsdelivr.net')) {
        const imageName = this.src.split('/').at(-1)
        const repo = this.src.split('/').at(-2).replace('@master', '')
        const newSrc = `https://raw.githubusercontent.com/LastKnightCoder/${repo}/master/${imageName}`
        this.src = newSrc
        this.$refs.img.onerror = null
      }
    }
  },
}
</script>