const _ = require('lodash')

/**
 *  For a given key (aka fieldName), sanitize data by 
 *  recursively replacing the the key's value with "[SANITIZED]"
 *  Return the removed values so they can be snapshotted
 *  separately if desired.
 */
const sanitizeField = (data, fieldName) => {
  let removedValues = []

  // handle objects
  if (_.isPlainObject(data)) {
    Object.keys(data).forEach(key => {
      const value = data[key]
      // sanitize any fields present at the top level
      if (key === fieldName) {
        removedValues.push(value)
        data[key] = "[SANITIZED]"
      // if the value is an object or array,
      // sanitize it recursively
      } else if (value === Object(value) || Array.isArray(value)) {
        removedValues = removedValues.concat(sanitizeField(value, fieldName))
      }
    })
  }

  // handle arrays
  if (_.isArray(data)) {
    data.forEach(nestedData => {
      removedValues = removedValues.concat(sanitizeField(nestedData, fieldName))
    })
  }

  return removedValues
}

/**
 *  Given a list of field names, sanitize data.
 */
const sanitizeFields = ({ data, fieldNames }) => {
  let removedValues = {}

  fieldNames.forEach(fieldName => {
    removedValues[fieldName] = []
    if (data === Object(data) || Array.isArray(data)) {
      removedValues[fieldName] = removedValues[fieldName].concat(sanitizeField(data, fieldName))
    }
  })

  return {
    data,
    removedValues
  }
}

module.exports = {
  sanitizeFields
}