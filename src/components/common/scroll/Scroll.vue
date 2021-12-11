<template>
  <!--
    ref的用法：
      1.ref绑定在组件中，通过this.$refs.refname获取到的是一个组件对象
      2.ref绑定在普通的标签中，通过this.$refs.refname获取到的是一个元素对象
   -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  // import ObserveImage from '@better-scroll/observe-image'
  // import ObserveDOM from '@better-scroll/observe-dom'
  // BScroll.use(ObserveImage)  //解决图片下拉时的卡顿问题
  // BScroll.use(ObserveDOM)

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        // observeDOM: true,
        // observeImage: true,
      })

      //2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll',position)
      })

      //3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        this.scroll.finishPullUp()
      })
    },
    methods: {
      /**
       * 返回顶部
       * @param x
       * @param y
       * @param time
       */
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },

      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      },

      /**
       * 重写refresh方法
       */
      refresh() {
        this.scroll && this.scroll.refresh()
        console.log('验证防抖函数');
      }
    }
  }
</script>

<style scoped>

</style>