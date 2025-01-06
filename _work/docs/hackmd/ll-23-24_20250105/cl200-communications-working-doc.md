---
title: cl200-communications-working-doc

---

# cl200-communications-working-doc

[google doc](https://docs.google.com/document/d/1MiT3mj6LktHvLy1QP06Dj-7RNe66Ry13gDKE1Ya9gFM/edit)

## GAICA work



* josefina 
    * [riding-hood-folder](https://drive.google.com/drive/folders/1cjrd1itBKE8GbZiTBSGPlAPb5FVQe-J5)
    * [best-prototype](https://colab.research.google.com/drive/10G-Ws_bjBIsUOWbOErj-HrZCQSV2FfaQ)
        * features/specs: 
            * **api**: OpenAI
            * **color/title method**:
                * directly entering a color as a string
                * identifying the color most prevalent in a photo (HSV) then matching that to pantone colors
            * **content**: 
                * images: 
                    * prompt engineering using data from "revised_prompt"s to get close to style 
                    * applying a filter over generated photos to control for color (but only w/ RGB colors)
                * output: 
                    * printing in colab 
                    * pdf (but with reportlab)

* gonzalo 
    * [riding-hood-folder](https://drive.google.com/drive/folders/1Vlmkhgas-9iJ7QZpxRxQF2aLtWnkter8)
    * [best-prototype-github](https://github.com/GonzaloPelenur/riding-hood-generator)
        * features/specs: 
            * **api**: gemini
           * **color/title method**:
                * directly entering a pantone color as a string
                    * but code returns corresponding HEX and RGB codes for prompting/filtering
            * **content**: 
                * images: 
                    * prompt engineering with more focus on keeping the images cohesive across a set (as opposed to matching it to Munari)
                        * he does this using vision/description from the first generated image as a "control" for the rest of the set                    
                        * filtering images 
                * output: 
                    * printing in colab 
                    * pdf


* jōsh
    * [riding-hood-folder](https://drive.google.com/drive/folders/1QtH6h7MDvkUZsIjk5MXMEAz3doI4oKDO)
    * [best-prototype](https://colab.research.google.com/drive/1u2zzAj7M02X2sA9yIxl9LV3X3wxCWECL)
        * features/specs: 
            * **api**: OpenAI
           * **color/title method**:
                * drop down UI that selects a pantone color (and returns RGB and HEX codes) from the fixed JSON
            * **content**: 
                * images: 
                    * prompt engineering to get close to munari's style 
                * output: 
                    * printing in colab 
                    * files saved to gdrive


--- 

technical fourth riding-hood: 

* elisa 
    * [riding-hood-folder](https://drive.google.com/drive/folders/1EG7tP6sZskVz1Fjngb55DH0SKp0KU3I7)
    * [best-prototype](https://colab.research.google.com/drive/1QH3trjgcyJq7h96d1IlN-vtlpvYltDyc)
        * features/specs: 
            * **api**: gemini
