---
title: Stable Diffusion and ControlNet
tags: [ai]

---

# Stable Diffusion and ControlNet for Spaces
(for people, models coming soon with posing)

### Requirements
1. Stable Diffusion WebUI (Automatic1111)
    - https://github.com/AUTOMATIC1111/stable-diffusion-webui

2. ControlNet
    - https://github.com/Mikubill/sd-webui-controlnet

3. Computer with GPU

__________________________________________________________________

## Replicating Images


## Preprocessors


### Depth Preprocessor
- ControlNet allows you to stack preprocessors. In most of these, I have Depth on the ControlNet Unit 1 tab.
- The depth Preprocessor generates "a grayscale image with black representing deep areas and white representing shallow areas."

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06HWFBMVPU/depth.png?pub_secret=11691cb13a)



### "Canny" Preprocessor
- Canny functions by making "a monochrome image with white edges on a black background." 

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06J8V06CG1/canny.png?pub_secret=0e03f29893)


### MLSD Preprocessor
- MLSD functions much like Canny, but makes a "monochrome image composed only of white *straight lines* on a black background." Great for architecutral work

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06JK3DTF24/mlsd.png?pub_secret=a2ea7baf4e)


### Reference Preprocessor
- Reference "can guide the diffusion directly using images as references." 
    - The amount that SD takes your reference into account can be chosen with the "contol mode" buttons and with the "Starting Contol Step" and "Ending Control Step" which determine how long the diffusion uses your reference
        - 0 - 1 uses your reference the entire time, 0 - .5 uses it from the beginning to half-way through, etc.


![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06J8V4NWV7/reference_depth_0-1.png?pub_secret=c889533fb3)


## Examples (in order of fidelity to the original)
Universal Prompt
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06JK3JJMGQ/prompting.png?pub_secret=eda8c101cd)

Base Image
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06JK9E8AJU/llangle2.png?pub_secret=9a84127f1a)

Canny + Depth Preprocessors
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06HTCAJJN9/canny___depth.png?pub_secret=81381a7752)

Canny (only) preprocessor
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06J8V7MDSM/canny_prompt.png?pub_secret=231294f484)

MLSD + Depth Preprocessor
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06JK3P5X40/mlsd___depth.png?pub_secret=f2b5d3b24d)

MLSD (only) Preprocessor
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06J8V8GZKK/mlsd_prompt.png?pub_secret=6ad5afb6f9)

Reference (control step 0-1) + Depth Preprocessors
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06JK3Q3VRN/reference__depth_0-1.png?pub_secret=793a045427)

Reference (control step 0-.5) + Depth Preprocessors
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06HPLQ349L/reference___depth_0-.5.png?pub_secret=aca128b751)