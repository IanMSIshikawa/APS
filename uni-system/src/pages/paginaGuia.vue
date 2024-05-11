<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 400px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>UniSystem</q-toolbar-title>
        </q-toolbar>

        <q-tabs v-model="tab" align="justify">
          <q-tab name="professor" label="professor" />
          <q-tab name="estudante" label="estudante" />
          <q-tab name="disciplinas" label="disciplinas" />
        </q-tabs>
      </q-header>
      <q-page-container>
        <q-page class="q-pa-md">
          <q-tab-panels v-model="tab">
            <q-tab-panel name="professor">
              {{ textoProfessor }}
            </q-tab-panel>
            <q-tab-panel name="estudante">
              {{ textoAluno }}
            </q-tab-panel>
            <q-tab-panel name="disciplinas">
              {{ textoCurso }}
              <q-btn to="layout" target="_blank">btn</q-btn>
            </q-tab-panel>
          </q-tab-panels>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>

export default {
  data () {
    return {
      textoProfessor: 'texto professor',
      textoAluno: 'texto aluno',
      textoCurso: 'texto curso'
    }
  }
}
</script>

<script setup>
import { ref } from 'vue'
const tab = ref('professor')
</script>
