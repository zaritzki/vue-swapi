<template>
  <div class="home">
    <section class="error-box" v-if="errored">
      <p>
        We're sorry, we're not able to retrieve this information at the moment.
      </p>
      <p><strong>Please try again later</strong></p>
    </section>
    <section v-else>
      <div class="loading" v-if="loading">Loading...</div>
      <div v-else>
        <div class="actions">
          <Search @keypress-search="searchTerm" :term="term" />
          <div class="button">
            <Button @btn-click="prevPage" :text="'Prev'" />
            <Button @btn-click="nextPage" :text="'Next'" />
          </div>
        </div>
        <div class="table-responsive">
          <Table @sort-column="sortColumn" :peoples="sortedResults" />
          <!-- debug: sort={{ currentSort }}, dir={{ currentSortDir }} -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

// @ is an alias to /src
import Search from '@/components/Search.vue'
import Button from '@/components/Button.vue'
import Table from '@/components/Table.vue'

export default {
  name: 'Home',
  components: {
    Search,
    Button,
    Table,
  },
  data() {
    return {
      results: [],
      term: '',
      currentSort: 'name',
      currentSortDir: 'asc',
      currentPage: 1,
      loading: true,
      errored: false,
    }
  },
  methods: {
    async fetchPeoples() {
      try {
        const res = await axios.get('https://swapi.dev/api/people/')
        const data = await res.data.results

        this.results = data

        this.loading = false
      } catch (err) {
        console.log(err)
        this.errored = true
      }
    },
    async searchTerm(term) {
      try {
        const res = await axios.get(
          `https://swapi.dev/api/people/?search=${term}`
        )
        const data = await res.data.results
        this.results = data

        this.loading = false
      } catch (err) {
        console.log(err)
        this.errored = true
      }
    },
    async nextPage() {
      try {
        let page = this.currentPage
        if (this.currentPage < 9) {
          page = page + 1
        }

        const res = await axios.get(
          'https://swapi.dev/api/people/?page=' + page
        )
        const data = await res.data.results

        this.results = data
        this.currentPage = page

        this.loading = false
      } catch (err) {
        console.log(err)
        this.errored = true
      }
    },
    async prevPage() {
      try {
        let page = this.currentPage
        if (this.currentPage > 1) {
          page = page - 1
        }

        const res = await axios.get(
          'https://swapi.dev/api/people/?page=' + page
        )
        const data = await res.data.results

        this.results = data
        this.currentPage = page

        this.loading = false
      } catch (err) {
        console.log(err)
        this.errored = true
      }
    },
    sortColumn(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
    clearResults() {
      this.term = null
      this.results = this.fetchPeoples()
    },
    handleKeydown(e) {
      if (e.keyCode === 27) {
        this.clearResults() // esc
      }
    },
  },
  created() {
    this.results = this.fetchPeoples()
    document.addEventListener('keydown', this.handleKeydown)
  },
  computed: {
    sortedResults() {
      return this.results.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    },
  },
  watch: {
    searchTerm(term) {
      if (term) this.searchTerm()
      else this.clearResults()
    },
  },
}
</script>

<style scope>
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
