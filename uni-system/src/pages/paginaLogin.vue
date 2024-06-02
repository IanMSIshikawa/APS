<template>
    <div class="q-pa-md" style="max-width: 400px">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="user"
          label="Usuario"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Insira um usuario valido']"
        />
        <q-input
          filled
          v-model="password"
          label="Senha"
          :type = "isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[val => val !== null && val !== '' || 'Digite uma senha válida']"
        >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
        </q-input>

        <div>
          <q-btn to="guia" label="Entrar" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
</template>
<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup () {
    const user = ref(null)
    const password = ref(null)
    const isPwd = ref(true)

    return {
      user,
      password,
      isPwd,

      onSubmit () {
      },

      onReset () {
        user.value = null
        password.value = null
      }
    }
  },
  created () {
    this.fetchMessage()
  },
  methods: {
    async fetchMessage () {
      try {
        const response = await axios.get('http://localhost:3000/src/pages/paginaLogin')
        this.user = response.data
      } catch (error) {
        console.error('Erro ao buscar mensagem:', error)
      }
    }
  }
}
</script>
