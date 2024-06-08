<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 400px">
      <q-page-container>
        <q-page>
          <div class="row justify-between q-mx-xl q-mt-xl">
            <p class="text-weight-bold text-h5 lw-40 q-mx-xl">{{ 'Professores' }}</p>
            <q-btn
              class="register-button q-mx-xl"
              color="primary"
              label="Cadastrar professor"
              no-caps
              @click="openRegisterProfessorDialog"
            />
          </div>
          <professor-register
            :_is-open="isRegisterProfessorOpen || isEditProfessor"
            :id="id"
            :isEdit="isEditProfessor"
            :professorID="professorId"
            :_currentProfessor="currentProfessor"
            @close-dialog="closeRegisterDialog"
            @save-professor="saveAndReloadRegisterProfessor"
          />
          <div
            v-if="professors.length"
            class="col-auto q-mx-xl"
          >
            <professors-table
              :_professors="professors"
              :isEdit="isEditProfessor"
              @save-professor="saveAndReloadRegisterProfessor"
              @edit-professor="openEditProfessorDialog($event)"
            />
          </div>
          <q-card
            v-else
            flat
            class="q-pa-lg q-mt-md text-center"
          >
            <div
              class="text-neutral-primary-dark"
              v-html="'Não existem professores cadastrados. Para adicionar, clique no botão.'"
            />
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {
    ProfessorRegister: () => import('./ProfessorRegister.vue'),
    ProfessorsTable: () => import('./ProfessorsTable.vue')
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data: function () {
    return {
      isEditProfessor: false,
      isRegisterProfessorOpen: false,
      professorId: null,
      currentProfessor: null,
      professors: []
    }
  },
  mounted: async function () {
    await this.getProfessors(this.id)
  },
  methods: {
    openEditProfessorDialog: async function (event) {
      this.professorId = event.professor_id
      this.currentProfessor = event
      this.isEditProfessor = true
    },
    openRegisterProfessorDialog: function () {
      this.isRegisterProfessorOpen = true
    },
    closeRegisterDialog: function () {
      this.isRegisterProfessorOpen = false
      this.isEditProfessor = false
      this.currentProfessor = null
      this.updated = true
    },
    saveAndReloadRegisterProfessor: async function () {
      this.isRegisterProfessorOpen = false
      await this.getProfessors(this.id)
    },
    getProfessors: async function (id) {
      try {
        const response = await axios.get(`http://localhost:4000/get/professores/${id}`)
        const data = response.data
        if (data != null) {
          this.professors = data
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
  .register-button {
    color: black;
    font-size: 18px;
    height: 45px;
    width: 200px;
  }
</style>
