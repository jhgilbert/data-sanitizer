const { sanitizeFields } = require("..")

test('sanitizes a shallow object', () => {
  let data = {
    id: 1,
    name: 'Jen Gilbert'
  }

  const sanitationResult = sanitizeFields({ data, fieldNames: ['id'] })
  expect(sanitationResult).toMatchSnapshot()
})