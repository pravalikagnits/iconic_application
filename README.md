# Iconic

This React application takes what the user types and replaces words with icons.

Try creating this application by starting from the template application, and referencing this repository if you get stuck. You'll want to grab the list of [icon names](./src/icons.json), however.

### Challenge 1

Currently, most of us randomly select a color from a fixed array of colors. We'd like to use any color, not just the colors in our array.

*Hint: Use RGB colors and store an array of rgb strings in state rather than the array of color indices. For example, `rgb(255, 0, 0)` is `#f00` or `#ff0000` or `red`.*

### Challenge 2

We modified our application to handle plurals. For example: "I love trees". As we found out, our solution caused problems for other words like "bus". We should fix this bug!

*Hint: For a word like "trees", first check whether "trees" is an icon; if not, remove the "s" and check whether "tree" is a word.*

### Challenge 3

When you click on an icon, replace the icon with the word that it represents.

*Hint: You'll need to store clicked-on words in the state.*

### Challenge 4

When the mouse hovers over an icon, make that icon rotate.

*Hint: Just use CSS.*
