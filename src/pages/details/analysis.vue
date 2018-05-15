<template>
  <div>
    <div class="row">
      <h2>A-3型号</h2>
      <p class="well">是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略等相结合，从而发现目前网络营销活动中可能存在的问题，并为进一步修正或重新制定网络营销策略提供依据。当然这样的定义是站在网络营销管理的角度来考虑的</p>
    </div> 
    <div class="row">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">购买数量：</label>
          <div class="col-sm-3">
            <v-counter :max="10" :min="1" @on-change="onParamChange('buyNumber', $event)"></v-counter>
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-2 control-label">产品类型：</label>
          <div class="col-sm-6">
            <v-selection :selections="buyTypes" @on-change="onParamChange('buyType', $event)"></v-selection>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">有效时间：</label>
          <div class="col-sm-5">
            <v-chooser :selections="periodList" @on-change="onParamChange('period', $event)"></v-chooser>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">产品版本：</label>
          <div class="col-sm-5">
            <v-mul-chooser :selections="versionList" @on-change="onParamChange('versions', $event)"></v-mul-chooser>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">总价：</label>
          <div class="col-sm-5">
            <p class="form-control-static">{{ price }}</p>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-5">
            <button type="button" class="btn btn-success" @click="showPayDialog">立即购买</button>
          </div>
        </div>
      </form>
    </div>
    <hr>
    <div class="row">
      <h2>产品说明</h2>
        <p>网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销的价值，正如专业的财务分析报告对企业经营策略的价值。</p>

        <h3>用户行为指标</h3>
        <ul class="list-unstyled">
          <li>用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括：</li>
          <li>用户在网站的停留时间；</li>
          <li>用户来源网站（也叫“引导网站”）；</li>
          <li>用户所使用的搜索引擎及其关键词；</li>
          <li>在不同时段的用户访问量情况等。</li>
        </ul>

        <h3>浏览网站方式</h3>
        <ul class="list-unstyled">
          <li>用户上网设备类型</li>
          <li>用户浏览器的名称和版本</li>
          <li>访问者电脑分辨率显示模式</li>
          <li>用户所使用的操作系统名称和版本</li>
          <li>用户所在地理区域分布状况等</li>
        </ul>
    </div>
    <my-dialog :isShow="isShowPayDialog" @on-close="hidePayDialog">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>购买数量</th>
            <th>产品类型</th>
            <th>有效时间</th>
            <th>产品版本</th>
            <th>总价</th>
          </tr>
        </thead>       
        <tbody>
          <tr>
            <td>{{ buyNumber }}</td>
            <td>{{ buyType.label }}</td>
            <td>{{ period.label }}</td>
            <td>
              <span v-for="item in versions" :key="item.id">{{ item.label }}</span>
            </td>
            <td>{{ price }}</td>
          </tr>
        </tbody>        
      </table>
      <h4>请选择银行</h4>
        <bank-chooser @on-change="onChangeBank"></bank-chooser>
        <button type="button" class="btn btn-primary" @click="confirmBuy">确认购买</button>
    </my-dialog>
    <check-order :isShowCheckDialog="isShowCheckOrder" :orderId="orderId" :on-close-check-dialog="hidenCheckDialog"></check-order>
  </div>
</template>

<script>
import VCounter from '../../components/base/counter'
import VSelection from '../../components/base/selection'
import VMulChooser from '../../components/base/multiplyChooser'
import VChooser from '../../components/base/chooser'
import Dialog from '../../components/dialog'
import BankChooser from '../../components/bankChooser'
import CheckOrder from '../../components/checkOrder'

import _ from 'lodash'

export default {
  components: {
    VCounter,
    VSelection,
    VMulChooser,
    VChooser,
    MyDialog: Dialog,
    BankChooser,
    CheckOrder
  },
  data () {
    return {
      buyNumber: 0,
      buyType: {},
      versions: [],
      period: {},
      price: 0,
      versionList: [
        {
          label: '客户版',
          value: 0
        },
        {
          label: '代理商版',
          value: 1
        },
        {
          label: '专家版',
          value: 2
        }
      ],
      periodList: [
        {
          label: '半年',
          value: 0
        },
        {
          label: '一年',
          value: 1
        },
        {
          label: '三年',
          value: 2
        }
      ],
      buyTypes: [
        {
          label: '入门版',
          value: 0
        },
        {
          label: '中级版',
          value: 1
        },
        {
          label: '高级版',
          value: 2
        }
      ],
      isShowPayDialog: false,
      isShowErrDialog: false,
      bankId: null,
      isShowCheckOrder: false,
      orderId: null
    }
  },
  methods: {
    onParamChange (attr, val) {
      this[attr] = val
      this.getPrice()
    },
    getPrice () {
      let buyVersionArray = _.map(this.versions, (item) => {
        return item.value
      })
      let reqParam = {
        buyNumber: this.buyNumber,
        buyType: this.buyType.value,
        period: this.period.value,
        version: buyVersionArray.join(',')
      }
      this.$http.post('/api/getPrice', reqParam)
      .then((res) => {
        this.price = res.data.data.amount
      })
    },
    showPayDialog () {
      this.isShowPayDialog = true
    },
    hidePayDialog () {
      this.isShowPayDialog = false
    },
    hideErrDialog () {
      this.isShowErrDialog = false
    },
    hidenCheckDialog () {
      this.isShowCheckOrder = false
    },
    onChangeBank (bankObj) {
      this.bankId = bankObj.id
      console.log(this.bankId)
    },
    confirmBuy () {
      let buyVersionArray = _.map(this.versions, (item) => {
        return item.value
      })
      let reqParam = {
        buyNumber: this.buyNumber,
        buyType: this.buyType.value,
        period: this.period.value,
        version: buyVersionArray.join(','),
        bankId: this.bankId
      }
      this.$http.post('/api/createOrder', reqParam)
      .then((res) => {
        this.orderId = res.data.data.orderId
        this.isShowCheckOrder = true
        this.isShowPayDialog = false
      }, (err) => {
        console.log('err')
      })
    }
  },
  mounted () {
    this.buyNumber = 0
    this.buyType = this.buyTypes[0]
    this.versions = this.versionList[0]
    this.period = this.periodList[0]
    this.getPrice()
  }
}
</script>

<style scoped>
</style>

