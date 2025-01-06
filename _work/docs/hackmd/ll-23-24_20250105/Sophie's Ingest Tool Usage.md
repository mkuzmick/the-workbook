---
title: Sophie's Ingest Tool Usage
tags: [ingest, ingest-tools, sc]

---

# Sophie's Ingest Tools

## uses from [cc's ingest-tools repo](https://github.com/caseycann/ingest-tools)
* [**tools -- pushShoot**](https://github.com/caseycann/ingest-tools/blob/main/ffprobe-to-AT_shoot.js) 
    * renames shoots
    * pushes ffprobe data to airtable
* [**tools -- makeProxy**](https://github.com/caseycann/ingest-tools/blob/main/makeProxy.js)
    * makes proxy of video footage in a separate folder on the same drive
* [**tools -- proxyOne**](https://github.com/caseycann/ingest-tools/blob/main/proxyOne.js)
    * makes proxy of single video file
* [**tools --s3Upload**](https://github.com/caseycann/ingest-tools/blob/main/upload_to_s3.js)
    * uploads footage to AWS

## other applications
* Automator
    * Quick action to proxy images/stills to jpegs
* Compressor
    * proxy footage that fails with tools --makeProxy
        * usually 4k footage/anything large that causes the script to buffer and fail
## Compressor Settings
* General
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06R6U28ZPH/screenshot_2024-03-27_at_11.57.07_am.png?pub_secret=fba06b133b)
* Video
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06RMBY22M9/screenshot_2024-03-27_at_11.57.22_am.png?pub_secret=541d431e2e)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06SA92U9UG/screenshot_2024-03-27_at_11.57.32_am.png?pub_secret=0130053d92)
* Audio
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06RMFDQC3C/screenshot_2024-03-27_at_11.57.46_am.png?pub_secret=c380902403)*


## dd added
* [https://github.com/caseycann/ingest-tools](https://github.com/caseycann/ingest-tools)

