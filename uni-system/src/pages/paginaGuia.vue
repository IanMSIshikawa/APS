<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 400px" class="flat">
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
        <q-page class="flat">
          <q-tab-panels v-model="tab">
            <q-tab-panel name="professor" align="center" >
              <p>{{ textoProfessor }}</p>
              <q-btn to="professor">{{ textoBotao }}</q-btn>
            </q-tab-panel>
            <q-tab-panel name="estudante" align="center">
              <p>{{ textoAluno }}</p>
              <q-btn to="estudante">{{ textoBotao }}</q-btn>
            </q-tab-panel>
            <q-tab-panel name="disciplinas" align="center">
              <p>{{ textoCurso }}</p>
              <q-btn to="disciplinas">{{ textoBotao }}</q-btn>
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
      textoProfessor: 'Selecione o botão acessar para consultar ou editar informações sobre professores',
      textoAluno: 'Selecione o botão acessar para consultar ou editar informações sobre alunos',
      textoCurso: 'Selecione o botão acessar para consultar ou editar informações sobre cursos',
      textoBotao: 'Acessar'
    }
  }
}
</script>

<script setup>
import { ref } from 'vue'
const tab = ref('professor')
</script>
