<template>
  <h1>Rede</h1>

  <h2>Programs</h2>
  <ul>
    <li v-for="program in programs">{{ program.name}}</li>
  </ul>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    programs() {
      return this.$store.state.programs;
    },
  },
  mounted() {
    this.$store.dispatch('LOAD_MERCHANTS');
  },
};
</script>
