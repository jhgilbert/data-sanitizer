# data-sanitizer

A simple data sanitizer that preserves the removed values for reference.

## Usage

```
const { sanitizeFields } = require('data-sanitizer')

let data = [
  { id: 1, name: 'Jen' },
  { id: 2, name: 'Derek' }
]

const result = sanitizeFields({ data, fieldNames: ['id'] })

console.log(result)
```

The above code will print

```
{
  data: [
    { id: '[SANITIZED]', name: 'Jen' },
    { id: '[SANITIZED]', name: 'Derek' }
  ],
  removedValues: { id: [ 1, 2 ] }
}
```

## Sanitizing nested data

The sanitization is recursive, so it will work on nested data structures.

## Sanitizing multiple fields

You can sanitize multiple fields: 

```
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

const result = sanitizeFields({ data, fieldNames: ['pets', 'id'] })
```

Be aware that the sanitization operations will run **in field-name order**. 

Depending on the order of the field names you pass in, you may wind up with sanitized values in your `removedValues` result. 

- In the above example, the entire value of the fieldName `pets` would be preserved in `sanitizationResult.removedValues`, including the original numerical IDs. This is because `pets` was listed first in `fieldNames`, so no `id` fields had been sanitized yet at the time of preservation.
- If `id` had been listed first instead, `sanitizationResult.removedValues.pets` would have sanitized IDs in it, rather than numerical ones, as the `id` sanitization operation would run first, impacting the entire data structure.

## Why does this exist?

I use large data snapshots in Jest to test my database seeding modules. Though changes in the row IDs of seed data are often expected, I still want to monitor them. But when row IDs are left in large data snapshots, the volume of snapshot diff output from ID changes can obscure other unexpected changes.

This simple sanitizer lets me isolate IDs (and any other frequently-changing fields) from the original data structure, preserved in their original order so I can snapshot them in isolation. If something changes, I'll know about it -- with only one line of snapshot diff output instead of eleventy billion.