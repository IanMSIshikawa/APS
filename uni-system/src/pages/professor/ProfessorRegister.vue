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
              v-html="'Nome do Professor'"
            />
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-input
                v-model="professorName"
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
              v-html="'Email do professor'"
            />
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-input
                v-model="professorEmail"
                label="Email"
                type="text"
                required
                outlined
                dense
                style="width: 800px"
              />
            </div>
            <div
              class="col-12 text-weight-medium q-mt-md"
              v-html="'Departamento do professor'"
            />
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-input
                v-model="professorDepartment"
                label="Departamento"
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
                  @click="saveRegisterProfessor(id)"
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
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    professorID: {
      type: [Number, String],
      required: true
    },
    _currentProfessor: {
      type: Object,
      require: true
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
      professorName: '',
      professorEmail: '',
      professorDepartment: '',
      isOpen: false,
      updated: true
    }
  },
  updated: async function () {
    if (this._currentProfessor && this.updated) {
      this.professorName = this._currentProfessor.professor_name
      this.professorEmail = this._currentProfessor.professor_email
      this.professorDepartment = this._currentProfessor.dept_name
      this.updated = false
    }
  },
  mounted: function () {

  },
  methods: {
    closeDialog: function () {
      this.updated = true
      this.professorName = ''
      this.professorEmail = ''
      this.professorDepartment = ''
      this.$emit('close-dialog')
    },
    saveRegisterProfessor: async function (id) {
      if (!this.isEdit) {
        await this.addProfessor(id)
      } else {
        await this.editProfessor(this.professorID)
      }
      this.updated = true
      this.professorName = ''
      this.professorEmail = ''
      this.professorDepartment = ''
      this.$emit('save-professor')
    },
    async addProfessor (UserId) {
      try {
        await axios.post('http://localhost:4000/insert/professor/', { user_id: UserId, professor_name: this.professorName, professor_email: this.professorEmail, dept_name: this.professorDepartment })
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Cadastro realizado com sucesso!'
        })
      } catch (error) {
        console.error('Erro ao cadastrar professor:', error.response ? error.response.data : error.message)
      }
    },
    async editProfessor (professorId) {
      try {
        await axios.put(`http://localhost:4000/update/professor/${professorId}`, { professor_name: this.professorName, professor_email: this.professorEmail, dept_name: this.professorDepartment })
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Editado com sucesso!'
        })
      } catch (error) {
        console.error('Erro ao editar professor:', error.response ? error.response.data : error.message)
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
