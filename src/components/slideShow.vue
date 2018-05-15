<template>
  <div>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in slides" :key="item.id">
        <img :src="item.src" class="img-responsive" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Vue from 'vue'
import { Carousel, CarouselItem } from 'element-ui';

Vue.use(Carousel)
Vue.use(CarouselItem)

export default {
  data () {
    return {
      slides: [
        {
          src: require('../assets/slideShow/pic1.jpg'),
          title: 'xxx1',
          href: 'detail/analysis'
        },
        {
          src: require('../assets/slideShow/pic2.jpg'),
          title: 'xxx2',
          href: 'detail/count'
        },
        {
          src: require('../assets/slideShow/pic3.jpg'),
          title: 'xxx3',
          href: 'http://xxx.xxx.com'
        },
        {
          src: require('../assets/slideShow/pic4.jpg'),
          title: 'xxx4',
          href: 'detail/forecast'
        }
      ]
    }
  }
}
</script>

