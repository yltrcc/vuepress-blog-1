<template>
  <div>
    <video ref="video" controls></video>
  </div>
</template>

<script>
export default {
  name: 'NotionVideo',
  props: ['block_id'],
  mounted() {
    const video = this.$refs.video;
    fetch(`https://service-aj7ae38l-1305576355.bj.apigw.tencentcs.com/release/?block_id=${this.block_id}`)
      .then(res => res.json())
      .then(data => {
        if (!data) {
          return
        }
        const { url } = data
        if (!url) {
          return
        }
        video.src = url
      }).catch(e => {
        console.log('视频加载失败');
      })
  }
}
</script>

<style scoped>
video {
  max-width: 100%;
  object-fit: contain;
  border-radius: 5px;
}
</style>