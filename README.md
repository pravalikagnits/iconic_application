# Iconic

This React application takes what the user types and replaces words with icons.

Try creating this application by starting from the template application, and referencing this repository if you get stuck. You'll want to grab the list of [icon names](./src/icons.json), however.

### Challenge 1

Currently, most of us randomly select a color from a fixed array of colors. We'd like to use any color, not just the colors in our array.

*Hint: use RGB colors and store an array of rgb strings in state rather than the array of color indices. For example, `rgb(255, 0, 0)` is `#f00` or `#ff0000` or `red`.*

### Challenge 2

We modified our application to handle plurals. For example: "I love trees". As we found out, our solution caused problems for other words like "bus". We should fix this bug!

*Hint: For a word like "trees", first check whether "trees" is an icon; if not, remove the "s" and check whether "tree" is a word.*

### Challenge 3

When you click on an icon, replace the icon with the word that it represents.

*Hint: you'll need to store clicked-on words in the state.*

But first, we need to talk about `this`. In the `render` of [IconText](./src/IconText.js), we have something like:

```javascript
render() {
  let words = this.props.text.split(' ')

  words = words.map(function(w, i) {
    return (<span>{w}</span>);
  });

  return (<p>{words}</p>)
}
```

This is simplified for illustration purposes. Don't worry that this doesn't quite match up with our code. Suppose we want to add an `onClick` event to the `<span>`. You would think we could do:

```javascript
constructor() {
  super();
  this.toggleWord = this.toggleWord.bind(this);
}

toggleWord() {
  console.log('Word was clicked!');
}

render() {
  let words = this.props.text.split(' ');

  words = words.map(function(w, i) {
    return (<span onClick={this.toggleWord}>{w}</span>);
  });

  return (<p>{words}</p>);
}
```

But what happens? In the console, you'll see an error like:

> Uncaught TypeError: Cannot read property 'toggleWord' of undefined

Bummer! Time to add some debugging:

```javascript
render() {
  let words = this.props.text.split(' ');

  console.log('In render', this);

  words = words.map(function(w, i) {
    console.log('In .map callback function', this);
    return (<span onClick={this.toggleWord}>{w}</span>);
  });

  return (<p>{words}</p>);
}
```

You'll notice that `this` is defined within the `render` method, but `this` is not defined within the `.map` callback function! We forgot to tell the function what `this` should refer to. We want `this` to refer to this particular `IconText` component.

In the constructor, that's what the following is all about:

```javascript
this.toggleWord = this.toggleWord.bind(this);
```

When `toggleWord` is invoked, we always want the `toggleWord` method to be bound to `this` particular component. That lets us use `this` within the `toggleWord` method, to do things like `this.setState`.

However, the `.map` callback function is anonymous (unnamed), so we can't do things in quite the same way. Fortunately, the Array's [.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method takes a second argument, which is the object that `this` should refer to within the callback function:

```javascript
render() {
  let words = this.props.text.split(' ');

  words = words.map(function(w, i) {
    return (<span onClick={this.toggleWord}>{w}</span>);
  }, this);

  return (<p>{words}</p>);
}
```

Now, `this` within the `.map` callback function refers to this particular `IconText` component.

Okay, so you should find `this` to be confusing at this point. Part of the problem is that JavaScript doesn't *really* have classes, despite the `class` keyword, so things like `this` aren't setup like you might expect if coming from a language like Java. JavaScript does things in a different (and powerful) way, with something called prototype-based inheritance. Until you understand how JavaScript works, you'll probably find `this` to be frustrating! For now, all you really need to know is that you need to tell functions what `this` should be.

As is often the case with programming, we fixed one problem to uncover a different problem! The `toggleWord` function is being invoked when the user clicks on a word, but we don't know which word was clicked!

 When `toggleWord` is being invoked, it's invoked with an [event object](https://facebook.github.io/react/docs/events.html) as the first argument.

```javascript
toggleWord(event) {
  console.log('Word was clicked!', event);
}
```

Instead of the event object, we really just want to pass `toggleWord` the word (e.g., "tree").

```javascript
toggleWord(word) {
  console.log('Word was clicked!', word);
}

render() {
  let words = this.props.text.split(' ');

  words = words.map(function(w, i) {
    return (<span onClick={() => this.toggleWord(w)}>{w}</span>);
  }, this);

  return (<p>{words}</p>);
}
```

We replaced `onClick` with an anonymous arrow function; instead of React calling `toggleWord` directly, the anonymous arrow function calls `toggleWord`. This function knows what word was clicked since it has the `w` variable in its scope.

This is pretty advanced stuff that requires a more in-depth understand of JavaScript. Don't despair! The [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS) books are your friends; especially the books about "Scope & Closures" and "this and Object Prototypes".

### Challenge 4

When the mouse hovers over an icon, make that icon rotate.

*Hint: just use CSS.*
