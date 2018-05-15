<template>
  <div>
    <div class="input-group">
      <span class="input-group-btn">
        <button @click="reduce" class="btn btn-success" type="button">-</button>
      </span>
      <input @keyup="fix" v-model="number" type="text" class="form-control text-center">
      <span class="input-group-btn">
        <button @click="add" class="btn btn-success" type="button">+</button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      number: this.min
    }
  },
  watch: {
    number () {
      this.$emit('on-change', this.number)
    }
  },
  methods: {
    fix () {
      let fixNumber
      if (typeof this.number === 'string') {
        fixNumber = Number(this.number.replace(/\D/g, ''))
      } else {
        fixNumber = this.number
      }
      if (fixNumber < this.min || fixNumber > this.max) {
        return this.min
      }
      this.number = fixNumber
    },
    reduce () {
      if (this.number <= this.min) {
        return
      }
      this.number--
    },
    add () {
      if (this.number >= this.max) {
        return
      }
      this.number++
    }
  }
}
</script>


