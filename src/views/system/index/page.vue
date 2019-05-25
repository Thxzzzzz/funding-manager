<template>
  <d2-container>
    <!-- <template slot="header">header</template> -->
    <!-- TODO 可以显示登陆者的个人信息，和统计信息 -->
    <h2>
      你好！{{info.nickname}}
    </h2>
    <!-- <template slot="footer">footer</template> -->
  </d2-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {

  },
  data () {
    return {
      filename: __filename
    }
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  }
}
</script>

<style lang="scss" scoped>

</style>
