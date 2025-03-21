<script lang="ts" setup>
import HelloWorld from "@/components/HelloWorld.vue";

const openJsonParser = () => {
  const jsonParserUrl = chrome.runtime.getURL("json-parser.html");
  chrome.tabs.create({ url: jsonParserUrl });
};

const openMiscTools = () => {
  const miscToolsUrl = chrome.runtime.getURL("misc-tools.html");
  chrome.tabs.create({ url: miscToolsUrl });
};
</script>

<template>
  <div>
    <input
      type="button"
      id="openJsonParser"
      class="entry"
      value="Json Parser"
      @click="openJsonParser"
    />
    <input
      type="button"
      id="openMisc"
      class="entry"
      value="Misc Tools"
      @click="openMiscTools"
    />
  </div>
  <HelloWorld msg="WXT + Vue" />
</template>

<style scoped>
.entry {
  font-size: 1.5rem;
}
</style>
