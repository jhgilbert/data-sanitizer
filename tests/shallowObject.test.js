const { sanitizeFields } = require("..")

test('sanitizes a shallow object', () => {
  let data = {
    id: 1,
    name: 'Jen'
  }

  const sanitizationResult = sanitizeFields({ data, fieldNames: ['id'] })
  expect(sanitizationResult).toMatchSnapshot()
})