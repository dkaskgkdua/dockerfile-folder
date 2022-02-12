<template>
  <div>{{productList}}
    <button type="button" @click="getProductList">조회</button>
    <table>
      <thead>
      <tr>
        <th>제품명</th>
        <th>가격</th>
        <th>배송료</th>
        <th>카테고리</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product) in productList" :key="product.product_name">
        <td>{{product.product_name}}</td>
        <td>{{product.price}}</td>
        <td>{{product.delivery_price}}</td>
        <td>{{product.category}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ApiMixin from '../api.js'

export default {
  name: 'MixinTest',
  mixins: [ApiMixin],
  data () {
    return {
      productList: []
    }
  },
  methods: {
    async getProductList () {
      const response = await this.$callAPI('https://b0875cf4-46c3-43b7-a8dd-1be9afc4db65.mock.pstmn.io/list', 'get', {})
      this.productList = response.data
    }
  }
}
</script>

<style scoped>

</style>
