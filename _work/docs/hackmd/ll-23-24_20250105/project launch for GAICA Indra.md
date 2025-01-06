---
title: project launch for GAICA Indra

---

# project launch for GAICA Indra
mw's notes: [GAICA initial project: indra](/uhnr51hFTBy0xtRy0Md2Mg)

## context

Our goal is to create tools for recognizing many of the elements that predictably populate the videos we capture in the LL: people, cards, text, etc. 

Some of these tools will be useful for **postprocessing** (getting stills of each card that appears in a video clip, for instance); some will be useful for **live events** (recognizing that a person or card has entered the frame and launch some code--perhaps turning on a light, playing a song, starting a recording session, launching an OBS overlay, etc. etc.)

## MVP

To start, all we want to do is recognize the 2"x3.5" colored cards in the standard overhead shots we capture. Initially we can do this with pre-recorded video or even still images. But pretty quickly we will want to process live footage that is captured on our many Blackmagic capture devices.


Here is a wish list of features for the MVP:

1. recognize the appearance of a card in the scene
2. save a still of each unique card from the videos that we are using for card capture
3. save a `Card` record to a database (Airtable or other) according to a data model we define together (we can start just with color, timestamp, and the x and y coordinates of the card's center, but we will add more)

One thing to note is that we can control the footage we are collecting, in many cases working with a fixed camera and a fixed lens, and it could be useful to leverage this fact to get improved performance and accuracy (and even for you to suggest new capture protocols if there's something easy we could fix that would help you).


## next steps

Once this is complete, we will want to begin to work on live-recognition of people, cards and other LL elements. And to begin to launch functions that do something in the studio based on the movements of the objects recognized. Once you hit this stage, please get in touch with MK to brainstorm next steps!