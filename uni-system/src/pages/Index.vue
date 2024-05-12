<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <HeaderPrincipal/>
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        {{ texto1 }}
      </q-card-section>
    </q-card>

    <q-card dark bordered class="bg-grey-9 my-card"
    >
      <q-card-section>
        <div class="text-h6">{{ titulo2 }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ texto2 }}
      </q-card-section>
      <q-btn v-bind:href=link1 flat> {{ titulo2 }} </q-btn>
    </q-card>

    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">{{ titulo3 }}</div>
      </q-card-section>

      <q-card-section>
        {{ texto3 }}
      </q-card-section>
    </q-card>
  
  </div>
</template>

<script>

export default {
  components: {
    HeaderPrincipal: () => import('src/components/header/HeaderPrincipal.vue')
  },
  setup () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      texto1: 'Bem vindo ao UniSystem, aqui é possível consultar tudo o que for necessário da sua universidade',
      titulo2: 'Aluno',
      texto2: 'Aqui você pode consultar suas notas e provas',
      titulo3: 'Professor',
      texto3: 'Consulte as salas, provas e horários de um professor',
      link1: 'https://google.com'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
