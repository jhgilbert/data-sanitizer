const _ = require('lodash')

/**
 *  For a given key (aka fieldName), sanitize data by 
 *  recursively replacing the the key's value with "[SANITIZED]"
 *  Return the removed values so they can be snapshotted
 *  separately if desired.
 */
function sanitizeField(data, fieldName) {
  let removedValues = []

  // handle objects (kv pairs)
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
  // handle arrays
  } else if (_.isArray(data)) {
    data.forEach(nestedData => {
      removedValues = removedValues.concat(sanitizeField(nestedData, fieldName))
    })
  }

  return removedValues
}

function validateArgs(args) {
  if (args.length > 1) {
    throw SyntaxError("sanitizeFields only takes 1 argument.")
  }

  if (!args[0].data) {
    throw SyntaxError("No data key is present in the arg passed to sanitizeFields.")
  }

  if (!args[0].fieldNames) {
    throw SyntaxError("No fieldNames key is present in the arg passed to sanitizeFields.")
  }

  if (!_.isArray(args[0].fieldNames)) {
    throw TypeError("The fieldNames key must have an array value.")
  }

  args[0].fieldNames.forEach(fieldName => {
    if (!_.isString(fieldName)) {
      throw TypeError("Field names must be strings.")
    }
  })
}

/**
 *  Given a list of field names, sanitize data.
 */
function sanitizeFields({ data, fieldNames }) {
  validateArgs(arguments)
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