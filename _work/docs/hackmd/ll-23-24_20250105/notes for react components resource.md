---
title: notes for react components resource

---

# notes for react components resource

## what is React?
React is a javascript library that allows you to build interactive UI in your app. UI includes all of the things that users see and interact with when they visit your website. Therefore, understanding React--and specifically React components--will help you make determinations about styling.

If you want to learn more about how React works at the level of HTML and DOMs, c[heck out their documentation](https://nextjs.org/learn/react-foundations/rendering-ui).

## React components
React components are modular bits of code that can be applied across your app, in different places. If you need to update some aspect of your UI, you can just update the component. Components in React are functions that return the different parts of your UI, styling, etc.

React components can also have parent-child relationships. For example, in this code from a React tutorial shows how a HomePage component can contain the child component Header.

```
function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
 
  return (
    <div>
      <Header title="Develop. Preview. Ship." />
      <ul>
        {names.map((name) => (
          <li>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### when this code is rendered, what happens?
1. **Component Structure**: The HomePage component returns JSX, which is a syntax extension for JavaScript that allows you to write HTML-like code inside of JavaScript. The returned JSX defines the structure of the part of the page that this component is responsible for.
2. **Header Component**: The Header component is used here with a prop named title. Props are a way of passing data from parent to child components. The Header component will likely display some sort of heading or title for the page, using the provided prop value "Develop. Preview. Ship." as its content.
3. **Names Array**: The component declares an array named names, which contains three strings: 'Ada Lovelace', 'Grace Hopper', and 'Margaret Hamilton'.

### The .map() method in React
**What It Is:**
In the context of React, the .map() method is used for creating lists of elements or components based on data stored in arrays. React embraces the idea of component reusability and the .map() method is aligns with this philosophy. It is a standard JavaScript array method that calls a provided function once for each element in an array, in order, and constructs a new array from the results.

**Why It's Useful:**
* Dynamic Content: It allows developers to dynamically generate components based on data. For example, if you have an array of user objects, you can use .map() to create a <UserCard /> component for each user, each populated with that user's data.
* Custom UI/Styles: When generating elements dynamically, you can also assign unique styles to them. For example, you could apply a different background color to each <UserCard /> based on user preferences stored in your data array. This enables highly customizable and dynamic styling that can adapt to the data it represents.
* Efficiency: It simplifies the code and reduces the need for manual iteration (like for-loops), making your component code cleaner and more readable.

### Props in React and Next.js
**What They Are:**
Props (short for "properties") are a way of passing data from parent components to child components in React and Next.js. They are read-only and are intended to configure or customize the child component.

**Why They're Useful:**
* Customization: Props allow for the customization of child components without having to hard-code specific values or logic inside them. This means you can reuse the same component structure while changing its content, appearance, or behavior based on the props it receives.
* Dynamic UI: With props, you can dynamically alter the UI of a component. For instance, a button component could be passed different labels, colors, or sizes as props, allowing it to be reused in various parts of your application with distinct appearances or functions.
* Data Passing: Props are essential for passing data down the component tree. This is particularly useful in applications where data needs to be displayed or manipulated across multiple components.
* State Management: Although props themselves are immutable, they can be used in conjunction with state management solutions or React's own state to create interactive and dynamic user interfaces. For example, a parent component can pass down state values as props to child components, and callbacks as props to update the state based on user interactions.

## client-side components
In NextJS 13 (and later presumably, though that's where we are right now), you need to explicitly tell it that you want a specific component to be a client-side component (rather than a component that's used to render stuff on the server that then gets sent to the client). 

When you are building something with zero interaction (i.e. mainly using React as a sort of templating language), this is no big deal. 

But one of the main things you'll probably want to do with React is create interactive UI elements. So it's essentialy to figure this out if you are going with the NextJS stack.

[Next's documentation of client-side rendering](https://nextjs.org/docs/app/building-your-application/rendering/client-components) is a great resource to learn in depth about this feature in Next.

```
'use client'
 
import { useState } from 'react'
 
export default function Counter() {
  const [count, setCount] = useState(0)
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```
In this example code, you can see the 'use client' directive (which is React's way of designating all of the components in this file as client-side components), which is above the import statements. Then, you can use useState as a way to add interactivity into your app (in this example, it's part of a Counter function that allows the user to click a counter button).

## React and styling
* making a module.css file
* passing that styling into a component
* passing that component into your homepage/page.js file
    * using the map method
    * and props 
    * (because presumably your data varies)
    * adding interactivity/making it a client-side component