<template>
<div class="container">
    <h2 class="title">URL Parser</h2>
    <div class="input-group">
        <label for="url-input">Enter URL:</label>
        <input id="url-input" type="text" v-model="url" placeholder="https://example.com:8080/path?key=value" />
        <button @click="parseUrl">Parse URL</button>
    </div>
    <div v-if="parsedUrl" class="output-group">
        <h3>Parsed URL Components:</h3>
        <div><strong>Scheme:</strong> {{ parsedUrl.scheme }}</div>
        <div><strong>Host:</strong> {{ parsedUrl.host }}</div>
        <div><strong>Port:</strong> {{ parsedUrl.port || "N/A" }}</div>
        <div><strong>Path:</strong> {{ parsedUrl.path }}</div>
        <div><strong>Query Parameters:</strong></div>
        <ul>
            <li v-for="(value, key) in parsedUrl.queryParams" :key="key">
                <strong>{{ key }}:</strong> {{ value }}
            </li>
        </ul>
    </div>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const url = ref("");
const parsedUrl = ref<{
    scheme: string;
    host: string;
    port: string | null;
    path: string;
    queryParams: Record<string, string>;
} | null>(null);

const parseUrl = () => {
    try {
        const urlObj = new URL(url.value);
        const queryParams: Record<string, string> = {};
        urlObj.searchParams.forEach((value, key) => {
            queryParams[key] = value;
        });

        parsedUrl.value = {
            scheme: urlObj.protocol.replace(":", ""),
            host: urlObj.hostname,
            port: urlObj.port || null,
            path: urlObj.pathname,
            queryParams,
        };
    } catch (error) {
        parsedUrl.value = null;
        alert("Invalid URL. Please enter a valid URL.");
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

.input-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
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

.output-group {
    margin-top: 20px;
}

ul {
    padding-left: 20px;
}

li {
    margin-bottom: 5px;
}
</style>