---
title: cd documentation slack bots
tags: [cd]

---

---
tags: cd
---

# slack-ai-bots-documentation

## day 1

On day 1, MW and I created basic Slack bots. MW tried cloning an old repo from the last time we made bots during a toolTime. I started from scratch and tried to figure out the sticking points, when it wasn't clear to me what to do next. 

The only thing I found confusing was the dotenv file stuff, but once marlon told me to make a .env.dev (previously I just had a .env), the bot worked! I got stuck on this step for an hour at least, since I was accustomed to making .env.local files for next apps and didn't realize I needed a different dotenv for this project... oops.

MW and I also discovered the chaos of having bots talk in an endless loop! So we should definitely make sure to create documentation about how to avoid that. 

what's next: integrate more slack features from their documentation. get it connected to open AI API. 



## day 2
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F067VV052DD/screen_shot_2023-12-01_at_4.26.00_pm.png?pub_secret=b125b224cd)


what I did: 
* added in more utilities to my bot so that my bot and mw's bot wouldn't go into endless chatting loops together (added handle-non-bot, etc.)
* added a button to my bot as a way to integrate more of the Slack features in their documentation.

time it took: 
* 1 hour

what's next:
* connect bot to openAI API (was scared to do this before I had my bot more under control! didn't want to ping the API a bazillion times)

### day 3

* got my bot connected to openAI API
* just the basic chat function so far
* need to understand my code since I copied from an old repo
* assistants API/Playground
    * text to voice?

## warning! keep the bots from going into a loop!
The bots will enter into an endless discussion that will cost a LOT of money. DO NOT LET THIS HAPPEN.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06803DC3MK/screen_shot_2023-11-30_at_1.44.22_pm.png?pub_secret=4953b8e01b)