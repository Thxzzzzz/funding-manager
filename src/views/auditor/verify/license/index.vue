<template>
  <d2-container>
    <template slot="header">header</template>
    执照验证
    <template slot="footer">footer</template>
  </d2-container>
</template>

<script>
export default {
  name: 'license-verify',
  data () {
    return {
      filename: __filename
    }
  }
}
</script>

<style scoped>

</style>
