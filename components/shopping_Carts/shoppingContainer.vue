<template>
    <div class="cart-container card shadow">
            <h3 class="text-center ">Sepet</h3>
            <alert />
            <cartItems />
            <total />
    </div>
</template>

<script>
import alert from '@/components/shopping_Carts/alert'
import cartItems from '@/components/shopping_Carts/cartItems'
import total from '@/components/shopping_Carts/total'
export default {
    components: {
        alert,
        cartItems,
        total
    }
}
</script>