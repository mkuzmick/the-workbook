---
title: mk-resource-slack-with-openai-assistants-api

---

# mk-resource-slack-with-openai-assistants-api

follow [these steps](https://slack.dev/bolt-js/tutorial/getting-started#create-an-app) if you want more professional instructions on starting a slack app. And then just the [OpenAI docs](https://platform.openai.com/docs/api-reference) for the OpenAI side of things.

but let's try to log our steps here:

## starting up the slack-bot

1. create a repository on github
    2. initialize with a readme.md
    3. and a .gitignore (use the node template)
    4. select MIT for the license
3. clone the repository and open it in vscode
    4. git clone (paste)
    5. cd your-app
    6. code .
5. in the repo folder, type `npm init` to initialize your npm project
6. then install some necessary dependencies:
```
npm i @slack/bolt airtable dotenv openai learninglab-log
```
7. in the api.slack.com interace, create your bot. 
- use socket mode (turn it on then create an app-level token with connections.write scope)
- then in the **OAuth & Permissions** section, give it a bunch of scopes (unless you used a manifest.json file). At a minimum:
    - channels:history
    - chat:write
    - chat:write.customize
    - files:read
    - files:write
    - groups:history
    - groups:read
    - groups:write
    - im:history
    - im:read
    - im:write
    - mpim:history
    - mpim:read
    - mpim:write
    - reactions:read
    - reactions:write
- then in **Event Subscriptions**:
    - app_home_opened
    - file_public
    - file_shared
    - file_unshared
    - message.channels
    - message.groups
    - message.im
    - message.mpim
    - reaction_added
    - reaction_removed
- as mentioned above, it is faster to add all of these by creating your app with a manifest.json file or editing the manifest.json file. For instance, the above OAuth permissions and Event subscriptions would look like this:
```
{
    "display_information": {
        "name": "mk-bot-23.11",
        "description": "mk bot for 23.11",
        "background_color": "#000000"
    },
    "features": {
        "bot_user": {
            "display_name": "mk-bot-23.11",
            "always_online": true
        },
        "slash_commands": [
            {
                "command": "/mk-23.11",
                "description": "does stuff for mk",
                "should_escape": false
            }
        ]
    },
    "oauth_config": {
        "scopes": {
            "user": [
                "files:read",
                "files:write"
            ],
            "bot": [
                "app_mentions:read",
                "channels:history",
                "chat:write",
                "chat:write.customize",
                "emoji:read",
                "files:read",
                "files:write",
                "groups:history",
                "groups:read",
                "groups:write",
                "groups:write.invites",
                "groups:write.topic",
                "im:write",
                "im:write.topic",
                "im:history",
                "im:write.invites",
                "im:read",
                "mpim:history",
                "mpim:read",
                "mpim:write",
                "mpim:write.invites",
                "mpim:write.topic",
                "links:read",
                "links.embed:write",
                "links:write",
                "reactions:read",
                "reactions:write",
                "commands"
            ]
        }
    },
    "settings": {
        "event_subscriptions": {
            "user_events": [
                "file_public",
                "file_shared",
                "file_unshared"
            ],
            "bot_events": [
                "app_home_opened",
                "file_public",
                "file_shared",
                "file_unshared",
                "link_shared",
                "message.channels",
                "message.groups",
                "message.im",
                "message.mpim",
                "reaction_added",
                "reaction_removed"
            ]
        },
        "interactivity": {
            "is_enabled": true
        },
        "org_deploy_enabled": false,
        "socket_mode_enabled": true,
        "token_rotation_enabled": false
    }
}
```
- 
9. then create a .env file, create the app on slack and add all the necessary environment variables

```
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET=
SLACK_APP_TOKEN=
SLACK_USER_TOKEN=

OPENAI_API_KEY=

SLACK_TESTS_CHANNEL=
BOT_USER_ID=
```




the last two are optional (we'll explain why you might want them in a bit)
8. now create a `dev` script in your `package.json` that looks something like this

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "export NODE_ENV=dev&& nodemon app.js",
    "experimental": "export NODE_ENV=experimental&& nodemon app.js",
    "aidev": "export NODE_ENV=aidev&& nodemon app.js"
  },
```

if your dotenv lines in `app.js` look like this, you'll add an extension to your `.env` to match the NODE_ENV

```
require('dotenv').config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});
```
10. then you can finally create your app.js file and start up the app with `npm run dev`



```
const { App } = require('@slack/bolt');
const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});

global.ROOT_DIR = path.resolve(__dirname);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000
});

app.message(/.*/, async ({message, say}) => {
    console.log(JSON.stringify(message, null, 4));
    const result = await say("got it");
    console.log(JSON.stringify(result, null, 4))
});

(async () => {
  // Start your app
  await app.start();
  console.log('⚡️ Bolt app is running!');
})();
```

