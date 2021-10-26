<template>
  <transition name="modal-animation">
    <div v-show="modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modalActive" class="modal-inner text-center">
          <!-- <i @click="close" class="far fa-times-circle"></i> -->
          <!-- Modal Content -->
          <slot />
          <!-- <button @click="close" type="button">Close</button> -->
          <Button @btn-click="close" :text="'Close'" />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import Button from '@/components/Button.vue'

export default {
  name: 'Modal',
  components: {
    Button,
  },
  props: ['modalActive'],
  setup(props, { emit }) {
    const close = () => {
      emit('close')
    }

    return { close }
  },
}
</script>

<style scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-animation-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-animation-inner-leave-to {
  transform: scale(0.8);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.modal .modal-inner {
  position: relative;
  max-width: 420px;
  width: 60%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #000;
  border: 5px solid rgba(255, 232, 31, 1);
  padding: 30px 30px 20px 30px;
  border-radius: 20px;
}
.modal .modal-inner i {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;
}

.modal .modal-inner i:hover {
  color: #ffe81f;
}
.modal .modal-inner button {
  width: 80px;
  margin: 30px auto 0 auto;
  padding: 8px 15px;
  border: none;
  font-size: 14px;
  background-color: #ffe81f;
  color: #000;
  text-align: center;
  cursor: pointer;
}

.modal-content {
  color: #eee;
}
</style>
