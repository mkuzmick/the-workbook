---
title: webdev R&D notes
tags: [cd]

---

---
tags: cd
---

# webdev R&D notes

## next.js full stack tutorial

<iframe width="560" height="315" src="https://www.youtube.com/embed/y7JCnfbETPs?si=GpAVbBNkOYn7-0OS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### notes
* global styles in layout.tsx - consistent across pages
* tailwind.css
    * [customizing colors](https://tailwindcss.com/docs/customizing-colors)
    * can choose between cooler gray (blues) and warmer gray (reds)
    * mobile first - so when browser window is bigger than phone screen you can designate a larger font size (in his ex. for h1)
    * don't want the page margins to span the full width of the browser since it's less comfortable for the eye
    * don't necessarily use full white but usually some kind of off-white - again, easier on the eyes/less harsh
    * hooking into the event in the browser - this when you want a client component, when user interacting and you're hooking into events

### things to add to resources
* ternary operators
* template literals
    * params
* get vs fetch/client vs server-side
* "sleeping in js"/suspense
    * adding a bit of delay when you click to access a new page
    * and loading states - what user sees while they wait for the new page to load (gives some feedback while they wait)
* server action
    * if you submit, say, a poem on the website
    * you will have had to have created a POST function that takes the submitted text
    * and then sends it to the server to be logged as data wherever it's being stored
    * if you look at the inspector in the browser
    * you can see that there is actually a POST request being sent by next.js 
    * so that the data can cross this "data boundary"
    * you do not need to write the POST request because Next handles that for you
    * (this seems to be one of the bigger justifications for why everyone loves next)
    * this is NOT the same as a server-side client - that's what a GET request is
    * but it is important to keep it safe