<template>
  <div class="container">
    <h3 class="text-center mt-3">Nuxt.js | Express.js | Session </h3>
    <div class="d-flex pt-3 justify-content-center" style="height: 100%">
        <product-list />
        <shoppingContainer />
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import productList from '@/components/product_List/productList'  
import shoppingContainer from '@/components/shopping_Carts/shoppingContainer'
export default {
  components: {
    productList,
    shoppingContainer
  }
}
</script>
