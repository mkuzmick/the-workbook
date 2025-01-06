---
title: jk-bot-notes

---

# jk-bot-notes
let's make some bots. first one will be a command line tool (and we should get ridicualously fast at making these ont he fly)

create repo in github
- include your initials in the name
- add a read me
- gitignore = node
- license = MIT
- then clone it

in terminal
- cd Development
- git clone your-repo
- cd your-repo
- npm init and hit return a ton 
    - (if you don't have node, you'll need to ``` brew install node ```...if you don't have homebrew..go back to basics ([Basic Training Package](/SWo0f6uPSi2mgnnvXRt7Nw)) and return once you've completed that)
- code .

in code
- add all of these to the gitignore file so nothing that' secret gets put on github:
 ```
 .env*
.DS_Store
_hidden
_tests
_secret
_output
```

then set up some of your folders and files that you'll use:
- cli.js
- .env
- src
    - utils
        - llog
            - index.js (we don't need this for this app actually, but it's useful when you have more sutff going on)
    - projects
        - openai
            - index.js

get the openai api key and throw that in your .env file

in your cli.js:
```
#!/usr/bin/env node

const figlet = require('figlet')
const clear = require('clear')

require("dotenv").config({ path: __dirname + `/.env.cli` });
var yargs = require('yargs').argv;

const jkwhisper = require('./src/projects/openai')


clear()
console.log(figlet.textSync("w4me"))
console.log("whispering...")
console.log(JSON.stringify(yargs, null, 4))


if (yargs.whisper) {
    jkwhisper.whisper4me(yargs.whisper)
} else {
    console.log("dude, you gotta specify the command")
```

in your index.js for openai:
```

const OpenAI = require("openai")
const llog = require("../../util/ll-logs")
const fs = require("fs")
const path = require("path")



const whisper4me = async (audioFilePath) => {
    const openai = new OpenAI({apiKey: process.env.cli});
    console.log("read my lips...")
    console.log(audioFilePath)
    const result = await openai.audio.transcriptions.create({
        file: fs.createReadStream(audioFilePath),
        model: "whisper-1",
      });
    console.log(JSON.stringify(result, 4, null))

}



module.exports.whisper4me = whisper4me
```
in your package.json:
add this object before scripts:
```
"bin": {
    "w4me": "cli.js"
  },
  ```


---
 now let's make a slack app!
 
 
 follow [mk-resource-slack-with-openai-assistants-api](/AlisqQxgST25bitVmsbI1g) and also here are some notes:
 
 on slack api ... where to find:
SLACK_BOT_TOKEN=in OAuth... scopes...bot token scopes...add...chat:write
SLACK_SIGNING_SECRET=basic info...app credentials...signing secret
SLACK_APP_TOKEN=basic info...app level tokens...generate...connections:write

go to Socket Mode and enable socket mode