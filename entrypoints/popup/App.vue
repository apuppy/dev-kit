<script lang="ts" setup>
import HelloWorld from "@/components/HelloWorld.vue";

document.addEventListener("DOMContentLoaded", function () {
  const openJsonParserButton = document.getElementById("openJsonParser");
  openJsonParserButton.addEventListener("click", function () {
    const extensionUrl = chrome.runtime.getURL("json-parser.html");
    chrome.tabs.create({ url: extensionUrl });
  });
});
</script>

<template>
  <div>
    <input
      type="button"
      id="openJsonParser"
      class="entry"
      value="Json Parser"
    />
  </div>
  <HelloWorld msg="WXT + Vue" />
</template>

<style scoped>
.entry {
  font-size: 1.5rem;
}
</style>
