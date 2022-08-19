import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userId: '',
    categories: [],
    products: [],
    product: null,
    token: '',
    cart: [],
    orders: [],
  },

  mutations: {
    setUserId(state, id){
      state.userId = id;
      localStorage.userId = id;
    },

    getUserById(state, user) {
      state.user = user
    },

    getUserByUsername(state, user) {
      state.user = user
    },

    addItemToCart(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantity++
    },

    decrementAvailableInventory(state, product) {
      product.quantityStock--
    },

    setCategories(state, categories) {
      state.categories = categories;
    },

    setProducts(state, products) {
      state.products = products;
    },

    setProductById(state, product) {
      state.product = product;
    },

    setCart(state, cart) {
      state.cart = cart;
    },

    setOrders(state, orders) {
      state.orders = orders;
    },

    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },
  },

  getters: {
    cartProducts(state) {
      return state.cart.map(({ id, quantity }) => {
        const product = state.products.find(product => product.id === id)
        return {
          id,
          name: product.name,
          price: product.price,
          quantity
        }
      })
    },

    cartTotal(state, getters) {
      return getters.cartProducts.reduce((total, product) => {
        return total + product.price * product.quantity
      }, 0)
    }

  },

  actions: {
    checkout({ state, commit }) {
      const cartItems = state.cart.map(({ id, quantity }) => {
        const product = state.products.find(product => product.id === id)
        return {
          //userID: localStorage.userID,
          productID: id,
          quantity: quantity
        }
      })
      console.log('Order successful', cartItems);
      fetch('https://sportshopsjrest.herokuapp.com/admin/orderProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(cartItems)
      })
        .then(res => {
          res.json()
        })
        .then(data => {
          commit('setCart', [])
        })
    },

    fetchOrders({ state, commit }, id) {
      fetch('https://sportshopsjrest.herokuapp.com/admin/orderProducts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }
      }).then( obj => obj.json() )
        .then( res => {
          //const resf =  res.filter( order => order.userID == id );
          commit('setOrders', res)
        }
      );
    },

    addToCart(context, product) {
      if(product.quantityStock > 0) {
        const cartItem = context.state.cart.find( item => item.id === product.id );
        console.log(cartItem);
        if(cartItem) {
          context.commit('incrementItemQuantity', cartItem);
        } else {
          context.commit('addItemToCart', product.id);
        }

      context.commit('decrementAvailableInventory', product);
      }
    },

    fetchUserById({ commit }, id) {
      fetch('https://sportshopsjrest.herokuapp.com/admin/users/' + id,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then( obj => obj.json() )
        .then( res => commit('getUserById', res) );
    },

    fetchUserByUsername({ commit }, username) {
      fetch('https://sportshopsjrest.herokuapp.com/admin/users',{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then( obj => obj.json() )
        .then( res => {
          const resf =  res.filter( user => user.name == username )[0];
          commit('getUserByUsername', resf) 
          //localStorage.setItem('userID', resf.id);
        });
    },

    fetchUserById({ commit }, id) {
      fetch('https://sportshopsjrest.herokuapp.com/admin/users/' + id,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then( obj => obj.json() )
        .then( res => commit('getUserById', res) );
    },
    
    updateUserData({ commit }, obj){
      fetch('https://sportshopsjrest.herokuapp.com/admin/users/' + obj.id, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.token
        },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( el => {
          if (el.msg) {
            alert(el.msg);
        } else {
            console.log(obj);
        }
        })
        //.then( data => {
          //console.log(data)
          //commit('updateUserProfile', data) 
      //});
    },

    fetchCategories({ commit }) {
      fetch('https://sportshopsjrest.herokuapp.com/admin/categories', {
        method: 'GET',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.token 
        }
      }).then( obj => obj.json() )
        .then( res => commit('setCategories', res) );
    },

    fetchProducts({ commit }) {
      fetch('https://sportshopsjrest.herokuapp.com/admin/products', {
        method: 'GET',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.token 
        }
      }).then( obj => obj.json() )
        .then( res => commit('setProducts', res) );
    },

    fetchProductById({ commit }, id){
      fetch('https://sportshopsjrest.herokuapp.com/admin/products/' + id,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then( obj => obj.json() )
        .then( res => commit('setProductById', res) );
    },

    fetchProductsByCategory({ commit, state }, catID) {
      fetch('https://sportshopsjrest.herokuapp.com/admin/products', {
        method: 'GET',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.token 
        }
      }).then( obj => obj.json() )
        .then( res => {
          const resf =  res.filter( product => product.categoryID == catID );
          commit('setProducts', resf) 
        });
    },

    search({ commit }, name) {
      console.log(name);
      return new Promise( (resolve, reject) => {
        fetch('https://sportshopsjrest.herokuapp.com/admin/products', {
          method: 'GET',
          headers: { 
            'Authorization': 'Bearer ' + localStorage.token 
          }
        }).then( obj => obj.json() )
          .then( res => {
            const resf =  res.filter( product => product.name.toLowerCase().includes(name.toLowerCase()) );
            commit('setProducts', resf);
            resolve(res.total);
          });
      });
    },

    register({ commit }, obj) {
      fetch('https://sportshopsjauth.herokuapp.com/api_register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          if (tkn.msg) {
            console.log(tkn.msg);
            console.log(obj);
          } else {
            commit('setToken', tkn.token)
          }
        }  
      );
    },

    login({ commit }, obj) {
      fetch('https://sportshopsjauth.herokuapp.com/api_login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    }).then( res => res.json() )
      .then( tkn => {
        if (tkn.msg) {
          console.log(tkn.msg);
          console.log(obj);
        } else {
          commit('setToken', tkn.token)
        }
      });
    },

  }
})
