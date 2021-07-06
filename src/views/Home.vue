<template>
  <div>
    <search />
  </div>
</template>

<script>
import Search from "../components/Search";

export default {
  name: "home",
  components: {
    Search
  }
};
</script>

<style lang="scss" scoped>
.next-steps {
  .fa-link {
    margin-right: 5px;
  }
}
</style>
