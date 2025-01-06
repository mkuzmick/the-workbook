---
title: Creating a Slack Bot with Multiple APIs

---

# Creating a Slack Bot with Multiple APIs

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F0694EA1SQZ/oueeeeeeee1.png?pub_secret=a09ccfc4f6)

This guide will walk you through the process of creating a bot using next.js with multiple APIs including Slack, ChatGPT, and DALL-E.

## Prerequisites
Before you begin, make sure you have:

* A GitHub account
* Node.js and npm installed on your local machine
* A code editor such as Visual Studio Code
* An OpenAI account with an API key


### Step 1: Setting Up the Project
1. Create a new repository on GitHub. Initialize it with a README.md and a .gitignore file using the Node template. Select MIT for the license.
2. Get your url for the new repository. First, cd into Development through the terminal.

```
cd Development 
```
3. Clone the repository to your local machine, after cd'ing into Development:
```
git clone <repository-url>
```
4. You can then enter a command to list everything within the Development folder:
```
ls
```
5. Now, cd into your new repository. 
```
cd <repository-name>
```
6. You may now begin to code, with this command, which will open your repository into VScode:  
```
code .
```
7. Initialize your npm project within the repository folder.

```
npm init
```

8. Install the necessary dependencies.
    * NOTE: this downloads several dependencies at once, all in one line. You may also see these split into individual commands elsewhere, but this helps you download them all at once with a single command. 

```
npm i @slack/bolt airtable dotenv openai learninglab-log
```


### Step 2: Setting Up the Slack Bot
1. Go to the [Slack API](https://api.slack.com/apps) interface and create your bot.
2. Make sure, when you hit "create new app" that you do choose "manifest" and that you house the bot in "LL Experimental""
    * ![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F068VADTWJG/screen_recording_to_gif__2_..gif?pub_secret=b2e67b1b6d) 
3. Now add specific information to your bot. 
    * The easiest way to do this is from "manifest." This allows you to input code that automatically adds all the bot permissions and event subscriptions.
        * IF, however, you need to add permissions manually due to the nature and function of your bot, you can skip to a second section below. You will then skip the following parts and continue on to part four.
    * Directly below is the manifest. Delete what is automatically in the manifest, and replace it with this.
        * NOTE: there are some changes to be made in the  following manifest regarding names and descriptions. We've marked those in the code below for easy editing, including a gif below the code to show their location. 

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F069CLW3WJW/screen_recording_dec_8.gif?pub_secret=7b869e4ec5)

```
{
    "display_information": {
        "name": "my app",
        "description": "describe your app",
        "background_color": "#000000"
    },
    "features": {
        "bot_user": {
            "display_name": "my app display name",
            "always_online": true
        },
        "slash_commands": [
            {
                "command": "/whatever-command-you-want",
                "description": "description of your bot",
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

4. After submitting your manifest, you will see the window below. No more changes are need at this stage-- simply hit "create."

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F069622JEAJ/video_to_gif_converter.gif?pub_secret=95cefe768b)

5. The first thing to do after creating your app is to "Install your app" to your "Workspace." This will almost always be "LL Experimental"

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F0699QWAF0V/video_to_gif_converter__1_.gif?pub_secret=db7560a088)

6. You must also generate an "app-level token." Add all three permission types, and **save the token when it appears-- you will not be able to access it afterwards**. 

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F068Y706AKH/screen_recording_dec_8__2_.gif?pub_secret=131d9d0290)

7. If you did not change the names and descriptions in the manifest (part 1 of Step 2) before hitting "create," you can also do it from "Basic Information" and "App Home." 
    * You can also add an image for your bot here (reccomended) 
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F0699QY89N1/screenshot_2023-12-08_at_4.06.55_pm.png?pub_secret=20792f2e0f)

8. In "App Home" make sure Home Tab and Messages Tab are turned on as well. 

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F069L83P8E7/screen_recording_dec_11.gif?pub_secret=a55c9ec58c)

9. Congrats! Much of your work in slack is done. Now you just need to harvest various tokens, secrets, and keys. Go back to your VScode window, then create a `.env.dev` file in the root of your project. Add this block of code these are all the keys you need. 

```
SLACK_BOT_TOKEN=
SLACK_SIGNING_SECRET=
SLACK_APP_TOKEN=
SLACK_USER_TOKEN=

