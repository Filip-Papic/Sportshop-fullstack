import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userData: {
      name: '',
      email: '',
      password: '',
      adress: '',
      postalCode: '',
      city: '',
      country: ''
    },
    userId: '',
    items: [],
    departments: [],
    categories: [],
    products: [],
    product: null,
    imageIDs: [],
    token: ''
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

    addItem(state, item) {
      state.items.push(item);
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

    setImageIDs(state, ids) {
      state.imageIDs = ids;
    },

    addIDsToCategory(state, obj) {
      const category = state.categories.filter( cat => cat.categoryId == obj.id )[0];
      category['imageIDs'] = obj.imageIDs;
    },

    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state) {
      state.token = '';
      localStorage.token = '';
    },

    addComment(state, obj) {
      const image = state.items.filter( item => item.objectID == obj.artId )[0];
      if (image) {
        image.comments.push(obj.comment);
      }
    }
  },

  actions: {

    fetchUserById({ commit }, id) {
      fetch('http://127.0.0.1:8100/admin/users/' + id,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then( obj => obj.json() )
        .then( res => commit('getUserById', res) );
    },

    fetchUserByUsername({ commit }, username) {
      fetch('http://127.0.0.1:8100/admin/users',{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then( obj => obj.json() )
        .then( res => {
          const resf =  res.filter( user => user.name == username )[0];
          commit('getUserByUsername', resf) 
          console.log(resf);
          localStorage.setItem('userID', resf.id);
        });
    },

    fetchUserById({ commit }, id) {
      fetch('http://127.0.0.1:8100/admin/users/' + id,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then( obj => obj.json() )
        .then( res => commit('getUserById', res) );
    },
    
    updateUserData({ commit }, obj){
      fetch('http://localhost:8100/admin/users/' + obj.id, {
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
      fetch('http://127.0.0.1:8100/admin/categories', {
        method: 'GET',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.token 
        }
      }).then( obj => obj.json() )
        .then( res => commit('setCategories', res) );
    },

    fetchProducts({ commit }) {
      fetch('http://127.0.0.1:8100/admin/products', {
        method: 'GET',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.token 
        }
      }).then( obj => obj.json() )
        .then( res => commit('setProducts', res) );
    },

    fetchProductById({ commit }, id){
      fetch('http://127.0.0.1:8100/admin/products/' + id,{
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }).then( obj => obj.json() )
        .then( res => commit('setProductById', res) );
    },

    fetchProductsByCategory({ commit, state }, catID) {
      fetch('http://127.0.0.1:8100/admin/products', {
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

    async fetchIDsByDepartment({ commit, state }, depID) {
      const department = state.departments.filter( dep => dep.departmentId === depID )[0];
      if (department && department['imageIDs']) {
        commit('setImageIDs', department['imageIDs']);
      } else {
        const obj = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${depID}`);
        const res = await obj.json();

        commit('addIDsToDepartment', {
          id: depID,
          imageIDs: res.objectIDs
        });

        commit('setImageIDs', res.objectIDs);
      }
    },

    search({ commit }, q) {
      return new Promise( (resolve, reject) => {
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${q}`)
          .then( obj => obj.json() )
          .then( res => {
            commit('setImageIDs', res.objectIDs);
            resolve(res.total);
          });
      });
    },

    getItem({ commit, state }, id) {
      // return new Promise( (resolve, reject) => {
      //   const item = state.items.filter( item => item.objectID == id )[0];
        
      //   if (item) {
      //     resolve(item);
      //   } else {
      //     fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
      //       .then( obj => obj.json())
      //       .then( res => {
      //         fetch(`http://127.0.0.1:8000/api/messages/${res.objectID}`, {
      //           headers: { 'Authorization': `Bearer ${state.token}` }
      //         }).then( resp => resp.json() )
      //           .then( comments => {
      //             res['comments'] = comments;
      //             commit('addItem', res);
      //             resolve(res);
      //           });
      //       });
      //   }
      // });
    },

    register({ commit }, obj) {
      fetch('http://127.0.0.1:9000/register', {
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
      fetch('http://127.0.0.1:9000/login', {
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

    socket_comment({ commit }, msg) {
      const comment = JSON.parse(msg);
      commit('addComment', { artId: comment.artId, comment: comment });
    }
  }
})
