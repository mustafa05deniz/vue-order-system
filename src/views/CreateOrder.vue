<template>
  <div class="row w-100">
    <div class="col-xs-12 col-sm-12 col-xl-6  ">
      <div class="row p-2">
        <div class="col-4">
          <label>Order Number : </label>
        </div>
        <div class="col-6">
          <value>#{{ this.$store.state.orderList?.length + 1 }}</value>
        </div>
        <div class="col-4">
          <label>Date Time : </label>
        </div>
        <div class="col-6">
          <value>{{  formatDate(this.formValue.date) }}</value>
        </div>
      </div>
      <div class="row">
        <div class="col-12 ">
          <FormKit
            ref = "form1"
            type="form"
            :form-class="'p-2'"
            :value="this.formValue"
            validation="required"

            :actions="false"
          >
            <FormKit
              type="text"
              name="name"
              v-model="this.formValue.name"
              label="Name"
              validation="required"
            />
            <FormKit
              type="text"
              name="contact"
              v-model="this.formValue.contact"
              label="Contact"
              validation="required"
            />
            <FormKit
              type="radio"
              name="transferType"
              v-model="this.formValue.transferType"
              label="Transfer Type"
              validation="required"
              outer-class="optionClass"
              :options="{
                  delivery: 'Delivery',
                  takeaway: 'Takeaway',
                }"
            />
            <FormKit
              type="textarea"
              name="extraNote"
              v-model="this.formValue.extraNote"
              label="Message to client"
              rows="3"
              placeholder="Remember to write in complete sentences."
            />
            <FormKit
              v-model="values"
              type="select"
              multiple
              label="Order Items"
              name="country"
              validation="required"
              :changeMenuState="changeDetect()"
              :options="orderItems"
              :help="'Note : Use ctrl for select multiple items'"
            />
          </FormKit>

        </div>
        <div class="col-12 items">
          <div class="row p-1 " v-for="item in  this.formData.items" :key="item">
            <div class="col">
              {{item.value}}
            </div>
            <div class="col-auto">
              {{ item.price }}$
            </div>
            <div class="col-2">
              <div class="d-flex flex-row justify-content-center quantity">
                <div class="minus"  @click="minusQuantity(item)">-</div>
                <input type="number" class="count" name="qty" :value="item.quantity">
                <div class="plus" @click="plusQuantity(item)">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-xl-6 d-flex flex-column gap-2">
      <div class="card">
        <div class="card-body">
          <div class="row p-2">
            <div class="custom-title col-12 mb-2">
              Delivery Details
            </div>
            <div class="row">
              <div class="col d-flex flex-column">
                <label>Order Item</label>
                <value v-for="item in  this.formData.items" :key="item" >{{ item.value }}</value>
              </div>
              <div class="col d-flex flex-column text-center">
                <label>Number</label>
                <value v-for="item in  this.formData.items" :key="item">{{ item.quantity }}</value>
              </div>
              <div class="col d-flex flex-column text-center">
                <label>Costs</label>
                <value v-for="item in  this.formData.items" :key="item">{{ item.price * item.quantity }} $</value>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="row p-2">
            <div class="col custom-title">
              Total Amount
            </div>
            <div class="col"></div>
            <div class="col custom-title">
              <value>{{ this.formData.items.reduce((a, b) => +a + (+b.price * b.quantity), 0) }} $</value>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <button type="button" class="btn btn-outline-danger w-100">Cancel</button>
        </div>
        <div class="col-6">
          <button type="button" class="btn btn-success w-100" :disabled="checkInvalid()" @click="submitHandler()">Add Order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CreateOrder',
  components: {},
  data() {
    this.$store.dispatch('getOrders', 'all');
    return {
      orderItems: [
        {label: 'Vegi pizza ( $15 ) ', value: 'Vegi Pizza', price: 15},
        {label: 'Special Hamburger ( $13 ) ', value: 'Special Hamburger', price: 13},
        {label: 'Cake no Sugar ( $2 ) ', value: 'Cake no Sugar', price: 2},
        {label: 'Ayran ( $2 )', value: 'Ayran', price: 2},
        {label: 'Sprite ( $2 )', value: 'Sprite', price: 2},
        {label: 'Lahmacun ( $20 )', value: 'Lahmacun', price: 20},
        {label: 'Kapalı Pide ( $22 )', value: 'Kapalı Pide', price: 22},
        {label: 'Kaşarlı Pide ( $22 )', value: 'Kaşarlı Pide', price: 22},
        {label: 'Kıymalı Kaşarlı Pide ( $22 )', value: 'Kıymalı Kaşarlı Pide', price: 22},
        {label: 'Levrek ( $25 )', value: 'Levrek', price: 25},
        {label: 'Norveç Somon ( $30 )', value: 'Norveç Somon', price: 30},
        {label: 'Hamsi Tava ( $25 )', value: 'Hamsi Tava', price: 25}
      ],
      formValue: {
        name: 'John Doe',
        contact: '+90 555 55 55 ',
        transferType: 'delivery',
        extraNote: 'test',
        date: new Date().getTime(),
        orderNumber: this.$store.state.orderList?.length + 1
      },
      values: [],
      formData: {
        items: []
      },
      totalValue: 0
    }
  },
  methods: {
    submitHandler() {
      const data = {
        ...this.formValue,
        items: this.formData.items,
        totalValue: this.formData?.items.reduce((a, b) => +a + (+b.price * b.quantity), 0),
        type: 'New'
      };
      this.$store.dispatch('addNewOrder', data);
      this.$router.push('/orders?filter=New');
    },
    minusQuantity(item) {
      const selectedItem = this.formData.items.find(x => x.value === item?.value);
      const selectedIndex = this.formData.items.findIndex(x => x.value === item?.value);
      if (selectedItem.quantity === 0) {
      } else {
        this.formData.items[selectedIndex] = {
          ...selectedItem,
          quantity: selectedItem.quantity - 1
        }
      }
    },
    plusQuantity(item) {
      const selectedItem = this.formData.items.find(x => x.value === item?.value);
      const selectedIndex = this.formData.items.findIndex(x => x.value === item?.value);
      this.formData.items[selectedIndex] = {
        ...selectedItem,
        quantity: selectedItem.quantity + 1
      }
    },
    changeDetect() {
      const list = [];
      for (var i = 0; i < this.values.length; i++) {
        const selectedItem = this.orderItems.find(x => x.value === this.values[i]);
        list.push({
          value: selectedItem.value,
          name: selectedItem.label,
          price: selectedItem.price,
          quantity: this.formData.items.find(x => x.value === this.values[i])?.quantity ? this.formData.items.find(x => x.value === this.values[i])?.quantity : 0
        });
      }
      this.formData.items = list;
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('default', {dateStyle: 'long'}).format(date);
    },
    checkInvalid() {
      const checkAnyItem = this.formData?.items?.findIndex(x => x.quantity >= 1) !== -1;
      return !(checkAnyItem > 0 && this.$refs.form1?.node?.context?.state?.valid)
    }
  }
}
</script>

<style scoped lang="scss">
label {
  font-weight: 100;
  opacity: 0.7;
  font-size: 14px;
}

.items{
  height:150px;
  overflow: auto;
}

.quantity{
  border:1px solid black;
  border-radius:15px;
  input{
    border: 0;
    width: 30%;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input:disabled{
    background-color:white;
  }
  .minus{
    min-width:15px;
    cursor:pointer;
    text-align:center
  }
  .plus{
    min-width:15px;
    cursor:pointer;
    text-align:center
  }
}

</style>
