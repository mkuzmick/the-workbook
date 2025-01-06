---
title: UE5 Animation Workflow
tags: [chris]

---

## Challenges
- FBX import from Blender. 
    - Individual keys? Ex. C imported 24 animations. Both "Armature" animation and "Object" animation

- Had to correct "Normals" in Blender for proper import in UE5. 

- Piano keyboard exported as whole. 
    - How to separate animation to individual keys

- Trigger animation in UE5
    - Animation vs ANimMontage
    - PlayMontage vs PlayAnimation
    - Connect animation to mesh
    - For other animation, look into Animation Blending in UE 5.3

- For simple shapes like this, armature is more trouble than it proved to be worth. By adjusting the pivot point of the shape in UE, the same thing was acheived.

## Current Solution
- Import static mesh (Scale 50.0) 
    - UE5 defaults to Meters, Blender to milimeters, so scaling is often very off
- Adjust pivot point (for keys, to back)
    - Modeling Mode
- Create new actor (C_Key)
    - Add Mesh
    - Position in Level where you want it 
- Add Level sequence named C_down
    - Set C_Key as "Actor to sequencer"
    - Set Transform key frames at 0:00 and 5 degree X rotation on 0:10. End Sequence at 0:30

- Open Level Blueprint
    - When the sequence is selected in the main window, right click then "Add reference for C_Down"
    - Connect it to Play Sequence node and trigger PlaySequence with key (12345)