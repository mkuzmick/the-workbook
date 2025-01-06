---
title: 'GAICA initial project: indra'

---

# GAICA initial project: indra


## the "why"

In the learning lab, we have a need for various tools that identify certain objects using CV. the first of which is: 

* a tool that identifies cards/paper from an overhead cam 
    * for instance, not only identifying the card, but: 
        * colors, text, movement, order/composition 
            * for example: 
                * if indra can create a tool that identifies the color/content of a card coming on the overhead cam THEN we can connect those cards that to various capabilities (changing lights, triggering sound, etc.) that would be both useful and "magical"
                     * this tools would very useful for workshops 
                     * **as a result, this code must work with "streaming" video, so we can do this (eventually) live.**
                        

## the what 

* CV CARD TOOL
    * this will be indra's intiial project: 
        1. The first goal will be creating a tool that processes extant videos and recognizes that: 
            * there is a card
                * a still is taken
            * the color of the cards
            * extra add ons could be: 
                *  text
                *  shape
                *  motion 
                    *  composition
                    *  rotation/orientation
            * **NOTE**: the earliest proof-of-concept of this tool is due before spring break
        2. The next step would be to do this with live streaming video 
            3. specifically, our OBS system
        4. after this, Indra can build out capabilities: 
            * stills:  
                * in which a still frame of a given card is taken and saved to a database
                    * the categorization of this database should remain flexible and focsed on getting as much information as possible in an "un-opiniated way."
                        * functions/role of this data can be decided later 
            * card triggers:
                * in which certain cards trigger certain functions 
                    * light changes, sounds, etc. 
                    * this would be done live
                    * this could potentially incorporate slack bots 

## the how 

* techstack 
    * the code will be hosted in github
        * this will be via indra's personal account, but the project will be hosted in a public repository  
    * slack channel 
        * there is a slack channel specifically for this project: 
            * currently it is for posting information/contact
            * but we may add Indra to the experimental slack to build slack bots
                * for example: 
                    * the slack bots could be the way in which the cards act as triggers to extra functions and vice versa. 
    * APIs/APs
        * Indra has use, but with guidlines: 
            * marlon says we should default to large, well-maintained libraries and tools 
            * free is also a bonus 
            * however, APIs are an options as well 
                * just check in with marlon first 
    * database 
        * airtables 

---

## ACTION ITEMS BEFORE SENDING THIS DOC
* action items: 
    * slack channel 
        * name
    * create a doc (this one)
        * but we need to add:
            * videos of cards, stills, etc. 
            * specs of cards 
    * indra info
        * we'll get her general information and the info for the public repository 
