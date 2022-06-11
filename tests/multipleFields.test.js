const { sanitizeFields } = require("..")

test('sanitizes multiple fields', () => {
  let data = [
    { 
      id: 1, 
      name: 'Jen Gilbert', 
      pets: [
        { id: 3, name: 'Frank' }
      ]
    },
    { 
      id: 2, 
      name: 'Derek Reeve', 
      pets: [
        { id: 4, name: 'Evey' },
        { id: 5, name: 'Alfie' }
      ]
    }
  ]

  const sanitationResult = sanitizeFields({ data, fieldNames: ['pets', 'id'] })
  expect(sanitationResult).toMatchSnapshot()
})