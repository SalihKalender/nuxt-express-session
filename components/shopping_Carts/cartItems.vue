<template>
 <client-only>
      <table class="table table-hover table-striped table-bordered">
    <thead>
      <th class="text-center">Ürün Adı</th>
      <th class="text-center">Adet</th>
      <th class="text-center">Fiyat</th>
      <th class="text-center">Tutar</th>
      <th class="text-center">Sil</th>
    </thead>
    <tbody>
      <tr v-for="cart in cartItems" :key="cart.id" class="bg-custom-color">
           <td class="p-2">{{cart.name}}</td>
            <td class="p-2 text-center w-25">
            <div class="d-flex flex-row justify-content-center p-0 m-0">
                <button class="btn btn-sm btn-outline-danger rounded-0" @click="changeCount({change: -1 , id: cart.id , count: cart.count})">-</button>
                <input disabled type="text"
                class="form-control form-control-sm w-25  text-center rounded-0 border-left-0 border-right-0" :value="cart.count">
                <button class="btn btn-sm btn-outline-success rounded-0" @click="changeCount({change: 1 , id: cart.id, count: cart.count})">+</button>
            </div>
            </td>
            <td class="p-2 text-center">{{cart.price}}₺</td>
            <td class="p-2 text-center">{{ cart.price * cart.count }}₺</td>
            <td class="p-2 text-center"><button class="btn btn-sm btn-danger" @click="remove_Item(cart.id)">Sil</button></td>
      </tr>
    </tbody>
  </table>
 </client-only>
</template>

<script>
export default {
    computed: {
        cartItems() {
            return this.$store.getters.getCart_Items;
        },
    },
    methods: {
      async remove_Item(id) {
        await this.$axios.$post('/api/delete-item/' + id);
        this.$store.commit('remove_Item',id);
      },
      async changeCount(arg) {
        if(arg.count == 1 && arg.change == -1) {
          await this.$axios.$post('/api/delete-item/' + arg.id);
          this.$store.commit('remove_Item',arg.id);
        }
        if(arg.count != 1 && arg.change == -1) {
          await this.$axios.$post('/api/decrease-item/' + arg.id);
          this.$store.commit('decrease_Item',arg.id);
        }
        else if(arg.change == 1) {
          await this.$axios.post('/api/increase-item/' + arg.id);
          this.$store.commit('increase_Item',arg.id);
        }
      }
    }
}
</script>