---
title: mk-project-explainer-bot
tags: [mk]

---

# mk-project-explainer-bot

- listen for emoji (or does each mk message get this if needed)
- get that message
    - and preceding x messages
    - and following x messages
- does that message involve images?
- does that message involve links?
- function call: do we NEED the content of the image and/or links to respond?
- initial response
    - if `!(hasImages || hasLinks)` then explanation
- then
    - if links, scrape links
    - if images, get vision description of image
    - then get new response and add as additional comment

