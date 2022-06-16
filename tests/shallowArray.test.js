const { sanitizeFields } = require("..")

test('sanitizes a shallow array', () => {
  let data = [
    { id: 1, name: 'Jen' },
    { id: 2, name: 'Derek' }
  ]

  const sanitizationResult = sanitizeFields({ data, fieldNames: ['id'] })
  expect(sanitizationResult).toMatchSnapshot()
})