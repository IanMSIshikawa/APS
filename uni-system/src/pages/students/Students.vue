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
            @close-dialog="closeRegisterDialog"
            @save-student="saveAndReloadRegisterStudent"
          />
          <div
            v-if="students.length"
            class="col-auto q-mx-xl"
          >
            <students-table
              :_students="students"
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
import { dummyStudent } from './studentConfig.js'

export default {
  components: {
    StudentRegister: () => import('./StudentRegister.vue'),
    StudentsTable: () => import('./StudentsTable.vue')
  },
  data: function () {
    return {
      isRegisterStudentOpen: false,
      students: dummyStudent
    }
  },
  methods: {
    openRegisterStudentDialog: function () {
      this.isRegisterStudentOpen = true
    },
    closeRegisterDialog: function () {
      this.isRegisterStudentOpen = false
    },
    saveAndReloadRegisterStudent: function () {
      this.isRegisterStudentOpen = false
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
