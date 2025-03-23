<template>
  <div class="container">
    <h2 class="title">Datetime Converter</h2>
    <div class="input-group">
      <label for="timestamp">Timestamp:</label>
      <textarea id="timestamp" v-model="timestamp" spellcheck="false"></textarea>
    </div>
    <div class="button-group">
      <button @click="timestampToDatetime">➡️ Timestamp to Datetime</button>
      <button @click="datetimeToTimestamp">⬅️ Datetime to Timestamp</button>
    </div>
    <div class="input-group">
      <label for="datetime">Datetime:</label>
      <textarea id="datetime" v-model="datetime" spellcheck="false"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { format, fromUnixTime, getUnixTime } from "date-fns";

// set timestamp to current timestamp
const timestamp = ref("");
const initTimestamp = getUnixTime(new Date()).toString();
timestamp.value = initTimestamp;

// set datetime based on timestamp
const datetime = ref("");
const initDatetime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
datetime.value = initDatetime;

const timestampToDatetime = () => {
  try {
    const unixTimestamp = parseInt(timestamp.value);
    if (!isNaN(unixTimestamp)) {
      const date = fromUnixTime(unixTimestamp);
      datetime.value = format(date, "yyyy-MM-dd HH:mm:ss");
    } else {
      datetime.value = "Invalid Timestamp";
    }
  } catch (error) {
    datetime.value = "Invalid Timestamp";
  }
};

const datetimeToTimestamp = () => {
  try {
    const parsedDate = new Date(datetime.value);
    const unixTimestamp = getUnixTime(parsedDate);
    if (!isNaN(unixTimestamp)) {
      timestamp.value = unixTimestamp.toString();
    } else {
      timestamp.value = "Invalid Datetime format";
    }
  } catch (error) {
    timestamp.value = "Invalid Datetime format";
  }
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

textarea {
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
</style>
