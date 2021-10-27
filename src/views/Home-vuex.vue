<template>
  <div class="home">
    <section class="error-box" v-if="errored">
      <p>
        We're sorry, we're not able to retrieve this information at the moment.
      </p>
      <p><strong>Please try again later</strong></p>
    </section>
    <section v-else>
      <div class="loading" v-if="pageLoader">
        <Loader />
      </div>
      <div v-else>
        <div class="actions">
          <Search @keypress-search="searchTerm" :term="$store.state.term" />
          <div class="button">
            <Button @btn-click="prevPage" :text="'Prev'" />
            <Button @btn-click="nextPage" :text="'Next'" />
          </div>
        </div>
        <div class="table-responsive">
          <keep-alive>
            <Table
              @sort-column="sortColumn"
              :peoples="sortedResults"
              :contentLoader="$store.state.contentLoader"
              :numResults="$store.state.numResults"
            />
          </keep-alive>
          <!-- debug: sort={{ currentSort }}, dir={{ currentSortDir }} -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue'
import Button from '@/components/Button.vue'
import Table from '@/components/Table.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'Home',
  components: {
    Search,
    Button,
    Table,
    Loader,
  },
  async created() {
    this.results = await this.$store.dispatch('fetchData')
    document.addEventListener('keydown', this.handleKeydown)
  },
  computed: {
    sortedResults: {
      get() {
        return $store.state.results.sort((a, b) => {
          let modifier = 1
          if ($store.state.currentSortDir === 'desc') modifier = -1
          if (a[$store.state.currentSort] < b[$store.state.currentSort])
            return -1 * modifier
          if (a[$store.state.currentSort] > b[$store.state.currentSort])
            return 1 * modifier
          return 0
        })
      },
      set(newVal) {
        this.$store.commit('setSortedResults', newVal)
      },
    },
  },
  watch: {
    searchTerm(term) {
      if (term) this.$store.dispatch('searchTerm')
      else this.$store.commit('clearResults')
    },
  },
}
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
