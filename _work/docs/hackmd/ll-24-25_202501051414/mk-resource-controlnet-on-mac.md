---
title: mk-resource-controlnet-on-mac

---

# mk-resource-controlnet-on-mac

Basic zControlNet with Stable Diffusion on macOS (Apple Silicon) in a Virtual Environment



## Step 1: Install Python and Set Up a Virtual Environment

1. **Ensure Python is installed** (preferably version 3.9 or higher):
   ```bash
   python3 --version
   ```

   If not installed, you can install Python using Homebrew:
   ```bash
   brew install python
   ```

2. **Create a virtual environment**:
   In your project directory, create a Python virtual environment:
   ```bash
   python3 -m venv controlnet-env
   ```

3. **Activate the virtual environment**:
   - On macOS/Linux:
     ```bash
     source controlnet-env/bin/activate
     ```

   Now, you're inside the virtual environment. All Python packages you install will be contained within this environment.

## Step 2: Install Dependencies

### Install `diffusers`, `transformers`, `accelerate`, and `controlnet_aux` (optional but useful for pre-processing)

install torch, etc

```bash
pip3 install --pre torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/nightly/cpu
```

bash

```bash
pip3 install diffusers[torch] transformers accelerate opencv-python controlnet_aux
```

zsh

```zsh
pip3 install 'diffusers[torch]' transformers accelerate opencv-python controlnet_aux
```

- **`diffusers[torch]`**: Installs Hugging Face's `diffusers` library and PyTorch for handling model operations.
- **`opencv-python`**: Necessary for image processing tasks like edge detection.
- **`controlnet_aux`**: Helps in generating control images like depth maps or poses (especially useful for OpenPose models).

## Step 3: Load and Use ControlNet with Different Inputs

ControlNet allows you to condition image generation with additional inputs like canny edges, depth maps, and human poses. Here's how to use ControlNet with these inputs.

### 3.1: Canny Edge Detection for Text-to-Image

1. **Load an image and create a Canny edge detection map**:

   ```python
   from diffusers.utils import load_image
   from PIL import Image
   import cv2
   import numpy as np

   # Load an example image
   original_image = load_image("https://hf.co/datasets/huggingface/documentation-images/resolve/main/diffusers/input_image_vermeer.png")

   # Create a Canny edge detection map
   image = np.array(original_image)
   low_threshold = 100
   high_threshold = 200
   image = cv2.Canny(image, low_threshold, high_threshold)
   image = image[:, :, None]
   image = np.concatenate([image, image, image], axis=2)
   canny_image = Image.fromarray(image)
   ```

2. **Load the ControlNet model with canny conditioning and run the pipeline**:

   ```python
   from diffusers import StableDiffusionControlNetPipeline, ControlNetModel, UniPCMultistepScheduler
   import torch

   # Load the ControlNet model with canny conditioning
   controlnet = ControlNetModel.from_pretrained("lllyasviel/sd-controlnet-canny", torch_dtype=torch.float16, use_safetensors=True)

   # Load Stable Diffusion with ControlNet
   pipe = StableDiffusionControlNetPipeline.from_pretrained(
       "runwayml/stable-diffusion-v1-5", controlnet=controlnet, torch_dtype=torch.float16, use_safetensors=True
   )

   pipe.scheduler = UniPCMultistepScheduler.from_config(pipe.scheduler.config)
   pipe.enable_model_cpu_offload()  # Enables memory-efficient offloading

   # Run the pipeline with the prompt and the canny edge image
   prompt = "the mona lisa"
   output = pipe(prompt, image=canny_image).images[0]

   # Save the output image
   output.save("output_mona_lisa_canny.png")
   ```

### 3.2: Depth Map for Image-to-Image

1. **Generate a depth map using `transformers`**:

   ```python
   import torch
   import numpy as np
   from transformers import pipeline
   from diffusers.utils import load_image

   # Load an example image
   image = load_image("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/controlnet-img2img.jpg")

   # Depth estimation pipeline
   depth_estimator = pipeline("depth-estimation")

   def get_depth_map(image, depth_estimator):
       image = depth_estimator(image)["depth"]
       image = np.array(image)
       image = image[:, :, None]
       image = np.concatenate([image, image, image], axis=2)
       detected_map = torch.from_numpy(image).float() / 255.0
       depth_map = detected_map.permute(2, 0, 1)
       return depth_map

   depth_map = get_depth_map(image, depth_estimator).unsqueeze(0).half().to("mps")
   ```

