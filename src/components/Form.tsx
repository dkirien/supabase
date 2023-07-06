import { FC, useEffect, useState } from 'react'
import { FormProps, ObjectType } from '@/types'
import { capitalize, clearNewValues } from '../helpers'

let fieldValues: ObjectType[] | null
let newFieldValues: ObjectType = {}

const Form: FC<FormProps> = ({ data, onSave, onDelete, onAdd }) => {
  const [dataFields, setDataFields] = useState<ObjectType[] | null>(null)
  const [isAddForm, setIsAddForm] = useState<boolean>(false)

  useEffect(() => {
    if ( data ) {
      fieldValues = data.fields
      setDataFields(data.fields)
      newFieldValues = clearNewValues(data.colModifiers)
    }
  }, [data])

  function clearAddForm() {
    if ( data )
      newFieldValues = clearNewValues(data.colModifiers)

    setIsAddForm(false)
  }

  return (
    <form className={'form'}>
      {data && data.fields?.length ? (
        <>
          <div className={'table-wrapper'}>
            <table className={'table'}>
              <thead>
              <tr>
                {data.titles.map((item, i) => (
                  <th key={item + i}>{item}</th>
                ))}
              </tr>
              </thead>

              <tbody>
              {dataFields?.map((item, i) => (
                <tr className={'table-row'} key={'row' + i}>
                  {Object.entries(item).map(([key, val], indx) => (
                    <td className={'table-cell'} key={`${val} + ${indx}`}>
                      {data?.colModifiers[key].editable ?
                        data?.colModifiers[key].isSelect ? (
                          <select
                            defaultValue={val as string}
                            onChange={(e) => {
                              if ( fieldValues )
                                fieldValues[i][key] = e.target.value
                            }}
                          >
                            {data?.colModifiers[key].data.map((d: any) => (
                              <option value={d.id} key={d.id}>
                                {d.name ? capitalize(d.name) : d.id}
                              </option>
                            ))}
                          </select>
                        ) : data?.colModifiers[key].isTextarea ? (
                          <textarea
                            defaultValue={val}
                            onChange={(e) => {
                              if ( fieldValues )
                                fieldValues[i][key] = e.target.value
                            }}
                          ></textarea>
                        ) : (
                          <input
                            type="text"
                            defaultValue={val}
                            onChange={(e) => {
                              if ( fieldValues )
                                fieldValues[i][key] = e.target.value
                            }}
                          />
                        ) : <div>{val}</div>}
                    </td>
                  ))}

                  <td>
                    <button type={'button'} onClick={() => onDelete(+item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          <button type={'button'} onClick={() => onSave(fieldValues)}>Save</button>
        </>
      ) : 'No items found'}

      <div>
        <button
          type={'button'}
          style={{ marginTop: '40px' }}
          onClick={() => setIsAddForm(prev => !prev)}
        >
          Add item
        </button>
      </div>

      {isAddForm && (
        <div className={'form-add'}>
          {data && Object.keys(data.colModifiers).map((colName, i) => {
            if ( data.colModifiers[colName].editable ) {
              if ( data.colModifiers[colName].isSelect ) {
                return (
                  <div key={colName + i}>
                    <label htmlFor={colName}>{data.titles[i]}</label>

                    <select
                      id={colName}
                      onChange={e => newFieldValues[colName] = e.target.value}
                    >
                      {data.colModifiers[colName].data.map((d: any) => (
                        <option value={d.id} key={d.id}>
                          {d.name ? capitalize(d.name) : d.id}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              } else if ( data.colModifiers[colName].isTextarea ) {
                return (
                  <div id={colName} key={colName + i}>
                    <label htmlFor={colName}>{data.titles[i]}</label>
                    <textarea
                      id={colName}
                      name={'new_' + colName}
                      rows={5}
                      onChange={e => newFieldValues[colName] = e.target.value}
                    ></textarea>
                  </div>
                )
              } else {
                return (
                  <div id={colName} key={colName + i}>
                    <label htmlFor={colName}>{data.titles[i]}</label>
                    <input
                      id={colName}
                      type="text"
                      name={'new_' + colName}
                      onChange={e => newFieldValues[colName] = e.target.value}
                    />
                  </div>
                )
              }
            }
          })}

          <button type={'button'} onClick={() => {
            onAdd(newFieldValues)
            clearAddForm()
          }}>Send</button>
        </div>
      )}
    </form>
  )
}

export default Form
