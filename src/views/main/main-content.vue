<template>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
</template>

<script>

export default {
  inject: ['refresh']
}
</script>
