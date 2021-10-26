<template>
    <div>
        <div>
            男：<input type="radio" name="gender">
            女：<input type="radio" name="gender">
        </div>
        <div>
            爱好：
            打篮球<input type="checkbox" name="habits" >
            踢足球<input type="checkbox" name="habits" >
            游泳<input type="checkbox" name="habits" >
        </div>
    </div>
</template>

<style scoped>
input:checked {
    transform: scale(1.5);
}
</style>