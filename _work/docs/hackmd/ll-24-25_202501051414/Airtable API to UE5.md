---
title: Airtable API to UE5
tags: [chris]

---


# Airtable API to UE5
## Airtable API
Instructions for getting API key and Field/table info

## Uneal Engine C++
- Add a New C++ object from the "tool" menu named AirtableImageFetcher
    - This will automatically build AirtableImageFetcher.h (header file) and AirtableImageFetcher.cpp (source file) in your project's "source" folder
- Update Build.CS in your source folder to include `PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore", "Http", "Json", "JsonUtilities" });
    - This adds HTTP, Json, and JsonUtilities

- Edit your .cpp and .h files with the following
    - *CWBENHAM Github link* coming soon
- In addition to using the API, this code also adds new functions to the Blueprint of your project. See below

## Unreal Engine Blueprint

- ### Create a new folder in your project content drawer (Here called ImageDownload)
    - Create a new actor blueprint (here called BP_ImageDownload)
        - Add a Plane 
            - Set its material asyour new M_ImageDownloader material
            ![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07ALMXKC84/planematerial.png?pub_secret=62913c6e97)
        - Add a box collider (if you want the image to change on overlap)
        ![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07A3LSUZU7/blueprintadd.png?pub_secret=3c45988ae3)
    - Create a new material (here called M_ImageDownload
        - Add a "TextureSample" node and convert it into a parameter (right clicl> convert to parameter) named "Texture"
        ![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07ABJ0DLLW/imagetexture.png?pub_secret=42dc7cf547)
    
    
    
- ### Set up the blueprint

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07AF7WN5EH/imagefetchersuccess__1_.png?pub_secret=430e0bf96c) 
- Add a new variable named AIF_var
    - Type: AIrtable Image Fetcher (object reference)
    - Everytime it is shown in the blueprint (other than the large SET node, select GET)
    
- Nodes you will need:
    - ConstructObjectFromClass
        - Class: AirtableImageFetcher
        - Outer: Self
    - SET/Get AIF_Var
    - RequestAirtableData (custom Function)
        - Target: AIF_Var (get)
    - Delay (~.5 seconds)
        - I have found that if it moves too quickly it doesn't successfully download
    - GetSelectedImageUrl (custom Fuction)
        - Target: AIF_Var (get)
    - DownloadImage
        - URL: Return Value of GetSelectedImageURL

    - PrintString
        - Just to help with Debugging. On Success print "Success" on Fail print "Fail"
    - CreateDynamicMaterialInstance (Plane)
        - Target: PLane
        - ELement Index: 0
        - Source Material: M_ImageDownload
    - SetTextureParamaterValue
        - Target: Return Value of CreateDynamicMaterialInstance
        - Parameter Name: Texture
        - Value: Texture of DownloadImage

### Play the Game
- Enter 3rd Person Game mode
- As you enter the collision box, the image will be downloaded and displayed on the plane
    - Leave the collision box and reenter to generate a new image
    - The Collision box is invisible during gameplay!


## Future Changes to be implemented
- I think it is currently returning every url entry in the airtable before selecting one to be passed on to download
    - Any way to only return a random value from the table? Would probably be less stenuous
- Code could be altered to work down from the first entry in table instead of randomized
    - Potential for repeats, not a lot of control, etc.
- I need to learn about how to control the API access key to share the code.
    - Ask christine?

