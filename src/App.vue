<template>
  <div class="base-app">
    <tool-bar />
    <ul id="tab-bar">
      <li
        v-for="(tab, index) in tabs"
        @click="select(tab)"
        :key="index"
        :class="{ tab: true, activeTab: selectedTab === tab }"
      >
        {{ tab }}
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ToolBar from "./components/ToolBar.vue";
export default {
  name: "App",
  components: {
    ToolBar
  },
  setup() {
    const tabs = ref(["Home", "Initiative", "Bestiary", "About"]);
    const selectedTab = ref("Home");
    const router = useRouter();

    function select(tabName) {
      selectedTab.value = tabName;
      router.push({ name: tabName });
    }

    return { tabs: tabs, selectedTab, select };
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

#tab-bar {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0 40px;
  line-height: 24px;
}

#tab-bar:before {
  z-index: 1;
}

#tab-bar:after {
  position: absolute;
  content: "";
  width: 100%;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid #aaa;
  z-index: 1;
}

.tab {
  position: relative;
  z-index: 0;
  margin: 0 -3px;
  padding: 0 20px;
  border: 1px solid #aaa;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background: linear-gradient(
    to bottom,
    rgb(235, 235, 235) 50%,
    rgb(204, 203, 203) 100%
  );
  text-shadow: 0 1px white;
  display: inline-block;
  cursor: pointer;
  user-select: none;
}

.tab:before,
.tab:after {
  position: absolute;
  bottom: -1px;
  width: 6px;
  height: 6px;
  content: " ";
  border: 1px solid #aaa;
}

.tab:before {
  left: -7px;
  border-bottom-right-radius: 6px;
  border-width: 0 1px 1px 0;
  box-shadow: 1px 0.5px 0 rgb(204, 203, 203);
}

.tab:after {
  right: -7px;
  border-bottom-left-radius: 6px;
  border-width: 0 0 1px 1px;
  box-shadow: -1px 0.5px 0 rgb(204, 203, 203);
}

.activeTab {
  z-index: 2;
  border-bottom-color: white;
  background: white;
}

.activeTab:before {
  box-shadow: 2px 2px 0 white;
}

.activeTab:after {
  box-shadow: -2px 2px 0 white;
}

@media only screen and (min-width: 700px) {
  .initiave-tracker {
    flex-direction: row-reverse;
  }
}
</style>
