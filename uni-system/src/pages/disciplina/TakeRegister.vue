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
              v-html="'Nome da Disciplina'"
            />
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-input
                v-model="takeName"
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
              v-html="'Sala de Aula'"
            />
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-input
                v-model="takeRoom"
                label="Sala"
                type="text"
                required
                outlined
                dense
                style="width: 800px"
              />
            </div>
            <div
              class="col-12 text-weight-medium q-mt-md"
              v-html="'Dia da Disciplina'"
            />
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-select
                v-model="takeDay"
                :options="dayOptions"
                label="Dia da Disciplina"
                required
                outlined
                dense
                style="width: 800px"
              />
            </div>
            <div
              class="col-12 text-weight-medium q-mt-md"
              v-html="'Horário da Disciplina'"
            />
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-input
                v-model="takeTime"
                label="Horário da Disciplina"
                type="time"
                hint="Native time"
                required
                outlined
                dense
                style="width: 800px"
              />
            </div>
            <div
              class="col-12 text-weight-medium text-neutral-primary-darkest fs-14 q-mt-md"
              v-html="'Professor'"
            />
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-select
                v-model="takeProfessor"
                :options="options"
                option-label="name"
                label="Professor"
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
                  @click="saveRegisterTake"
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
    _id: {
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
      takeName: '',
      takeRoom: '',
      takeDay: '',
      takeTime: '',
      takeProfessor: '',
      options: [],
      dayOptions: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      isOpen: false
    }
  },
  mounted: async function () {
    await this.getProfessorsNames(this._id)
  },
  methods: {
    closeDialog: function () {
      this.$emit('close-dialog')
    },
    saveRegisterTake: async function () {
      await this.addTake(this._id)
      this.$emit('save-take')
    },
    getProfessorsNames: async function (id) {
      try {
        const response = await axios.get(`http://localhost:4000/get/professores/${id}`)
        const data = response.data
        if (data != null) {
          this.options = data.map(professor => ({ name: professor.professor_name, id: professor.professor_id }))
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
    addTake: async function (UserId) {
      try {
        await axios.post('http://localhost:4000/insert/disciplina/', { user_id: UserId, course_name: this.takeName, professor_id: this.takeProfessor.id, class_room: this.takeRoom, class_time: this.takeTime, class_weekday: this.takeDay })
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Cadastro realizado com sucesso!'
        })
      } catch (error) {
        console.error('Erro ao cadastrar disciplina:', error.response ? error.response.data : error.message)
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
