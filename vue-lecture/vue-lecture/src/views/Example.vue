<template>
  <div>
    <PageTitle :title="title" />

    <button type="button" @click="callChildFunc">부모 클릭</button>
    <ChildComponent
      ref="child"
      :likes="23"
      :isOk="true"
      :commentIds="commentIds"
      :author="author"
      @send-message="sendMessage"
    />
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import ChildComponent from '@/components/ChildComponent'
export default {
  name: 'Example',
  components: {
    PageTitle,
    ChildComponent
  },
  data () {
    return {
      title: '제목 전송',
      commentIds: [1, 2, 3],
      author: { name: '홍길동', company: '어딘가' }
    }
  },
  computed: {
    msg () {
      return this.$refs.child?.msg || 'gg'
    }
  },
  methods: {
    // 부모 컴포넌트에서 자식 컴포넌트 이벤트 호출
    callChildFunc () {
      // this.$refs.child.$refs.childButton.click()
      // this.$refs.child.childFunc();
      this.$refs.child.msg = '부모에 적용한 메시지'
    },
    sendMessage (msg) {
      alert(msg)
    }
  }
}
</script>

<style scoped>

</style>
