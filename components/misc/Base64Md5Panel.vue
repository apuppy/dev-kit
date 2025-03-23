<template>
  <div class="container">
    <h2 class="title">Base64</h2>
    <div class="input-group">
      <label for="raw-text">Raw Text:</label>
      <textarea id="raw-text" v-model="rawText" spellcheck="false"></textarea>
    </div>
    <div class="button-group">
      <button @click="encodeBase64">➡️ Encode Base64</button>
      <button @click="decodeBase64">⬅️ Decode Base64</button>
    </div>
    <div class="input-group">
      <label for="base64-text">Base64 Text:</label>
      <textarea id="base64-text" v-model="base64Text" spellcheck="false"></textarea>
    </div>
    <h2 class="title">MD5</h2>
    <div class="input-group">
      <label for="md5-input">Input MD5ed String:</label>
      <input type="text" id="md5-input" v-model="md5Input" @keyup.enter="md5Encode" spellcheck="false" />
    </div>
    <div class="button-group">
      <button @click="md5Encode">➡️ md5</button>
    </div>
    <div class="input-group">
      <label for="md5-result">MD5 Result:</label>
      <textarea id="md5-result" v-model="md5Result" spellcheck="false"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Base64 } from "js-base64";
import CryptoJS from "crypto-js";

const rawText = ref("");
const base64Text = ref("");
const md5Input = ref("");
const md5Result = ref("");

const encodeBase64 = () => {
  base64Text.value = Base64.encode(rawText.value);
};

const decodeBase64 = () => {
  try {
    rawText.value = Base64.decode(base64Text.value);
  } catch (error) {
    rawText.value = "Invalid Base64 string";
  }
};

const md5Encode = () => {
  md5Result.value = CryptoJS.MD5(md5Input.value).toString();
};
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

.input-group,
.button-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

textarea,
input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
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
  background-color: #38a169;
}

.output-group div {
  padding: 8px;
  border: 1px solid #eee;
  background-color: #f9f9f9;
}
</style>