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
                v-model="test.take"
                :options="options"
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
                v-model="test.name"
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
                v-model="test.grade"
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
import { getDefaultTestFields } from './detailsConfig'

export default {
  props: {
    _isOpen: {
      type: Boolean,
      require: true
    },
    _currentTest: {
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
      isOpen: false,
      test: getDefaultTestFields(),
      options: ['Análise e Projeto de Sistemas']
    }
  },
  methods: {
    closeDialog: function () {
      this.$emit('close-dialog')
    },
    saveRegisterTest: async function () {
      this.$emit('save-reload-register')
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
