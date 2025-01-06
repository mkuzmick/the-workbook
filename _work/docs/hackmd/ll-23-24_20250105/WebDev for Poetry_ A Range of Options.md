---
title: 'WebDev for Poetry: A Range of Options'
tags: [complit280x]

---

---
tags: complit280x
---

# WebDev for Poetry: A Range of Options

## Backend and Frontend: How do they relate?

The **backend** of a web application is where the data processing happens--in the case of your projects, it's where you're generating poetry in Colabs. (In other projects, the backend might be a database.) 

The **frontend** is the part of the web application that users interact with, displaying, for instance, the poetry from your Colab in a stylized way. 

In web development, it's helpful to understand that the backend sends data to the frontend, and then the front-end uses or applies HTML, CSS, and JavaScript to make that data visible and able to be interacted with.

## HTML and CSS: some basics
HTML is the standard markup language used to create and structure content on the web. It describes the structure of web pages using markup and is the backbone of any website. HTML documents are files that end with a .html or .htm extension and are interpreted by web browsers to display the web pages visually.

CSS is a stylesheet language used to describe the presentation of documents written in HTML or XML (including various XML languages like SVG). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.

### Main Components of HTML:
* **Tags**: HTML uses tags to markup text. Tags are enclosed in angle brackets (e.g., <tagname>). Most tags have an opening tag (<tagname>) and a closing tag (</tagname>), with content in between.
* **Elements**: An HTML element is defined by a start tag, some content, and an end tag. For example, 
    
    ```
    <p>This is a paragraph.</p>
    ```
* **Attributes**: Attributes provide additional information about HTML elements. They are always specified in the start tag and usually come in name/value pairs like name="value". For example, ```<img src="image.jpg" alt="My Image"> ```includes attributes for src (source of the image) and alt (alternative text).

HTML can be used to structure the presentation of poetry on the web. For instance, each poem can be enclosed in ```<article>``` or ```<section>``` tags, titles can be marked up with ```<h1>``` through ```<h6>``` tags depending on their hierarchy, and each stanza or line can be in ```<p>``` (paragraph) tags or ```<div>``` tags for more generic grouping.

