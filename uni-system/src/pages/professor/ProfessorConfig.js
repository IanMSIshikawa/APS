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
    field: 'professor_name',
    style: 'width 60px'
  },
  {
    id: TableColumnsName.EMAIL,
    name: TableColumnsName.EMAIL,
    label: 'Email',
    align: 'left',
    field: 'professor_email',
    style: 'width 60px'
  },
  {
    id: TableColumnsName.DEPARTMENT,
    name: TableColumnsName.DEPARTMENT,
    label: 'Departamento',
    align: 'left',
    field: 'dept_name',
    style: 'width 60px'
  }
]

function getDefaultStudentFields () {
  return {
    name: null
  }
}

export {
  TableColumns,
  TableColumnsName,
  getDefaultStudentFields
}
