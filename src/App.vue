<template>
  <div id="app" @touchmove.prevent>
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
import { getSeller } from '@/api'
import VHeader from '@/components/v-header/v-header'
import Tab from '@/components/tab/tab'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'

export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this._getSeller()
  },
  computed: {
    tabs() {
      return [
        {
          label: '商品',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: '评价',
          component: Ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: '商家',
          component: Seller,
          data: {
            seller: this.seller
          }
        }
      ]
    }
  },
  methods: {
    _getSeller() {
      getSeller().then((seller) => {
        this.seller = Object.assign({}, this.seller, seller)
      })
    }
  },
  components: {
    VHeader,
    Tab,
    // eslint-disable-next-line
    Goods,
    // eslint-disable-next-line
    Ratings,
    // eslint-disable-next-line
    Seller
  }
}
</script>
<style lang="less">
  #app {
    .tab-wrapper {
      position: fixed;
      top: 136px;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>
