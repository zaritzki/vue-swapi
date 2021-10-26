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
          <Search @keypress-search="searchTerm" :term="term" />
          <div class="button">
            <Button @btn-click="prevPage" :text="'Prev'" />
            <Button @btn-click="nextPage" :text="'Next'" />
          </div>
        </div>
        <div class="table-responsive">
          <Table
            @sort-column="sortColumn"
            :peoples="sortedResults"
            :contentLoader="contentLoader"
            :numResults="numResults"
          />
          <Modal @close="toggleModal" :modalActive="modalActive">
            <div class="modal-content">
              <h1>This is a Modal Header</h1>
              <p>This is a modal message</p>
            </div>
          </Modal>
          <!-- debug: sort={{ currentSort }}, dir={{ currentSortDir }} -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

// @ is an alias to /src
import Search from '@/components/Search.vue'
import Button from '@/components/Button.vue'
import Table from '@/components/Table.vue'
import Modal from '@/components/Modal.vue'
import Loader from '@/components/Loader.vue'

export default {
  name: 'Home',
  components: {
    Search,
    Button,
    Table,
    Modal,
    Loader,
  },
  data() {
    return {
      results: [],
      term: '',
      currentSort: 'name',
      currentSortDir: 'asc',
      currentPage: 1,
      numResults: 0,
      pageLoader: true,
      contentLoader: false,
      errored: false,
    }
  },
  setup() {
    const modalActive = ref(false)
    const toggleModal = () => {
      modalActive.value = !modalActive.value
    }
    return { modalActive, toggleModal }
  },
  async created() {
    this.results = await this.fetchData()
    document.addEventListener('keydown', this.handleKeydown)
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    async fetchData(value) {
      try {
        // set url
        var url = 'https://swapi.dev/api/people'
        if (value !== undefined && value !== '') {
          if (Number(value)) {
            url = `https://swapi.dev/api/people/?page=${value}`
          } else {
            url = `https://swapi.dev/api/people/?search=${value}`
          }
        }

        // call api
        const res = await axios.get(url)
        const resData = await res.data
        const peoples = resData.results

        // set the results count
        this.numResults = resData.count

        await this.sleep(500)

        // get all people results and get planning to merge it
        const loadData = async (peoples) => {
          let data = []
          // peoples.map(async (people) => {})
          for (let people of peoples) {
            const res = await axios.get(people.homeworld)
            const planet = await res.data

            // mergin planet with people object.
            const mergedData = { ...people, planet: planet }
            // console.log(mergedData)

            data.push(mergedData)
            await this.sleep(500)
          }
          return data
        }

        // call loadData
        loadData(peoples).then((data) => {
          this.results = data

          this.pageLoader = false
          this.contentLoader = false
        })
      } catch (err) {
        console.error(err)
        this.errored = true
      }
    },
    async searchTerm(term) {
      try {
        // set table loader
        this.contentLoader = true

        // call fetchData
        const results = await this.fetchData(term)
      } catch (err) {
        console.error(err)
        this.errored = true
      }
    },
    async nextPage() {
      try {
        let page = this.currentPage
        if (this.currentPage < 9) {
          page = page + 1
        }
        // set table loader
        this.contentLoader = true

        // call fetchData
        const results = await this.fetchData(page)

        // set the current page
        this.currentPage = page
      } catch (err) {
        console.error(err)
        this.errored = true
      }
    },
    async prevPage() {
      try {
        let page = this.currentPage
        if (this.currentPage > 1) {
          page = page - 1
        }
        // set table loader
        this.contentLoader = true

        // call fetchData
        const results = await this.fetchData(page)

        // set the current page
        this.currentPage = page
      } catch (err) {
        console.error(err)
        this.errored = true
      }
    },
    async clearResults() {
      // set table loader
      this.contentLoader = true

      this.term = null
      this.results = await this.fetchData()
    },
    async handleKeydown(e) {
      if (e.keyCode === 27) {
        await this.clearResults() // esc
      }
    },
    sortColumn(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
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
