<template>
  <div id="detail-nav-bar">
    <nav-bar>
      <template v-slot:center>
        <div>详情页</div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
  }
</script>

<style scoped>

</style>