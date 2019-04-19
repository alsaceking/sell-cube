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
        :options="slideOptions"
        @change="onChange"
        @scroll="onScroll"
        ref="slide"
      >
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data" ref="component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      index: this.initialIndex,
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
  mounted() {
    this.onChange(this.index)
  },
  methods: {
    onChange(current) {
      this.index = current
      const component = this.$refs.component[current]
      component.fetch && component.fetch()
    },
    onScroll(pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transform = Math.abs(pos.x) / slideWidth * tabBarWidth
      this.$refs.tabBar.setSliderTransform(transform)
    }
  }
}
</script>

<style scoped lang="less">
  .tab {
    display: flex;
    flex-direction: column;
    height: 100%;
    /deep/ .cube-tab {
      padding: 10px 0;
    }
    .slide-wrapper {
      flex: 1;
      overflow: hidden;
    }
  }
</style>
