<template>
  <div class="home">
    <wql_table></wql_table>
  </div>
</template>

<script>
// @ is an alias to /src
import wql_table from '@/components/table.vue'



export default {
  name: 'Home',
  components: {
  wql_table
  }
}
</script>
