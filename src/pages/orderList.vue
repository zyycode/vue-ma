<template>
  <div class="container">
    <h3>您的产品</h3>
    <div>
      <div class="inline">
        <span>选择产品：</span>
        <v-selection :selections="products" @on-change="productChange"></v-selection>
      </div>
      
      <div class="inline">
        <span class="demonstration">开始：</span>
        <el-date-picker
          id="start-picker"
          v-model="value1"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <div class="inline">
        <span class="demonstration">结束</span>
        <el-date-picker
          id="end-picker"
          v-model="value2"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>

      <div class="inline">
        <span>关键词</span>
        <input type="text" v-model.lazy="query" class="form-control input-size">
      </div>

    </div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th v-for="head in tableHeads" :key="head.id" @click="changeOrderType(head)" :class="{active:head.active}">{{ head.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.period">
          <td v-for="head in tableHeads" :key="head.id">{{ item[head.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
</template>

<script>
import Vue from 'vue'
import {  DatePicker, Input } from 'element-ui';
import VSelection from '../components/base/selection'

import _ from 'lodash'

Vue.use(DatePicker)
Vue.use(Input)

export default {
  components: {
    VSelection
  },
  data () {
    return {
      query: '',
      productId: 0,
      startDate: '',
      endDate: '',
      tableData: [],
      currentOrder: 'asc',
      value1: '',
      value2: '',
      products: [
        {
          label: '数据统计',
          value: 0
        },
        {
          label: '数据预测',
          value: 1
        },
        {
          label: '流量分析',
          value: 2
        },
        {
          label: '广告发布',
          value: 3
        }
      ],
      tableHeads: [
        {
          label: '订单号',
          key: 'orderId'
        },
        {
          label: '购买产品',
          key: 'product'
        },
        {
          label: '版本类型',
          key: 'version'
        },
        {
          label: '有效时间',
          key: 'period'
        },
        {
          label: '购买日期',
          key: 'date'
        },
        {
          label: '数量',
          key: 'buyNum'
        },
        {
          label: '总价',
          key: 'amount'
        }
      ]
    }
  },
  watch: {
    query () {
      this.getList()
    }
  },
  methods: {
    productChange (obj) {
      this.productId = obj.value
      this.getList()
    },
    getList () {
      let reqParams = {
        query: this.query,
        productId: this.productId,
        startDate: this.value1,
        endDate: this.value2
      }
      this.$http.post('/api/getOrderList', reqParams)
      .then((res) => {
        this.tableData = res.data.data.list
      }, (err) => {
        console.log('err');
      })
    },
    changeOrderType (headItem) {
      this.tableHeads.map((item) => {
        item.active = false
        return item
      })
      headItem.active = true
      if (this.currentOrder === 'asc') {
        this.currentOrder = 'desc'
      }
      else if (this.currentOrder === 'desc') {
        this.currentOrder = 'asc'
      }
      this.tableData = _.orderBy(this.tableData, headItem.key, this.currentOrder)
    }
  },
  mounted () {
    this.getList()
    console.log(this.value1)
  }
}
</script>

<style scoped>
.inline {
  display: inline;
}
.input-size {
  display: inline;
  width: 150px;
}
.active {
  background-color: #35495e;
}
th {
  cursor: pointer;
}
</style>
