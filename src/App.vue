<template>
  <div class="d-flex flex-row h-100 w-100 justify-content-between overflow-hidden ">
    <div class="bar">
      <img class="logo p-1" src="../public/assets/img/img.png" width="45" height="45" alt="">
      <div class="item pt-2 pb-2 active"><i class="bi bi-basket"></i></div>
      <div class="item pt-2 pb-2 "><i class="bi bi-collection"></i></div>
      <div class="item pt-2 pb-2 "><i class="bi bi-gear-fill"></i></div>
    </div>
    <div class="menu pt-4 open" v-bind:class="{ close: !this.$store.state?.menuState }" >
      <div class="title">
          Orders
      </div>
      <div class="list d-flex flex-column pt-4 gap-2">
          <div class="item d-flex justify-content-between" v-bind:class="{ active:  this.$route?.query?.filter === 'New' }" @click="this.$router.push('/orders?filter=New')">
            <div class="text">New Order</div>
            <div class="value">{{ this.$store.state?.statics?.New }}</div>
          </div>
          <div class="item d-flex justify-content-between" v-bind:class="{ active:  this.$route?.query?.filter === 'Accepted' }" @click="this.$router.push('/orders?filter=Accepted')">
            <div class="text">Accepted</div>
            <div class="value">{{ this.$store.state?.statics?.Accepted }}</div>
          </div>
          <div class="item d-flex justify-content-between" v-bind:class="{ active:  this.$route?.query?.filter === 'Cooking' }" @click="this.$router.push('/orders?filter=Cooking')">
            <div class="text">Cooking</div>
            <div class="value">{{ this.$store.state?.statics?.Cooking }}</div>
          </div>
          <div class="item d-flex justify-content-between" v-bind:class="{ active:  this.$route?.query?.filter === 'Ready' }" @click="this.$router.push('/orders?filter=Ready')">
            <div class="text">Parcel Ready</div>
            <div class="value">{{ this.$store.state?.statics?.Ready }}</div>
          </div>
          <div class="item d-flex justify-content-between" v-bind:class="{ active:  this.$route?.query?.filter === 'Delivered' }" @click="this.$router.push('/orders?filter=Delivered')">
            <div class="text">Delivered</div>
            <div class="value">{{ this.$store.state?.statics?.Delivered }}</div>
          </div>
          <div class="item d-flex justify-content-between" v-bind:class="{ active:  this.$route?.query?.filter === 'Completed' }" @click="this.$router.push('/orders?filter=Completed')">
            <div class="text">Completed</div>
            <div class="value">{{ this.$store.state?.statics?.Completed }}</div>
          </div>
      </div>
    </div>
    <div class="p-3 d-flex flex-column h-100 w-100 justify-content-between  ">
      <div class="header "><Header :title="title" :subTitle="subTitle" /></div>
      <div class="pt-3 d-flex flex-row gap-3 overflow-auto h-100 w-100">
        <div class="d-flex flex-column flex-wrap overflow-auto h-100 w-100">
          <router-view></router-view>
        </div>
      </div>
      <div class="footer "><Footer/></div>
    </div>
  </div>
</template>

<script>
import Header from './layout/Header.vue'
import Footer from './layout/Footer.vue'
export default {
  name: 'mdApp',
  components: {
    Header,
    Footer
  },
  data: () => {
    return {
      a: 1,
      title: '',
      subTitle: ''
    }
  },
  created() {
    this.$store.dispatch('getStatics');
    this.$watch(
      () => this.$route,
      (to, previous) => {
        this.title = to?.name;
        this.subTitle = to.query?.filter
      }
    )
  }

}
</script>

<style lang="scss">
@import "./style.scss";

.menu{
  min-width:160px;
  border:1px solid #d3cbcb9e;
  padding:1em;
  background-color:#F6F6F6;
  .title{
    font-weight:600;
  }
  .item{
    font-size:13px;
    font-weight:300;
    cursor:pointer;
    .value{
      color:#cdcdcd;
    }
  }
}

.open{
  display: block;
}

.close{
  display:none;
}

.list{
  .active{
    color:blue;
    .value{
      color:black;
    }
  }
}
.bar{
  background-color : #EDEDED;
  min-width: 60px;
  text-align: center;
  .item{

  }
  .active{
    background-color:white;
  }

}
.logo{
  border: 1px solid #EDEDED;
  border-radius: 10px;
}

</style>
