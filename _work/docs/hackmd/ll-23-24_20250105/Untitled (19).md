---
title: Untitled

---

## Python Servers for Stable Diffusion
**work-sharing-channel:** `##ll-work-code`
**prereqs:** familiarity with python and a long-term investment in developing more complex applications
**prompt:** Learn to build a basic server in Python. Choose between Django and FastAPI (the former if you are going to go all in on building Python web apps, the latter if you just want to get things working fast and may be calling this API from a NextJS or other nodejs app or command-line tool anyway). Today's goal is to learn to handle request parameters of various sorts:
1. **Path Parameters**: learn to capture values from the path of a URL (like `myawesomeapi.com/items/{item_id}`). This is valuable for handling operations on individual resources, such as retrieving a specific item by its `item_id`.
2. **Query Strings**: learn how to parse query parameters for filtering, searching, or sorting data (like `myawesomeapi.com/items?category=books&sort=asc`), which are appended to the URL after the `?` mark.
3. **Request Body**: learn to handle complex data that can't be passed through the URL, like JSON or form data, which clients send through the body of POST or PUT requests.

As you do your testing, you are certainly welcome to immediately start generating things with SD. But for now, it could make most sense to just concentrate on taking in data that has relevant structures of your goals. So for complex prompting that involves model requests, you'll definitely need to at LEAST use query strings, and probably more likely POST requests. But once an image has been generated and has a timestamp or id, we could certainly offer that image to users at `myawesomeapi.com/images/{image_ts}` say.
**key contact:** Marlon


## AI-Assisted Paper Pixel Art

**work-sharing-channel:** #ll-work-code
**prereqs:** experience with code or art projects in the LL
**prompt:** We'll be generating many many images matching the Pantone colors and we want to work towards some installations that tile these. We want to prototype two options: 
1. pixel art between 8x8 and 48x96.
2. munsell-color charts or simple color gradients

We will generate images in DallE, but to make sure that the colors are perfect, we will postprocess with opencv or imagemagick or ffmpeg or anything else you can think of. It's fine to prototype post-processing in Ps or other app--we'll just need to do it with code when we scale up the process.

If you are interested in this one, come talk to Marlon--there are many options for next steps that we'll break down into separate tasks down the line:

- py image processing
- pitching pixel art
- physical prototypes

**specs and tools**: opencv, imagemagick, ffmpeg, python, nodejs
**key contact:** Marlon
