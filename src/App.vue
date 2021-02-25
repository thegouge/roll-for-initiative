<template>
  <div class="initiative-tracker">
    <tool-bar />
    <div class="initiative-tracker">
      <add-form />
      <init-list />
    </div>
  </div>
</template>

<script>
import AddForm from "./components/AddForm.vue";
import InitList from "./components/InitList.vue";
import ToolBar from "./components/ToolBar.vue";
export default {
  name: "App",
  components: {
    ToolBar,
    AddForm,
    InitList
  }
};
</script>

<style>
.initiave-tracker {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1,
h2 {
  margin-top: 0;
}

h3 {
  margin-top: 5px;
}

@media only screen and (min-width: 700px) {
  .initiave-tracker {
    flex-direction: row-reverse;
  }
}
</style>
