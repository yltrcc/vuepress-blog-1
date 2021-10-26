<template>
    <div>
        用户名：<input type="text" required /><br>
        密码：<input type="password" required /><br>
        地址：<input type="text" />
    </div>
</template>

<style scoped>
input {
    font-family: Merriweather;
    border: 0;
    border-bottom: 2px solid black;
    outline: none;
}
input:valid {
    border-color: #45b787;
}
input:invalid {
    border-color: #ec2d7a;
}
</style>