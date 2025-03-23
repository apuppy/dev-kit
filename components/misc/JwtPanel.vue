<template>
  <div class="container">
    <h2 class="title">JWT Decoder</h2>
    <div class="grid-container">
      <div class="input-group">
        <label for="jwt-token">JWT Token:</label>
        <textarea id="jwt-token" v-model="jwtToken"></textarea>
        <label for="jwt-secret">JWT Secret:</label>
        <input
          id="jwt-secret"
          type="text"
          v-model="secretKey"
          @keyup.enter="decodeJwtToken(jwtToken)"
        />
        <div v-if="warnMessage" class="warn-message">{{ warnMessage }}</div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </div>
      
      <div class="output-group">
        <label for="jwt-header">Decoded Header:</label>
        <textarea id="jwt-header" v-model="decodedHeader" readonly></textarea>

        <label for="jwt-payload">Decoded Payload:</label>
        <textarea id="jwt-payload" v-model="decodedPayload" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { jwtDecode, JwtHeader } from "jwt-decode";
import * as KJUR from "jsrsasign";

const jwtToken = ref("");
const secretKey = ref("");
const decodedHeader = ref("");
const decodedPayload = ref("");
const errorMessage = ref("");
const warnMessage = ref("");

secretKey.value = "your-256-bit-secret";
jwtToken.value =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

onMounted(() => {
  decodeJwtToken(jwtToken.value);
});

watch(jwtToken, (newJwtToken) => {
  decodeJwtToken(newJwtToken);
});

const decodeJwtToken = (newJwtToken: string) => {
  if (newJwtToken) {
    try {
      const [headerBase64] = newJwtToken.split(".");
      const header: JwtHeader = JSON.parse(atob(headerBase64));
      decodedHeader.value = JSON.stringify(header, null, 2);

      const payload = jwtDecode(newJwtToken);
      decodedPayload.value = JSON.stringify(payload, null, 2);

      const { valid, errorMsg } = verifyJwtSignature(
        newJwtToken,
        secretKey.value,
        header.alg
      );
      if (!valid) {
        warnMessage.value = errorMsg;
      } else {
        warnMessage.value = "";
      }
      console.log("JWT validation result: ", valid, errorMsg);
    } catch (error: any) {
      console.log(error);
      decodedHeader.value = "";
      decodedPayload.value = "";
      errorMessage.value = error.message;
    }
  } else {
    decodedHeader.value = "";
    decodedPayload.value = "";
    errorMessage.value = "";
  }
};

const verifyJwtSignature = (
  token: string,
  secret: string,
  algorithm: string | undefined
): { valid: boolean; errorMsg: string } => {
  try {
    const isValid = KJUR.jws.JWS.verify(token, secret, [algorithm]);
    return { valid: isValid, errorMsg: "JWT signature is valid" };
  } catch (error: any) {
    return { valid: false, errorMsg: error.message };
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

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.input-group,
.output-group {
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

textarea {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 10px;
  white-space: pre-wrap;
  font-family: monospace;
  min-height: 100px;
}

.warn-message {
  color: #ff9966;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
