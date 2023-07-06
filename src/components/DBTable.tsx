import { FC, useEffect, useState } from 'react'
import Loader from './Loader'
import Form from './Form'
import { colModifiersObj, ObjectType, TableData } from '@/types'
import { addItem, deleteItem, getAll, updateAll } from '../supabaseClient'
import { TITLES, MODIFIERS, DATA_FETCHING, DATA_SCHEMA } from '../constants'

const DBTable: FC<{type: keyof typeof DATA_SCHEMA}> = ({type}) => {
  const [tableData, setTableData] = useState<TableData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setTableData(null)
    getData()
  }, [type])

  async function getData() {
    setIsLoading(true)
    setError('')

    // Поля для редактирования
    let fields: ObjectType[] = []
    // Массив заголовков таблицы
    const titles = TITLES[type]
    // Модификаторы колонок для отображения
    const colModifiers: colModifiersObj = MODIFIERS[type]

    const response = await Promise.all(DATA_FETCHING[type].map((df: any) => getAll(df.table)))

    response.forEach((res, i) => {
      if ( res.error ) setError(res.error.message)

      if ( res.status && !res.error ) {
        if ( i === 0 )
          fields = createFieldsObj(res.data)
        else
          colModifiers[DATA_FETCHING[type][i].to].data = res.data
      }
    })

    if ( fields ) {
      setTableData(() => {
        return { titles, colModifiers, fields }
      })
    }

    setIsLoading(false)
  }

  async function onSaveHandler(data: ObjectType[]) {
    setIsLoading(true)
    setError('')

    const newRes = await updateAll(type, data)

    if ( newRes.error )
      setError(newRes.error.message)
    else {
      const fields = createFieldsObj(newRes.data)

      if ( fields )
        setTableData(prev => {
          if ( prev )
            return {...prev, fields}
          else
            return null
        })
    }

    setIsLoading(false)
  }

  async function onDeleteHandler(id: number) {
    setIsLoading(true)
    setError('')

    const deleted = await deleteItem(type, id)

    if ( deleted.error )
      setError(deleted.error.message)
    else {
      const updatedRes = await getAll(type)
      const fields = createFieldsObj(updatedRes.data)

      if ( fields )
        setTableData(prev => {
          if ( prev )
            return {...prev, fields}
          else
            return null
        })
    }

    setIsLoading(false)
  }

  async function onAddHandler(data: ObjectType[]) {
    setIsLoading(true)
    setError('')

    const added = await addItem(type, data)

    if ( added.error )
      setError(added.error.message)
    else {
      const updatedRes = await getAll(type)
      const fields = createFieldsObj(updatedRes.data)

      if ( fields )
        setTableData(prev => {
          if ( prev )
            return {...prev, fields}
          else
            return null
        })
    }

    setIsLoading(false)
  }

  function createFieldsObj(data: ObjectType[] | null): ObjectType[] {
    let res: ObjectType[] = []

    if ( data )
      res = data.map((item: any) => {
        const obj: ObjectType = {}
        Object.keys(DATA_SCHEMA[type]).forEach((key: any) => obj[key] = item[key])
        return obj
      })

    return res
  }

  return (
    <div>
      {isLoading && <Loader />}

      {tableData && (
        <Form
          data={tableData}
          onSave={onSaveHandler}
          onDelete={onDeleteHandler}
          onAdd={onAddHandler}
        />
      )}

      {error && (
        <div style={{marginTop: '40px', color: 'red'}}>Error: {error}</div>
      )}
    </div>
  )
}

export default DBTable
