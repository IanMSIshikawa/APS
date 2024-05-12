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
            :_is-open="isRegisterDisciplinaOpen"
            @close-dialog="closeRegisterDialog"
            @save-take="saveAndReloadRegisterDisciplina"
          />
          <div
            v-if="takes.length"
            class="col-auto q-mx-xl"
          >
            <takes-table
              :_takes="takes"
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
import { dummyTake } from './TakesConfig'

export default {
  components: {
    TakeRegister: () => import('./TakeRegister.vue'),
    TakesTable: () => import('./TakesTable.vue')
  },
  data: function () {
    return {
      isRegisterDisciplinaOpen: false,
      takes: dummyTake
    }
  },
  methods: {
    openRegisterDisciplinaDialog: function () {
      this.isRegisterDisciplinaOpen = true
    },
    closeRegisterDialog: function () {
      this.isRegisterDisciplinaOpen = false
    },
    saveAndReloadRegisterDisciplina: function () {
      this.isRegisterDisciplinaOpen = false
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
