<template>
    <div>
        用户名：<input type="text" /> <br/>
        密码：<input type="password" />
    </div>
</template>

<style scoped>
input {
    font-family: Merriweather;
    border: 0;
    border-bottom: 2px solid black;
    outline: none;
    padding: 5px 10px;
}

input:focus {
    color: #579572;
    font-weight: bold;
}
</style>