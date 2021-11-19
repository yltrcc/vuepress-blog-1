<template>
  <div>
    <ul>
      <li>I am alone!</li>
    </ul>
    <ul>
      <li>I am the first!</li>
      <li>I am the second!</li>
      <li>I am the third!</li>
    </ul>
  </div>
</template>

<style scoped>
li:only-child {
  color: red;
}
</style>