<script lang="ts" setup>
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
  <div class="container">
    <div class="button-group">
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
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.entry {
  font-size: 1.5rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.entry:hover {
  background-color: #38a169;
}
</style>