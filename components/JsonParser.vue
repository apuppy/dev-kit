<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { JSONPath } from "jsonpath-plus";

const props = defineProps({
  msg: String,
});

onMounted(() => {
  console.log(props.msg);
});

const rawJSON = ref("");
const prettyJSONResult = ref("");
const errorMessage = ref("");
const jsonPath = ref("");
const showPathInput = ref(true);

const showError = (message: string) => {
  errorMessage.value = message;
};

const clearError = () => {
  errorMessage.value = "";
};

const formatJSON = (jsonString: string): string | null => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch (error: any) {
    showError("Invalid JSON");
    return null;
  }
};

const validateJSON = () => {
  const formatted = formatJSON(rawJSON.value);
  if (formatted) {
    clearError();
    prettyJSONResult.value = formatted;
  }
};

const prettyJSON = () => {
  const formatted = formatJSON(rawJSON.value);
  if (formatted) {
    clearError();
    prettyJSONResult.value = formatted;
  }
};

const showLocateInput = () => {
  showPathInput.value = true;
};

const locateJSON = () => {
  const raw = rawJSON.value;
  const path = jsonPath.value;
  try {
    const parsed = JSON.parse(raw);
    const result = JSONPath({ path: path, json: parsed });
    prettyJSONResult.value = JSON.stringify(result, null, 2);
    clearError();
  } catch (error: any) {
    showError("Invalid JSON or JSONPath.");
  }
};

const minifyJSON = () => {
  const raw = rawJSON.value;
  try {
    const parsed = JSON.parse(raw);
    prettyJSONResult.value = JSON.stringify(parsed);
    clearError();
  } catch (error: any) {
    showError("Invalid JSON");
  }
};

const copyLeft = () => {
  navigator.clipboard.writeText(rawJSON.value);
};

const copyRight = () => {
  navigator.clipboard.writeText(prettyJSONResult.value);
};

const insertSampleJSON = () => {
  rawJSON.value = JSON.stringify(
    {
      string: "Hello, world!",
      number: 42,
      boolean: true,
      null: null,
      array: [1, "two", false, null],
      object: {
        nestedString: "Nested Hello",
        nestedNumber: 123,
        nestedArray: [1, 2, 3],
      },
    },
    null,
    2
  );
};
</script>

<template>
  <div class="container">
    <div class="panel left-panel">
      <div class="panel-header">
        <button @click="insertSampleJSON">Sample JSON</button>
        <button @click="copyLeft">Copy</button>
      </div>
      <textarea v-model="rawJSON"></textarea>
    </div>
    <div class="controls">
      <div id="error-message" :style="{ color: errorMessage ? 'red' : '' }">
        {{ errorMessage }}
      </div>
      <button @click="validateJSON">Validate</button>
      <button @click="prettyJSON">Pretty</button>
      <div id="locate-control">
        <input
          v-if="showPathInput"
          type="text"
          v-model="jsonPath"
          placeholder="Enter JSON path"
          @keyup.enter="locateJSON"
        />
        <button @click="showLocateInput">Locate</button>
      </div>
      <button @click="minifyJSON">Minify</button>
    </div>
    <div class="panel right-panel">
      <div class="panel-header">
        <button @click="copyRight">Copy</button>
      </div>
      <textarea v-model="prettyJSONResult" readonly></textarea>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}

.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.left-panel {
  margin-bottom: 10px;
}

@media (min-width: 768px) {
  .left-panel {
    margin-right: 10px;
    margin-bottom: 0;
  }
}

.right-panel {
  margin-top: 10px;
}

@media (min-width: 768px) {
  .right-panel {
    margin-left: 10px;
    margin-top: 0;
  }
}

.panel-header {
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}

textarea {
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-family: monospace;
  font-size: 14px;
}

@media (min-width: 768px) {
  textarea {
    height: 400px;
  }
}

.controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
}

.controls button {
  margin-bottom: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.controls button:hover {
  background-color: #0056b3;
}

#error-message {
  margin-bottom: 10px;
  min-height: 20px;
}

#locate-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

#locate-control input[type="text"] {
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
  box-sizing: border-box;
}

.panel-header button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.panel-header button:hover {
  background-color: #1e7e34;
}
</style>
