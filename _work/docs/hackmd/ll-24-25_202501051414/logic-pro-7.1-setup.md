---
title: logic-pro-7.1-setup

---

# logic-pro-7.1-setup

For this tutorial you will need: 

- Logic Pro 
- Focusrite Scarlett 18i20 (or similar multi-output audio interface)
- (7) speakers
- (7) [TRS cables](https://www.sweetwater.com/sweetcare/articles/whats-the-difference-between-ts-and-trs-cables/)

## Setting It All Up

For a visual guide on speaker placement, reference the diagram below:
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F074YGBP4AC/image-2-2-1024x724.png?pub_secret=c93c44de14)

To start, using TRS cables, connect the speakers to the Scarlett 18i20, going from the input of the speakers to the outputs on the Scarlett 18i20.

 - Consider deciding now the audio interface outputs that each speaker will recieve audio from (e.g. you could decide audio interface outputs 3,5,7 will correlate with the speakers on the left side of the room and outputs 4,6,8 will correlate with the right side of the room. Outputs 1-2 can be left alone for monitoring in stereo. Your Center Speaker can then be assigned to any available output.)

### Open Focusrite Control

*The following instructions are specific for the Focusrite Scarlett 18i20 audio interface, other branded audio interfaces will follow a similar procudure with their respective control software*

[Information in greater detail about FC/steps]

**It is important to make sure that the outputs on the Scarlett 18i20 are assigned to recieve audio from Logic Pro's outputs (Playback Outputs) and not from another source (e.g. the Analog Inputs on the Scarlett 18i20)**

You should end up with the following in Focusrite Control:

Outputs 1-2 <-> Playback 1-2
Outputs 3-4 <-> Playback 3-4
Outputs 5-6 <-> Playback 5-6
Output 7 <-> Playback 7


## Playing Back Audio Through Your 7.1 Setup

### Inside Logic Pro...

Similar to what you did in Focusrite Control, you will now want to assign specific outputs for each speaker within Logic Pro. 

To do so, follow this path to open the window where you will make these assignments: Logic Pro/Settings/Audio/IO Assignments/Output

![Assigning Outputs to Speakers](https://files.slack.com/files-pri/T0HTW3H0V-F07473LBXBP/screenshot_2024-05-20_at_3.15.41___pm.png?pub_secret=f0685b548a)

*Feel free to copy the settings above if you followed the previously suggested output configuration.*

Next to "Show as:" be sure to select *7.1* in the **Surround** section. Any of the speaker options that are greyed out do not apply to the 7.1 configuration. You can also ignore assigning an output for LFE (Low Frequency Effects).

#### The Surround Panner Plugin

1. Create a new audio track (Option + CMD + N)
2. Place any audio material in the empty track (e.g. Apple Loops)
3. In the Inspector view (i) click where it says "Stereo Output"
4. Hover over 'Output' and select 'Surround'

A circular icon should appear with a green dot inside. Double click on the icon to open the Surround Panner plugin. This tool will allow you to move and place the audio anywhere within the 7.1 infastructure by clicking and dragging on the light green-colored dot.

![Surround Panner Plugin](https://files.slack.com/files-pri/T0HTW3H0V-F074CQ03BS8/screenshot_2024-05-20_at_4.19.15___pm.png?pub_secret=e6954bcb0c)

From that, you can begin adding more tracks with audio material and placing them all around your 7.1 system.