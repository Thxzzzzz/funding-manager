<template>
  <d2-container>
    <!-- <template slot="header">header</template> -->
    <!-- TODO 可以显示登陆者的个人信息，和统计信息 -->
    首页
    <!-- <template slot="footer">footer</template> -->
  </d2-container>
</template>

<script>
// import D2HelpBtn from './components/d2-help-btn'
// import D2Badge from './components/d2-badge'
// import D2PageCover from './components/d2-page-cover'
export default {
  components: {
    // D2HelpBtn,
    // D2Badge,
    // D2PageCover
  },
  data () {
    return {
      filename: __filename
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  .page__logo {
    width: 120px;
  }
  .page__btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
}
</style>
