---
title: mw planning doc

---

# mw planning doc

## resources

[GAICA Project doc](https://hackmd.io/1XKteQQRT-W_YN0FALJFVw?edit)

### outline 


1. **Introduction**
   - Context setting by Marlon
   - Overview of the GAICA program

2. **Background**
   - Partnership with FAS faculty
   - Role in multimodal assignments

3. **Challenges**
   - Diverse participant skills and backgrounds
   - Rapid changes in AI technology

4. **Workflow Development**
   - Use of Google Colaboratory
   - Development of singles and machines
   - Integration of GPT models and Slack

5. **Project Highlights**
   - Examples of singles and machines
   - Development of tutor bots

6. **Conclusion**
   - Mention of additional projects/future applications

### spiel 

***Marlon will introduce the context of the GAICA program and our workflow, setting the stage for the following discussion***

As some background, the Learning Lab partners with FAS faculty who are interested in creative and multimodal assignments and activities. These multimodal assignments and activities often involve unconventional modes of communicating, making, and creating.

This positioning within the FAS ecosystem and our multimodal skillset made us good candidates to assist with the second iteration of the GAICA program, which was started in early 2023 by Chris Stubbs, the former Dean of Sciences. This program, made up of “Generative Artificial Intelligence Course Assistants” gave students funding to build various AI tools for specific courses. Many of these, unsurprisingly, centered around slackbots. 

However, we had a novel problem on our hands: how do you get a group of people, all with varying levels of coding proficiency and differing academic backgrounds— started on building AI tools? Add to this the extra layer of complexity that is the AI market: new tools are constantly appearing and old ones are updating or overhauling their API methods at a rapid pace.

To address these challenges, we devised a flexible workflow for code:
- We utilized Google Colaboratory for quick, iterative coding and experimentation.
- We developed one-shot API calls/functions known as "singles," which could be stacked to form more complex structures we called "machines."


On the prompt engineering side, preparing to build chatbots suited for each course: 
- participants fisrt started with GPT models in the Assistants API Playground
- they then integrated their learning into a Colaboratory notebook
- eventually, this work was connected to Slack for practical application.


Our GAICAs created various innovative tools, including: 

> ---
> 
> **Project Name:** Colab Singles
> 
> This project contributed to "**COMPLIT 200**: Computing Fantasy" by developing code blocks, termed "singles," which enable students to generate illustrated folktales. The course is experimental, focusing on the intersection of literary theory, history, and computer-assisted creation using generative AI tools for storytelling. The GAICAs’ work aimed to enable students to engage creatively with the course's objective of crafting an illustrated volume of AI-generated folktales. This aligns with the course's emphasis on the history and theory of generative storytelling, from structuralist theories to practical applications in narrative construction.
> 
> **Technology Stack:** Python, Google Colaboratory, OpenAI API, Gemini API
> 
> **GAICAs:** Gonzalo Pelenur, Josefina Biernacki, Jōsh Mysore
> 
> ---
> 
> **Project Name:** Colab “Machines”
> 
> This project involved the creation of mainly two types of psuedo-machines, machines being "an apparatus using or applying mechanical power and having several parts, each with a definite function and together performing a particular task." These machines not only utilize code, but apply "rhetorical" or "intellectual" power to perform a function. 
> 
> One type, a fairytale generator for **COMPLIT200**, utilized the stacking of “singles” from another porject, as well as non-ai functions and inputs (such as a new “color” for Little Red Riding Hood’s cloak) to generate tales in structured ways. 
> 
> The second type of project involved a recursive machine designed for **EMR16**. This machine processes images by placing them into a recursive feedback loop. It starts with a "revised prompt" used by Dall-E to generate an image, which is then reintroduced into the loop along with a vision description of the resulting image. This process creates a sequence of opposites and extremes, uncovering how AI systems describe and create images. Such insights reveal details about the training and cognitive processes of these AI models.
> 
> **Technology Stack:** Python, Google Colaboratory, OpenAI API
> 
> **GAICAs:** Gonzalo Pelenur, Josefina Biernacki
> 
> ---
> 
> **Project Name:** Tutor Assistant
> 
> This project developed a chatbot assistant for **PHIL16** using the OpenAI API. The chatbot employs a Socratic method to assist students in brainstorming and developing ideas for their papers. Initially deployed in OpenAI's playground, there are plans to integrate this tool with Slack, enhancing its accessibility and utility for students.
> 
> **Technology Stack:** JavaScript, Node.js, Slack, OpenAI API
> 
> **GAICAs:** Josefina Biernacki
> 
> ---
> 
> **Project Name:** STEM Slackbot
> 
> This project developed a chatbot assistant for **PHYSICS15b** in collaboration with the course professor, using the OpenAI API. The chatbot assists students in understanding complex physics concepts and solving problems. After initial development and testing, the Slackbot was fully integrated and deployed on Slack for student use following spring break, enhancing its accessibility and practical utility in educational settings.
> 
> **Technology Stack:** JavaScript, Node.js, Slack, OpenAI API
> 
> **GAICAs:** Suvin Sundararajan
> 



While I've highlighted some key projects, GAICAs have also worked on other significant initiatives, such as: 


> ---
> 
> **Project Name:**  Generative Music Model
> 
> In this project, a GAICA developed a generative model to create musical notes for **MUSIC225**, focusing on musical forms, especially in classical music. The project aims to explore the capabilities of AI in understanding and generating musical forms. Utilizing TensorFlow and Keras, the model is designed to train on music data and generate new compositions. Originally using a database of monophonic folk songs converted to text, the GAICA scaled the project to take in midi files, allowing the model to produce polyphonic melodies. 
> 
> **Technology Stack:** TensorFlow, Keras, Python, custom Python library for transformer models.
> 
> **GAICAs:** Gabe Mehra
> 
> ---
> 
> **Project Name:** Overhead CV Model
> 
> In this project, an AI model was developed to process overhead videos of a table, recognizing and cataloging features such as card color and orientation using Camera Vision. This model was initially trained on recorded footage and successfully extended to handle live video streams. Future enhancements include interactive elements like triggering lights and generating sounds based on the visual input. This project serves as a prototype demonstrating how AI can be integrated into physical spaces to enhance classrooms, workshops, and lectures in real-time with novel and humanistic applications.
> 
> **Technology Stack:** OpenCV, YOLOv7 (with Pytorch and Tensorflow), LabelImg, Scikit Learn, MediaPipe, Numpy
> 
> **GAICAs:** Indra Islas-Luz
> 
> ![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06UZG6H5M1/example1_processed.gif?pub_secret=1d8969c0c9)
> 
> ![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06UZKWKQRY/example2processed_from_ezgif.gif?pub_secret=8fae9951b8)
> 
> ---
> 
>
> ---
>
>**Project Name:** Live Generative Transformations
>
This project utilized live Stable Diffusion transformations to convert images and videos captured on a green screen into generated visuals. Initially deployed in **SLAVIC193**, the technology allowed students to visually explore the mathematics of dance movements in innovative ways. The course focused on the spatial imaging and language of dance choreography, particularly how movements are communicated and preserved. This application of AI not only prototypes future educational tools but also opens new methodologies for analyzing and codifying dance movements through advanced visual processing.

**Technology Stack:** Stable Diffusion, green screen technology, video processing software

**GAICAs:** Gonzalo Pelenur
**Learning Lab Undergraduate Fellows (LLUFs):** Elisa Weyer, Joel Kizito

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F0709SCPC9W/screen_recording_apr_18__3_.gif?pub_secret=d164c0515a)

