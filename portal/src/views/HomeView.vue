

<script setup >
function say(message) {
    alert(message)
};
</script>
<template lang="pug">
h3 Home
<button @click="say('hi')">Say hi</button>
<button @click="say('what')">Say what</button>
</template>


