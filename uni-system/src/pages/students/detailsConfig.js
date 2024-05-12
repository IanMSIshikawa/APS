const TableColumnsName = {
  ACTIONS: 'actions',
  TAKE: 'take',
  TEST: 'name',
  GRADE: 'grade'
}

const TableColumns = [
  {
    id: TableColumnsName.ACTIONS,
    name: TableColumnsName.ACTIONS,
    label: 'Ações',
    align: 'center',
    field: 'actions',
    style: 'min-width: 100px'
  },
  {
    id: TableColumnsName.TAKE,
    name: TableColumnsName.TAKE,
    label: 'Disciplina',
    align: 'left',
    field: 'take',
    style: 'min-width: 450px'
  },
  {
    id: TableColumnsName.TEST,
    name: TableColumnsName.TEST,
    label: 'Prova',
    align: 'left',
    field: 'name',
    style: 'min-width: 400px'
  },
  {
    id: TableColumnsName.GRADE,
    name: TableColumnsName.GRADE,
    label: 'Nota',
    align: 'left',
    field: 'grade',
    style: 'min-width: 150px'
  }
]

function getDefaultTestFields () {
  return {
    testId: null,
    take: null,
    name: null,
    grade: null
  }
}

const dummyTest = [
  {
    take: 'Análise e Projeto de Sistemas',
    name: 'Prova 1',
    grade: 9.5,
    test_id: 1
  }
]

export {
  TableColumns,
  TableColumnsName,
  getDefaultTestFields,
  dummyTest
}
