<template>
  <div class="goods">
    <cube-scroll-nav
      :side="true"
      :data="data"
      :current="current"
      @change="changeHandler"
      @sticky-change="stickyChangeHandler">
      <cube-scroll-nav-panel
        v-for="item in data"
        :key="item.name"
        :label="item.name"
        :title="item.name">
        <ul>
          <li v-for="food in item.foods">
            <div>
              <img :src="food.icon">
              <p>{{food.name}}</p>
            </div>
          </li>
        </ul>
      </cube-scroll-nav-panel>
    </cube-scroll-nav>
  </div>
</template>

<script>
import { getGoods } from '@/api'

export default {
  data() {
    return {

    }
  },
  methods: {
    fetch() {
      getGoods().then((goods) => {
        this.goods = Object.assign({}, this.goods, goods)
      })
    },
    changeHandler(label) {
      console.log('changed to:', label)
    },
    stickyChangeHandler(current) {
      console.log('sticky-change', current)
    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
  .goods {
  }
</style>
