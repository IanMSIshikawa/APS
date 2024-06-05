<template>
    <div>
    <q-layout>
    <q-page-container>
     <q-page class="bg-light text-center">
    <div class="q-pa-md centered" style="max-width: 400px">
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="user"
          label="Usuário"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Insira um usuário válido']"
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
          <q-btn label="Entrar" type="submit" color="primary" @click = "checkLogin(user, password)"/>
          <q-btn label="Cadastrar" @click = "openRegisterDialog" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
      <register
            :_is-open="isRegisterOpen"
            @close-dialog="closeRegisterDialog"
      />
    </div>
    </q-page>
    </q-page-container>
    </q-layout>
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

      }
    }
  },

  components: {
    Register: () => import('./register.vue')
  },
  data: function () {
    return {
      isRegisterOpen: false
    }
  },
  created () {
  },
  methods: {
    async checkLogin (user, password) {
      try {
        const response = await axios.get(`http://localhost:4000/login/check/${user}`)
        const data = response.data
        const checkedPsw = data[0].user_password
        const userId = data[0].user_id
        console.log(checkedPsw)
        if (checkedPsw === password) {
          await this.$router.push({ name: 'Guia', params: { id: userId } })
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
    openRegisterDialog: function () {
      this.isRegisterOpen = true
    },
    closeRegisterDialog: function () {
      this.isRegisterOpen = false
    }
  }
}
</script>

<style scoped>
.window-height {
  height: 100vh;
}

.window-width {
  width: 100vw;
}
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
