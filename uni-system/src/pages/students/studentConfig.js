const TableColumnsName = {
  ACTIONS: 'actions',
  NAME: 'name',
  EMAIL: 'email',
  TESTS_NUMBER: 'tests_number',
  AVERAGE: 'average',
  HIGHEST_GRADE: 'highest_grade',
  LOWEST_GRADE: 'lowest_grade'
}

const TableColumns = [
  {
    id: TableColumnsName.ACTIONS,
    name: TableColumnsName.ACTIONS,
    label: 'Ações',
    align: 'left',
    field: 'actions',
    style: 'width 60px'
  },
  {
    id: TableColumnsName.NAME,
    name: TableColumnsName.NAME,
    label: 'Nome',
    align: 'left',
    field: 'name',
    style: 'width 60px'
  },
  {
    id: TableColumnsName.EMAIL,
    name: TableColumnsName.EMAIL,
    label: 'Email',
    align: 'left',
    field: 'email',
    style: 'width 60px'
  },
  {
    id: TableColumnsName.TESTS_NUMBER,
    name: TableColumnsName.TESTS_NUMBER,
    label: 'Testes',
    align: 'left',
    field: 'tests_number',
    style: 'width 60px'
  },
  {
    id: TableColumnsName.AVERAGE,
    name: TableColumnsName.AVERAGE,
    label: 'Média',
    align: 'left',
    field: 'average',
    style: 'width 60px'
  },
  {
    id: TableColumnsName.HIGHEST_GRADE,
    name: TableColumnsName.HIGHEST_GRADE,
    label: 'Maior nota',
    align: 'left',
    field: 'highest_grade',
    style: 'width 60px'
  },
  {
    id: TableColumnsName.LOWEST_GRADE,
    name: TableColumnsName.LOWEST_GRADE,
    label: 'Menor nota',
    align: 'left',
    field: 'lowest_grade',
    style: 'width 60px'
  }
]

function getDefaultStudentFields () {
  return {
    name: null
  }
}

const dummyStudent = [
  {
    name: 'Lucas',
    email: 'lucas_lima.nog@hotmail.com',
    tests_number: 9,
    average: 8.5,
    highest_grade: 9.5,
    lowest_grade: 8.5,
    student_id: 1
  }
]

export {
  TableColumns,
  TableColumnsName,
  getDefaultStudentFields,
  dummyStudent
}
