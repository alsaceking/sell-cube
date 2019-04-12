<template>
  <div class="tab">
    <cube-tab-bar
      :useTransition="false"
      v-model="selectedLabel"
      :data="tabs"
      :showSlider="true"
      ref="tabBar">
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop="false"
        :autoPlay="false"
        :showDots="false"
        :initialIndex="index"
        ref="slide"
        :options="slideOptions"
        @change="onChange"
        @scroll="onScroll"
      >
        <cube-slide-item>
          <goods></goods>
        </cube-slide-item>
        <cube-slide-item>
          <ratings></ratings>
        </cube-slide-item>
        <cube-slide-item>
          <seller></seller>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'

export default {
  data() {
    return {
      index: 0,
      tabs: [{
        label: '项目介绍'
      },
      {
        label: '理发师'
      },
      {
        label: '评价'
      }],
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshould: 0
      }
    }
  },
  computed: {
    selectedLabel: {
      get() {
        return this.tabs[this.index].label
      },
      set(newVal) {
        this.index = this.tabs.findIndex((value) => {
          return value.label === newVal
        })
      }
    }
  },
  methods: {
    onChange(current) {
      this.index = current
    },
    onScroll(pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transform = Math.abs(pos.x) / slideWidth * tabBarWidth
      this.$refs.tabBar.setSliderTransform(transform)
    }
  },
  components: {
    Goods,
    Seller,
    Ratings
  }
}
</script>

<style scoped lang="less">
  .tab {
    /deep/ .cube-tab {
      padding: 10px 0;
    }
    display: flex;
    flex-direction: column;
    height: 100%;
    .slide-wrapper {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