### Main Components of CSS:
* **Selectors**: selectors specify the HTML elements to which the style will be applied. For example, p selects all ```<p>``` elements. [W3schools has a ton of examples Selectors you can check out](https://www.w3schools.com/cssref/css_selectors.php). here are a few common ones:
    * **Type Selector**: Targets elements by their tag name. For example, p targets all ```<p>``` tags.
    * **Class Selector**: Targets elements with a specific class attribute. You use a dot followed by the class name, e.g., .verse for ```<div class="verse">```.
    * **ID Selector**: Targets an element with a specific ID attribute. You use a hash followed by the ID, e.g., #poemTitle for ```<h1 id="poemTitle">```.
    * **Descendant Selector**: Targets elements that are nested within specific elements, e.g., div p targets all ```<p>``` tags inside ```<div>``` tags.
* **Properties**: A property is a type of attribute that defines aspects of how an HTML element will be displayed. For example, color, font-size, border, etc.
* **Values**: Values are assigned to properties to define their appearance, such as color: red; or font-size: 14px;.

here's an example:
```
    p {
    color: red; /* 'color' is the property, 'red' is the value */
    font-size: 16px; /* 'font-size' is the property, '16px' is the value */
}
```


You can use CSS to style the poem titles, for instance, (```<h1>``` tags) with a specific font, size, and color, or you can use it to create a pleasing layout for the poems, with appropriate spacing, background colors, and text alignment. CSS allows you to create a visually appealing experience that complements the poetry's mood or themes or otherwise structures the reading experience for the user.
    
### some helpful CSS categories
* **font-family**: Specifies the font of the text. 
    example: ```font-family: 'Georgia', serif;```
* **font-size** Sets the size of the font. example: ```font-size: 18px;```
* **line-height**: Controls the space between lines of text. example: ```line-height: 1.6;```
* text-align: Sets the horizontal alignment of the text. Poems may require different alignments like center or right based on their structure. example: ```text-align: center;```
* **color**: Defines the text color. example: ```color: #333;```
* **margin**: Controls the space around elements. Margins are especially important in poems to separate stanzas from each other. example: ```margin: 20px 0;```
* **padding**: Manages the space between the content and the border of an element. example: ```padding: 10px;```
* **border**: Specifies the border around elements. Borders can be used to frame a poem or a stanza visually. example:```border: 1px solid #ccc;```
* **background-color**: Sets the background color of an element. example: ```background-color: #f8f8f8;```
* **width and max-width**: Controls the width of elements. Setting a max-width is useful for poems to ensure that lines do not stretch too long horizontally, for instance. example: ```max-width: 600px;```
* **display**: Specifies the display behavior of an element. Common values include block, inline, inline-block, and flex. Flex is particularly useful for responsive designs. example: ```display: flex;```
* **flex-direction** Determines the direction of the flexible items. example: ```flex-direction: column;```
* **justify-content**: Aligns the flexible container's items when the items do not use all available space on the main-axis. example: ```justify-content: center;```
* **text-decoration**: Sets or removes decorations from text. Useful for titles or important lines within poems. example: ```text-decoration: underline;```
* **font-weight**: Sets how thick or thin characters in text should be displayed. This can be used to emphasize certain words or lines within a poem.
example: ```font-weight: bold;```


### TL;DR:
When presenting poetry on the web, HTML and CSS work together to structure and style the content. HTML provides the skeleton of the poetry presentation—defining the structure, hierarchy, and organization of the poems—while CSS adds style to this structure.
    
## Static webpages
Static webpages are fixed content files written in HTML, CSS, and sometimes JavaScript, that are **served directly to the user exactly as stored**. Each page is a separate HTML file, and every visitor sees the same content, much like reading a printed document. In the context of poetry, a static webpage might present a collection of poems where each poem is hardcoded into the HTML structure. While this approach is straightforward and easy to implement, it lacks interactivity and flexibility. For instance, if you wanted to add a new poem to your collection, you would have to manually update the HTML files and re-upload them to your server.

    
### From Colab to PDF or HTML file
Maybe, you want to create a very simple view of what happens when you run your code, including for printing. Or you want to save it as an HTML file so that you can style that HTML for the web.

You can add functions into your colab notebook that would automate the process of saving the poem as a PDF or HTML file to the same Google drive folder where your colab is stored.
    
### [Docusaurus](https://docusaurus.io/)
Docusaurus simplifies the website setup process, allowing you to focus on content rather than website infrastructure. It supports **Markdown** out of the box, making it easy to write and format your poetry. Being built on **React**, it offers extensive customization options through React components, allowing for unique designs. It generates a static website, which is fast to load and easy to host on services like GitHub Pages or Netlify.
    
## Styling your HTML
CSS (Cascading Style Sheets) is used to style HTML documents. By linking a CSS file to your HTML document, you can define the visual appearance of your poem collection.

Create a simple style.css file to define styles for HTML elements (p for paragraphs, h1 for titles, etc.) and link it in your HTML file using 
```
<link rel="stylesheet" href="style.css">
```

In this case, you'd put your CSS file in the same directory as your HTML.

Here's an example of what a CSS file might contain:

```
/* style.css */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
    margin-top: 20px;
}

.poem h2 {
    color: #666;
}

.poem p {
    color: #333;
    font-size: 16px;
    line-height: 1.6;
    margin: 10px 20px;
}
```

### how to view your styled HTML file
* **locally**: You can simply open your poems.html file in any web browser to see the effects of your CSS styling.
* **on the web**: To share your poetry on the web, you'll need to host your HTML and CSS files on a web server. Platforms like GitHub Pages, Netlify, or Vercel offer free and simple hosting for static files.
    
### importing Google Fonts to your HTML file
Google Fonts provides a vast library of free fonts. You can include these fonts in your web projects by linking to the Google Fonts API.

1. Choose a Font: Visit [Google Fonts](https://fonts.google.com/) and pick a font you like. Note that there is a filter for language if you'd like to see which fonts are available in the writing system in that language. 
2. Generate the Link: Customize the styles and weights as needed, and Google Fonts will generate a ```<link>``` tag for you to include in your HTML ```<head>``` section.
3. Use the Font in CSS: Use the font-family property in your CSS to apply the font.

### Example Project: Styling a Poem
Let’s create a simple poetry page that uses CSS for styling and includes a custom Google Font.

**HTML File (poem.html):**
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Poem Example</title>
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="poem">
        <h1 id="poemTitle">The Red Wheelbarrow</h1>
        <div class="stanza">
            <p>so much depends</p>
            <p>upon</p>
        </div>
        <div class="stanza">
            <p>a red wheel</p>
            <p>barrow</p>
        </div>
        <!-- More stanzas can be added here -->
    </div>
</body>
</html>
```

**CSS File (styles.css):**
```
body {
    font-family: 'Merriweather', serif; /* Applying Google Font to the body */
    line-height: 1.6;
    background-color: #f4f4f4;
    color: #333;
}

#poemTitle {
    text-align: center;
    font-weight: 700; /* Using bold style from Google Fonts */
}

.stanza {
    margin-bottom: 20px;
    font-weight: 300; /* Lighter font weight for verses */
}

.stanza p {
    margin: 5px 0;
    text-indent: 20px;
}
```

### How this works:
* the HTML includes a link to the Google Fonts API for the 'Merriweather' font family with two weights (300 and 700). This font is then applied to the entire body of the document, with specific weights used for the poem title and stanza text.
* selectors in action:
    * ```#poemTitle``` uses an ID selector to style the title of the poem.
    * ```.stanza``` uses a class selector to style each stanza block.
    * ```.stanza p``` is a descendant selector that targets ```<p>``` tags within elements of the stanza class, adding a text indent to each line of the poem.
    
## Dynamic Webpages
Dynamic webpages are capable of **displaying different content from the same source code**. They **can respond to user input** or changes in their environment (like the current time or database updates) to **display content that's tailored to individual users or situations**. This is achieved through client-side scripting (like JavaScript running in the browser) or server-side scripting (like Node.js, Python, PHP, etc., executing on the server) to generate HTML content dynamically.
    
### Next.js and React
React is a JavaScript library for building user interfaces, particularly dynamic webpages and web applications. React allows developers to create reusable UI components (like a poem component, a search bar, or a theme switcher) and manage the state of these components (like which poem to display or which theme is selected).

Next.js is a React framework that is a great option for highly interactive and dynamic web applications. Next.js and React allow for building complex web applications that can efficiently handle thousands of poems, with dynamic loading, routing, and more. It’s ideal for creating a web application where users can interact with, search through, and view a vast collection of poems.

[Here are a few tips about getting started in Next.js.](/VG0e4YEXSZiiqVav2gM_AQ)

## Module.css files
Using CSS modules in your project can significantly enhance the maintainability and scalability of your styles, especially as your project grows. Unlike traditional CSS, where styles are globally scoped (i.e., applied across the entire app) and can easily conflict across different parts of your application, CSS modules provide a way to scope styles locally to specific components or elements. This means the styles defined in one module won't unintentionally affect elements outside of that module. This approach is particularly beneficial in large projects, where you want to create custom styles for different components, verses, etc.

CSS modules are used in frameworks like React. 

Let's talk about the generally structure of using a CSS module in an app.

You create a module.css file (we recommend putting this file inside of a "components" directory inside of your src folder). Then, you can create custom styles for different parts of your poem, for instance.

```
.poemContainer {
    padding: 20px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
}

.poemTitle {
    font-size: 24px;
    color: darkblue;
}

.poemText {
    font-size: 16px;
    color: #333;
}
```
In this example, .poemContainer would create a box that each poem sits in, whereas poemTitle would be the style reflected in the poem's title (but not in the poem's text, since .poemText uses different styling).

Then, you'd create **a React component** that uses this styling. You'd place an import statement at the top of this file that references the CSS module file. 

```
import React from 'react';
import styles from './Poem.module.css';

function Poem({ title, text }) {
    return (
        <div className={styles.poemContainer}>
            <h2 className={styles.poemTitle}>{title}</h2>
            <p className={styles.poemText}>{text}</p>
        </div>
    );
}

export default Poem;
```
Finally, in a page.js file (or whatever file you're using in your app to create a public view/homepage), you'd again reference the CSS module file AND the file that holds the React component defined above. 

Then, you'd write a function that returns the different styles and applies it to the different parts of your poem. In this example, we're assuming that your poem is in a backend of some kind (and therefore isn't hardcoded into the homepage) and the function here is passing in the "title" and "text" that would have to be defined elsewhere so that the code knows what these chunks of the poem are and passes them in accordingly.

```
import React from 'react';
import Poem from './Poem';

function MyPoem() {
  return (
    <div>
      <Poem title="Ode to a Nightingale" text="My heart aches, and a drowsy numbness pains..." />
    </div>
  );
}

export default MyPoem;
```



