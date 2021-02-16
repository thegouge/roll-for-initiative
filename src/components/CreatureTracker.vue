<template>
  <div
    :class="`initCreature ${creature.isPlayer ? 'player' : 'creature'}`"
    :data-testid="`creature-${creature.isPlayer ? 'pc' : 'npc'}`"
  >
    <div className="init-number" data-testid="creature-init">
      {{ creature.init }}
    </div>
    <input
      type="text"
      name="Creature Name"
      class="pretty-input creature-name-input"
      :value="creature.name"
      @change="(e) => changeName(creature.id, e.target.value)"
      data-testid="creature-name"
    />
    <div v-if="isPlayer">
      <label
        :htmlFor="`Creature-HP-${creature.id}`"
        style="font-weight: normal"
      >
        HP
      </label>
      <input
        type="number"
        name="Creature-HP"
        :id="`Creature-HP-${creature.id}`"
        min="0"
        class="pretty-input creature-hp"
        :value="creature.HP"
        @change="handleHPChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["creature"],
  methods: { handleHPChange() {}, changeName() {} }
};
</script>

<style>
.init-creature {
  display: flex;
  width: 80%;
  margin-bottom: 5px;
  list-style: none;
  padding: 5px 10px;
  border: var(--default-border);
  border-radius: var(--border-radius);
  font-weight: bold;
}

.init-number {
  width: 40px;
  padding: 5px;
  border-radius: 5px;
}

.creature {
  align-self: flex-end;
  background: lightpink;
}

.creature-hp {
  width: 50px;
  text-align: center;
}

.max-hp {
  width: 50px;
  text-align: center;
}

.player {
  background: lightgreen;
}

.creature-name-input {
  font-weight: bold;
  width: 40%;
}
</style>