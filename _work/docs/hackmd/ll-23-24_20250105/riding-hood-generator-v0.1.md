---
title: riding-hood-generator-v0.1

---

# riding-hood-generator-v0.1

## basics and context

As we prepare to support COMPLIT 200, we are going to develop an array of options for them. Some or all or none of which may ultimately be used, so we don't want to sink too much time into perfecting these options until we've met again with the course team.

That said, we need SOME concrete things to show them before Spring Break, so here is what we are looking to create:

- some basic **tutorials** on Python and using the various GAI APIs Google, Amazon and OpenAI provide in google colab (and on colab itself)
- a "hello world"-level **proof-of-concept** folk-tale-generator in colab that's connected to the course content (ideally this can be integrated with the tutorial, but we shall see about this)
- accompanying **slackbots** and slackbot-tutorial plan (also doing this for another course)
- plans and materials for **workshop** stations/activities related to technical skills involved in creating (and ultimately printing or otherwise delivering) a collection of AI-generated folk tales

The GAICAs (and any others interested) will concentrate on the second option above, and will do their best to create an [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) for MK to review by March 4. We'll then frame/polish these over the next day or so and write to the course in the 5-7 range.


## first steps

(Little [Color] Riding Hood Generator Specs)

For the folk-tale generator proof-of-concept, we'll be creating a simple tool in Google Colab that creates stories that extend the basic idea of Bruno Munari's [series](https://drive.google.com/drive/folders/1vCqCoXAuXA0e5QBoMAbgaSXY8Y7fhT2p) of "Little [Color] Riding Hood" stories (*Little Yellow Riding Hood*, *Little Green Riding Hood*, *Little White Riding Hood*, etc).

The basics for the MVP:

- input should be a color
    - could be RGB or HSV value
    - could be a string matching [a Pantone Color](https://margaret2.github.io/pantone-colors/)
    - for bonus points, could be the dominant color in an image
- the title must be *Little [Color] Riding Hood*
- there should be a series of images with accompanying text that tells a story similar to [Munari's stories]((https://drive.google.com/drive/folders/1vCqCoXAuXA0e5QBoMAbgaSXY8Y7fhT2p)) (please read his texts to get a sense of how they work before engineering your prompts)
    - you can begin with just 5 images and 5 text chunks without any particular layout applied (can just be colab output), but we can work towards something better-designed that matches the munari over time


## next steps

After we've finished our MVPs, we'll meet up to discuss our work and think about next steps. If you finish early and need additional challenges, you can think about the following future directions:

- exposing this or a similar tool as an API
- better formatting of the images and text
- saving as a pdf
- delivering as a nextjs app instead of as a colab tool
- having the ai read your tale as a bedtime story
- automating the production of many many of these
- combining multiple to create a gallery or library (either digitally or physically)
- running a tutorial session in which we teach non-coders to do this themselves


## Work In Progress

let's take notes here---or link to other notes docs.

### initial steps

* Josefina (jb) will build a generator using OpenAI APIs
    * the deadline for a first MVP (minimal viable product) is Monday, March 4th
    * post all your colabs in [this folder](https://drive.google.com/drive/folders/1cjrd1itBKE8GbZiTBSGPlAPb5FVQe-J5).
* Gonzalo (gp) will build a generator using Gemini APIs
    * the deadline for a first MVP (minimal viable product) is Monday, March 4th
    * post all your colabs in [this folder](https://drive.google.com/drive/folders/1Vlmkhgas-9iJ7QZpxRxQF2aLtWnkter8)
* Jōsh (jm) will build a generator using OpenAI APIs
    * the deadline for a first MVP (minimal viable product) is Monday, March 4th
    * post all your colabs in [this folder](https://drive.google.com/drive/folders/1QtH6h7MDvkUZsIjk5MXMEAz3doI4oKDO)
    