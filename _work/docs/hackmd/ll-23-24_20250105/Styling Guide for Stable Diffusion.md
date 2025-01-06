---
title: Styling Guide for Stable Diffusion

---

# Styling Guide for Stable Diffusion

Stable diffusion is a series of interconnected tools for creating image-to-image, text-to-video, and even video-to-video outputs. 

To interpret images, Stable diffusion first interprets and then generates. Interpretation uses an add-on tool call Controlnet and generation is determined by the Checkpoint Model.

Controlnet
Controlnet functions by taking in an image, interpreting specific elements of that image, and then passing that control information on to the checkpoint model.
The models (which are unique to Controlnet) steer the output by modifying the generation process based on criteria we give it.
For example:
The OpenPose tool interprets human poses and generates new characters in exactly those poses.
<img src="https://stable-diffusion-art.com/wp-content/uploads/2023/02/openpose_overlay_person.png" alt="drawing" width="300"/>

The Segmentation tool breaks foreground, middle ground and background into unique sections. So below, you'll find the original image, it's interpretation and its output.
<img src="https://stable-diffusion-art.com/wp-content/uploads/2023/05/jezael-melgoza-KbR06h9dNQw-unsplash.jpg" alt="drawing" width="300"/>
<img src="https://stable-diffusion-art.com/wp-content/uploads/2023/05/image-137.png" alt="drawing" width="300"/>
<img src="https://stable-diffusion-art.com/wp-content/uploads/2023/05/image-141.png)" alt="drawing" width="300"/>

Checkpoint models
Checkpoint Models are snapshots the version of the model that Stable Diffusion is currently using. The Checkpoint Model will determine the style and occasionally the content of your output, and altering it changes the output more totally, dictating the style of the generated image.

Here are two checkpoint models with the same initial prompt, so you can see how differently they portray the same set of prompts. 

![](https://api.softwarekeep.com/media/nimbus/helpcenter/modelshotmodel.png)
![](https://api.softwarekeep.com/media/nimbus/helpcenter/deliberatemodel.png)



What we want to do:

We want to write prompts that consider both the Checkpoint Model and the Controlnet model you're using. By considering the categories of "object" and "style", we can apply unique rules to both the broader Checkpoint model and the more fine tuning Controlnet model.


## What is this doc for?

This doc (below) is populated by different objects and styles and Checkpoint and Controlnet Models that might apply well to these prompts.




Object type


Photorealistic faces
Checkpoint Models:
* [Realistic Vision](https://civitai.com/models/4201/realistic-vision-v60-b1)
* [EpiCRealism](https://civitai.com/models/25694/epicrealism)
* [Juggernaut XL](https://civitai.com/models/133005/juggernaut-xl)
* 

Controlnet Models:
* Depth
* 

Buildings
Checkpoint models
* [ArchitectureRealMix](https://civitai.com/models/84958/architecturerealmix)


Animals
Checkpoint Models
* [WildeLifeX](https://civitai.com/models/262239/wildlifex-animals)


Controlnet Models:
* 