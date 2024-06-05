const TableColumnsName = {
  ACTIONS: 'actions',
  NAME: 'name',
  PROFESSOR_NAME: 'professor_name',
  CLASS_ROOM: 'class_room',
  CLASS_TIME: 'class_time',
  CLASS_DAY: 'class_day'
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
    field: 'course_name',
    style: 'width 60px'
  },
  {
    id: TableColumnsName.PROFESSOR_NAME,
    name: TableColumnsName.PROFESSOR_NAME,
    label: 'Nome do Professor',
    align: 'left',
    field: 'professor_name',
    style: 'width 60px'
  },
  {
    id: TableColumnsName.CLASS_ROOM,
    name: TableColumnsName.CLASS_ROOM,
    label: 'Sala de Aula',
    align: 'left',
    field: 'class_room',
    style: 'width 60px'
  },
  {
    id: TableColumnsName.CLASS_DAY,
    name: TableColumnsName.CLASS_DAY,
    label: 'Dia da Semana',
    align: 'left',
    field: 'class_weekday',
    style: 'width 60px'
  },
  {
    id: TableColumnsName.CLASS_TIME,
    name: TableColumnsName.CLASS_TIME,
    label: 'Horário',
    align: 'left',
    field: 'class_time',
    style: 'width 60px'
  }
]

const dummyTake = [
  {
    name: 'Análise e Projeto de Sistemas',
    professor_name: 'Laudelino',
    class_room: 'B-105',
    class_day: 'Quarta-feira',
    class_time: '09:10'
  }
]

export {
  TableColumns,
  TableColumnsName,
  dummyTake
}
