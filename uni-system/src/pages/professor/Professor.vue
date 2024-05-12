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
            :_is-open="isRegisterProfessorOpen"
            @close-dialog="closeRegisterDialog"
            @save-professor="saveAndReloadRegisterProfessor"
          />
          <div
            v-if="professors.length"
            class="col-auto q-mx-xl"
          >
            <professors-table
              :_professors="professors"
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
import { dummyProfessor } from './ProfessorConfig'

export default {
  components: {
    ProfessorRegister: () => import('./ProfessorRegister.vue'),
    ProfessorsTable: () => import('./ProfessorsTable.vue')
  },
  data: function () {
    return {
      isRegisterProfessorOpen: false,
      professors: dummyProfessor
    }
  },
  methods: {
    openRegisterProfessorDialog: function () {
      this.isRegisterProfessorOpen = true
    },
    closeRegisterDialog: function () {
      this.isRegisterProfessorOpen = false
    },
    saveAndReloadRegisterProfessor: function () {
      this.isRegisterProfessorOpen = false
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
