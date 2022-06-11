# data-sanitizer

A simple data sanitizer that preserves the removed values for reference.

## Usage

```
const { sanitizeFields } = require('data-sanitizer')

let data = [
  { id: 1, name: "Jen Gilbert" },
  { id: 2, name: "Derek Reeve" }
]

const sanitationResult = sanitizeFields({ data, fieldNames: ['id'] })

console.log(sanitationResult)
```

The above code will print

```
{
  data: [
    { id: '[SANITIZED]', name: 'Jen Gilbert' },
    { id: '[SANITIZED]', name: 'Derek Reeve' }
  ],
  removedValues: { id: [ 1, 2 ] }
}
```

## Sanitizing multiple fields

You can sanitize multiple fields, but be aware that the sanitization operations will run in order. Depending on the order of the field names you pass in, you may wind up with sanitized values in your `removedValues` result.

## Sanitizing nested data

The sanitization is recursive, so you can pass in arrays of objects, etc. as your data.

## Why does this exist?

I use large data snapshots in Jest to test my database seeding modules. I *do* want to know when the row IDs change, because sometimes that would be unexpected behavior. But even when ID changes are expected, I don't want those changes to create a ton of snapshot diff output in Jest, since that might cause me to miss other changes I wasn't expecting.

This simple sanitizer lets me isolate IDs from the original data structure, preserved in their original order, and snapshot them in isolation. If something changes, I'll know about it -- with only one line of snapshot diff output instead of eleventy billion.