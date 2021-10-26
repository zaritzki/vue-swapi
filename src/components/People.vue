<template>
  <tr :key="people.id">
    <td>
      <strong>{{ people.name }}</strong>
    </td>
    <td class="text-center">{{ people.height }}</td>
    <td class="text-center">{{ people.mass }}</td>
    <td class="text-center">
      {{ moment(String(people.created)).format('Do MMM YYYY hh:mm A') }}
    </td>
    <td class="text-center">
      {{ moment(String(people.edited)).format('Do MMM YYYY hh:mm  A') }}
    </td>
    <td class="text-center">
      <a @click="toggleModal">{{ people.planet.name }}</a>
      <Modal @close="toggleModal" :modalActive="modalActive">
        <div class="modal-content text-center">
          <h1>{{ people.planet.name }}</h1>
          <div class="planet">
            <p>
              <span>Diameter</span>
              {{ Intl.NumberFormat().format(people.planet.diameter) }}
            </p>
            <p><span>Climate</span> {{ people.planet.climate }}</p>
            <p>
              <span>Population</span>
              {{ Intl.NumberFormat().format(people.planet.population) }}
            </p>
          </div>
        </div>
      </Modal>
    </td>
  </tr>
</template>

<script>
import { ref } from 'vue'
import moment from 'moment'

import Modal from '@/components/Modal.vue'

export default {
  name: 'People',
  components: {
    Modal,
  },
  props: {
    people: Object,
  },
  methods: {
    moment,
  },
  setup() {
    const modalActive = ref(false)
    const toggleModal = () => {
      modalActive.value = !modalActive.value
    }
    return { modalActive, toggleModal }
  },
}
</script>

<style scoped>
td > a {
  color: #ffe81f;
  cursor: pointer;
}

.modal-content {
  color: #eee;
}
.modal-content h1 {
  font-size: 32px;
  margin-bottom: 20px;
}
.modal-content p {
  font-size: 18px;
  margin-bottom: 15px;
  text-transform: capitalize;
}
.modal-content .planet {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal-content .planet span {
  font-size: 14px;
  color: #aaa;
  display: block;
  margin-bottom: 5px;
}
</style>
