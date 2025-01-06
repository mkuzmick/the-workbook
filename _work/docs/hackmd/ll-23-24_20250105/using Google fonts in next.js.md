---
title: using Google fonts in next.js

---

# using Google fonts in next.js

## 1. In your app folder:
Make a fonts.js file and add the specifications for the Google fonts that you'd like to be able to use in your project. You can test this using the code that next.js provides:


```
import { Inter, Roboto_Mono } from 'next/font/google'
 
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 
export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})
```

[other google fonts can be found here](https://fonts.google.com/)

## 2. In your page.js file:
Import the fonts.js file at the top of your page. Then, in your component, return the font wherever you want to use it. 

```
import { inter, roboto_mono } from './fonts'
 
export default function Page() {
  return (
    <>
      <h1 className={inter.className}>My page</h1>
    </>
  )
}
```

## 3. in your module.css file:
Assuming you're doing more styling in your module.css file (i.e., you want to customize the font sizes, colors, etc.), add the font to your css module. here's an example:

```
.title {
  font-size: 2.5rem;
  font-family: 'Nunito Sans,' sans-serif;
  margin-bottom: 2rem;
}
```
---
**addendum**: in my code (this is xtine writing), it looks a bit more complicated because I also have styling in a css module for the different features on my page (h1s, h2s, paragraphs, etc.). if you're curious, this is what it looks like in my project. i tested this out using both inter and roboto_mono to see if it worked, and it did! 

```
return (
    <div className={`${styles.container}`}>
      <div className={styles.innerContainer}>
      <h1 className={`${roboto_mono.className} ${styles.title}`}>mdf projects 2023-2024</h1>
        {data ? (
          <div className={styles.grid}>
            {data.map((item) => (
              <div 
                key={item.id} 
                className={styles.card}
              >
                <h2 className={`${roboto_mono.className} ${styles.projectTitle}}`}>{item.projectTitle}</h2>
                {item.media && (
                  <img src={item.media} alt={item.projectTitle} className={styles.image} /> // Displaying media
                )}
                <h1 className={`${inter.className} ${styles.name}}`}>{item.name}</h1>
                <p className={`${inter.className} ${styles.description}}`}>{item.description}</p>
              </div>
            ))}
          </div>
        )
```
