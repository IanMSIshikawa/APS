<template>
  <div class="row justify-center full-width q-px-xl q-mx-lg q-mt-lg">
      <q-virtual-scroll
        :items="_professors"
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
                  @click="editProfessor(item)"
                />
                <q-icon
                  name="delete"
                  color="red"
                  class="full-height cursor-pointer q-ml-xs"
                  size="30px"
                  @click="deleteProfessor(item.professor_id)"
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
import axios from 'axios'
import { TableColumnsName, TableColumns } from './ProfessorConfig'

export default {
  props: {
    _professors: {
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
    viewStudent: async function (id) {
      await this.$router.push({ name: this.$RouteNames.STUDENTS.STUDENT_EDIT.NAME, params: { id: id } })
    },
    deleteProfessor: async function (id) {
      try {
        await axios.delete(`http://localhost:4000/delete/professor/${id}`)
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: `Professor de id:${id} deletado com sucesso`
        })
        this.$emit('save-professor')
      } catch (error) {
        console.error('Erro ao deletar professor:', error.response ? error.response.data : error.message)
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: `Não foi possível deletar o professor de id:${id}`
        })
      }
    },
    editProfessor: function (professorID) {
      this.$emit('edit-professor', professorID)
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
