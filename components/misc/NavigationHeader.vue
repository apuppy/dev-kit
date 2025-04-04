<template>
<nav>
  <button @click="emit('panel-selected', 'base64/md5')" :class="{ active: activePanel === 'base64/md5' }">
    Base64 / MD5
  </button>
  <button @click="emit('panel-selected', 'datetime')" :class="{ active: activePanel === 'datetime' }">
    Datetime
  </button>
  <button @click="emit('panel-selected', 'sql-formatter')" :class="{ active: activePanel === 'sql-formatter' }">
    SQL Formatter
  </button>
  <button @click="emit('panel-selected', 'utf8-counter')" :class="{ active: activePanel === 'utf8-counter' }">
    UTF8 Counter
  </button>
  <button @click="emit('panel-selected', 'jwt')" :class="{ active: activePanel === 'jwt' }">
    JWT
  </button>
  <button @click="emit('panel-selected', 'url-parser')" :class="{ active: activePanel === 'url-parser' }">
    URL Parser
  </button>
</nav>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const emit = defineEmits(["panel-selected"]);
const props = defineProps<{ activePanel: string }>();
</script>

<style scoped>
nav {
  display: flex;
  gap: 10px;
  padding: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #064d27;
}

button.active {
  background-color: #064d27;
}
</style>