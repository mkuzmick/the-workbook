---
title: Download Image Problem Solving
tags: [chris]

---

# Download Image Problem Solving

## Goal
Download an image on EventBeginPlay or on OverlapEventBegin using this blueprint. It would be great to have this work specifically in ElectricDreams so that we can use the PGC world in many ways in our studio

## Problem
This blueprint is working in another file (MyProject) but not in the intended one (ElectricDreamsEnv2)
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F079MPG239V/downloadsuccess.png?pub_secret=52dfcaf72e)

The Download Material node on Failure will print "failure" and it has not done so, so the image IS being downloaded, just not applied

It is changing the color of the plane to purple/pink/blue on EventBeginPlay
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07A4RXSLDS/imagedownload_failure2.png?pub_secret=7683955012)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07A4S48EPN/importimage_failure.png?pub_secret=b05de3266b)



## Steps taken
-  Build new project (MyProject) to test in a new file
    -  Success
- Copy Blueprint exactly from MP
    - Fail

- Migrate Material (NewMaterial) from MP to ED
    - It altered the material to look like this in ED
    - But did not work
    - ![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07A2BKQ4UA/shadingchange.png?pub_secret=ed9b2b9877)

- Turn off Substrate in render settings (ED is a demo for this new mode of shading)
    - Fail

- Enable Substrate in MP
    - Still works there

- Change UE4 Default Substrate shader to Casey's suggestion below
    - ![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07A5J8G9V2/slab.png?pub_secret=5ca5e5b506)
    - It had an error unless the "vertical layer" node had both inputs so I tried once with a black slab connected to bottom and once with the same texture in both
    - Fail


