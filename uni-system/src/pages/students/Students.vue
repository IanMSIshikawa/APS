<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 400px">
      <q-page-container>
        <q-page>
          <div class="row justify-between q-mx-xl q-mt-xl">
            <p class="text-weight-bold text-h5 lw-40 q-mx-xl">{{ 'Alunos' }}</p>
            <q-btn
              class="register-button q-mx-xl"
              color="primary"
              label="Cadastrar aluno"
              no-caps
              @click="openRegisterStudentDialog"
            />
          </div>
          <student-register
            :_is-open="isRegisterStudentOpen"
            :id="id"
            @close-dialog="closeRegisterDialog"
            @save-student="saveAndReloadRegisterStudent"
          />
          <div
            v-if="students.length"
            class="col-auto q-mx-xl"
          >
            <students-table
              :_students="students"
              :id="id"
            />
          </div>
          <q-card
            v-else
            flat
            class="q-pa-lg q-mt-md text-center"
          >
            <div
              class="text-neutral-primary-dark"
              v-html="'Não existem estudantes cadastrados. Para adicionar, clique no botão.'"
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
    StudentRegister: () => import('./StudentRegister.vue'),
    StudentsTable: () => import('./StudentsTable.vue')
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data: function () {
    return {
      isRegisterStudentOpen: false,
      students: []
    }
  },
  mounted: async function () {
    await this.getStudents(this.id)
  },
  methods: {
    openRegisterStudentDialog: function () {
      this.isRegisterStudentOpen = true
    },
    closeRegisterDialog: function () {
      this.isRegisterStudentOpen = false
    },
    saveAndReloadRegisterStudent: async function () {
      this.isRegisterStudentOpen = false
      await this.getStudents(this.id)
    },
    getStudents: async function (id) {
      try {
        let response = await axios.get(`http://localhost:4000/get/estudantes/${id}`)
        let data = response.data
        if (data != null) {
          this.students = data
          for (const student of this.students) {
            response = await axios.get(`http://localhost:4000/get/testsNumberByStudent/${student.student_id}`)
            data = response.data
            if (data != null && data[0].tests_number !== 0) {
              student.tests_number = data[0].tests_number
              response = await axios.get(`http://localhost:4000/get/testAvgByStudent/${student.student_id}`)
              student.average = response.data[0].average
              response = await axios.get(`http://localhost:4000/get/testMaxByStudent/${student.student_id}`)
              student.highest_grade = response.data[0].max_grade
              response = await axios.get(`http://localhost:4000/get/testMinByStudent/${student.student_id}`)
              student.lowest_grade = response.data[0].min_grade
            } else {
              student.tests_number = 0
              student.average = 0
              student.highest_grade = 0
              student.lowest_grade = 0
              console.debug(this.students, 'ALUNOS')
            }
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .register-button {
    color: black;
    font-size: 18px;
    height: 45px;
    width: 180px;
  }
</style>
