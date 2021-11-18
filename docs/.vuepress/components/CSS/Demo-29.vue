<template>
    <div>
        用户名：<input type="text" placeholder="用户名为6-10位字符"  required pattern="^[a-z|A-Z]{6,10}$" /><br>
        密码：<input type="password" placeholder="密码为6位数字"  required pattern="^\d{6}" /><br>
    </div>
</template>

<style scoped>
input {
    border: 0;
    outline: none;
    padding: 5px 10px;
    border-bottom: 2px solid black;
    vertical-align: bottom;
}
input:valid {
    border-color: #45b787;
}
input:invalid {
    border-color: #ec2d7a;
}
</style>