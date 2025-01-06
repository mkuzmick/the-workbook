---
title: unreal-guides-cc-20240731

---

# unreal-guides-cc-20240731

Parts: 
- [Inputting Files](##Inputting-Files)
- [Playback Blueprints](##Playback-Blueprints)
- [Animating Cameras](##Animating-Cameras)
- [Camera feeds as materials](##Camera-feeds-as-materials)
- [NDI Inputting](##NDI-Inputting)

## Inputting Files 

Can't read totally natively: needs Electra Media Plugin

To start: 
- media files want to be in `/content/movies`(throws warning if not)
- To become a "thing" to Unreal, it has to be wrapped in `File Media Source` 
- Then, to play back, it must be opened in a `Media Player` and most importantly, it must be left open in the background
- Then, to be able to assign it to geometry of some kind, it must become a `Media Texture`
At this point, things kind of split off. it can be placed on an object now, if all you need is the video to play back. **If you need to comp it** or apply any other manipulations, then you'll need to: 
- Create a `Material` and add your `Media Texture` as your `Base Color` input
	- If you're comping using a mask output, then you'll want to: 
		- add your second Media Texture(the one with the silhouetted mask) as a second node
		- set your Blend mode to be **Translucent**(or Masked) and then add your mask node as the Opacity input

### If your video file is a 4up

Both masks will need to be divided at the Material level. You can do this by adding these nodes: 
-  **TextureCoordinate Node**
- **Constant2Vector Node**
- **Add Node**
- **Multiply Node**
- **Clamp Node** 

* `TextureCoordinate` node to the first input of the `Add` node.
* `Constant2Vector` node (with values 1, 0) to the second input of the `Add` node.
* `Add` node to the first input of the `Multiply` node.
* `Constant` node (value 0.5) to the second input of the `Multiply` node.
* `Multiply` node to the `Clamp` node.
* `Clamp` node to the `UVs` input of the `TextureSample` node.

## Playback Blueprints

For triggering media playback -- 

Every independent piece of media requires an associated Media Player, so you need to trigger it to open and play back at the start of the scene(at Play). 

In the Level Blueprint: 
- Event BeginPlay
	- Open Source node off of the trigger
	- Media Player into Target of Open Source
	- Note the associated Media File
	- Play node off the Open Source node
		- OR, hook into a trigger at this point, a key press/serial input/server route/etc
- If you have multiple media files to open, then chain these Open Source -> Play nodes off each other
----------------
For starting a scene from a Cine Camera Actor(without using a sequencer!) 

The stock method of starting a scene is with a standardized first person controller, this just replaces that FPS controller with the Cine Camera you've implemented. Most commonly used for comped scenes. 

in the Level Blueprint: 
- Event BeginPlay 
	- Output into a Set View Target with Blend node
		- Input Get Player Controller into Target
		- Input our Cine Camera Actor into New View Target
When you start the new scene, it should replace your Player Controller with your Cine Camera.

Note: this can also be done with a Sequencer that you set to Autoplay and Pause at End enabled -- but this prevents you from changing the camera afterwards. 

## Animating Cameras

Animations exist within instances of `Level Sequences`, to set one up: 

- Import a `CineCameraActor` into the scene
	- If you're doing any rotational moves, you can use an `Actor` as the parent to orbit around a focal point
- in the Content Drawer, make a `Level Sequence` 
	- pull it into the scene and double click to open
	- drag whatever you're planning to animate from the `Outliner` to the `Sequencer` window. 
	- Set keyframes with the diamond Keyframe symbol next to the variables you want to animate(either in the `Sequencer` or the `Details` panes). 
	- Other than that, it's just like any other animation software -- set your keyframes and change your variables. 
- Each `Sequencer` is a global set of animations, 

### If you want to animate an object that has a Media texture(that isn't a stream)

- In your `Sequencer` pane, use the `+ Add` button on the top left to add a Media Track and pull your `File Media Source` into this track.  
	- Then right click your `Media Source` => Properties => `Media Texture` and select the Media Texture that is associated with the `Media Source` you already put in your track 
	- To test this, check the Auto Play option in the `Details` pane

## Camera feeds as materials

When you're inputting anything that has texture, moving or not, you'll need to create a material for it to go into(or a material instance, but we'll get into that). 

Check the [Inputting Files](##Inputting-files) section if you aren't up to speed on getting video files into Unreal. If you're using a live input, check [NDI Inputting](##NDI-Inputting), or if you're using the studio system, I'll walk you through it here: 

- Create Blackmagic Media Source file
	- open it and select the corresponding Decklink input
- Create a Media Bundle and set the Blackmagic Media Source as your source
	- set to sRGB
	-  check its working by pulling in your Media bundle into your scene(this will just create a plane with your video on it)
- IF you're using the ultimatte to handle keying, then follow the first two steps again, but this time with your masked input as your Decklink input
- Create a Material
	- pull both associated Media Textures into your material
	- your fill becomes the base layer
	- Set the blend mode to be Translucent or Masked
	- your mask becomes your Opacity layer
- Drag this material onto a plane(or whatever shape you want) and this should function as a key. 

--------------
###  Outputting 

To output this back into your system, create a Blackmagic Media Output file and select your designated Decklink output. 

Then go Window -> Media Capture -> set output to be your Blackmagic Media Output file, then hit Capture!

## NDI Inputting

for inputting from NDI(currently only availabl for UE5.3)

- install the NDI Plugin for UE(sign up and get emailed the download link)
- install Windows NDI apps
    - launch both downloaded apps
    - then you'll need to copy `c:/Program Files/NDI/NDISDKforUnreal/NDIExamples/Plugins` into `c:/ProgramFiles/Epic Games/UE.5/Engine/Plugins`(the paths might be slightly different)
    - you may ALSO need to copy the `NDIIO` folder from the right version folder in the SDK install into the same `UE.5/Engine/Plugins` folder

## Setting up your connections

- Start off by just making sure your camera is working, launch the NDI Studio monitor and select your device in the dropdown
	- log the Device name that shows up at the top of the Studio Monitor window
		- `LOCALHOST (NDI HX Camera)` was mine
- Start a new UE project 
	- Create an NDI Receiver 
	- Under Texture, create a new Texture from Receiver 
	- Put a plane in the scene and drop the Texture onto the plane
		- Optional is to open the material that's made when you do this and change it to Unlit and move the Base Color input to Emissive color
	- Create a new Blueprint Actor
		- Add and NDI Receiver Actor in the Components and point it at your existing one
		- open Event Graph and pull in: 
			- NDI Receiver now in your components
			- a Find Network Source by Name node
			- a Start Receiver node
		- connect
			- the NDI Receiver node to the Target of your Start Receiver
			- the Find Network white arrow and Connect Information to your Start Receiver node
			- the stock Event BeginPlay node to your Find Network
			- and finally input that name from the top of your NDI Studio Monitor window into the "In Source Name" -- has to be exact
- Save and preview game, should work