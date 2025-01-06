---
title: stable diffusion and controlnet installation

---

# stable diffusion and controlnet installation

## Installing Stable Diffusion Web UI
* install homebrew
* install python
* install git
* install this package by running this command in terminal:
```
brew install cmake protobuf rust git wget python@3.10
```
* clone these two github repos into your development folder
    * control net repo: https://github.com/Mikubill/sd-webui-controlnet.git
    * stable diffusion webui repo: https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
* change directorties into your ```stable-diffusion-webui``` directory
* run the ```./webui.sh``` shell command in terminal
* head to http://localhost:7860/
    * you should see the Stable Diffusion web UI

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06KXRVHDLG/screenshot_2024-02-16_at_1.55.56___pm.png?pub_secret=a4403f4f15)

## adding the ControlNet extension to Stable Diffusion Web UI
* In the Stable Diffusion Web UI, head to the "Extensions" tab
    * select the Available tab
* In the search bar, search for controlnet
    * click the "Load from:" orange button
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06KBGL3V7E/screenshot_2024-02-16_at_1.58.01___pm.png?pub_secret=f05cfbbe77)
* find "sd-webui-controlnet manipulations"
    * it is likely toward the bottom of the list
    * try doing a ⌘command + F search and putting in exactly "sd-webui-controlnet" and looking for "manipulations"
    * click the grey Install button to the right
* Head to the Extensions
    * Click on the Installed tab
    * select the sd-webui-controlnet manipulations package
    * Click "Check for updates"
* Click Apply and Restart UI
* you should see Control Net added to the Stable Diffusion UI homepage!
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06KXUB0QQG/screen_recording_2024-02-16_at_2.02.07___pm_360.gif?pub_secret=ae17c8f826)


## If you need to update stable-diffusion
* Open stable-diffusion-webui in visual studio code
* Open webui-user.bat
* Add git pull to the file
* Save the file (⌘command + s)
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06K96VQZ34/screenshot_2024-02-16_at_2.18.02_pm.png?pub_secret=207465ddbc)