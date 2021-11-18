<template>
  <div>
    用户名：<input type="text" required /><br />
    密码：<input type="password" required /><br />
    电话：<input type="tel" />
  </div>
</template>

<style scoped>
input {
  border: none;
  outline: none;
  border-bottom: 2px solid black;
  padding: 5px 10px;
  vertical-align: bottom;
}
input:required {
  /* 红色 */
  border-color: #ec2d7a;
}
input:optional {
  /* 绿色 */
  border-color: #45b787;
}
</style>