<template>
  <div>
    <div class="q-btn__content text-center col items-center q-anchor--skip justify-center row">
      <q-dialog
        v-model="isOpen"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card
          class="register-dialog"
        >
          <q-card-section>
            <div
              class="col-12 text-weight-medium q-mt-md"
              v-html="'Nome do aluno'"
            />
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-input
                v-model="studentName"
                label="Nome"
                type="text"
                required
                outlined
                dense
                style="width: 800px"
              />
            </div>
            <div
              class="col-12 text-weight-medium q-mt-md"
              v-html="'Email do aluno'"
            />
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-input
                v-model="studentEmail"
                label="Email"
                type="text"
                required
                outlined
                dense
                style="width: 800px"
              />
            </div>
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-card-actions>
                <q-btn
                  v-close-popup
                  label="Cancelar"
                  color="neutral-primary-medium"
                  size="lg"
                  no-caps
                  unelevated
                  borderless
                  outline
                  class="cancel-button"
                  @click="closeDialog"
                >
                </q-btn>
                <q-btn
                  label="Salvar"
                  color="primary"
                  size="lg"
                  no-caps
                  class="save-button"
                  @click="saveRegisterStudent"
                >
                </q-btn>
              </q-card-actions>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    _isOpen: {
      type: Boolean,
      require: true
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  watch: {
    _isOpen: {
      immediate: true,
      handler: function (open) {
        this.isOpen = open
      }
    }
  },
  data: function () {
    return {
      studentName: '',
      studentEmail: '',
      isOpen: false
    }
  },
  methods: {
    closeDialog: function () {
      this.$emit('close-dialog')
    },
    saveRegisterStudent: async function () {
      await this.addStudent(this.id)
      this.studentEmail = ''
      this.studentName = ''
      this.$emit('save-student')
    },
    addStudent: async function (UserId) {
      try {
        await axios.post('http://localhost:4000/insert/estudante/', { user_id: UserId, student_name: this.studentName, student_email: this.studentEmail })
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Cadastro realizado com sucesso!'
        })
      } catch (error) {
        console.error('Erro ao cadastrar aluno:', error.response ? error.response.data : error.message)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.register-dialog {
  width: 700px;
  max-width: 80vw;
}

.save-button {
  color: black;
  font-size: 18px;
  height: 50px;
  width: 150px;
  margin: 0 15px;
}

.cancel-button {
  background: white;
  color: gray;
  font-size: 18px;
  height: 50px;
  width: 150px;
  margin: 0 15px;
}
</style>
