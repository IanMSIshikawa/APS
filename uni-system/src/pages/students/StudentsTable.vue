<template>
  <div class="row justify-center full-width q-px-xl q-mx-lg q-mt-lg">
      <q-virtual-scroll
        :items="_students"
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
                <q-btn
                  padding="10px 50px"
                  size="14px"
                  label="Visualizar"
                  no-caps
                  unelevated
                  borderless
                  outline
                  @click="viewStudent(item.student_id)"
                >
                </q-btn>
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
import { TableColumnsName, TableColumns } from './studentConfig'

export default {
  props: {
    _students: {
      type: Array,
      require: true
    },
    id: {
      type: [Number, String],
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
    viewStudent: async function (studentId) {
      await this.$router.push({ name: 'EstudanteID', params: { userId: this.id, id: studentId } })
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
