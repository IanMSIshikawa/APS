<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 400px">
      <q-page-container>
        <q-page>
          <div class="row justify-between q-mx-xl q-mt-xl">
            <p class="text-weight-bold text-h5 lw-40 q-mx-xl">{{ 'Disciplinas' }}</p>
            <q-btn
              class="register-button q-mx-xl"
              color="primary"
              label="Cadastrar disciplina"
              no-caps
              @click="openRegisterDisciplinaDialog"
            />
          </div>
          <take-register
            :_is-open="isRegisterDisciplinaOpen || isEditDisciplina"
            :isEdit="isEditDisciplina"
            :_id="id"
            :disciplinaID="disciplinaId"
            :_currentDisciplina="currentDisciplina"
            @close-dialog="closeRegisterDialog"
            @save-take="saveAndReloadRegisterDisciplina"
          />
          <div
            v-if="takes.length"
            class="col-auto q-mx-xl"
          >
            <takes-table
              :_takes="takes"
              @edit-disciplina="openEditDisciplinaDialog($event)"
              @save-take="saveAndReloadRegisterDisciplina"
              :isEdit="isEditDisciplina"
            />
          </div>
          <q-card
            v-else
            flat
            class="q-pa-lg q-mt-md text-center"
          >
            <div
              class="text-neutral-primary-dark"
              v-html="'Não existem disciplinas cadastradas. Para adicionar, clique no botão.'"
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
    TakeRegister: () => import('./TakeRegister.vue'),
    TakesTable: () => import('./TakesTable.vue')
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data: function () {
    return {
      isRegisterDisciplinaOpen: false,
      isEditDisciplina: false,
      disciplinaId: null,
      currentDisciplina: null,
      takes: []
    }
  },
  mounted: async function () {
    await this.getCourses(this.id)
  },
  methods: {
    openEditDisciplinaDialog: async function (event) {
      this.disciplinaId = event.course_id
      console.debug(event, 'AAAA')
      this.currentDisciplina = event
      this.isEditDisciplina = true
    },
    openRegisterDisciplinaDialog: function () {
      this.isRegisterDisciplinaOpen = true
    },
    closeRegisterDialog: function () {
      this.isRegisterDisciplinaOpen = false
      this.isEditDisciplina = false
      this.currentDisciplina = null
      this.updated = true
    },
    saveAndReloadRegisterDisciplina: async function () {
      this.isRegisterDisciplinaOpen = false
      await this.getCourses(this.id)
    },
    getCourses: async function (id) {
      try {
        const response = await axios.get(`http://localhost:4000/get/disciplina/${id}`)
        const data = response.data
        if (data != null) {
          this.takes = data
          for (const take of this.takes) {
            take.professor_name = await this.getProfessorName(id, take.professor_id)
          }
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
    getProfessorName: async function (userId, professorId) {
      try {
        const response = await axios.get(`http://localhost:4000/get/professorCourse/${userId}/${professorId}`)
        const data = response.data
        const professorName = data[0].professor_name
        if (data != null) {
          return professorName
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
