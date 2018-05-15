<template>
  <div>
    <div class="modal" :class="isShow ? 'show' : 'fade'">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="closeMyself"><span aria-hidden="true">&times;</span></button>
            <slot name="header"></slot>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeMyself () {
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>


.show {
  background: rgba(0, 0, 0, 0.5);
}
.modal-backup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  
}
</style>

