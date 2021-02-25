<template>
  <div class="form-container" data-testid="addForm-container">
    <h2>
      Add To Initiative
      <toggle-switch
        name="Creature Type"
        :checked="isPlayer"
        @toggle-change="togglePlayer"
      />
    </h2>
    <form
      class="add-form"
      @submit.prevent="addToInit"
      data-testid="addForm-form"
    >
      <div class="form-input">
        <label for="new-name">Name of Creature:</label>
        <input
          class="input add-input"
          type="text"
          id="new-name"
          v-model="creatureName"
          @focus="(e) => e.target.select()"
        />
      </div>

      <div class="form-input number-input">
        <label for="init-roll">Initiative:</label>
        <input
          class="input add-input"
          type="number"
          id="init-roll"
          v-model="creatureInit"
          @focus="(e) => e.target.select()"
        />
      </div>

      <div v-if="!isPlayer" class="form-input number-input">
        <label for="health">HP:</label>
        <input
          class="input add-input"
          type="number"
          id="health"
          v-model="creatureHP"
          @focus="(e) => e.target.select()"
        />
      </div>

      <input class="add-input" type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import ToggleSwitch from "./ToggleSwitch.vue";

export default {
  components: { ToggleSwitch },
  name: "AddForm",
  setup() {
    const creatureName = ref("");
    const creatureInit = ref(1);
    const creatureHP = ref(1);
    const isPlayer = ref(false);

    const togglePlayer = () => {
      isPlayer.value = !isPlayer.value;
    };

    const store = useStore();

    const addToInit = () => {
      store.commit("addToOrder", {
        creaturesToAdd: [
          {
            isPlayer: isPlayer.value,
            name: creatureName.value,
            init: creatureInit.value,
            HP: creatureHP.value,
            id: Date.now()
          }
        ]
      });
      creatureName.value = "";
      creatureInit.value = 1;
      creatureHP.value = 1;
      isPlayer.value = false;
    };

    return {
      creatureName,
      creatureInit,
      creatureHP,
      isPlayer,
      addToInit,
      togglePlayer
    };
  }
};
</script>

<style>
.form-container {
  box-sizing: border-box;
  margin: auto;
  margin-top: 0;
  width: 95%;
  /* margin-bottom: 20px; */
  padding: 10px;
  position: sticky;
  border: var(--default-border);
  border-radius: var(--border-radius);
}

.form-input {
  width: fit-content;
}

.number-input {
  display: inline-block;
}

.add-input {
  display: inline-block;
  border-radius: 5px;
  border: 1px solid gray;
  margin: 0 5px;
}

.add-input[type="number"] {
  width: 20px;
}

.add-input[type="submit"] {
  display: block;
  margin: auto;
  width: 50%;
  font-size: 1.25rem;
  font-weight: bold;
  background: rgb(160, 26, 26);
  color: white;
  margin-top: 20px;
  border: 2px solid black;
}

@media only screen and (min-width: 400px) {
  .form-container {
    width: fit-content;
  }
  .add-input[type="number"] {
    width: 45px;
  }
}
</style>