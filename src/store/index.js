import {createStore} from 'vuex'
import db from '@/firebase';
import firebase from 'firebase/compat/app';

export default createStore({
  state: {
    menuState: true,
    orderList: [],
    currentFilterType: 'New',
    statics: null
  },
  mutations: {
    setMenuState: (state, value) => {
      state.menuState = value
    },
    setOrders: (state, values) => {
      state.orderList = values
    },
    setCurrentFilterType: (state, value) => {
      state.currentFilterType = value
    },
    setStatics: (state, value) => {
      state.statics = value
    }
  },
  actions: {
    changeMenuState({commit}) {
      commit('setMenuState', !this.state.menuState)
    },
    addNewOrder({commit, dispatch}, data) {
      db.collection('orders').add(data)
        .then(() => {
          db.collection('statics').doc('default').update({
            New: firebase.firestore.FieldValue.increment(1)
          }).then(res => {
            dispatch('getStatics')
          })
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    },
    changeStatus({commit, dispatch}, data) {
      db.collection('orders').doc(data.id).set(data)
        .then(() => {
          dispatch('getOrders', this.state.currentFilterType)
          let updatedData;
          switch (data.type) {
            case 'New':
              updatedData = {
                New: firebase.firestore.FieldValue.increment(1)
              }
              break;
            case 'Accepted':
              updatedData = {
                New: firebase.firestore.FieldValue.increment(-1),
                Accepted: firebase.firestore.FieldValue.increment(1)
              }
              break;
            case 'Cooking':
              updatedData = {
                Accepted: firebase.firestore.FieldValue.increment(-1),
                Cooking: firebase.firestore.FieldValue.increment(1)
              }
              break;
            case 'Ready':
              updatedData = {
                Cooking: firebase.firestore.FieldValue.increment(-1),
                Ready: firebase.firestore.FieldValue.increment(1)
              }
              break;
            case 'Delivered':
              updatedData = {
                Ready: firebase.firestore.FieldValue.increment(-1),
                Delivered: firebase.firestore.FieldValue.increment(1)
              }
              break;
            case 'Completed':
              updatedData = {
                Delivered: firebase.firestore.FieldValue.increment(-1),
                Completed: firebase.firestore.FieldValue.increment(1)
              }
              break;
          }
          db.collection('statics').doc('default').update(updatedData).then(res => {
            dispatch('getStatics')
          });
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    },
    getOrders({commit}, filterType) {
      if (filterType === 'all' || !filterType) {
        db.collection('orders').get()
          .then((data) => {
            commit('setCurrentFilterType', filterType)
            commit('setOrders', data.docs.map(doc => {
              return {
                ...doc.data(),
                id: doc.id
              }
            }))
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
          });
      } else {
        db.collection('orders').where('type', '==', filterType).get()
          .then((data) => {
            commit('setCurrentFilterType', filterType)
            commit('setOrders', data.docs.map(doc => {
              return {
                ...doc.data(),
                id: doc.id
              }
            }))
          })
          .catch((error) => {
            console.error('Error writing document: ', error);
          });
      }
    },
    getStatics({commit}) {
      db.collection('statics').doc('default').get()
        .then((doc) => {
          commit('setStatics', doc.data())
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
  },
  modules: {}
})
