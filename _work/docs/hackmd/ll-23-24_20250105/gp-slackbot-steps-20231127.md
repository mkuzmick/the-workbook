---
title: gp-slackbot-steps-20231127

---

# gp-slackbot-steps-20231127
Follow this steps if you want to learn how to create your own slackbot with NodeJS. For this tutorial we'll be working using the Socket Mode, which means that we won't be making conventional API requests. As an example, my Slack Bot can be found [here](https://github.com/GonzaloPelenur/slack-ai-bot).
## Create the Slack App
The first step is creating a slack bot on the Slack API webpage. By the end of this step, you should have Slack App and Slack Bot tokens to use later on Node. 
Slack already has a complete step by step tutorial on how to get started, so simply follow [these steps](https://slack.dev/bolt-js/tutorial/getting-started#create-an-app).
## Set up the workspace
Luckly for us, Marlon has already created a repo with a convinient base structure that we can use. Go ahead and clone the [ll-tooltime-on-slackbots](https://github.com/mkuzmick/ll-tooltime-on-slackbots) repository. To do this, simply type on the terminal: 
``` bash
git clone https://github.com/mkuzmick/ll-tooltime-on-slackbots.git
```
### .env file
Create a .env file to store the tokens that we created on the first step. On the parent directory create a file named ".env" and store inside the tokes on the following format:
``` env
SLACK_APP_TOKEN=xapp-smth
SLACK_BOT_TOKEN=xoxb-smth

SLACK_TESTS_CHANNEL=
SLACK_SIGNING_SECRET=
```