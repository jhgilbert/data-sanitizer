# data-sanitizer

A simple data sanitizer that preserves the removed values for reference.

## Usage examples

TODO

## Why does this exist?

I use large data snapshots in Jest to test my database seeding modules. I *do* want to know when the row IDs change, because sometimes that would be unexpected behavior. But even when ID changes are expected, I don't want those changes to create a ton of snapshot diff output in Jest, since that might cause me to miss other changes I wasn't expecting.

This simple sanitizer lets me isolate IDs from the original data structure, preserved in their original order, and snapshot them in isolation. If something changes, I'll know about it -- with only one line of snapshot diff output instead of eleventy billion.