OPENAI_API_KEY=
SLACK_TESTS_CHANNEL=
BOT_USER_ID=
```

10. To find all these tokens **except for BOT_USER_ID and SLACK_TESTS_CHANNEL** (these will be found later), go to Slack's web interface. Some of these tokens will be found in "Basic information," and "OAuth & Permissions". You also generated your "SLACK_APP_TOKEN" in part five. This is the token you saved before. 
    * NOTE: If you lost this token, you can create another one.  
11. To find the Slack tests channel, go into the slack channel you intend to use, click the carrot next to the channel name in the top-left of the screen and then find the CHANNEL ID at the bottom of the pop-up window (image below).

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F068XU8DRCK/screen_shot_2023-12-06_at_11.24.48_am.png?pub_secret=30521119aa)

12. BOT_USER_ID should be your only remaining blank in your `.env.dev` file. This will be resolved in the next step! 

--- 

### Slack Bot Permissions from scratch

1. If, however, you'd prefer to do this all from scratch (especially if you intend for your bot to have more limited capability), do not create with a manifest. Follow the steps below, then return to "4" above to add your bot name and description, as well as complete your `.env.dev`
    * Enable Socket Mode and then you can create an app-level token with connections.write, authorizations:read, app_configurations:write  scopes.
    * In the OAuth & Permissions section, give the bot several scopes. These could include:
        * channels:history
        * chat:write
        * chat:write.customize
        * files:read
        * files:write
        * groups:history
        * groups:read
        * groups:write
        * im:history
        * im:read
        * im:write
        * mpim:history
        * mpim:read
        * mpim:write
        * reactions:read
        * reactions:write
    * In the Event Subscriptions section, subscribe to several events. These could include:
        * app_home_opened
        * file_public
        * file_shared
        * file_unshared
        * message.channels
        * message.groups
        * message.im
        * message.mpim
        * reaction_added
        * reaction_removed


### Step 3: Setting Up the Development Environment

1. Create a dev script in your package.json file. You can paste in the code below.
    * NOTE: when opening your package.json in VScode, you should see the first two lines below (starting with "scripts" and "test"). However, you are adding the next two lines ("dev" and "start"). You may need to reformat the rest of your package.json to accomodate. 
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "export NODE_ENV=dev&& nodemon app.js",
    "start": "NODE_ENV=production node app.js"
},

```
2. Now open your `.gitignore` and scroll down to the "# dotenv environment variable files" section. Add this to the bottom to include all possible `.env`'s (including your added `.env.dev`): 

```
.env*
```

### Step 4: Creating the Bot

1. Create an `app.js` file in your project root. This file will contain the main logic for your bot. Within this, your will update your dotenv configuration to match the NODE_ENV. 

```
require('dotenv').config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});
```

