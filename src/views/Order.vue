<template>
  <div class="home w-100 h-100">
    <div class="d-flex flex-row justify-content-between">
      <div class="d-flex flex-row">
        <button class="btn btn-outline-secondary d-flex flex-row">
          <i class="bi bi-list" style="font-size: 18px; color: black;cursor:pointer;" @click="toogleMenu()"></i>
          <div class="d-flex align-center">Showing 10 Orders</div>
        </button>
      </div>
      <div class="">
        <button class="btn btn-outline-primary" @click="this.$router.push('/create-order')">Add New Order</button>
      </div>
    </div>
    <hr>
    <div class="order-list d-flex flex-column gap-2">
      <div class="order" v-for="order in this.$store.state.orderList" :key="order">
        <div class="d-flex justify-content-between">
          <div class="no">
            <label>Order Number</label>
            <div>#{{ order.orderNumber }}</div>
          </div>
          <div class="date">
            <label>Date & Time</label>
            <div> {{ formatDate(order.date) }} </div>
          </div>
          <div class="name">
            <label>Name</label>
            <div>{{ order.name }}</div>
          </div>
          <div class="contact">
            <label>Contact</label>
            <div>{{ order.contact }}</div>
          </div>
          <div class="type">
            <label>Transfer Type</label>
            <div v-if="order.transferType === 'takeaway'"><span class="badge bg-warning">Takeway</span></div>
            <div v-if="order.transferType === 'delivery'"><span class="badge bg-primary">Delivery</span></div>
          </div>
          <div class="amount">
            <label>Amount</label>
            <div>${{ order.totalValue }}</div>
          </div>
        </div>
        <div class="d-flex justify-content-start gap-2 mt-4">
          <label>Ordered Items</label>
          <span class="badge bg-secondary" v-for="item in order.items" :key="item">{{ item.name }} x {{ item.quantity }}</span>
        </div>
        <div class="d-flex justify-content-between mt-4">
          <div class="d-flex flex-column justify-content-start">
            <label>Additional information from customer</label>
            <small>{{ order.extraNote }}</small>
          </div>
          <div class="d-flex flex-row gap-3 justify-content-start">
            <!-- <i class="bi bi-printer" style="font-size:2em"></i> -->
            <button class="btn btn-sm btn-outline-primary" v-if="order.type === 'New'" @click="moveToClick(order)">Move to Accepted</button>
            <button class="btn btn-sm btn-outline-primary" v-if="order.type === 'Accepted'"  @click="moveToCooking(order)">Move to Cooking</button>
            <button class="btn btn-sm btn-outline-primary" v-if="order.type === 'Cooking'" @click="moveToReady(order)">Move to Parcel Ready</button>
            <button class="btn btn-sm btn-outline-primary" v-if="order.type === 'Ready'" @click="moveToDelivered(order)">Move to Delivered</button>
            <button class="btn btn-sm btn-outline-primary" v-if="order.type === 'Delivered'" @click="moveToCompleted(order)">Move to Competed</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Order',
  components: {},
  data() {
    return {}
  },
  created() {
    this.$watch(
      () => this.$route,
      (to, previous) => {
        this.$store.dispatch('getOrders', to.query.filter);
      }
    )
    this.$store.dispatch('getOrders', this.$route.query?.filter);
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      // Then specify how you want your dates to be formatted
      return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
    },
    moveToClick(order) {
      const data = {
        ...order,
        type: 'Accepted'
      }
      this.$store.dispatch('changeStatus', data);
    },
    moveToCooking(order) {
      const data = {
        ...order,
        type: 'Cooking'
      }
      this.$store.dispatch('changeStatus', data);
    },
    moveToReady(order) {
      const data = {
        ...order,
        type: 'Ready'
      }
      this.$store.dispatch('changeStatus', data);
    },
    moveToDelivered(order) {
      const data = {
        ...order,
        type: 'Delivered'
      }
      this.$store.dispatch('changeStatus', data);
    },
    moveToCompleted(order) {
      const data = {
        ...order,
        type: 'Completed'
      }
      this.$store.dispatch('changeStatus', data);
    }

  }
}
</script>

<style lang="scss">
.order {
  border: 1px solid #d5d2d2;
  min-height: 230px;
  border-radius: 10px;
  padding: 3%;

  label {
    font-weight: 100;
    opacity: 0.7;
    font-size: 14px;
  }
}
</style>
