const { sanitizeFields } = require("..")

test('throws error when data is not provided', () => {
  expect(() => {
    sanitizeFields({ fieldNames: ['id'] })
  }).toThrow(SyntaxError)
})

test('throws error when field names are not provided', () => {
  expect(() => {
    let data = { id: 1, name: 'Jen' }
    sanitizeFields({ data })
  }).toThrow(SyntaxError)
})

test('throws error when too many args are provided', () => {
  expect(() => {
    let data = { id: 1, name: 'Jen' }
    sanitizeFields({ data, fieldNames: ['id'] }, true)
  }).toThrow(SyntaxError)
})

test('throws error when fieldNames is not an array', () => {
  expect(() => {
    let data = { id: 1, name: 'Jen' }
    sanitizeFields({ data, fieldNames: true })
  }).toThrow(TypeError)
})

test('throws error when a field name is not a string', () => {
  expect(() => {
    let data = { id: 1, name: 'Jen' }
    sanitizeFields({ data, fieldNames: [8] })
  }).toThrow(TypeError)
})

