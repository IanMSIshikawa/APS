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
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Digite uma senha válida'
          ]"
        />

        <div>
          <q-btn label="Entrar" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
</template>
<script>
import { ref } from 'vue'

export default {
  setup () {
    const name = ref(null)
    const age = ref(null)
    const accept = ref(true)

    return {
      name,
      age,
      accept,

      onSubmit () {
        if (accept.value !== true) {
          console.log('aceito')
        } else {
          console.log('negado')
        }
      },

      onReset () {
        name.value = null
        age.value = null
        accept.value = true
      }
    }
  }
}
</script>
