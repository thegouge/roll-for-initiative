<template>
  <div class="list-container" data-testid="initList-container">
    <h2>Initiative List</h2>
    <div
      v-if="initiative.length > 0"
      class="turn-marker"
      :style="`transform: translateY(${turnMarkerPos}px)`"
      data-testid="turn-marker"
    ></div>
    <creature-tracker
      v-for="creature in initiative"
      :key="`${creature.isPlayer ? 'player' : 'monster'}-${creature.id}`"
      :creature="creature"
    />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import CreatureTracker from "./CreatureTracker.vue";
export default {
  components: { CreatureTracker },
  setup() {
    const store = useStore();

    return {
      initiative: computed(() => store.state.init.initiative),
      turnMarkerPos: computed(() => store.getters["init/turnMarkerPosition"])
    };
  }
};
</script>

<style>
.list-container {
  position: relative;
  padding: 0;
  padding-top: 10px;
  width: 80%;
  max-height: 500px;
  margin: auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.list {
  width: 100%;

  position: relative;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.turn-marker {
  box-sizing: border-box;
  position: absolute;
  background: lightblue;
  z-index: -1;
  width: 100%;
  text-align: right;
  height: 50px;
  border-radius: var(--border-radius);
  border: var(--default-border);
  left: 0%;
  transform: translateY(49.5px);
  transition: 0.3s ease-in;
}

@media only screen and (min-width: 700px) {
  .list-container {
    width: 45%;
  }
}
</style>