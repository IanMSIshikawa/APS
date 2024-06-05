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
              >
              </q-btn>
            </div>
          </div>
          <teste-register
              :_is-open="isRegisterTestOpen"
              :_currentTest="currentTest"
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
                v-model="currentStudent[0].name"
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
            v-if="tests.length"
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
// import { dummyStudent } from './studentConfig'
import { dummyTest } from './detailsConfig'

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
      name: null,
      currentStudent: null,
      currentTest: dummyTest[0],
      testId: null,
      tests: dummyTest
    }
  },
  methods: {
    goBackToStudents: async function () {
      await this.$router.push({ name: this.$RouteNames.STUDENTS.LIST.NAME })
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
