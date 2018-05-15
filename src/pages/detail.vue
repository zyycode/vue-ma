<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3 col-sm-3">
        <img :src="productIcon" class="img-responsive mg-circle">
        <div class="list-group">
          <ul class="list-unstyled">
            <router-link v-for="item in products" :key="item.id" :to="{ path: item.path }" tag="li" class="list-group-item" active-class="active">{{ item.name }}</router-link>
          </ul>
        </div>
      </div>
      <div class="col-md-9 col-sm-9 bg-color">
        <keep-alive>
          <router-view ></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [
        {
          name: 'A-1型号',
          path: 'count',
          icon: require('../assets/images/1.png'),
          active: false
        },
        {
          name: 'A-2型号',
          path: 'forecast',
          active: false
        },
        {
          name: 'A-3型号',
          path: 'analysis',
          active: false
        },
        {
          name: 'A-4型号',
          path: 'publish',
          active: false
        }
      ],
      imgMap: {
        '/detail/count': require("../assets/images/1.png"),
        '/detail/forecast': require("../assets/images/2.png"),
        '/detail/analysis': require("../assets/images/3.png"),
        '/detail/publish': require("../assets/images/4.png")
      }
    }
  },
  computed: {
    productIcon () {
      return this.imgMap[this.$route.path]
    }
  }
}
</script>

<style scoped>
img {
  width: 100%;

}
.bg-color {
  background-color: #fff;
  padding: 10px 50px;
}
.list-group-item {
  cursor: pointer;
}
</style>

