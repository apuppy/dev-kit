<template>
  <div class="container">
    <h2 class="title">UTF8 Counter</h2>
    <div class="input-group">
      <label for="text-to-count">Text:</label>
      <textarea id="text-to-count" v-model="text"></textarea>
    </div>
    <div class="result">Words length: {{ wordLength }}</div>
    <div class="result">Character length: {{ characterLength }}</div>
    <div class="result">Storage size: {{ storageSize }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const text = ref("i ♥ u");

const wordLength = computed(() => {
  return text.value
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "").length;
});

const characterLength = computed(() => {
  return text.value.length;
});

const storageSize = computed(() => {
  const byteLength = new TextEncoder().encode(text.value).length;
  const kb = byteLength / 1024;
  const mb = kb / 1024;

  return `${byteLength * 8} bit / ${byteLength.toFixed(2)} byte / ${kb.toFixed(
    2
  )} KB / ${mb.toFixed(2)} MB`;
});
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.result {
  margin-top: 10px;
}
</style>
