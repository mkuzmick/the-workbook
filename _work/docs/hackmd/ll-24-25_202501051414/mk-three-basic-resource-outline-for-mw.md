---
title: mk-three-basic-resource-outline-for-mw

---

# mk-basic-resource-outline-for-mw

Here are what could be the initial set of resources. We'll produce the following for each

0. an initial draft in HackMD
1. an MK/MW live demo (initially for MDFs but then also for Open Houses and PopUps)
2. an MK/MW video walkthrough
3. a text + screenshot version for the Bok website (by next week)
4. a guide for others (LLUFs, fellows, staff) to walk through each of these two (with multiple examples for the sections that involve multiple examples)
5. if custom GPT or lengthy code, a link to the GPT or Github page/repo

We will start with 0 and 1 (0 is 0 because it's not a deliverable)

## Resource 1 = Intro and Interface Overview

- creating acct and logging in
- overview of interface
    - screen shot can show sidebar with mouse over sidebar toggle button (circled)
    - explain three key areas
        - left sidebar
        - main window
        - dropdown options under logo
- the main window is where you'll chat
    - simple starter (screenshot)
- as for settings (screenshot)
    - we won't go through all of them, but you should note the ability to write some custom information about yourself and your preferences (sample = bio, default response style or coding language, etc) (screenshot)
- in the sidebar you'll see the history of your chats and GPTs (screenshot with new chat button clicked and circled)
    - we'll get to GPTs in a sec, but let's create a new chat
    - you'll note it comes up with a title for the chat that will help you find your way back to it if you want to pick up the thread later, but you can also 
    - rename it 
    - delete it
    - or get a share link that can be shared with members of the HArvard workspace
        - note: if you ever want to undo a share, you can find that in settings (screenshot)
- if you want to create a temporary chat, click this [screenshot]
- finally, in the upper portion of the sidebar you will find links to Custom GPTs, which are instances of ChatGPT that have been modified with custom instructions, tools, and documents. We have a separate resource on creating your own Custom GPTs in this doc (LINK). But you can already access Custom GPTs others at Harvard have created and published by clicking this and seeing this (screenshot)

## Resource 2 = Tips and Tricks on Prompting

- you can just ask a question
    - show
- but if you want to control the output, you may want to determine all of the various elements of the conversation you're having with ChatGPT
    - describe the role/identity you want it to assume as it chats
    - describe the audience you want it to "speak" to
    - describe in clarity the content you want it to produce
    - describe the form you want it to give to this content (style and tone--though some of this it could intuit from role and audience--but also format specifications . . . give markdown/table/json/code type examples)
- mark up your text to OVERemphasize the various parts of your prompts so that it can do a better job of identifying the functions each part of your prompt is playing (i.e. do you have a request followed by an example? is there a section of the prompt specifying the format the response should take? where does this start and where does it stop?). Tools for doing this include
    - dashes
    - spacing
    - ALL CAPS
    - brackets and braces and backticks
    - markdown
    - code blocks
    - XML-style tags
    - variables
- multi-shot prompting
- step by step reasoning
    - example of breaking down an operation into steps (and results for this vs result with no step by step)
- image generation
- uploading files
- data analysis and code interpreter
- file outputs 
    - with xml tagging example for formatting?
- customizing instructions
- managing ChatGPT's memory (screenshot)
    - pruning bad memories, etc




## Resource 3++ = Creating Custom GPTs

we only need 1 to start, but then will add more. This zone will be large and modular, with an initial intro that just walks through the basics of the interface and options, and then a series of clickable case studies in a list at the bottom.

### Main Resource

- walkthrough of the interface
    - dialogue option vs configuration tab
    - setting for your id for publishing
- each box of config tab one at a time (but just basic overview)
    - name, description, instructions prompt (callback to tips from resource 2)
    - tools
        - code interpreter and file management
        - image generation
        - retrieval and uploading files
    - actions
        - hand-wavy . . . we'll do a couple special case studies on this in the links below

### Case Studies

Explanation of use case, context, goals, etc. Then walkthrough of what it does, how it was made. Then always a link to a copyable template with correct publication settings in Harvard Workspace.

Possible initial case studies:

- must include one science
- data formatting (such as for scalar/timelinejs uploads, form data, json formatting)
- data analysis
- data generation
- 

