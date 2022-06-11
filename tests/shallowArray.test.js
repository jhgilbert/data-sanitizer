const { sanitizeFields } = require("..")

test('sanitizes a shallow array', () => {
  let data = [
    { id: 1, name: 'Jen' },
    { id: 2, name: 'Derek' }
  ]

  const sanitationResult = sanitizeFields({ data, fieldNames: ['id'] })
  expect(sanitationResult).toMatchSnapshot()
})