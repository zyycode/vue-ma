<template>
  <div class="btn-group" role="group">
    <button type="button" class="btn"
      v-for="(item, index) in selections"
      :title="item.label"
      :class="{active:index === nowIndex}"
      :key="item.id"
      @click="chooseSelection(index)">{{ item.label }}</button>
  </div>
</template>

<script>
export default {
  props: {
    selections: {
      type: Array,
      default: [{
        label: '请选择',
        value: 0
      }]
    }
  },
  data () {
    return {
      nowIndex: 0  
    }
  },
  methods: {
    chooseSelection(index) {
      this.nowIndex = index
      this.$emit('on-change', this.selections[index])
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

