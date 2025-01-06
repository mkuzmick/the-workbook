---
title: microproject-updates-from-mentions

---

# microproject-updates-from-mentions

Before we do this, as a backup, let's just save every message in Updates.

In the updates-bot:

1. listen for regex matching bot id (store in .env or query on launch?)---and also for messages of type "im" maybe?
2. send to openai assistant for clean start and stop dates, meanwhile
3. find channels in message
    - if no channels, request
    - if not on some channels, indicate but still run
4. for each channel, get messages between start and stop
5. strip unneeded fields from message objects in array
6. send to OpenAI for summary
7. send summary back as comment on message
8. store summary and request in Airtable

or

1. listen for regex matching bot id (store in .env or query on launch?)---and also for messages of type "im" maybe?
2. find channels in message
    - if no channels, send error
    - if not on some channels, indicate but still continue
3. send message back with details we have so far plus launch button
4. launch modal asking for Title, start, stop, channels (preselecting) and additional prompt.
5. listen for action confirmation
6. for each channel, get messages between start and stop
7. strip unneeded fields from message objects in array
8. send to OpenAI for summary (including additional prompt language)
9. send summary back as comment on message? or as markdown doc rather?
10. store summary and request in Airtable


or

App Home based?


## next

- create google doc and or hackmd from text