<script lang="ts" setup>
import HelloWorld from "@/components/HelloWorld.vue";

const openJsonParser = () => {
  const jsonParserUrl = chrome.runtime.getURL("json-parser.html");
  chrome.tabs.create({ url: jsonParserUrl });
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
  </div>
  <HelloWorld msg="WXT + Vue" />
</template>

<style scoped>
.entry {
  font-size: 1.5rem;
}
</style>
