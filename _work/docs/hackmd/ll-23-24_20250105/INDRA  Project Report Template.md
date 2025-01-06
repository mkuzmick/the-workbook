---
title: INDRA  Project Report Template

---

# INDRA Project Report Template


---

## Preliminary MK/MW Notes

* MW: 
    * Indra notes from her LLUF application: 
        * "I am a sophomore concentrating in Computer Science. I am very interested in artificial intelligence, its potential uses, and how it intersects with artistic and creative processes as I also love visual arts. I am also interested in exploring natural language processing since I am passionate about languages. I am proficient in Mandarin Chinese, Spanish, and French. 
          At the Learning Lab I would like to get more experience with coding. My experience in programming includes Python, SQL, R, HTML, CSS, and Flask. I have experience with image processing, face and object recognition, and processing and analyzing large quantities of financial data. I have experience with libraries such as OpenCV, NumPy, Pandas, Matplotlib, among others. I would especially like to do projects using TensorFlow, or collaborate on projects to learn more about React and Next JS."
    * Indra project: 
        * based on her interests, I feel like Indra could work primiarly on our internal workflows and camera vision. She has a lot of experience in this area, and I think she could then help bridge those workflows to our larger "machines" for turning studio work into text/code/products/etc.


---

## Project Description

### Project/Tool Overview
**Project Name:**  
**Associated Harvard Course:**  
 
**Summary:**  
_Describe the project/tool, its purpose, and how it fits into the course._

**Technology Stack:** *What tools are you using to craft your project? OpenAI APIs? Slack APIs? Python Notebooks, next.js apps, etc?*

### Learning Objectives and Benefits
**Objectives:**  
_List the specific learning objectives this tool aims to address._

**Benefits:**  
_How will students or professors benefit from using this tool? Describe the expected impact on teaching and learning.

---


## GAICA mk check-in
**Date:** 20240228


* Marlon wants to brainstorm an initial project: 
    * Indra pitched creating a CV tool that identifies faces from video, specifically the faces of people who work here 
        * then stills are captured, saved somewhere, and printed 
    * marlon likes this for an "initial learning project"/proof-of-concept 
        * he wants her to define her specs, then create the code 

* Indra brainstorming 
    * marlon wants her to ground her specs in "why are we doing this?"
        * why are we identifying faces and movement? 
            * for example, being able to identify faces in footage and use it as a way to define and categorize video clips 
        * how abouts cards/art supplies?
            * marlon tells indra he wants more tools that identify cards/paper from an overhead cam 
                * colors, text, movement, order/composition 
                    * for example: 
                        * if indra can create a tool that identifies the color/content of a card coming on the overhead cam, and then connect that to various capabilities (changing lights, triggering sound, etc.) that would be both useful and "magical"
                            * very useful for workshops 
                            * **as a result, this code must work with "streaming" video, so we can do this (eventually) live.**
                                * marlon shows OBS, to demonstrate it as the tool we use for live streaming 

* recognizing cards 
    * this is decided to be the first project, starting by: 
        1. creating a tool that processes extant videos and recognizes that: 
            * there is a card
                * a still is taken
            * the color of the cards
            * extra add ons could be: 
                *  text
                *  shape
                *  motion 
                    *  composition
                    *  rotation/orientation
        2. next step would be to do this w/ live streaming video 
        3. after this, indra can build out capabilities 
            * still frame of cards taken, saved to database
                * the categorization of this database should remain flexible and focsed on getting as much information as possible in an "un-opiniated way."
                    * functions/role of this data can be decided later 
            * certain cards triggering certain functions 
                * ligth changes, sounds, etc. 

* techstack 
    * the code will be hosted in github
        * we'll get her general information and the info for the public repository 
    * slack channel 
        * currently for posting information 
        * but may scale up to creating slack bots 
            * the slack bots could be the way in which the cards act as triggers to extra functions and vice versa. 
    * APIs/APs
        * Indra asks about use
            * marlon says we should default to large, well-maintained libraries and tools 
            * free is also a bonus 
            * however, APIs are an options as well 
                * just check in with marlon first 
    * database 
        * airtables 

* action items: 
    * needs for [doc](/uhnr51hFTBy0xtRy0Md2Mg): 
        * videos of cards, stills, etc. 
        * specs of cards 


---


## Bi-Weekly Update
**Date:** [Submission Date]

### Interesting Developments
_Describe any interesting occurrences, breakthroughs, or anecdotes from the past two weeks._

### Resource Requests
_Identify any additional resources or support needed._

### Best Practices & Learnings
_Share best practices discovered or lessons learned during the project implementation._

## Collaboration and Feedback

### Staff Collaboration
_How have you collaborated with course heads or teaching staff in the past two weeks?_

### Feedback Implementation
_How has feedback been utilized to iterate on the project/tool?_

## IV. Future Directions

### Next Steps
_What are the immediate next steps for the project?_

### Long-Term Vision
_Where do you see this project going in the future?_

## VI. Additional Notes

### Miscellaneous Information
_Any other information or personal notes that may be relevant to the project._

---
