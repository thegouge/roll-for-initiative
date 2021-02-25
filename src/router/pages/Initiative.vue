<template>
  <div class="initiative-tracker">
    <add-form />
    <init-list />
  </div>
</template>

<script>
import AddForm from "../../components/AddForm.vue";
import InitList from "../../components/InitList.vue";
export default {
  components: {
    AddForm,
    InitList
  }
};
</script>

<style></style>;
