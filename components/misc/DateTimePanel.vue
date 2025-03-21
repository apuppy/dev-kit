<template>
  <div>
    <h2>Datetime Converter</h2>
    <div class="input-group">
      <label for="timestamp">Timestamp:</label>
      <textarea id="timestamp" v-model="timestamp"></textarea>
    </div>
    <div class="button-group">
      <button @click="timestampToDatetime">➡️ Timestamp to Datetime</button>
      <button @click="datetimeToTimestamp">⬅️ Datetime to Timestamp</button>
    </div>
    <div class="input-group">
      <label for="datetime">Datetime:</label>
      <textarea id="datetime" v-model="datetime"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { format, fromUnixTime, getUnixTime } from "date-fns";

// set timestamp to current timestamp

const timestamp = ref();
const initTimestamp = getUnixTime(new Date()).toString();
timestamp.value = initTimestamp;

// set datetime based on timestamp
const datetime = ref("");
const initDatatime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
datetime.value = initDatatime;

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
/* Similar styles as Base64Md5Panel */
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
  box-sizing: border-box;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
</style>
