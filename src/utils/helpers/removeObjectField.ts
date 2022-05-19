const removeObjectField = (fieldsToRemove: object, object: any) => {
  const modifiedObject = { ...object }
  Object.keys(fieldsToRemove).forEach(fld => delete modifiedObject[fld])

  return modifiedObject
}

export default removeObjectField
