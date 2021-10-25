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
        <Search @keypress-search="searchTerm" :term="term" />
        <Table :peoples="results.results" />
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

// @ is an alias to /src
import Search from '@/components/Search.vue'
import Table from '@/components/Table.vue'

export default {
  name: 'Home',
  components: {
    Search,
    Table,
  },
  data() {
    return {
      results: [],
      loading: true,
      errored: false,
      term: '',
    }
  },
  methods: {
    async fetchPeoples() {
      try {
        const res = await axios.get('https://swapi.dev/api/people/')
        const data = await res.data

        this.results = data

        /*
        data.map((people) => {
          let peopleURL = 'https://swapi.dev/api/people/'
          let peopleId = people.url
          peopleId = peopleId.replace(peopleURL, '')
          peopleId = peopleId.slice(0, peopleId.length - 1)

          data = { ...people, id: peopleId }
        })
        */

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
        const data = await res.data
        this.results = data

        this.loading = false
      } catch (err) {
        console.log(err)
        this.errored = true
      }
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
  watch: {
    searchTerm(term) {
      if (term) this.searchTerm()
      else this.clearResults()
    },
  },
}
</script>
