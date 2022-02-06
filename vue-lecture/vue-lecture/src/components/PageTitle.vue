<template>
  <h1 class="page-title">{{title}}</h1>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      default: '페이지 타이틀입니다.'
    }
  }
}
</script>

<style scoped>
.page-title {
  padding-left: 5px;
  border-left: 3px solid red;
  text-align: left;
}
</style>
