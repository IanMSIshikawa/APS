<template>
  <div class="row justify-center full-width q-px-xl q-mx-lg q-mt-lg">
      <q-virtual-scroll
        :items="_tests"
        :virtual-scroll-item-size="48"
        :virtual-scroll-sticky-size-start="48"
        :virtual-scroll-sticky-size-end="32"
        type="table"
        separator="cell"
        flat
        class="details-table round-10 no-shadow full-width"
        :style="{
          maxHeight: '600px',
          marginTop: '-1px',
        }"
      >
        <template
          v-slot:before
        >
          <thead
            class="thead-custom-sticky"
          >
            <template
              v-if="Columns.length"
            >
              <tr>
                <template
                  v-for="(col, index) in Columns"
                >
                  <th
                    :key="index"
                    :style="index === 0 ? 'border-left: none' : null"
                    class="header"
                  >
                    <template>
                      <span
                        v-html="col.label"
                      />
                    </template>
                  </th>
                </template>
              </tr>
            </template>
          </thead>
        </template>
        <template v-slot="{ item, index }">
          <q-tr
            :key="index"
            no-hover
            class="q-mt-md"
          >
            <q-td
              v-for="(col) in Columns"
              :key="col.name"
              no-hover
              class="table-item td-border"
              :style="col.style"
            >
              <div
                v-if="col.name === 'actions'"
                class="actionButton"
              >
                <q-icon
                  name="edit"
                  color="grey-9"
                  class="full-height cursor-pointer q-ml-xs"
                  size="30px"
                  @click="editTest(item)"
                />
                <q-icon
                  name="delete"
                  color="red"
                  class="full-height cursor-pointer q-ml-xs"
                  size="30px"
                  @click="deleteTest(item)"
                />
              </div>
              <span
                v-else
                class="text-neutral-primary-darkest q-px-sm q-ml-xs"
                v-html="item[col.field] || ''"
              />
            </q-td>
          </q-tr>
        </template>
        <template v-slot:after>
          <div class="tfoot-custom-sticky">
            <q-btn
              label="Adicionar prova"
              data-test-id="btn-add-step"
              text-color="primary"
              icon="mdi-plus-circle-outline"
              padding= "10px 20px"
              size="12px"
              flat
              outline
              no-caps
              @click="openDialog"
            />
          </div>
        </template>
      </q-virtual-scroll>
    </div>
</template>

<script>
import axios from 'axios'
import { TableColumnsName, TableColumns } from './detailsConfig'

export default {
  props: {
    _studentId: {
      type: [Number, String],
      require: true
    },
    _tests: {
      type: Array,
      require: true
    }
  },
  data: function () {
    return {
      ColumnsName: TableColumnsName,
      Columns: TableColumns
    }
  },
  mounted: function () {
  },
  methods: {
    openDialog: function () {
      this.$emit('open-dialog')
    },
    editTest: function (test) {
      this.$emit('edit-test', test)
    },
    deleteTest: async function (test) {
      try {
        const testId = test.test_id
        await axios.delete(`http://localhost:4000/delete/test/${testId}`)
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: `Prova: ${test.test_name} deletada`
        })
        this.$emit('reload-tests')
      } catch (error) {
        console.error('Erro ao deletar prova:', error.response ? error.response.data : error.message)
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: `Não foi possível deletar a prova: ${test.test_name}`
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.header {
  background: rgb(173,216,230);
  text-align: left;
}
.actionButton {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-section {
  max-width: 85vw;
  overflow: auto;
}

.details-table {
  min-width: 90%;
  max-height: 600px;
  margin-top: -1px;
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
  border: solid 1px gray;
}
</style>
