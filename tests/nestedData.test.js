const { sanitizeFields } = require("..")

test('sanitizes nested data', () => {
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

  const sanitizationResult = sanitizeFields({ data, fieldNames: ['id'] })
  expect(sanitizationResult).toMatchSnapshot()
})