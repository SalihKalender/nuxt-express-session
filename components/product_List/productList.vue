<template>
    <div class="product-container card shadow mr-5">
    <div>
        <h3 class="text-center">Ürün Listesi</h3>
            <div class="list-group">
                <product v-for="product in productList" :key="product.id" :product="product" />
            </div>
    </div>
    </div>
</template>

<script>
import product from '@/components/product_List/product'
export default {
    components: {
        product
    },
    computed: {
        productList() {
            return this.$store.getters.getProducts;
        }
    }
}
</script>