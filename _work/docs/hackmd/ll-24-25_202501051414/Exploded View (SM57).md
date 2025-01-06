---
title: Exploded View (SM57)
tags: [chris]

---

# Week 1: Exploded View (SM57)
## Animation (Blender)
This animation takes an assembled SM57 and spins it apart to reveal its interior construction.

### Process
- Using these references, each individual piece of the SM57 was modeled. First the body was assembled as a whole, then separated and filled in with othe rpieces

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F076RMQ5U02/pxl_20240605_180329371.jpg?pub_secret=1c8e36f024)
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F076RMUE7FU/pxl_20240605_180643390.jpg?pub_secret=83be0aea21)
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F076U718WA0/shure_exploded__1_.png?pub_secret=138587c439)

- Modeling
    - The body was modeled with a reference plane in Blender and subdivision surface modifier. 
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F0774CZ31Q9/sm57.png?pub_secret=e591cee9ab)
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F076RNTUQF4/sm57_65.png?pub_secret=9b6e8c6342)

- Animation
    - Each piece was keyframed to the assembled microphone and then individually key framed to its final destination (location and rotation)
    - The model was lit with a fill (area), backlight (spot), and bounce (area) from the plane behind it.
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F0773TTU3AP/microphone.gif?pub_secret=b64e0f7fa7)

## Interactive (UE5)

- For each component I mapped a property (Z location) to a knob on the midi controller (MPD218)in groups 
    - Mesh, cage, foam to one
    - Cartidge, cover, and rings to 2
    - Bottom and inside to 3.
    - The middle body I left without being controllable
        - The MidiController Plugin is necessary!

- I allowed each a movement from 0-x where x is my preferred height so that it can disassemble like the Blender animation. This means that they move at different speeds even though each group is controlled by the same respective knobs.
    - The bottom components went from -150 - 0 becuase I only want them to move downwards

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F077GLRSTS5/ue_exposedproperties.png?pub_secret=e03e1c27d1)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F077SQHBGF2/ue_explodedmicrophone.png?pub_secret=3f589c475d)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F0773TV6WH1/ue_microphoneexplode.gif?pub_secret=97a7306827)