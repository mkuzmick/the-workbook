---
title: cd ai-augmented live to print

---

# cd ai-augmented live to print? to something else?

## day 2

### what i did

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06B7F7424S/screen_shot_2023-12-21_at_11.46.30_am.png?pub_secret=efac39268e)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06B0T0S7QE/screen_shot_2023-12-21_at_11.53.47_am.png?pub_secret=a05fe34d2b)

I started today by looking at OAuth 2.0, the authentication that Google API's use. [You can read more about this here.](https://ai.google.dev/models/gemini) I made a personal Gmail account to test out the API since my g.harvard account was blocked from doing this. 

Then, I ran through the python quickstart tutorial linked in Google's documentation. I uploaded an image from slack (using the public link as the URL to the image) and prompted Gemini Pro Vision to describe the image and write a short story about it. 


Note about writing in Google Colab: It really helps me see the order of operations as they are executed in the code, because you have to run each piece of code like an individual building block. Seems like it's good for debugging, too, since when you get an error you know immediately exactly the lines that are causing it.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06B5BAD84D/screen_shot_2023-12-21_at_2.13.55_pm.png?pub_secret=9bd005d1d1)

Using [Google's documentation for node.js](https://ai.google.dev/tutorials/node_quickstart), I created a Next.js app and got an api route working! I just used the prompt included in the documentation which inexplicably was about a magic backpack.

### how long it took
About two hours

### what's next
Definitely:
* think about how MDFs could use this/what it helps them do
* keep working on next app - connect api route to front end

## day 1

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06B5D33GSG/image_from_ios.jpg?pub_secret=24ed04f2d1)

### what i did
At the back table, I built a recording setup using:
* 2 x Blackmagic cameras
* ATEM mini extreme ISO
* dynamic mic

I tested the white balance and watched a bit of this video about color temperature to refresh my memory about how color temperature works and how to set the white balance given the lighting environment I'm shooting in.

I also tested out setting up the chroma key, which worked! I'm interested in using the chroma key as a way to visualize AI output once I figure out how to connect the camera feed to some kind of multimodal API. Basically, I guess I'm interested in an OBS-type setup where you'd have a way to see what AI is giving back to you based on the input we send from the cameras.

### how long it took

approximately 3 hours (though this also included cleaning the back table and putting other stuff away! and remembering how to do the camera setup! and installing a bunch of software on the computer I'm using--like the ATEM switcher interface).

### what's next
Figuring out what multimodal API to connect this to... and setting up a second monitor maybe.

APIs I'm interested in testing:
* gemini
* Open AI's vision

