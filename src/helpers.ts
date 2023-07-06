export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

export function clearNewValues(data: any) {
  const newFields: any = {}

  Object.keys(data).forEach(key => {
    if ( data[key].isSelect && data[key].data.length ) {
      newFields[key] = data[key].data[0].id
    }
  })

  return newFields
}
