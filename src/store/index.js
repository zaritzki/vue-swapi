import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    results: [],
    term: '',
    currentSort: 'name',
    currentSortDir: 'asc',
    currentPage: 1,
    numResults: 0,
    pageLoader: true,
    contentLoader: false,
    errored: false,
  },
  mutations: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    updateData(state, data) {
        state.results = data

        state.pageLoader = false
        state.contentLoader = false
    },
    updateNumResults(state, data) {
      state.results = data

      state.pageLoader = false
      state.contentLoader = false
    },
    clearResults(state) {
      state.contentLoader = true

      state.term = null
      state.results = await this.fetchData()
    },
    sortColumn(s) {
      //if s == current sort, reverse
      if (s === state.currentSort) {
        state.currentSortDir =
          state.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      state.currentSort = s
    },
    setSortedResults(state, newVal) {

    }
  },
  actions: {
    async fetchData({commit}, state, value) {
      try {
        // set url
        let url = 'https://swapi.dev/api/people'
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
        commit('updateNumResults', resData.count)

        await this.sleep(500)

        // get all people results and merge the planet object on the each people
        const loadData = async (peoples) => {
          let data = []
          // peoples.map(async (people) => {})
          for (let people of peoples) {
            const res = await axios.get(people.homeworld)
            const planet = await res.data

            // merging planet with people object.
            const mergedData = { ...people, planet: planet }
            // console.log(mergedData)

            data.push(mergedData)
            await this.sleep(500)
          }
          return data
        }

        // call loadData
        loadData(peoples).then((data) => {
          commit('updateData', data)
        })
      } catch (err) {
        console.error(err)
        // this.errored = true
        state.errored = true
      }
    },
    async searchTerm(state,term) {
      try {
        state.contentLoader = true

        // call fetchData
        // const results = await this.fetchData(term)
        // TODO: Need to udpate this
      } catch (err) {
        console.error(err)
        // this.errored = true
        state.errored = true
      }
    },
    async nextPage(state) {
      try {
        // set table loader
        // this.contentLoader = true
        state.contentLoader = true

        // call fetchData
        // const results = await this.fetchData(state.currentPage++)
        // TODO: Need to udpate this
      } catch (err) {
        console.error(err)
        // this.errored = true
        state.errored = true
      }
    },
    async prevPage(state) {
      try {
        // set table loader
        state.contentLoader = true

        // call fetchData
        // const results = await this.fetchData(state.currentPage--)
        // TODO: Need to udpate this
      } catch (err) {
        console.error(err)
        state.errored = true
      }
    },
    handleKeydown({ commit }, e) {
      if (e.keyCode === 27) {
         // esc
        commit('clearResults')
      }
    },
    
  },
  getters: {},
  modules: {},
})
