<template>
  <div>
    <div
      class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
    >
      <q-dialog
        v-model="isOpen"
        persistent transition-show="scale"
        transition-hide="scale"
      >
        <q-card
          class="register-dialog"
        >
          <q-card-section>
            <div
              class="col-12 text-weight-medium text-neutral-primary-darkest fs-14 q-mt-md"
              v-html="'Disciplina'"
            />
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-select
                v-model="courseName"
                :options="options"
                option-label="name"
                label="Disciplina"
                required
                outlined
                dense
                style="width: 800px"
              />
            </div>
            <div
              class="col-12 text-weight-medium text-neutral-primary-darkest fs-14 q-mt-md"
              v-html="'Nome da Prova'"
            />
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-input
                v-model="testName"
                :label="'Nome da prova'"
                type="text"
                required
                outlined
                dense
                style="width: 800px"
              />
            </div>
            <div
              class="col-12 text-weight-medium text-neutral-primary-darkest fs-14 q-mt-md"
              v-html="'Nota da prova'"
            />
            <div
              class="row justify-center align-center q-mb-lg"
            >
              <q-input
                v-model="testGrade"
                label="Nota da prova"
                type="number"
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
                  :label="'Salvar'"
                  color="primary"
                  size="lg"
                  no-caps
                  class="save-button"
                  @click="saveRegisterTest">
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
    _currentTest: {
      type: Object,
      require: true
    },
    _userId: {
      type: [Number, String],
      required: true
    },
    _studentId: {
      type: [Number, String],
      required: true
    },
    _testId: {
      type: [Number, String],
      required: false
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
      isOpen: false,
      testName: '',
      testGrade: '',
      courseName: '',
      options: []
    }
  },
  mounted: async function () {
    await this.getCoursesNames()
    console.debug(this.options, 'Cursos')
  },
  updated: function () {
    console.debug(this.courseName, 'AAAA')
  },
  methods: {
    closeDialog: function () {
      this.$emit('close-dialog')
    },
    saveRegisterTest: async function () {
      await this.addTake()
      await this.addTest()
      this.$emit('save-reload-register')
    },
    getCoursesNames: async function () {
      try {
        const response = await axios.get(`http://localhost:4000/get/disciplina/${this._userId}`)
        const data = response.data
        if (data != null) {
          this.options = data.map(disciplina => ({ name: disciplina.course_name, id: disciplina.course_id }))
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
    addTest: async function () {
      try {
        await axios.post('http://localhost:4000/insert/test/', { take_id: await this.getTakeByStudentAndCourse(), test_name: this.testName, grade: this.testGrade })
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Cadastro realizado com sucesso!'
        })
      } catch (error) {
        console.error('Erro ao cadastrar aluno:', error.response ? error.response.data : error.message)
      }
    },
    addTake: async function () {
      try {
        await axios.post('http://localhost:4000/insert/take/', { course_id: this.courseName.id, student_id: this._studentId })
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: 'Cadastro realizado com sucesso!'
        })
      } catch (error) {
        console.error('Erro ao cadastrar aluno:', error.response ? error.response.data : error.message)
      }
    },
    getTakeByStudentAndCourse: async function () {
      try {
        const response = await axios.get(`http://localhost:4000/get/takesByStudentAndCourse/${this._studentId}/${this.courseName.id}`)
        const data = response.data
        if (data != null) {
          console.debug(data, 'EITA')
          return data[0].take_id
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
