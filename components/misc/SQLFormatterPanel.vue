<template>
  <div class="container">
    <h2 class="title">SQL Formatter</h2>
    <div class="input-group">
      <label for="raw-sql">Raw SQL:</label>
      <textarea id="raw-sql" v-model="rawSql"></textarea>
    </div>
    <div class="output-group">
      <label for="formatted-sql">Formatted SQL:</label>
      <textarea id="formatted-sql" :value="formattedSql" readonly></textarea>
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { format } from "sql-formatter";

const rawSql = ref("");
const formattedSql = ref("");
const errorMessage = ref("");

// init a sample sql
rawSql.value =
  "SELECT d.department_name, COUNT(e.employee_id) AS total_employees, AVG(e.salary) AS average_salary FROM employees e JOIN departments d ON e.department_id = d.department_id WHERE e.hire_date >= '2023-01-01' AND e.salary > 50000 GROUP BY d.department_name HAVING COUNT(e.employee_id) > 2 ORDER BY average_salary DESC LIMIT 5;";

onMounted(() => {
  try {
    formattedSql.value = format(rawSql.value);
    errorMessage.value = "";
  } catch (error: any) {
    formattedSql.value = "";
    errorMessage.value = error.message || "Error formatting SQL.";
  }
});

watch(rawSql, (newRawSql) => {
  try {
    formattedSql.value = format(newRawSql);
    errorMessage.value = "";
  } catch (error: any) {
    formattedSql.value = "";
    errorMessage.value = error.message || "Error formatting SQL.";
  }
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

.input-group,
.output-group {
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
  overflow: auto;
  min-height: 80px;
  resize: horizontal;
}

#formatted-sql {
  min-height: 300px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
