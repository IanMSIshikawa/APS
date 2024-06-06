<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 400px">
      <q-page-container>
        <q-page>
          <div class="row justify-between q-mx-xl q-mt-xl">
            <p class="text-weight-bold text-h5 lw-40 q-mx-xl">{{ 'Aluno' }}</p>
            <div class="q-mx-xl">
              <q-btn
                label="Deletar aluno"
                no-caps
                class="delete-button"
              >
              </q-btn>
              <q-btn
                label="Salvar aluno"
                color="primary"
                no-caps
                class="save-button"
                @click="saveStudent"
              >
              </q-btn>
            </div>
          </div>
          <teste-register
              :_is-open="isRegisterTestOpen"
              :_currentTest="currentTest"
              :_userId="user_id"
              @close-dialog="closeRegisterDialog"
              @save-reload-register="saveAndReloadRegisterTest"
          />
          <div class="q-mx-xl">
            <div
              class="col-12 text-weight-medium q-mt-md q-mx-xl"
              v-html="'Nome do aluno'"
            />
            <div class="row justify-left align-center q-mb-lg q-mx-xl">
              <q-input
                v-model="currentStudentName"
                label="Nome"
                type="text"
                required
                outlined
                dense
                style="width: 500px"
              />
            </div>
          </div>
          <div
            class="col-auto q-mx-xl"
          >
            <details-table
              :_studentId="id"
              :_tests="tests"
              @edit-test="openEditTestDialog($event)"
              @open-dialog="openRegisterTestDialog"
            />
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {
    DetailsTable: () => import('./DetailsTable.vue'),
    TesteRegister: () => import('./TestRegister.vue')
  },
  props: {
    id: {
      type: [Number, String],
      require: true
    },
    user_id: {
      type: [Number, String],
      require: true
    }
  },
  data: function () {
    return {
      isRegisterTestOpen: false,
      isEditTest: false,
      currentStudentName: '',
      currentTest: {},
      takes: [],
      testId: null,
      tests: []
    }
  },
  mounted: async function () {
    await this.getCurrentStudent()
    await this.getTakes()
    await this.getTests()
    console.debug(this.tests, 'TESTS')
  },
  methods: {
    saveStudent: async function () {
      await this.updateCurrentStudent()
      await this.getCurrentStudent()
      await this.$router.push({ name: 'Estudante', params: { id: this.user_id } })
    },
    openRegisterTestDialog: function () {
      this.isRegisterTestOpen = true
    },
    closeRegisterDialog: function () {
      this.isRegisterTestOpen = false
      this.isEditTest = false
    },
    saveAndReloadRegisterTest: async function () {
      this.isRegisterTestOpen = false
      this.isEditTest = false
      this.testId = null
    },
    openEditTestDialog: async function (event) {
      this.testId = event
      this.isEditTest = true
    },
    getCurrentStudent: async function () {
      try {
        const response = await axios.get(`http://localhost:4000/get/estudante/${this.user_id}/${this.id}`)
        const data = response.data
        if (data != null) {
          this.currentStudentName = data[0].student_name
        } else {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Condição não atendida!',
            icon: 'warning'
          })
        }
      } catch (error) {
        console.error('Erro ao checkar login:', error)
      }
    },
    updateCurrentStudent: async function () {
      try {
        await axios.put(`http://localhost:4000/update/estudante/${this.user_id}`, {
          student_id: this.id,
          student_name: this.currentStudentName
        })
      } catch (error) {
        console.error('Erro ao atualizar o aluno:', error)
      }
    },
    getTakes: async function () {
      try {
        const response = await axios.get(`http://localhost:4000/get/takesByStudent/${this.id}`)
        const data = response.data
        if (data != null) {
          this.takes = data.map(take => take.take_id)
        } else {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Condição não atendida!',
            icon: 'warning'
          })
        }
      } catch (error) {
        console.error('Erro ao checkar login:', error)
      }
    },
    getTests: async function () {
      try {
        console.debug(this.takes, 'TAKES')
        const response = await axios.get(`http://localhost:4000/get/tests/${this.takes}`)
        const data = response.data
        if (data != null) {
          this.tests = data
        } else {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Condição não atendida!',
            icon: 'warning'
          })
        }
      } catch (error) {
        console.error('Erro ao checkar login:', error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.student-details {
  display: flex;
  justify-content: space-between;
}

.save-button {
  color: black;
  font-size: 18px;
  height: 45px;
  width: 180px;
  margin: 0px 5px;
}

.delete-button {
  background: rgb(240, 36, 36);
  color: black;
  font-size: 18px;
  height: 45px;
  width: 180px;
  margin: 0px 5px;
}
</style>
