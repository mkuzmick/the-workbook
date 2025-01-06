---
title: Music GAICA

---

# Music GAICA
#### Gabe Mehra (Junior, CS concentrator) gmehra@college.harvard.edu
#### Chris Benham (PhD Candidate, Music) cbenham@g.harvard.edu
#### Music 225 (Approaches in Analysis) Alex Rehding arehdding@fas.harvard.edu
- https://docs.google.com/document/d/17Axe9jW3Flexl-CP6KyiLroUXstf3wd5/edit?usp=sharing&ouid=111287576069138768254&rtpof=true&sd=true
- SYLLABUS

## Project Ideas


### Explore AI Applications in Music

- ### Extractive Uses
    - Extracting information from audio files
        - Spotify API to build playlists, etc.
        - https://developer.spotify.com/documentation/web-api/reference/get-audio-features

    - Voice/Track isolation
    - Music Information Retrieval
- ### Generative Uses
     - https://web.mit.edu/music21/
### Conference 
- https://boblsturm.github.io/aimusicstudies2024/

### AI and Formal Analysis
- We can look at the work of Mark Gotham ( is a composer-theorist based at the Cornell University where he holds the post of ‘Postdoctoral Associate in Computational Music Theory Pedagogy’.)
    - https://github.com/MarkGotham/Taking-Form
    - https://archives.ismir.net/ismir2019/paper/000084.pdf


- Group at Durham (UK)

    - Eamonn Bell
            - https://www.eamonnbell.com/about/

    - Robert Lieck
        -  https://www.durham.ac.uk/staff/robert-lieck/


- Bob Sturm (In his research, he builds machine learning models of folk music from Ireland and Sweden and works to apply these models in different musical contexts. )
    - https://github.com/boblsturm?tab=repositories
    - "Retireveal Augemented Generation of Symbolic Music with LLMS" (2023)




### Types of Analysis being done in  MUS 225
- Sonata Form
    - "Old Sonata form"
    - "New Sonata form"
    - Schenker

- Formalist
    - Structural Anthropology
    - Feminst Theory
    - Semiotic


## Meeting Notes 20230122

* Chris has asked what, if any, deliverables are expected
    * Marlon says that the field is very open, but he wants to make sure we create something for Alex to use in his class 
* The class is about analysis and form 
    * various subjects available in the class syllabus 
        * first movement of Beethoven's III, for example 
* Potential creations 
    * examples provided by Alex and Chris in AI and Formal Analysis below 
    * an expansions of the examination of the ennumeration and analysis done by [Spotify's APIs](https://developer.spotify.com/) and algorithms 
        * taking a piece of audio and attempting to categorize it 
            * can it identify pieces of music 
    * mk grounds this in finding a visible process, through which students in the course are not just experiencing the tool of AI, but also able to understand and view the underlying human decisions that go into it. 
        * mk also goes to the common mechanic of comparing two different outputs/sources. so, ai vs. human 
        * mk also brings up the concepts of starting with multi-modal input into an AI tool/machine (so, starting with audio/performance) OR starting with a base of text (for example, sending in text and scores)
    * Gabe brings up a few options/starting points: 
        * a music library he uses frequently, called [MUSIC21](https://web.mit.edu/music21/) and exploring how this works
            * this would be on the "extraction" side of AI 
        * using tensorflow to create a model of music creation, basicallty creating a LLM but with notes instead of words 
            * using a transformer model
            * this would be on the "generative" side of AI
        * mk says that Gabe shouldn't focus too much on the pedagogical product, as long as students can interact with it, and that interaction can be the pedagogical form 
            * so don't create a tool that inherently "teaches," as we can create those teachoing moments around these tools through lots of established (espeically at the Learning Lab) pedagogical mechanics. 

### Zeroing in on the Project
* Gabe says that something more "generative" would interest him more and is more in his wheelhouse
    * his earlier example of this, which he has already built (but hasn't debugged fully): 
        * using tensorflow to create a model of music creation, basicallty creating a LLM but with notes instead of words
            * currently a command-line tool, using a transformer, consuming textually-recorded music in order to get a LLM to be able to read music and guess the next note 
                * a large chunk of labor for this project would be preparing and cleaning the data to be readable, in order to create this LLM. 
                * also, potentially scaling it beyond a command-line tool, so he isn't "retraining"/"rerunning" the program each time
        * Gabe mentions someone has done with for Bach pieces, by encoding rules for music in order to create short, "new" Bach compositions.
* mk says Gabe should move forward with this, but that is would also be helpful to see what he can build with these third party APIs (specifically Gemini and it's multi-modal APIs)
    * also pushing to have everyone on python notebooks



## cd's messy notes from 20240122
* extractive/MIR: pulling info out of an audio file, processing in some way, what spotify does in the backend (machine learning algorithm labeling songs on some set of features of actual audio files)
    * [The Sound of AI youtube channel](https://www.youtube.com/c/ValerioVelardoTheSoundofAI)
* create a slack project channel that MW will invite Gabe to
* beethoven, first movement of symphony 3 "eroica" a major piece for the course
* extractive techniques using spotify's api
    * identifying form
    * or identifying a chorus vs a pre-chorus
* hands-on units where students get to understand how AI makes sense of things seems interesting (MK)
    * ai thinks of music piece by piece
    * build some small-scale model that students can interact with
* 