const { sanitizeFields } = require("..")

test('sanitizes multiple fields', () => {
  let data = [
    { 
      id: 1, 
      name: 'Jen', 
      pets: [
        { id: 3, name: 'Frank' }
      ]
    },
    { 
      id: 2, 
      name: 'Derek', 
      pets: [
        { id: 4, name: 'Evey' },
        { id: 5, name: 'Alfie' }
      ]
    }
  ]

  const sanitizationResult = sanitizeFields({ data, fieldNames: ['pets', 'id'] })
  expect(sanitizationResult).toMatchSnapshot()
})