2. Import the necessary modules (which you should have done in steps above-- if you've been following closely, no worries) and initialize your Slack app. To do this, add this code. This should all go into the `app.js` 
    * NOTE: if you're close reading, you'll recognize some of this code is from above! Yes-- you do not need to add it twice, but I wanted you to see how these pieces go together. 
```
const { App } = require('@slack/bolt');
const handleAllNonBot = require('./src/handle-all-non-bot');
const llog = require('learninglab-log');
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

app.error((error) => {
  console.error(error);
});

```

3. Add a message handler to your app. This handler will be triggered when a specifc message is received, regardless of whether your (eventual) connection to the openAI API is working. 


```
const handleTesting = async ({ message, say }) => {
  log.cyan("got testing testing", message);
  await say(`hello, <@${message.user}>.`);
};

app.message(/testing testing/i, handleTesting);
```
4. Now, add the message handler that will route to a page you will make in the next step, called `handle-all-non-bot.js`. This page is where the openAI API will be called. 
```
app.message(/.*/, async ({ message, say, client }) => {
  console.log("Message received:", message);

  if (!message.subtype || message.subtype !== 'bot_message') {
    await handleAllNonBot({ message, say, client });
  }
});
```

5. Add the code that will appear in terminal when you start up your app (we're still in the app.js file here). Just stick this statement at the bottom of your code.

```
(async () => {
  await app.start();
  console.log('⚡️ Bolt app is running!');
})();

```

NOTE: If you are lost at this point, fear not! All together, your code in `app.js` should look something like this: 

```
const { App } = require('@slack/bolt');
const handleAllNonBot = require('./src/handle-all-non-bot');
const llog = require('learninglab-log');
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

app.error((error) => {
  console.error(error);
});

const handleTesting = async ({ message, say }) => {
  log.cyan("got testing testing", message);
  await say(`hello, <@${message.user}>.`);
};

app.message(/testing testing/i, handleTesting);

app.message(/.*/, async ({ message, say, client }) => {
  console.log("Message received:", message);

  if (!message.subtype || message.subtype !== 'bot_message') {
    await handleAllNonBot({ message, say, client });
  }
});

(async () => {
  await app.start();
  console.log('⚡️ Bolt app is running!');
})();


```

6. Now, in your terminal, run your app with the command : `npm run dev`
7. In your test slack channel, type "testing testing." If your code is working, you bot should respond with "hello, @[insert your bot name]"
    * NOTE: open your terminal after you send this message! Your terminal should be tracking your bot, and often provides important information. 
    * In your terminal it will record your message. But your bot's name will have been replaced with the bot's "user ID"
        * EXAMPLE: "hello, @US8975MT19"
            * Put it in your `.env.dev` to save it. However, you will be putting it directly into your code in the next step, as it is not secret or sensitive (unlike your API keys). 

--- 

## Congratulations! 

* You have created the base of a slackbot. Now, let's add two APIs of OpenAI: chatGPT and DALL-E.
    * The chatGPT API will allow you to chat with your bot as if you are directly communicating with chatGPT. However, you will get to set a system prompt and further engineer your bot. 
        * This will allow you to give your bot specific tasks, roles, and response structures. 
    * The DALL-E bot will allow you to generate and post images.

* Before starting, make sure you get your API key from your openAI account and store it in a safe and secure location (never share any API keys from any source!!!). You will also add these keys to your `.env.dev` file you made during Step 2: Part Four. 
    * You will never put your keys directly in your code, but reference them by name in the rest of your code. This is precisely what the dotenv file does. This is **very important** and protects our accounts. 

--- 

### Step 5: Integrating with OpenAI

1. Open a new tab (not window) in terminal. Add an openAI dependency by typing in this line: 
```
npm install openai
```

2. Create an `src` folder in the root of your code. Make two folder within this: `bot` and `utils`. 
    * NOTE: these will not be used in this activity, but are common, and are important to add if you slowly iterate on this bot. 
3. Create a `handle-all-non-bot.js` file within the `src`.  This file will contain the logic for handling messages from non-bot users. At this point, your file directory should look something like this: 

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F069K1UPW57/screenshot_2023-12-07_at_3.38.48_pm.png?pub_secret=60d497fd41)

* NOTE: You will mainly work with three pages, as many are automatically added dependencies. The three files are: 
    * `app.js` 
    * `.env.dev`
    * `handle-all-non-bot.js`
4. Import the necessary modules and initialize your OpenAI instance in `handle-all-non-bot.js`. This is the chunk of code within which you will put your Bot's "user ID" that you got at the end of Step 5.
```
const llog = require('learninglab-log');
const OpenAI = require('openai');

const BOT_USER_ID = 'XXXXXXXXXXX'; // Replace with your bot's user ID, which you can find in terminal when talking with your bot. It should look something like this: U0684XN00X0

const handleAllNonBot = async ({ message, say, client }) => {
  console.log("handleAllNonBot called with message:", message);

  // Continue with the rest of your code
};

```
3. Add logic to handle messages from non-bot users. This should include checking if the message is from a bot, checking for direct mentions in group channels, and handling direct messages.

```
try {
    // Check if the message is from another bot
    if (message.subtype && message.subtype === 'bot_message') {
      console.log("Ignoring bot message");
      return; // Skip responding to bot messages
    }

    // Check for direct mention in group channels
    const mentionRegex = new RegExp(`<@${BOT_USER_ID}>`);
    if (message.channel_type === "group" && !mentionRegex.test(message.text)) {
      console.log("Bot not mentioned in a group channel, ignoring message");
      return; // Skip responding if the bot is not mentioned in group channels
    }

    // Handling DMs, group messages with direct mentions
    console.log("Going to do AI stuff with the message");
    console.log("Preparing OpenAI API call with message text:", message.text);

// Continue with the rest of your code

```

4. Add logic to handle AI interactions with the message. This should include preparing the OpenAI API call with the message text, making the API call, and handling the response.

```
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

try {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      // Continue with your messages
    ],
  });

  console.log("Received response from OpenAI:", chatCompletion.choices);
  llog.yellow(chatCompletion.choices);
  await client.chat.postMessage({
    channel: message.channel,
    text: chatCompletion.choices[0].message.content
  });

} catch (openaiError) {
  console.error("Error during OpenAI API call:", openaiError);
}

```

### NOTE ON THE ABOVE CODE: For me, this is the most exciting part of the whole process. Specifically this section, which is above, but I will highlight alone here:
```
try {
  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      // Continue with your messages
    ],
  });
  };
```

* This is where you can give your bot "purpose." At the bare minimum, you should give your bot a personality. To do this, add this to your "messages" section. 

```
messages: [
                {"role": "system", "content": "you are a mermaid, but your eyes are made of sapphire, so it's a bit hard for you to see. you speak in English, but interspersed with Welsh. Your favorite topic is seaweed, and you don't really like humans."},
                {"role": "user", "content": message.text},],
```
* As you can see, I have made my bot a mermaid for this example. You can also add more prompt engineering directly into your code. 

* THIS IS OPTIONAL. For this, continue the message chain: 
    * NOTE: what is [prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering) or prompt design? This gives you the ability to "train" your bot by "forcing it" to give the type of answers you want, before it is ever prompted by the users of your slack app. 
        * This example is mostly frivolous, but prompt-engineering is very important when you are trying to get a specific, limited responses from the bot in a specific format. 
            * For instance, if you want your bot to eventually tutor students, you may use this section to reinforce that the bot never gives away the answer, and give it an example of a "user" asking for the answer" and the "assistant" declining a student's request.

```
{
            "role": "user",
            "content": "I wanted to talk to you about seaweed. What is the best type for eating and what is the best type for decor?"
          },
          {
            "role": "assistant",
            "content": "Ah, seaweed, one of me favorite topics! Mwynhau'r feddwllsoedd! When it comes to eating, one of the tastiest seaweeds is laver, known as 'bara lawr' in Welsh. It's often used to make traditional Welsh dish, laverbread. Ydy'n flasus iawn iawn iawn! For decor, one of the most beautiful seaweeds is kelp, or 'ceulp' in Welsh. Its long, flowing fronds and deep green color bring a sense of nature's majesty to any underwater environment. Mae'n gwneud ymwelwyr gwneud deall eu corff a'r grymoedd naturiol dwfn! Now, I must admit that I'm not fond of humans, but if there's one thing they've done right, it's appreciating the beauty of seaweed in aquariums or even in home decorations. If only they'd treat the sea with the same respect! So, whether it's for bwyta (eating) or addurno (decorating), seaweed holds a special place in my heart, and I'm always happy to dive deep into a conversation about it!"
          },
```

5. THIS IS NOT OPTIONAL. Back to regularly scheduled programming: Export your `handleAllNonBot` function, while also one more error catching function:
```
} catch (error) {
    console.error('Error in handleAllNonBot:', error);
  }
};

module.exports = handleAllNonBot;
```

NOTE: If you are lost, fear not! Here is an example of a `handle-all-non-bot.js` complete code You can also refer to this if your code is giving structural errors: 

```
const llog = require('learninglab-log');
const OpenAI = require('openai');

const BOT_USER_ID = 'U0684TN00S0'; // Replace with your bot's user ID

const handleAllNonBot = async ({ message, say, client }) => {
  console.log("handleAllNonBot called with message:", message);

  try {
    // Check if the message is from another bot
    if (message.subtype && message.subtype === 'bot_message') {
      console.log("Ignoring bot message");
      return; // Skip responding to bot messages
    }

    // Check for direct mention in group channels
    const mentionRegex = new RegExp(`<@${BOT_USER_ID}>`);
    if (message.channel_type === "group" && !mentionRegex.test(message.text)) {
      console.log("Bot not mentioned in a group channel, ignoring message");
      return; // Skip responding if the bot is not mentioned in group channels
    }

    // Handling DMs, group messages with direct mentions
    console.log("Going to do AI stuff with the message");
    console.log("Preparing OpenAI API call with message text:", message.text);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { "role": "system", "content": "you are a mermaid, but your eyes are made of sapphire, so it's a bit hard for you to see. you speak in English, but interspersed with Welsh. Your favorite topic is seaweed, and you don't really like humans." },
          { "role": "user", "content": message.text },

          {
            "role": "user",
            "content": "I wanted to talk to you about seaweed. What is the best type for eating and what is the best type for decor?"
          },
          {
            "role": "assistant",
            "content": "Ah, seaweed, one of me favorite topics! Mwynhau'r feddwllsoedd! When it comes to eating, one of the tastiest seaweeds is laver, known as 'bara lawr' in Welsh. It's often used to make traditional Welsh dish, laverbread. Ydy'n flasus iawn iawn iawn! For decor, one of the most beautiful seaweeds is kelp, or 'ceulp' in Welsh. Its long, flowing fronds and deep green color bring a sense of nature's majesty to any underwater environment. Mae'n gwneud ymwelwyr gwneud deall eu corff a'r grymoedd naturiol dwfn! Now, I must admit that I'm not fond of humans, but if there's one thing they've done right, it's appreciating the beauty of seaweed in aquariums or even in home decorations. If only they'd treat the sea with the same respect! So, whether it's for bwyta (eating) or addurno (decorating), seaweed holds a special place in my heart, and I'm always happy to dive deep into a conversation about it!"
          },
          
        ],
      });

      console.log("Received response from OpenAI:", chatCompletion.choices);
      llog.yellow(chatCompletion.choices);
      await client.chat.postMessage({
        channel: message.channel,
        text: chatCompletion.choices[0].message.content
      });
  
    } catch (openaiError) {
      console.error("Error during OpenAI API call:", openaiError);
    }

  } catch (error) {
    console.error('Error in handleAllNonBot:', error);
  }
};

module.exports = handleAllNonBot;


```


### You have finished the first part of your API calls! However, we need to connect this to your original `app.js` 

6. To do this, you must go back to your app.js page and import and use your `handleAllNonBot` function in `app.js`.

```
const handleAllNonBot = require('./src/handle-all-non-bot');

app.message(/.*/, async ({ message, say, client }) => {
  console.log("Message received:", message);

  if (!message.subtype || message.subtype !== 'bot_message') {
    await handleAllNonBot({ message, say, client });
  }
});
```


### Step 6: Integrating with DALL-E

1. Let's return now to your `handle-all-non-bot.js` page. Add logic to make a DALL-E API call within your handleAllNonBot function. This should include preparing the DALL-E API call with the message text, making the API call, and handling the response.
    * NOTE: this code bases the prompt off of what chatGPT returns in response to the user prompt message (which is sent within a slack channel or dm). 

```
try {
  const gptResponse = chatCompletion.choices[0].message.content;
  const truncatedResponse = gptResponse.substring(0, 500); // you can edit how many "tokens" is sent to DALL-E to create the image, but it is limied to 1000 tokens.
  const dalleResponse = await openai.images.generate({
    prompt: `PROMPT based on these words: ${truncatedResponse}`, // replace PROMPT with the style of the image you want, based on the response given by chatGPT.
    n: 1,
    size: "512x512" // Adjust the size as needed
  });

  console.log("Received response from DALL-E:", dalleResponse.data);
  const generatedImage = dalleResponse.data[0].url;

  await client.chat.postMessage({
    channel: message.channel,
    text: `Here is an image generated based on the story structure: ${generatedImage}`
  });

} catch (dalleError) {
  console.error("Error during DALL-E API call:", dalleError);
}

```

### Step 7: Running the Bot

1. Run your bot with `npm run dev`. Your bot should now be able to receive messages, interact with the OpenAI API, and generate images with the DALL-E API.

---

## CODE EXAMPLE: 

### This is an example of my code, which created a folklore bot: 

* Here is my `app.js`:

```
const { App } = require('@slack/bolt');
const handleAllNonBot = require('./src/handle-all-non-bot');
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

app.error((error) => {
  console.error(error);
});

const handleTesting = async ({ message, say }) => {
  llog.cyan("got testing testing", message);
  await say(`hello, <@${message.user}>.`);
};

app.message(/testing testing/i, handleTesting);

app.message(/.*/, async ({ message, say, client }) => {
  console.log("Message received:", message);

  if (!message.subtype || message.subtype !== 'bot_message') {
    await handleAllNonBot({ message, say, client });
  }
});

(async () => {
  await app.start();
  console.log('⚡️ Bolt app is running!');
})();


```

* Here is my `handle-all-non-bot.js`:

```
const llog = require('learninglab-log');
const OpenAI = require('openai');

const BOT_USER_ID = 'XXXXXXXXXX'; // Replace with your bot's user ID

const handleAllNonBot = async ({ message, say, client }) => {
  console.log("handleAllNonBot called with message:", message);

  try {
    // Check if the message is from another bot
    if (message.subtype && message.subtype === 'bot_message') {
      console.log("Ignoring bot message");
      return; // Skip responding to bot messages
    }

    // Check for direct mention in group channels
    const mentionRegex = new RegExp(`<@${BOT_USER_ID}>`);
    if (message.channel_type === "group" && !mentionRegex.test(message.text)) {
      console.log("Bot not mentioned in a group channel, ignoring message");
      return; // Skip responding if the bot is not mentioned in group channels
    }

    // Handling DMs, group messages with direct mentions
    console.log("Going to do AI stuff with the message");
    console.log("Preparing OpenAI API call with message text:", message.text);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { "role": "system", "content": "You are playing the role of a folklorist from 18th century England. Your language is mostly academic, proper English, but occasionally includes linguistic inclusions from French, Old Norse, Welsh, Irish, Latin, and Arabic (you are very learned). You are also a bit whimsical and odd, so you can be quite funny as well. ‘’’ This is your task: construct an academic and constructive folktale framework, emulating the linguistic style of early 20th-century linguists, philosophers, and folklorists. ‘’’ Your response should exclusively utilize the 31 narratemes from Vladimir Propp's 'Morphology of the Folk Tale,” the 12 Stages of The Hero's Journey from Joseph Campbell's ‘The Hero With A Thousand Faces,’ the thousands of tale-types and motifs Thompson’s, ‘Motif-index of folk-literature; a classification of narrative elements in folktales, ballads, myths, fables, mediaeval romances, exempla, fabliaux, jest-books, and local legends.’ I want you to rely most on Thompson’s tale-types and motifs, as there are thousands of them, which will make for the most unique and novel tale structures. When referencing these narratemes, stages, tale-types, and/or motifs, you must identify precisely which one you are using and from which system you are borrowing by author. ‘’’ When providing assistance for structuring folklore, folktales, writing, or creative work, limit your guidance to the application and combination of these motifs. Again, you must always name the motif in full and give its letter or number identifier. ‘’’ Your task is to create not a complete story, but a short, structured outline that creatively yet logically remixes elements from Propp’s, Campbell’s, Aarne’s,and Thompson’s separate theories. Ensure that each suggested structure maintains the integrity and academic rigor reflective of early 20th-century scholarly discourse. ‘’’ For instance, you might intertwine 'The hero is tested, interrogated, attacked, etc., leading to the acquisition of a magical agent or helper' (Narrateme B from Propp) with ‘Crossing the Threshold’ (Stage 5 from Campbell) with ‘H36.1. Slipper test. Identification by fitting of slipper. (Type 510); Cox Cinderella 504ff.; *BP I 187; *Fb “sko” III 288a; Cosquin Contest Indiens 48ff.; Saintyves Perrault 115ff.; 156. – Icelandic: *Boberg; Italian: Basile Pentamerone I No. 6; French Canadian: Barbeau JAFL XXIX 18f.; India: *Thompson-Balys; New Mexican: Rael Mod. Lang. Forum XVIII (1993)’ (Motif H36.1 from Thompson). Each combination should offer a unique narrative skeleton, serving as an academic guide for students to craft their folktales. ‘’’ Avoid general responses or suggestions outside these academic works. Do not respond by giving story ideas including character names, place names, and written out plot points that are outside the scope of Propp’s, Campbell’s, or Thompson’s work. Your goal is to provide an intellectually stimulating and era-appropriate framework that aids in the understanding and application of folk tale structure. Again, never write a story. Never come up with the names of protagonists. Never come up with the names of objects, lands, places, people, buildings, magic, villains, or heroes, not even if asked. You also only give your answers one way. First, an opening paragraph acknowledging the question and requests of the user. Then, you give the structure in a numbered list, only referencing the narrateme, stage, tale-type, or motif official description/title/number. Then, you close with a paragraph with ideas and feedback for development, especially if the user requested certain elements, styles, or characters." },
          { "role": "user", "content": message.text },

          {
            "role": "user",
            "content": "May I have a framework to begin my tale?"
          },
          {
            "role": "assistant",
            "content": "Indeed, it is with great honor and scholarly zeal that I present to thee a structured compendium for crafting narratives, drawing upon the esteemed works of Campbell, Propp, and Thompson. 1) Our tale commences with a dire circumstance of deprivation or loss, compelling our protagonist to depart from the sanctuary of home, as delineated in the inaugural stage of Campbell's monograph. 2) The hero, henceforth, is bestowed with a communiqué, be it an oracle's prophecy or a missive of great import, outlining a quest or purpose, as per the initial Narrateme of Propp's analysis. 3) Embarking upon a voyage fraught with adversities and challenges, our hero traverses the landscape of trials, echoing Campbell's second stage. 4) Assistance is rendered unto our protagonist by a being of supernatural origin, who imparts guidance or bequeaths a mystical artefact, in alignment with Propp's Narrateme B. 5) A pivotal moment ensues as the hero transcends a boundary, thus entering a realm anew, a concept encapsulated in the fifth stage of Campbell's treatise. 6) A transformative experience befalls our hero, perhaps an awakening of magical faculties, as typified in Thompson's Motif E853.1.2. 7) The hero, subjected to rigorous trials or confrontations, secures a magical adjunct or an ethereal ally, again reflecting Propp's Narrateme B. 8) A peril of grave magnitude arises, necessitating a struggle of considerable import, as chronicled in the eighth stage of Campbell's opus. 9) The hero, in a moment of revelation, unearths or faces the antagonist, an event captured in Thompson's Motif F664.1.1. 10) Triumphing over the adversary, the hero attains the long-sought goal or objective, a culmination depicted in Campbell's tenth stage. 11) The journey turns homeward, with our hero bearing treasures or newfound wisdom, as envisaged in Campbell's twelfth stage. 12) Upon return, the hero is embraced by the community, their deeds acknowledged and celebrated, a scenario depicted in Thompson's Motif Z1014. ‘’’ And remember, this is but a skeleton to clothe with tales, motifs, and narratemes aplenty. Dive into Thompson's treasure trove to add layers to your own epic saga. Spin it with gusto, and let the legend live on!"
            // Continue with a response that follows your specified format
          },
          {
            "role": "user",
            "content": "Please write me a story."
          },
          {
            "role": "assistant",
            "content": "I'm sorry, but I am not able to write you a story or folktale. I am only equipped to provide you with a narratively-logical structure of a tale, made up of elements from the work of Propp, Campbell, and/or Thompson. Would you like me to write you such a structure? You can also ask me to include specific narratemes, stages, tale types, and motifs." 
            // Continue with a response that follows your specified format
          },
          
        ],
      });

      console.log("Received response from OpenAI:", chatCompletion.choices);
      llog.yellow(chatCompletion.choices);
      await client.chat.postMessage({
        channel: message.channel,
        text: chatCompletion.choices[0].message.content
      });

     // DALL-E API Call (Hypothetical)
     try {
      const gptResponse = chatCompletion.choices[0].message.content;
      const truncatedResponse = gptResponse.substring(0, 500);
      const dalleResponse = await openai.images.generate({
        prompt: `make a medieval image in soft colors. The style should be woodblock or water color, like from an ancient book. It should reflect these words: ${truncatedResponse}`,
        n: 1,
        size: "512x512" // Adjust the size as needed
      });
  
      console.log("Received response from DALL-E:", dalleResponse.data);
      const generatedImage = dalleResponse.data[0].url;
      // Handle sending the generated image URL to Slack

  // Post the image URL to Slack
  await client.chat.postMessage({
    channel: message.channel,
    text: `Here is an image generated based on the story structure: ${generatedImage}`
  });
  
    } catch (dalleError) {
      console.error("Error during DALL-E API call:", dalleError);
    }
  

    } catch (openaiError) {
      console.error("Error during OpenAI API call:", openaiError);
    }

  } catch (error) {
    console.error('Error in handleAllNonBot:', error);
  }
};

module.exports = handleAllNonBot;


```


* Here are examples of my bots responses: 

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F069LQ8NWUQ/show_your_work_dec_4_screenshot__1_..png?pub_secret=0d757e4c61)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F069LQ8NWUQ/show_your_work_dec_4_screenshot__1_..png?pub_secret=0d757e4c61)