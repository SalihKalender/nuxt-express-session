<template>
    <div class="list-group-item d-flex justify-content-between align-items-center">
      <p class="p-0 m-0 w-100 d-flex align-items-center">
        <span>{{product.name}}</span>
        <span class="price-container badge-warning text-white font-italic rounded p-1 ml-3">{{product.price}}₺</span>
      </p>
      <div class="count-container d-flex flex-row justify-content-end mr-3">
        <button class="btn btn-sm btn-outline-danger rounded-0" @click="changeCount(-1)">-</button>
        <input disabled type="text"
          class="form-control form-control-sm w-25  text-center rounded-0 border-left-0 border-right-0" v-model="count">
        <button @click="changeCount(1)" class="btn btn-sm btn-outline-success rounded-0">+</button>
      </div>
      <button @click="addToCart()" class="btn btn-sm btn-outline-primary">Sepete Ekle</button>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            required: true,
            type: Object
        }
    },
    data() {
      return {
        count: 0
      }
    },
    methods: {
      changeCount(value){
        if(value == -1 && this.count == 0) {
          return 
        }
        else if(value == -1) {
          this.count--;
        }
        else {
          this.count++;
        }
      }, 
      async addToCart() {
        if(this.count == 0) {
          return alert('0 Adet Ekleyemezsiniz');
        }
        const cart_Item = {
          count: this.count,
          ...this.product
        }
        const response = await this.$axios.$post('/api/add-to-cart',cart_Item);  
        if(response.only_Count) {
          this.$store.commit('add_to_Count',response);
        }
        else {
          this.$store.commit('add_to_Card',response.data);
        }
        this.count = 0;
      }
    }
}
</script>
