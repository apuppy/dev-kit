<template>
<div class="container">
  <header>
    <NavigationHeader @panel-selected="currentPanel = $event" :active-panel="currentPanel" />
  </header>
  <main>
    <Base64Md5Panel v-if="currentPanel === 'base64/md5'" />
    <DateTimePanel v-if="currentPanel === 'datetime'" />
    <SQLFormatterPanel v-if="currentPanel === 'sql-formatter'" />
    <Utf8CounterPanel v-if="currentPanel === 'utf8-counter'" />
    <JwtPanel v-if="currentPanel === 'jwt'" />
    <UrlParsePanel v-if="currentPanel === 'url-parser'" />
  </main>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import NavigationHeader from "@/components/misc/NavigationHeader.vue";
import Base64Md5Panel from "@/components/misc/Base64Md5Panel.vue";
import DateTimePanel from "@/components/misc/DateTimePanel.vue";
import SQLFormatterPanel from "@/components/misc/SQLFormatterPanel.vue";
import Utf8CounterPanel from "@/components/misc/Utf8CounterPanel.vue";
import JwtPanel from "@/components/misc/JwtPanel.vue";
import UrlParsePanel from "@/components/misc/UrlParsePanel.vue";


const currentPanel = ref("base64/md5");
</script>

<style scoped>
/* Basic layout styles */
.light {
  background-color: #f0f0f0;
  color: #333;
}

.dark {
  background-color: #333;
  color: #f0f0f0;
}

header {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

main {
  padding: 20px;
}
</style>
