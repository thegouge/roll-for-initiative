<template>
  <form
    className="preroll-form"
    @submit.prevent="preRollMonsters"
    data-testid="toolbar-form"
  >
    <div className="input-container">
      <label htmlFor="numMonsters">How Many Monsters?</label>
      <input
        className="input preroll-input"
        type="number"
        name="numMonsters"
        id="numMonsters"
        min="1"
        v-model="numPrerolledMonsters"
        @change="(e) => (numPrerolledMonsters = parseInt(e.target.value))"
        @focus="(e) => e.target.select()"
      />
    </div>
    <div className="input-container">
      <label htmlFor="monsterName">What you calling them?</label>
      <input
        className="input preroll-input preroll-name"
        type="text"
        name="monsterName"
        id="monsterName"
        v-model="preRollName"
        @change="(e) => (preRollName = e.target.value)"
        @focus="(e) => e.target.select()"
      />
    </div>
    <div className="input-container">
      <label htmlFor="initMod">Dex Modifier</label>
      <input
        className="input preroll-input"
        type="number"
        name="initMod"
        id="initMod"
        v-model="preRollInitMod"
        @change="(e) => (preRollInitMod = parseInt(e.target.value))"
        @focus="(e) => e.target.select()"
      />
    </div>
    <div className="input-container">
      <label htmlFor="preRollHP">Max HP</label>
      <input
        className="input preroll-input"
        type="number"
        name="preRollHP"
        id="preRollHP"
        min="1"
        v-model="preRollHP"
        @change="(e) => (preRollHP = parseInt(e.target.value))"
        @focus="(e) => e.target.select()"
      />
    </div>
    <input className="preroll-submit" type="submit" value="Roll monsters!" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      numPrerolledMonsters: 1,
      preRollInitMod: 0,
      preRollHP: 1,
      preRollName: ""
    };
  },
  methods: {
    preRollMonsters(e) {
      e.preventDefault();
      console.log("submit");
    }
  }
};
</script>

<style>
.preroll-input {
  width: 30px;
}

.preroll-name {
  width: 100px;
}

.preroll-submit {
  display: block;
  margin: auto;
  width: 80%;
  font-weight: bold;
  background: rgb(160, 26, 26);
  color: white;
  margin-top: 20px;
  border-radius: 5px;
  border: var(--default-border);
}

.preroll-input:focus {
  box-shadow: none;
}

@media only screen and (min-width: 400px) {
  .preroll-submit {
    font-size: 1.25rem;
  }
}
</style>