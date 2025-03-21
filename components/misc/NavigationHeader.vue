<template>
  <nav>
    <button
      @click="emit('panel-selected', 'base64/md5')"
      :class="{ active: activePanel === 'base64/md5' }"
    >
      Base64 / MD5
    </button>
    <button
      @click="emit('panel-selected', 'datetime')"
      :class="{ active: activePanel === 'datetime' }"
    >
      Datetime
    </button>
    <button
      @click="emit('panel-selected', 'sql-formatter')"
      :class="{ active: activePanel === 'sql-formatter' }"
    >
      SQL Formatter
    </button>
    <button
      @click="emit('panel-selected', 'utf8-counter')"
      :class="{ active: activePanel === 'utf8-counter' }"
    >
      UTF8 Counter
    </button>
    <button
      @click="emit('panel-selected', 'jwt')"
      :class="{ active: activePanel === 'jwt' }"
    >
      JWT
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
}

button {
  padding: 8px 15px;
  border: 1px solid #dde3ea;
  cursor: pointer;
}
.active {
  background-color: rgba(195, 202, 210);
}
</style>
