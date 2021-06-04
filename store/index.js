import Vuex from 'vuex'
const createStore = () => {
    return new Vuex.Store({
        state: {
            products: [],
            cart: [],
        },
        getters: {
            getProducts(state) {
                return state.products
            },
            getCart_Items(state) {
                return state.cart;
            },
            get_Total({ cart }) {
                let total = 0;
                cart.forEach(item => total+=item.price * item.count);
                return total;
            },
            is_Any_Item( {cart} ) {
                if(cart.length > 0) {
                    return true
                }
                else {
                    return false
                }
            }
        },
        mutations: {
            setProducts(state,payload) {
                state.products = payload
            },
            set_Cart_Items(state,payload) {
                state.cart = payload;
            },
            add_to_Card(state,payload) {
                state.cart.push(payload);
            },
            add_to_Count({ cart },payload) {
                const index = cart.findIndex((item) => {
                    return item.id == payload.data.id
                });
                cart[index].count += payload.data.count;
            },
            remove_Item({ cart } , payload) {
                const index = cart.findIndex(item => item.id == payload);
                cart.splice(index,1);
                cart = cart;
            },
            decrease_Item({ cart } , payload) {
                const index = cart.findIndex(item => item.id == payload);
                cart[index].count-=1;
                cart = cart;
            },
            increase_Item({ cart } , payload) {
                const index = cart.findIndex(item => item.id == payload);
                cart[index].count+=1;
                cart = cart;
            }
        },
        actions: {
            async nuxtServerInit(vuex_Context,nuxt_Context) {
                const products = await nuxt_Context.$axios.$get('/api/products');
                vuex_Context.commit('setProducts',products);
                const items = await nuxt_Context.$axios.$get('/api/cart-items');
                if(items.length == 0) {
                    return 
                }
                else {
                    vuex_Context.commit('set_Cart_Items',items);
                }
            },
        }
    }) 
}

export default createStore;