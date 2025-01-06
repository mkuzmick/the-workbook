---
title: 'll-project-english-189vg: Motion Capture '

---

# ll-project-english-189vg: motion capture resources: 

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06JV8YU9J6/gif-machine_output.gif?pub_secret=3acb0d14f5)

## resources: MOCAP App, Rokoko App, Unreal Engine

## MOCAP workflow: 
* Find a suitable shooting location
    -Well lit
    -Open area for large movements
    - blank walls with nothing distracting colors
* Have subject stand in postion, the animated rig should overlay over them. check to make sure their rig is correctly aligning with body.
* begin recording.
* **TIPS FOR GOOD RIGGING**
   - Large movements will animate the best.
   - Take multiple shorter clips of specific motions instead of one long shot for complicated motions.
* End recording. You will be given a Motion.bvh file. This is your animated rig.Send this rig to a location on your computer. Name the file appropriateley
* Enter Blender
* Have your mesh ready to go in a t-pose ahead of time.
* import BVH file. Your rig should apear in blender.
* Go to viewport display on object data properties. Select IN FRONT. this will allow you to see your rig when inside meshes.
* Move rig so that it aligns in the center of your model. TIP: Make sure your mesh is dead center of the world. This will make therig better connect to the mesh.
* select rig and enter EDIT mode. This will make your rig enter a default t pose. You are now ready to connect.
* Move rig over mesh and begin rigging model. Make sure rig bones are in correct locations in both x/y axis and z.
* Once correctly placed ,reeneter object mode.
* Select mesh then select rig. Once both are highlighted, command P
* select " parent with automatic weights
* Your model should now be fully rigged.
    
## UNREAL ENGINE Workflow
* attempted to use the unreal live link app to get real time face tracking in unreal engine 5.
* Harvard secure VPN made linking both apps difficult. It may be possible on a non secure network
* Unreal Engine is not suitable for regular mac computers and would require a stronger PC.