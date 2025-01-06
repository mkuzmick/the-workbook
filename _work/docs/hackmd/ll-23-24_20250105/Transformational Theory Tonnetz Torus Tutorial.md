---
title: Transformational Theory Tonnetz Torus Tutorial

---

# Transformational Theory Tonnetz Torus Tutorial

The key elements here are the torus and the camera. There are also lights placed to illuminate the torus. The camera will be used as the viewpoint for your animation.

Rotate your view with two fingers on mousepad. Move your view without rotating with SHIFT + two fingers on mousepad. Pinch to zoom in/out. You can also use the buttons on the right of the main viewing window for all of these functions. Try clicking on the camera button. This is how your model will appear if you render an image or an animation.

We will be working in Object and Edit mode. go back and forth between them by hitting TAB.

Make sure that you are in select mode (the box with a cursor in it) on the left.

Your different objects are in the top-right corner, in what is called the “Outliner”. We will be working primarily with the “Highlighter” object. While in object mode, make sure that the highlighter is selected by clicking to the left of it in the list (a square with one corner filled in moves to the left of its name).

You can select individual triangles in the net by clicking on them in Edit mode.

We will be working with the Materials tab on the lower right side of the screen. It looks like a checkered sphere.

The Tonnetz image is stretched over the Tonnetz object in the  Materials tab. For the highlighter, you will see several materials. The first is the “Transparent Net”, which allows you to see the Tonnetz beneath the Highlighter net. The remainder are materials meant to correspond to different triads. I have prepared them in the same color of purple, but you might decide to change the colors for different materials depending on the particular transformation, or tonal function, etc.

 Underneath “Surface” in the materials tab, the “Alpha” setting controls the transparency of the material. I have set the default Alpha to 0.600.

Clicking “Assign” with a triangle selected will color in that material. Do this for the first triangle on the tonic chord of D-flat. This material is now forever linked to this particular triangle, even when you repeat a chord.


______




## ANIMATING THE TRIANGLES

The toolbar along the bottom of the screen is the animation window. Click at the top of the window to pull it up. If you hit spacebar, you should see a playhead moving and hear the audio of the Poulenc excerpt.

We will be creating keyframes, which appear as diamonds in the animation window. Keyframes can be thought of as the endpoints of your animation (two locations, two rotated positions, two levels of transparency), and blender smoothly moves you between them.

With your applied triad 1 selected, make sure your playhead in the animation window is at the moment the chord sounds. Then, click on the dot to the right of the Alpha slider. This ensures that the triangle will light up at this time.

To animate the triangle lighting up, we need to make another keyframe earlier. It is up to you how quickly you want this to happen, but I like to do it 5-10 frames earlier.
	-The order here is very important. 
		1) First, move your playhead 5-10 frames before your existing keyframe.
		2) Second, drag the alpha value down to 0.
		3) Third, press the dot to the right of the slider again. This will place another keyframe.

Between the two keyframes, the triangle will light up.

You can repeat this process for the remaining chords. If the music returns to a chord on the Tonnetz that is already lit up, you can increase the Alpha value further (up to .999) to show that it has now been sounded twice. Consider how many times the triangle will be highlighted and scale your animations/Alpha values accordingly.

As you know, there are many different options for traveling along the Tonnetz. You might be guided by how Poulenc notates the chords, or not. The key is to show the journey in a way that you think reveals something important about the piece.

## ANIMATING THE CAMERA

Once your triangles are fully animated alongside the audio, there is still an issue: some of them may be hidden to the camera as they circle around the donut. To fix this, we will need to animate the position of the camera.

In the upper right corner, just to the left of the outliner, you will see three tabs: Item, Tool, and View. Under “View”, Expand “View” and under “View Lock,” check the checkbox “Lock Camera to View.”

Now, look to the left of this menu and click on the camera button to enter the camera’s view. If you now move around in the typical way while in this view, you will be moving the camera in the space.

Now, we will animate this movement. Place the camera exactly where you want it to start. Make sure you are in OBJECT MODE.

Select the camera in the Outliner by clicking to the left of its name (The square with the filled-in corner should move to it). 

In the “Item” tab in the top right (to left of Outliner), you will see coordinates for your camera’s location and rotation. Right-click over any of the location coordinates, and select “Insert Keyframe.” Do the same for rotation. Make sure that you do BOTH of these.

When you reach a point in the track where you want to change your camera view, make sure you are in the camera viewpoint and then change your view. Add another keyframe to the camera’s location and rotation. Do this for all camera angles.


## CREATING THE ANIMATION

Click on the “Output” tab (looks like a printer printing out an image) in the bottom right window. Go down to “output” and select an export location/folder.

Change your file format to FFmpeg video. (You may want to do it as PNG in the future do prevent crashes for long animations, but this should be simpler for now.)

Expand “Encoding” and change your container to “MPEG-4.”

Finally, go to Audio and change “Audio Codec” To AAC.

Now, go to the top-left of your screen, and hit Render —> Render Animation. If all goes right, the animation should appear in your export folder!


## THINGS TO CHECK if you’re stuck:
1. Check Object vs. Edit mode (always!)
2. Edit/Preferences/Navigation/Orbit Sensitivity/Enable Depth (if the camera angle is getting stuck)
3. Set Materials/Settings/Transparency/Alpha Blend (if transparency isn't working)
4. Uncheck View/Only Show Selected (if diamond keyframes aren't showing up)
5. File/External Data/Find Missing Files (if pink textures are appearing in place of image files, etc.)




