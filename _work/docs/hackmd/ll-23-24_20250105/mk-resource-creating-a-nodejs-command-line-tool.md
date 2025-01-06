---
title: mk-resource-creating-a-nodejs-command-line-tool

---

# mk-resource-creating-a-nodejs-command-line-tool

## getting the command to work

- create a repository on github
    - initialize with a readme
    - add a gitignore (nodejs template)
- clone that repository and change directories to get into it
- `npm init` and make your selections
- `code .`
- add anything you want to ignore to ``.gitignore`

```
.env*
.DS_Store
_hidden
_tests
_secret
_output
```
- in the root of the project, create a file called `cli.js`
- inside, add the node shebang and a simple log message

```
#!/usr/bin/env node

console.log("launching my command line tool")
```
- you COULD run `chmod 755 ./cli.js` and then run the script with just `./cli.js` (or the whole path to the script from wherever you are in terminal)--but it's more elegant to define the command in your package.json file, so...
- in your package.json file, define this command by adding
```
"bin": {"mycommand": "cli.js"},
```
- in terminal (once you've done the previous steps, not before) type `npm link` while in the root of your project (just make sure you gave the command a name that isn't already a shell command or tool that we use--like don't use `mkdir` or `ls` or `ffmpeg` etc)
- then you should be able to run the script with `mycommand` (or whatever you typed as the property of the object you defined in the "bin" lines of your package.json)


## getting arguments into the command

- while in the root of your project, let's add some packages that people frequently use in command line tools

```
npm i yargs figlet clear dotenv
```
- now let's use these in the command

```
const figlet = require('figlet')
const clear = require('clear')
const yargs = require('yargs').argv
require("dotenv").config({ path: __dirname + `/.env` })

clear()
console.log(figlet.textSync("my command"))
console.log("launching my command with yargs:")
console.log(JSON.stringify(yargs, null, 4))
```
- hopefully it still works
- now let's add some environment variables to a file we'll call `.env` (it should be in the same directory as the `cli.js` file for the fourth line above to work)
- put any API keys in this file (and make sure it's grayed out in vscode, meaning that it won't be staged for commiting to github)
```
OPENAI_API_KEY=XXXXXXXXXXXXXXSXXXXXXXXX
```
- that api key should now be available as `process.env.OPENAI_API_KEY` throughout your app.
- 
 
## create your own utilities etc

- create a `/src` folder
- inside there create other folders for your code. It's conventional to have one called `/utils` for bits of code you use all across the project (and even in other projects) and the



## direction we're going


```
#!/usr/bin/env node

var figlet = require('figlet');
var clear = require('clear');

const llog = require('./src/utils/ll-logs')
const { whisper, vision, tts } = require('./src/projects/openai')

require("dotenv").config({ path: __dirname + `/.env.cli` });
var yargs = require('yargs').argv;

clear()
llog.cyan(figlet.textSync("my command."))
llog.gray(`launching with yargs`, yargs)

if (yargs.whisper) {
    whisper({audioFile: yargs.whisper})
} else if (yargs.vision) {
    vision({imageFile: yargs.vision})
} else if (yargs.tts) {
    llog.red({textFile: yargs.tts})
    tts({textFile: yargs.tts})
} else {
    console.log(`sorry, you didn't enter a recognized command.`)
}
```

if you want llog


```
const ansiColors = {
    black: `\u001b[30m`,
    red: `\u001b[38;5;196m`,
    green: `\u001b[32m`,
    yellow: `\u001b[38;5;11m`,
    blue: `\u001b[34m`,
    magenta: `\u001b[35m`,
    cyan: `\u001b[36m`,
    white: `\u001b[37m`,
    reset: `\u001b[0m`,
    gray: `\u001b[38;5;245m`,
    darkgray: `\u001b[38;5;239m`,
}

function myTypeOfLog(things, color) {
    things.forEach(thing => {
        if (typeof thing == "string") {
            console.log(`${ansiColors[color]}${thing}${ansiColors.reset}`)
        } else {
            console.log(`${ansiColors[color]}${JSON.stringify(thing, null, 4)}${ansiColors.reset}`)
        }
    })
}

module.exports.blue = (...things) => { myTypeOfLog(things, "blue" ) }
module.exports.cyan = (...things) => { myTypeOfLog(things, "cyan" ) }
module.exports.yellow = (...things) => { myTypeOfLog(things, "yellow" ) }
module.exports.magenta = (...things) => {myTypeOfLog(things, "magenta" ) }
module.exports.green = (...things) => {myTypeOfLog(things, "green" ) }
module.exports.red = (...things) => {myTypeOfLog(things, "red" ) }
module.exports.white = (...things) => {myTypeOfLog(things, "white" ) }
module.exports.gray = (...things) => {myTypeOfLog(things, "gray" ) }
module.exports.grey = (...things) => {myTypeOfLog(things, "gray" ) }
module.exports.darkgray = (...things) => {myTypeOfLog(things, "darkgray" ) }
module.exports.divider = `#########################################################\n#########################################################`
```


then in `./src/projects/openai`

```
const fs = require('fs').promises;
const path = require('path');
const { OpenAI } = require('openai');

module.exports.tts = async ({ textFile }) => {
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

    // Read the text content from the textFile
    const textContent = await fs.readFile(textFile, 'utf8');

    // Extract the directory and the file name without extension from textFile
    const dir = path.dirname(textFile);
    const baseName = path.basename(textFile, path.extname(textFile));

    // Construct the output path with the same structure but with .m4a extension
    const outputPath = path.join(dir, `${baseName}.mp3`);

    const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: textContent, // Use the read text content as input
        // response_format: "aac"
    });
    console.log(outputPath);
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.writeFile(outputPath, buffer);
}

// module.exports.whisper = still to do
// module.exports.vision = still to do
```