<template>
  <div class="d-flex flex-row align-items-center">
    <i class="bi bi-list" style="font-size: 2rem; color: black;cursor:pointer;" @click="toogleMenu()" ></i>
    <div v-if="this.subTitle">{{ title }} / {{ subTitle }}</div>
    <div v-if="!this.subTitle">{{ title }}</div>
  </div>
</template>
<script>
export default {
  props: ['title', 'subTitle'],
  name: 'Header',
  methods: {
    toogleMenu() {
      this.$store.dispatch('changeMenuState')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
