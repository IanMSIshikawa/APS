const TableColumnsName = {
  ACTIONS: 'actions',
  NAME: 'name',
  EMAIL: 'email',
  DEPARTMENT: 'department'
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
    id: TableColumnsName.DEPARTMENT,
    name: TableColumnsName.DEPARTMENT,
    label: 'Departamento',
    align: 'left',
    field: 'department',
    style: 'width 60px'
  }
]

function getDefaultStudentFields () {
  return {
    name: null
  }
}

const dummyProfessor = [
  {
    name: 'Laudelino',
    email: 'bastos@utfpr.edu.br',
    department: 'DAINF'
  }
]

export {
  TableColumns,
  TableColumnsName,
  getDefaultStudentFields,
  dummyProfessor
}