2. **Run the StableDiffusionControlNetImg2ImgPipeline** with depth conditioning:

   ```python
   from diffusers import StableDiffusionControlNetImg2ImgPipeline, ControlNetModel, UniPCMultistepScheduler
   import torch

   # Load ControlNet model for depth maps
   controlnet = ControlNetModel.from_pretrained("lllyasviel/control_v11f1p_sd15_depth", torch_dtype=torch.float16, use_safetensors=True)

   # Load Stable Diffusion with ControlNet
   pipe = StableDiffusionControlNetImg2ImgPipeline.from_pretrained(
       "runwayml/stable-diffusion-v1-5", controlnet=controlnet, torch_dtype=torch.float16, use_safetensors=True
   )

   pipe.scheduler = UniPCMultistepScheduler.from_config(pipe.scheduler.config)
   pipe.enable_model_cpu_offload()

   # Run the pipeline with the prompt, initial image, and depth map
   prompt = "lego batman and robin"
   output = pipe(prompt, image=image, control_image=depth_map).images[0]

   # Save the output image
   output.save("output_batman_depth.png")
   ```

### 3.3: Inpainting with a Mask and Control Image

1. **Load the initial image and mask**:

   ```python
   from diffusers.utils import load_image
   from PIL import Image

   # Load initial image and mask image
   init_image = load_image("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/controlnet-inpaint.jpg")
   init_image = init_image.resize((512, 512))

   mask_image = load_image("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/controlnet-inpaint-mask.jpg")
   mask_image = mask_image.resize((512, 512))
   ```

2. **Create a function to prepare the control image**:

   ```python
   import numpy as np
   import torch

   def make_inpaint_condition(image, image_mask):
       image = np.array(image.convert("RGB")).astype(np.float32) / 255.0
       image_mask = np.array(image_mask.convert("L")).astype(np.float32) / 255.0

       assert image.shape[0:1] == image_mask.shape[0:1]
       image[image_mask > 0.5] = -1.0  # set as masked pixel
       image = np.expand_dims(image, 0).transpose(0, 3, 1, 2)
       image = torch.from_numpy(image)
       return image

   control_image = make_inpaint_condition(init_image, mask_image)
   ```

3. **Run the inpainting pipeline**:

   ```python
   from diffusers import StableDiffusionControlNetInpaintPipeline, ControlNetModel, UniPCMultistepScheduler

   # Load ControlNet model for inpainting
   controlnet = ControlNetModel.from_pretrained("lllyasviel/control_v11p_sd15_inpaint", torch_dtype=torch.float16, use_safetensors=True)

   # Load Stable Diffusion with ControlNet for inpainting
   pipe = StableDiffusionControlNetInpaintPipeline.from_pretrained(
       "runwayml/stable-diffusion-v1-5", controlnet=controlnet, torch_dtype=torch.float16, use_safetensors=True
   )

   pipe.scheduler = UniPCMultistepScheduler.from_config(pipe.scheduler.config)
   pipe.enable_model_cpu_offload()

   # Run the pipeline with a prompt, initial image, mask, and control image
   output = pipe(
       "corgi face with large ears, detailed, pixar, animated, disney",
       image=init_image,
       mask_image=mask_image,
       control_image=control_image,
       num_inference_steps=20
   ).images[0]

   # Save the output image
   output.save("output_corgi_inpaint.png")
   ```

### 3.4: Using Guess Mode Without a Prompt

1. **Run the pipeline without a prompt in Guess Mode**:

   ```python
   from diffusers import StableDiffusionControlNetPipeline, ControlNetModel
   from diffusers.utils import load_image, make_image_grid
   import numpy as np
   import torch
   from PIL import Image
   import cv2

   # Load the control image
   original_image = load_image("https://huggingface.co/takuma104/controlnet_dev/resolve/main/bird_512x512.png")
   image = np.array(original_image)

   # Create a canny edge map
   image = cv2.Canny(image, 100, 200)
   image = image[:, :, None]
   image = np.concatenate([image, image, image], axis=2)
   canny_image = Image.fromarray(image)

   # Load ControlNet model
   controlnet = ControlNetModel.from_pretrained("lllyasviel/sd-controlnet-canny", torch_dtype=torch.float16, use_safetensors=True)

   # Load Stable Diffusion pipeline with ControlNet
   pipe = StableDiffusionControlNetPipeline.from_pretrained("runwayml/stable-diffusion-v1-5", controlnet=controlnet, torch_dtype=torch.float16, use_safetensors=True).to("mps")

   # Run the pipeline in guess mode
   output = pipe("", image=canny_image, guess_mode=True, guidance_scale=3.0).images[0]

   # Save the output image
   output.save("output_guess_mode.png")
   ```

---

## Step 4: Deactivating the Virtual Environment

When you're done, deactivate the virtual environment:

```bash
deactivate
```

---

This guide provides a complete workflow for using ControlNet with Stable Diffusion in a virtual environment on a Mac. You can adjust the examples to experiment with other ControlNet conditioning inputs (such as scribbles or poses) by changing the pre-trained model or input image.
