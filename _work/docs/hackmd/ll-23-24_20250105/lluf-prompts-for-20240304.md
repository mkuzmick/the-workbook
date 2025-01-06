---
title: lluf-prompts-for-20240304

---

# lluf-prompts-for-20240304

for reference: [lluf-prompts-for-20240301](/7EaLk30rRNaPtY7h7Xpy8Q)

## Physical materials for SLAVIC/TDM 121
**work-sharing-channel:** #ll-work-printing
**prereqs:** ability to use the printer and paper cutter
**prompt:** We need to print and cut visual materials for the Slavic/TDM course on Ballet that is coming in twice this week. For specified still images, we will print 3.5" high (x whatever the appropriate width is). For film strips, we will print 1" high for each frame (math may be required).
**key contact:** Marlon

## TDM119 reference sourcing
**work-sharing-channel:** #ll-work-sourcing-media
**prereqs:** basic film, tv and/or meme history; willingness to engage in melodramatic on-camera performance
**prompt:** For a TDM course, we need to shoot some reference footage of performances the students will record in the LL later this term. We need a mix of different shot lengths and a mix of performances to the camera and performances to other characters or audiences on-screen and off-screen. For starters, we want to find famous and reproducible shots (that you'd like to reproduce) that fill out the parameters made possible by the 2d array 
```
[
    ["to-cam", "to-on-cam-character", "to-off-cam-audience"], 
    ["close-up", "medium-close-up", "medium-shot", "full-shot"]
]
```
no need to fill this whole thing out yourself. But find a shot you'd like to imitate and send to `#ll-work-sourcing-media` (we can for sure use the greenscreen, but we'll need a clean image or video of the background you want to use--send that to `#ll-work-sourcing-media` too). If you need background audio or music, send that too. We're looking for anything you're passionate about, but it may help to know that the course has referenced some famous monologues (like Shakespearian monologues).
**key contact:** Marlon

## TDM119 shoots
**work-sharing-channel:** #ll-work-media-capture
**prereqs:** willingness to engage in melodramatic on-camera performance
**prompt:** Once you've chosen 1-2 reference shots, you and your group will work together to shoot them. All else being equal, it's great to just use the small studio or classroom and to shoot on green or complete-ish darkness (if you can imagine matching your shot this way). But it's certainly fine to do a couple of things out in the studio too (particularly any full body shots on the greenscreen). The audio quality is really crucial, so take this seriously (monitor the audio at all times, and make sure someone is operating the boom properly, even if in the small studio). We will also have a script we'll want you to perform that describes the assignment/activity, but we may not have this until later in the week.
**specs and tools**: We'll shoot on c200s for this in 4K, with audio coming from a shotgun mic on a boom. 
**key contact:** Marlon



## Pod Time
**work-sharing-channel:** #util-save-your-moments
**prereqs:** having worked last week
**prompt:** For updates this week, it would be great to have as many reflections as possible from those who did the prototyping in Google Colab and Slack for the EMR162 workshop (largely on Friday). It would be great to print up a couple of the images to put under the overhead camera if you are in the main studio or small studio.
**key contact:** MK/DD


## Python Servers for Stable Diffusion
**work-sharing-channel:** `##ll-work-code`
**prereqs:** familiarity with python and a long-term investment in developing more complex applications
**prompt:** Learn to build a basic server in Python. Choose between Django and FastAPI (the former if you are going to go all in on building Python web apps, the latter if you just want to get things working fast and may be calling this API from a NextJS or other nodejs app or command-line tool anyway). Today's goal is to learn to handle request parameters of various sorts:
1. **Path Parameters**: learn to capture values from the path of a URL (like `myawesomeapi.com/items/{item_id}`). This is valuable for handling operations on individual resources, such as retrieving a specific item by its `item_id`.
2. **Query Strings**: learn how to parse query parameters for filtering, searching, or sorting data (like `myawesomeapi.com/items?category=books&sort=asc`), which are appended to the URL after the `?` mark.
3. **Request Body**: learn to handle complex data that can't be passed through the URL, like JSON or form data, which clients send through the body of POST or PUT requests.

As you do your testing, you are certainly welcome to immediately start generating things with SD. But for now, it could make most sense to just concentrate on taking in data that has relevant structures of your goals. So for complex prompting that involves model requests, you'll definitely need to at LEAST use query strings, and probably more likely POST requests. But once an image has been generated and has a timestamp or id, we could certainly offer that image to users at `myawesomeapi.com/images/{image_ts}` say.
**key contact:** Marlon


## CL200 prompt engineering

**work-sharing-channel:** #ll-work-ai-experiments
**prereqs:** familiarity with and access to the main AI playgrounds
**prompt:** For CompLit 200 we'll be programmatically generating different "Little [Pantone Color] Riding Hoods." The GAICAs are working on the code for this, but we are looking for help on the prompt engineering side. So in the main playgrounds (or in a colab if you wish) your goal is to get us closer and closer to output that matches the [reference work](https://drive.google.com/drive/folders/1vCqCoXAuXA0e5QBoMAbgaSXY8Y7fhT2p). For more info, you can check out the GAICA prompt [here](https://hackmd.io/xUYisy20QBm7F2EXMdPVlw?both).
**key contact:** Madeleine
