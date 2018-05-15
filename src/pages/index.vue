<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3 col-sm-3">
        <div class="left bg-color">
          <h3>全部产品</h3>
          <div v-for="product in productList" :key="product.id" class="list-group"> 
            <p class="list-group-item active">{{ product.title }}</p>
            <ul class="list-unstyled">
              <li v-for="item in product.list" :key="item.id" class="list-group-item">
                <a :href="item.url">{{ item.name }}</a>
                <span v-if="item.hot" class="hot-tag"><i class="fa fa-fire" aria-hidden="true"></i></span>
              </li>
            </ul>
            <hr v-if="!product.last" class="hr">
          </div>

          <div class="list-group">
            <h3>最新消息</h3>
            <div class="list-group">
              <ul class="list-unstyled">
                <li v-for="item in newsList" :key="item.id" class="list-group-item">
                  <a :href="item.url" class="new-item">{{ item.title }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <div class="col-md-9 col-sm-9">
        <div class="row">
          <div class="col-md-12">
            <slide-show></slide-show>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6" v-for="(item, index) in boardList" :key="item.id">
            <div class="media bg-color" :class="[{'line-last': index % 2 !== 0}, {'line-first': index % 2 === 0}]">
              <div class="media-left">
                <img class="media-object" :src="item.imgSrc" alt="one">
              </div>
              <div class="media-body">
                <h4 class="media-heading">{{ item.title }}</h4>
                <p>{{ item.description }}</p>
                <router-link class="btn btn-buy" :to="{ path: '/detail/' + item.toKey }">立即购买</router-link>
              </div>
            </div>              
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import slideShow from '../components/slideShow'

export default {
  components: {
    slideShow
  },
  created () {
    this.$http.get('api/seller')
    .then((res) => {
      this.newsList = res.data.data
    }, (err) => {
      console.log(err)
    })
  },
  data () {
    return {
      productList: {
        pc: {
          title: 'X系列',
          list: [
            {
              name: '深空灰',
              url: '/detail/count'
            },
            {
              name: '魅力粉',
              url: '/detail/forecast'
            },
            {
              name: '质感黑',
              url: '/detail/analysis',
              hot: true 
            },
            {
              name: '金属白',
              url: '/detail/publish'
            }
          ]
        },
        app: {
          title: 'Y系列',
          last: true,
          list: [
            {
              name: '深空灰',
              url: '/detail/count'
            },
            {
              name: '魅力粉',
              url: '/detail/forecast'
            },
            {
              name: '质感黑',
              url: '/detail/analysis',
              hot: true 
            },
            {
              name: '金属白',
              url: '/detail/publish'
            }
          ]
        }
      },
      newsList: [],
      boardList: [
        {
          title: '开放产品',
          description: '开放产品是一款开放产品',
          id: 'car',
          toKey: 'analysis',
          saleout: false,
          imgSrc: require('../assets/images/1.png')
        },
        {
          title: '品牌营销',
          description: '品牌营销帮助你的产品更好地找到定位',
          id: 'earth',
          toKey: 'count',
          saleout: false,
          imgSrc: require('../assets/images/2.png')
        },
        {
          title: '使命必达',
          description: '使命必达快速迭代永远保持最前端的速度',
          id: 'loud',
          toKey: 'forecast',
          saleout: true,
          imgSrc: require('../assets/images/3.png')
        },
        {
          title: '勇攀高峰',
          description: '帮你勇闯高峰，到达事业的顶峰',
          id: 'hill',
          toKey: 'publish',
          saleout: false,
          imgSrc: require('../assets/images/4.png')
        }
      ]
    }
  }
}
</script>

<style scoped>
.left h3 {
  color: #fff;
  background-color: #e63351;
  padding: 10px;
  margin-bottom: 20px;
  margin-top: 0;
  font-size: 20px;
}
.left a {
  color: black;
}
.hot-tag {
  color: red;
  font-size: 16px;
}
.bg-color {
  background-color: #fff;
}
.media {
  margin-bottom: 20px;
  padding-top: 15px;
}
.new-item {
  width: 120px;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.btn-buy {
  color: #e63351;
  border: 1px solid #e63351;
  border-radius: 2em;
  font-size: 12px;
  padding: .8em 2em .6em;
}
.btn-buy:hover {
  background-color: #e63351;
  color: #ffffff;
  transition: .3s;
}
</style>
