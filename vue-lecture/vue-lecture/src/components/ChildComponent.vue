<template>
<div>
  <h1>{{msg}}</h1>
  <div>likes: {{likes}}</div>
  <div>isOk: {{isOk}}</div>
  <div v-for="comment in commentIds" :key="comment">{{comment}}</div>
  <div>author name : {{ author.name }} author company : {{ author.company }}</div>
  <button type="button" @click="childFunc" ref="childButton">자식 클릭</button>
  <button type="button" @click="sendFromChild">부모로 이벤트</button>
  <button type="button" @click="changeData">자식 컴포넌트 데이터 변경</button>
</div>
</template>

<script>
export default {
  name: 'ChildComponent',
  props: {
    likes: {
      type: Number,
      default: 0
    },
    isOk: {
      type: Boolean,
      default: false
    },
    commentIds: {
      type: Array
    },
    author: {
      type: Object
    }
  },
  data () {
    return {
      msg: '자식에 있는 메시지'
    }
  },
  methods: {
    childFunc () {
      alert('ㅎㅎ')
    },
    sendFromChild () {
      this.$emit('send-message', this.msg)
    },
    changeData () {
      this.msg = '자식 컴포넌트에서 데이터 변경이 일어났습니다.'
    }
  }
}
</script>

<style scoped>

</style>
