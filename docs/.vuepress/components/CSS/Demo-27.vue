<template>
    <div>
        <input type="button" value="enabled">
        <input type="button" value="disabled" disabled>
    </div>
</template>

<style scoped>
input {
    font-family: Merriweather;
}
input:enabled {
    color: green;
    font-weight: bold;
}
input:disabled {
    color: gray;
    font-weight: bold;
}
</style>