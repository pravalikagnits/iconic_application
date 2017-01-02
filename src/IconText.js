import React, { Component } from 'react';
import './IconText.css';
import App from './App'
import icons from './icons'

// For performance, we want a map of words to icon names, rather than just an
// array of icon names. Often, we need to use map, reduce, filter, etc to
// convert data to a more useful format.

const wordMap = icons.reduce(function(chain, i) {
  const parts = i.split('-');
  const key = parts[1];

  chain[key] = i;
  return chain;
}, {});

// const colors = [
//   'green',
//   'pink',
//   'purple',
//   'blue',
//   'red',
//   'orange'
// ];

// Unlike the App component, this component has both props and state

class IconText extends Component {
  constructor() {
    // In a constructor, call `super` first if the class extends another class
    super();

    // Initialize state in the constructor; this is the only place you
    // can set the state directly without using `this.setState`
    this.state = {
      colorIndices: [],
      text:[],
    };
    this.func1 = this.func1.bind(this);

  }
  func1(value,i){
    const  nextText=[...this.state.text];
    nextText[i]=value;
    this.setState({text:nextText})
  }

  // We need to store the random colors used for words in state so the colors
  // don't change with each keystroke. Remember that the component renders
  // whenever props or state are updated. For this reason, React doesn't allow
  // us to update state within a `render` method. So we need to store random
  // colors for new words in the state before the `render` method is called!
  // The `componentWillReceiveProps` method is another special method in React.
  // It's called with the new props before the component is re-rendered, and
  // allows us to update the state.

  componentWillReceiveProps(nextProps) {
    const nextWordCount = nextProps.text.split(' ').length;

    // If we pushed directly to the `this.state.colorIndicies` array, we'd be
    // updating state without using `.setState`! For this reason, we make a
    // shallow copy of the array, and push to that shallow copy.
    const nextColorIndices = [...this.state.colorIndices];

    // Assign random colors to new words
    while (nextColorIndices.length < nextWordCount) {
      //const colorIndex = Math.floor(Math.random() * colors.length);
          var r=Math.floor(Math.random() * 255).toString(16);
          var g=Math.floor(Math.random() * 255).toString(16);
          var b=Math.floor(Math.random() * 255).toString(16);
          nextColorIndices.push(r+g+b)

    }

    // Now update state with our new array of color indices
    this.setState({ colorIndices: nextColorIndices });
  }

  render() {
    const colorIndices = this.state.colorIndices;

    let words = this.props.text.split(' ')

    words = words.map(function(w, i) {
      w = w.replace(/\W/g, '').toLowerCase();

      const colorIndex = colorIndices[i];

      const style = {
        color:"#"+colorIndex,
      };

      if (wordMap[w] && this.state.text[i]==undefined) {
        // Found an icon! Return the icon instead of the word
        return (<i  onClick={()=>this.func1(w,i)} style={style} key={i} className={'fa ' + wordMap[w]} />);
      }
      else {
        // Didn't find an icon for this word. Just return the word.
        const w1=w.replace(/s?$/,'')
        if(wordMap[w1] && this.state.text[i]==undefined){
          return (<i onClick={()=>his.func1(w1,i)} style={style} key={i} className={'fa ' + wordMap[w1]} />);
        }
        else{
        return (<span key={i}>{w}</span>);
      }
      }
    },this);

    return (
      <p>
        {words}
      </p>
    );
  }
}

// Export our component. This lets us import this component from elsewhere.
export default IconText
