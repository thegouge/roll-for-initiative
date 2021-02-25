<template>
  <transition name="fade">
    <div v-if="isShown" class="modal" @click.self="closeModal">
      <div class="modal-interior">
        <button class="close-btn" @click.prevent="closeModal">
          <i class="fas fa-times" />
        </button>
        <h3>{{ title }}</h3>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: ["title", "isShown"],
  setup(props, { emit }) {
    function closeModal() {
      emit("close-modal");
    }

    return { closeModal };
  }
};
</script>

<style>
.modal {
  display: block;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  transition: 0.3s;
}

.modal-interior {
  position: relative;
  width: 50%;
  margin: 100px auto;
  background: white;
  padding: 10px;
  border-radius: 5px;
  border: var(--default-border);
}

.modal-interior h3 {
  font-size: 1rem;
}

.close-btn {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0px;
  border: 0;
  background: transparent;
  color: red;
  font-size: 1.5rem;
}

@media only screen and (min-width: 400px) {
  .toolbar {
    width: 400px;
  }

  .modal-interior h3 {
    font-size: 1.17em;
  }
}
</style>