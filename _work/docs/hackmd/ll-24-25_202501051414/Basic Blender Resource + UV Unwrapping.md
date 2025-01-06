---
title: Basic Blender Resource + UV Unwrapping
tags: [sc, blender]

---

# Blender
Blender can be extremely overwhelming at first glance. The more you use it the easier it becomes and the faster you can pick up more of it.

The first thing to cover is:
## What is blender?
Blender is a free, open-source 3D software that can be used to make models and animate (in 2D and 3D!).

People have used this software to make video games, movies, shows, virtual reality experiences, augmented reality experiences, and even make 3D prints.

Starting your blender journey can be hard and it's easy to be discouraged but there are a lot of helpful resources and guides! Don't be afraid to start over or to build something slowly over time. It eventually becomes like second nature once you get comfortable with navgating blender. 

Let's jump right in to:
## Navigating Blender
First thing when opening blender you get this crazy screen:

This is called the *splash screen* which asks you what kind of project you're making. If you're making a 3D model then select *general*.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07N351TDK6/blender_splash_screen.png?pub_secret=763ef77b86)

Once you click general you should see a cube.

Before you delete the cube, let's talk about how to even look at the cube!

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07N0H2FZ7D/rotating_in_blender.gif?pub_secret=5e30eaff50)

To revolve around the cube you can put two fingers on the trackpad and drag them in the direction you want to move.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07NDAK3K7T/zooming_out.gif?pub_secret=6e140e9e4f)

To zoom out you can put two fingers on the track pad and pull them away from one another.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07NPDYH8LQ/zooming_in.gif?pub_secret=e55bdcc820)

To zoom in you can put two fingers on the track pad and bring them together.

You may think this is enough to navigate, and it might be enough for you if you're doing something simple but there is one last way to move around.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07N0H3KYN7/moving_up_and_down.gif?pub_secret=e4fcdde0cb)

If you need to move left, right, up and down, hold down the shift key while you have two fingers on the trackpad. 

After learning to move around in blender you'll have to learn how add and modify meshes.

## What the heck is this cube?! How do I change it?

Before we even jump in to modifying this cube let's talk about what it is. 

This cube is a polygon mesh. That means this cube is made up of flat polygons which have faces, edges, and vertices.

Every shape in blender is made of these. The more polygons the smoother the shape, but the more power and resources it takes to render. 

Blender has different modes to change these meshes in different ways.

We are going to focus on Object Mode and Edit Mode.

## In both modes - keep this in mind!!!!
The best way to think about movement and modification in blender is on the x,y, and z axis.

**You can lock your movement to a desired axis by these shortcuts:**

 X-AXIS - x
 
 Y-AXIS - y
 
 Z-AXIS - z

If you do not lock your movement/modification to an axis then it will perform that action from the perspective of your current view. This can be good for small and quick things but as projects get more complex it makes it hard to keep track of your movements.

To see which mode you are in check the top lefthand drop down menu.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07MU1FASCE/blender_modes.png?pub_secret=3d8dad6e0e)

## Object mode
You are in object mode by default in blender. 

In object mode you can grab, scale, and rotate an object.

These movements can also be locked to an axis.

**Here are the shortcuts:**

<img src="https://files.slack.com/files-pri/T0HTW3H0V-F07ML3XUPST/object_mode_grab.gif?pub_secret=bc54813ce6" alt="alt text" width="75%"/>

GRAB - g

<img src="https://files.slack.com/files-pri/T0HTW3H0V-F07NPE137PA/object_mode_scale.gif?pub_secret=9bcacc9c81" alt="alt text" width="75%"/>

SCALE - s

<img src="https://files.slack.com/files-pri/T0HTW3H0V-F07MU1PRXEJ/object_mode_rotate.gif?pub_secret=3c30502925" alt="alt text" width="75%"/>

ROTATE - r

Make sure the object you want to modify is highlighted orange, otherwise blender will not know what you are trying to change.

Click with the mouse to confirm your change.

The shortcuts can also be a lot to remember but the more you use them, the better. 

## Edit Mode
The shortcut to switch to edit mode is the tab key. Otherwise go to the drop down menu on the top lefthand corner to change which mode you are in.

In edit mode you can do the same movements in object mode **EXCEPT** it is for points, edges, and faces. 

To change which you are editing you can select points, edges, or faces in the top left hand corner.

**The shortcuts for switching between points, edges, and face:** 

<img src="https://files.slack.com/files-pri/T0HTW3H0V-F07NDANL8GZ/points__edges__faces.gif?pub_secret=dd874b6e23" alt="alt text" width="75%"/>

POINTS - 1

EDGES - 2

FACES - 3

**Here are the shortcuts for grabbing, scaling, and rotating:**

<img src="https://files.slack.com/files-pri/T0HTW3H0V-F07ML415TQF/edit_mode_grab.gif?pub_secret=87b1fc4cf2" alt="alt text" width="75%"/>

GRAB - g

<img src="https://files.slack.com/files-pri/T0HTW3H0V-F07N0HA5SN7/edit_mode_scale.gif?pub_secret=f61307a67f" alt="alt text" width="75%"/>

SCALE - s

<img src="https://files.slack.com/files-pri/T0HTW3H0V-F07MU1SHR7G/edit_mode_rotate.gif?pub_secret=42d61bb48a" alt="alt text" width="75%"/>

ROTATE - r

Make sure the point, edge, or face you want to modify is highlighted orange, otherwise blender will not know what you are trying to change.

These edits can also be locked to the x,y, and z axis.

Click with the mouse to confirm your edit.

Again, the shortcuts can also be a lot to remember but the more you use them, the better. 

## So you want to do UV Editing...

As stated earlier, these shapes are meshes made of polygons. UV editing allows you to take all of those shapes and lay them flat. 

There are 3 ways you can apply a desired image to an object with varying degree of involvement. We will go from super simple to slightly in depth.

1) You can add the image you want as a material.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07MUGSU39U/adding_an_image_material__1_.gif?pub_secret=e7b23e0781)

2) After adding the image as a material you can smart UV unwrap to edit it around the shape.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07N3LWGXE0/uv_unwrap.gif?pub_secret=0643b9d43a)

3) You can unwrap the object, export the UV unwrap as a png and edit it in another app (like photoshop) and bring it back into blender.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07N16KPYSW/uv_unwrap_in_photoshop.gif?pub_secret=67d9cb986e)

