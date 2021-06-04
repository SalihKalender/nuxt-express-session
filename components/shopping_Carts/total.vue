<template>
    <div class="cart-footer mt-auto">
        <div class="total-price d-flex justify-content-end align-items-center rounded-0">
            <strong style="font-size: 18px;">Toplam Tutar : </strong>
            <span class="badge total-price-container rounded-0">{{ total }}₺</span>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        total() {
            return this.$store.getters.get_Total;
        }
    }
}
</script>