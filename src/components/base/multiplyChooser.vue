<template>
  <div class="btn-group" role="group">
    <button type="button" class="btn"
      v-for="(item, index) in selections"
      :title="item.label"
      :class="{active: checkActive(index)}"
      :key="item.id"
      @click="toggleSelection(index)">{{ item.label }}</button>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    selections: {
      type: Array,
      default: [{
        label: '请选择',
        indexue: 0
      }]
    }
  },
  data () {
    return {
      nowIndexes: [0]  
    }
  },
  methods: {
    toggleSelection (index) {
      if (this.nowIndexes.indexOf(index) === -1) {
        this.nowIndexes.push(index)  
      }
      else {
        this.nowIndexes = _.remove(this.nowIndexes, (idx) => {
          return idx !== index
        })
      }
      let nowObjArray = _.map(this.nowIndexes, (idx) => {
        return this.selections[idx]
      })
      this.$emit('on-change', nowObjArray)
    },
    checkActive (index) {
      return this.nowIndexes.indexOf(index) !== -1
    }
  }
}
</script>

<style scoped>
.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}
</style>

