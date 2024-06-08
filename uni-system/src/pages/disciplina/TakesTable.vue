<template>
  <div class="row justify-center full-width q-px-xl q-mx-lg q-mt-lg">
      <q-virtual-scroll
        :items="_takes"
        :virtual-scroll-item-size="48"
        :virtual-scroll-sticky-size-start="48"
        :virtual-scroll-sticky-size-end="32"
        type="table"
        separator="cell"
        flat
        class="full-width"
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
                    class="header"
                    :style="index === 0 ? 'border-left: none' : null"
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
        <template
          v-slot="{ item, index }"
        >
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
              :style="{
                width: '300px',
                height: '30px'
              }"
            >
              <div
                v-if="col.name === 'actions'"
                class="actionButton">
                <q-icon
                  name="edit"
                  color="grey-9"
                  class="full-height cursor-pointer q-ml-xs"
                  size="30px"
                  @click="editDisciplina(item)"
                />
                <q-icon
                  name="delete"
                  color="red"
                  class="full-height cursor-pointer q-ml-xs"
                  size="30px"
                  @click="deleteDisciplina(item)"
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
      </q-virtual-scroll>
    </div>
</template>

<script>
import { TableColumnsName, TableColumns } from './TakesConfig'
import axios from 'axios'

export default {
  props: {
    _takes: {
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
  methods: {
    editDisciplina: function (disciplinaID) {
      console.debug(disciplinaID, 'EEEEE')
      this.$emit('edit-disciplina', disciplinaID)
    },
    deleteDisciplina: async function (item) {
      try {
        const disciplinaid = item.course_id
        console.debug(disciplinaid, 'disciplinaid')
        await axios.delete(`http://localhost:4000/delete/disciplina/${disciplinaid}`)
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: `Disciplina ${item.course_name} deletada`
        })
        this.$emit('save-take')
      } catch (error) {
        console.error('Erro ao deletar disciplina:', error.response ? error.response.data : error.message)
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: `Não foi possível deletar o disciplina: ${item.course_name}`
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

</style>
