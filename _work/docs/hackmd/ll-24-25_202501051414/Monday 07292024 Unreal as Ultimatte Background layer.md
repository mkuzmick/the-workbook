---
title: Monday 07292024 Unreal as Ultimatte Background layer
tags: [chris]

---

# Monday 20240729 Unreal as Ultimatte Background layer (with media layer infront of foreground )

## Setting up an Unreal Engine Scene
- Make sure to include a 'cine camera' actor
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EHERJVUJ/cinecamera.png?pub_secret=a37efc6ad5)

### Outputting with Decklink 8k
- Currently Decklink_1 is going right into A8k21 and is being exclusively used to output to UE
- You can check the routing in the "BlackMagic Desktop Video Setup" app
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07F6AELGUQ/decklinkoutput.png?pub_secret=0d3db9b154)


- Add a BlackMagic Media Output object into your scene
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EARP61PY/media_objectbackground.png?pub_secret=166b08a579)

- You can then access the MediaCapture Window at anytime to begin capture. Just select the new named BlackMagic Media Output in the setup (here named Media_Background)
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EHES1F1Q/media_capturewindow.png?pub_secret=e7c7a5c9ff)


### Setting view to camera for output
- The media capture window will capture whatever is on your screen at the moment, so for best results, "play" your scene. This would normally move your view away the cine camera though to a contolled pawn, so the ensure that the camera view you have been working on is output correctly, use this in the level Blueprint (this little piece of code seems incredibly useful in almost all of these applications)
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EKV2AZN0/setviewtotarget.png?pub_secret=9c01f0548a)



## Setting up Ultimatte
### Backgorund
- In A8k, route Camera 21 (UE Output) to ultimatte_bg (helpfully labeled by Marlon)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EL6QJXB6/screenshot_2024-07-29_at_9.55.24___am.png?pub_secret=323ddb737c)

### Foreground
- In A8k, route Camera 3 (greenscreen) to ultimatte_fg
- in the Matte in > window correct the window (with the knobs for top, bottom, left, right) to isolate just the green screen (like the masking in ATEM)
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EHMY1BK4/screenshot_2024-07-29_at_9.56.33___am.png?pub_secret=3172bee191)

- Adjust the key in the Matte > screen sample window. Choosng "Dual Cursor" allows one to choose two points for color (one on the floor, one on the wall) for a more accurate key
    - The selection is annoyingly done by moving a cursor for both wall and floor with thr horizontal and vertical position knobs

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07E35JU73R/screenshot_2024-07-29_at_9.56.11___am.png?pub_secret=0cc6731359)

### Layer
- You can add a media layer either above or below the foreground.
- This is done in settings > media > Media Setup
    - Here you can add a new piece of media and assign it to the layer
    - Be sure that your media i the same size as your scene! (here it needs to be 3840 x 2160)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EF5VME8M/screenshot_2024-07-29_at_10.49.55___am.png?pub_secret=55b7c95ecc)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EWNF5Q49/screenshot_2024-07-29_at_10.50.03___am.png?pub_secret=e422ac3def)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07E3FW6HC7/screenshot_2024-07-29_at_10.50.07___am.png?pub_secret=3bc6e087da)

- In the Matte In window you can toggle between FG/LYin BG (forgreound above Layer) and LYin/FG BG (layer above foreground)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EHMY1BK4/screenshot_2024-07-29_at_9.56.33___am.png?pub_secret=3172bee191)
### Talent Monitor
- The talent monitor (currently running to controlMonitor-2) inverts the image 


## lingering questions
- How to incorporate this with OBS (how to best screen record the program output)
- How to work without flying key in Ultimatte (doesn't seem to exist) 
- Would we ever take this program output and use it in ATEM?