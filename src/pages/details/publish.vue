<template>
  <div>
    <div class="row">
      <h2>A-4型号</h2>
      <p class="well">广告活动按照广告计划执行，到完成广告创作并形成广告作品之后，经过广告主的最后审核同意，即可送到预定的媒介发布刊播。这项工作一般由媒介部门的有关专业人员负责，他们的任务就是专门负责与有关媒介单位接洽，安排有关广告的发播事宜，并对发播质量实施监督。</p>
      </div> 
    <div class="row">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">购买数量：</label>
          <div class="col-sm-3">
            <v-counter :max="100" :min="20"></v-counter>
          </div>
        </div>
        <div class="form-group">
          <label for="inputPassword3" class="col-sm-2 control-label">行业：</label>
          <div class="col-sm-3">
            <v-selection :selections="tradeList"></v-selection>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">产品版本：</label>
          <div class="col-sm-6">
            <v-mul-chooser :selections="versionList"></v-mul-chooser>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">有效时间：</label>
          <div class="col-sm-5">
            <p class="form-control-static">半年</p>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">总价：</label>
          <div class="col-sm-5">
            <p class="form-control-static">500</p>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-5">
            <button type="submit" class="btn btn-success">立即购买</button>
          </div>
        </div>
      </form>
    </div>
    <hr>
    <div class="row">
      <h2>产品说明</h2>
      <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
      <div class="row">
        <div class="table-responsive">
          <table class="table table-bordered">
            <tbody>
                <tr>
                  <td>安全安保</td>
                  <td>办公文教</td>
                  <td>彩票</td>
                  <td>车辆物流</td>
                  <td>成人用品</td>
                  <td>出版传媒</td>
                  <td>电脑硬件</td>
                </tr>
                <tr>
                  <td>电子电工</td>
                  <td>房地产建筑装修</td>
                  <td>分类平台</td>
                  <td>服装鞋帽</td>
                  <td>箱包饰品</td>
                  <td>化工原料制品</td>
                  <td>机械设备</td>
                </tr>
                <tr>
                  <td>家庭日用品</td>
                  <td>家用电器</td>
                  <td>教育培训</td>
                  <td>节能环保</td>
                  <td>金融服务</td>
                  <td>礼品</td>
                  <td>旅游住宿</td>
                </tr>
                <tr>
                  <td>美容化妆</td>
                  <td>母婴护理</td>
                  <td>农林牧渔</td>
                  <td>软件</td>
                  <td>商务服务</td>
                  <td>生活服务</td>
                  <td>食品保健品</td>
                </tr>
                <tr>
                  <td>手机数码</td>
                  <td>通讯服务设备</td>
                  <td>网络服务</td>
                  <td>医疗服务</td>
                  <td>游戏</td>
                  <td>运动休闲娱乐</td>
                  <td>招商加盟</td>
                </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import VCounter from '../../components/base/counter'
import VSelection from '../../components/base/selection'
import VMulChooser from '../../components/base/multiplyChooser'

export default {
  components: {
    VSelection,
    VCounter,
    VMulChooser
  },
  data () {
    return {
      tradeList: [
        {
          label: '出版业',
          value: 0
        },
        {
          label: '媒体',
          value: 1
        },
        {
          label: '金融',
          value: 2
        },
        {
          label: '互联网',
          value: 3
        },
        {
          label: '游戏',
          value: 4
        }
      ],
      versionList: [
        {
          label: '初级版',
          value: 0
        },
        {
          label: '中级版',
          value: 1
        },
        {
          label: '高级版',
          value: 2
        },
        {
          label: '专家版',
          value: 3
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>

