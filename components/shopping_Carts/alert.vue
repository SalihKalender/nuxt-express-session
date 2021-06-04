<template>
    <div class="alert rounded-0 custom-alert mt-4" v-if="!is_Any_Item">
       <span class="font-weight-bold">Buralar Çok ıssız!!</span>
        <p class="p-0 m-0">Henüz bir ürününüz bulunmuyor...</p>
    </div>
</template>

<script>
    export default {
        computed: {
            is_Any_Item() {
                return this.$store.getters.is_Any_Item
            }
        }
    }
</script>