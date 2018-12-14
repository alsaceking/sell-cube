<template>
  <div id="app" @touchmove.prevent>
    <v-header :seller="seller"></v-header>
  </div>
</template>

<script>
import { getSeller } from '@/api'
import VHeader from '@/components/v-header/v-header'

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
  methods: {
    _getSeller() {
      getSeller().then((seller) => {
        this.seller = Object.assign({}, this.seller, seller)
      })
    }
  },
  components: {
    VHeader
  }
}
</script>

<style lang="less">
#app {

}
</style>
