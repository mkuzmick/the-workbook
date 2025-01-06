---
title: Engineering Fairytale "Generators"

---

# Engineering Fairytale "Generators" 
        
*prepared by:* Madeleine Woods

*resources:*
* [complit200 course canvas](https://canvas.harvard.edu/courses/131639)




## Introduction

This project aims to interlace Large Language Model (LLM) generation with traditional folklore analysis. In lieu of an essay on the topic, I will be crafting a "machine;" utilizing Artificial Intelligence (AI) models and python code. The task of this machine, this "generator," is to reimagine and produce fairytales, with a focus on Little Red Riding Hood narratives, inspired by Bruno Munari's inventive adaptations. This fairytale generator will be built in a Google Colaboratory, requiring python code, API calls to OpenAI, and two principal prompts. This document delineates the methodological approach, emphasizing prompt engineering that aligns with both classical narrative structures and the possibilities of "computational thinking."


![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06RL2WF90R/little_fog_green_riding_hood_.png?pub_secret=5677cb7dd1)


            image generated for final illustration panel of Little "Fog Green" Riding Hood


--- 
## Literature Review

### Munari's *Little [Color] Riding Hoods* 

Bruno Munari's reimaginings of the Little Red Riding Hood highlight the potential for thematic exploration within a familiar framework, making them ideal models. The use of color not only as a *visual*-- but also as a *narrative* device-- aligns with AI's capacity to generate diverse transformations of the tale, each colored (literally and figuratively) by its unique hue and accompanying symbolic associations. Before crafting the prompt that will create these new iterations, we must define the characteristics that appear in each Munari text:

* **Color as Device**: This is the foremost feature of the Munari Riding Hood tales. Each text is distinguished by a specific color (e.g., yellow, green, white), which dictates the visual elements of the work and influences the narrative's thematic direction and character dynamics. It should also be noted that colors are used representationally, but also symbolically (i.e. green as a proxy for not just frogs and mint, but also growth and renewal).
* **Narrative Structure**: Despite variations in details and settings, each story follows a simple narrative arc of *introduction, conflict, resolution, and conclusion*, adhering to the traditional structure of fairytales. This structure has been more thoroughly defined by folklorists and structuralists.
* **Societal Norms versus Natural Instincts**: Munari reinterprets classic elements of the Little Red Riding Hood tale (*the journey, the encounter with the wolf, and the rescue*) in ways that reflect the unique color theme and modern sensibilities of the period in which they were written. Each iteration explores themes related to nature, society, and the interplay between them. 
    This interplay is found in the original *Little Red Riding Hood* tales as well, which serve as a cautionary narrative. The wolf represents not only the tangible threats found outside the familial domain, but also the metaphorical "wolves" in disguise, the internal challenges to maintaining balance between natural desireds and cultural expectations. These interpreations underscore the tales's role in setting societal norms, cautioning young women against the seductive dangers of the unknown, and navigating the passage from innocence to experience.
    Munari's adaptions can be seen as a modern exploration of this theme, utlizing color and narrative structure to relfect the complexities of navigating societal expectations and natural instincts. The prompting would be remiss to not center this thematic discourse. 
* **Animal Helpers**: A recurring motif in Munari's adaptations is the presence of animal helpers that assist the protagonist. These animals often correspond to the book's color theme, adding another layer of thematic cohesion.
* **Innovative Use of Visuals**: Munari consistently employs inventive visual techniques, such as collage, mixed media, and abstract illustrations, to complement and enhance the storytelling, making the visual experience integral to the narrative. 
     Though much of the system prompt will be focused on text production, later prompts, derived from the text created, will be used to generate visuals. These visuals need to do more than *match* the text– they need to *interact* with the text. 
     
### Frameworks and Model Texts Beyond Munari 

#### Propp 


Vladimir Propp's work on narratology, particularly his identification of 31 narratemes within the structure of Russian folktales, offers a useful structure for modeling fairytales computationally. His narratemes provide defined functions that can serve as building blocks within an AI generation chain. Propp also emphasizes the variability within the morphology of folktales, as individual tales may omit or expand upon narrative functions in innovative ways. This systematic approach is particularly beneficial when considering the adaptation of stories like *Little Red Riding Hood*, as it offers a broad palette of narrative functions-- from the initial situation to the final reward-- that can be utilized to construct new tales. It affords a structured yet flexible scaffold that supports the narrative arc. This will be essential in creating the first of my two major prompts. 

However, there are limitations to strictly adhering to formula. The eventual prompt, though "computational" in structure and application, will not over-rely on rigid formulas, recognizing that the strength of folk narratives-- especially those as versatile as *Little Red Riding Hood*-- lies in their adaptability and variability. Leveraging AI, in fact, is what will allow our "generators" to transcend these limitations, enabling the creation of stories that, while grounded in *motif*, are boundless in their narratives and poetics. 

Nanni Balestrini's *Tristano* (1966) can serve as a prototype for this. However, AI can do more and better than the stochastic reordering found within, first enabled via early computers. LLMs surpass stylistic limits and formulas of traditional narrative models, while still engaging substantively with their core elements. By thoughtfully balancing guidance from academic theory with the expansive "possibility space" of AI, the prompt will produce fairytales richly connected to, but not constrained by, their oral antecedents. 

#### Campbell 

Joseph Campbell's concept of the "Hero's Journey,"" outlined in *The Hero with a Thousand Faces*, is comprised of 12 distinct phases. It describes the archetypal journey of a hero through trials and tribulations towards ultimate transformation and triumph. Campbell's "Hero's Journey" dovetails with Munari's work by emphasizing the transformative process of the journey itself-- rather than merely the outcome. Both approaches also involve a thematic exploration of growth, challenges, and the ultimate reconciliation of societal norms and natural instincts. 

This model and its stages, from "The Call to Adventure" to "The Return with the Elixir," can serve as a blueprint for generating narratives where the protagonist navigates through a world filled with both wonder and danger, leading to a pivotal transformation.


#### *Other Authors*

I initially sought authors from the syllabus that collected a large "database" fairy-folk-tales, segmented each one into it's individual narrative functions, and then described their interelation and architecture. Campbell and Propp do so the most efficiently, though I was tempted to include Thompson and Aarne's *Motif-Index of Folk-Literature* (1932) or the mythemes of Claude Levi-Strauss from  “The Structural Study of Myth" (1955). This was especially the case after I built an early form of the generator in [this colaboratory](https://colab.research.google.com/drive/14yypuMC8Adai7q4RiHi6xFB-sNa_Zq3z?usp=sharing). Yet, I had already wandered beyond the curricular bounds with Campbell, so I turned back to the reading list for the purposes of my *Literature Review*. I returned, not for structure-- as proided by Propp and Campbell-- but for an enriching of the (eventual) AI output. I hope to clothe the narrative skeleton provided by the previously named scholars (with Munari sequestered to the corner as a study and model), with semiotic flesh. 

Let's get to fleshing by starting with rhetorical questions: *how can an LLM rigorously engage with the color chosen for the Riding-Hood? How can this, then, be applied to the narrative structure?* Enter Jakobson and Bogatyrev's "Folklore as a Special Form of Creation" (1929). Color cannot be used just as a decorative element, but as a semiotic tool imbued with complex meanings and associations. By integrating semiotics, the AI can be prompted to interpret colors within folktales as symbols, each carrying specific cultural, emotional, and thematic weights. This approach requires a nuanced understanding of color symbolism across different cultures and contexts, enabling the AI to generate stories where the chosen color shapes characters' motivations, plot developments, and thematic explorations, much like in Munari's adaptations. The fairytale "generator" will guide the AI to consider color as a narrative device that influences the story's atmosphere, character dynamics, and moral lessons, fostering a rich semiotic interplay between visual elements and narrative content.

Building upon this semiotic groundwork, Gianni Rodari's concept of the "fantastic binomial," a creative tool that marries the unrelated, for the creation of new narratives. This technique, an exercise from his "Grammar of Fantasy," will be used as a methodological bridge between the human and the machine. Though Rodari's exercises were intended for the education of children, I intend to use this exercise for the ephermeral education of an LLM. The "fantastic binomial" will feature as a structure within one of my prompts. 

I imagine Calvino would be particularly tickled by this generator's attempt to communicate the meaning of these themes and structures to the machine. "Cybernetics and Ghosts" by Calvino, delivered as a lecture in 1967, delves into the evolution of storytelling, emphasizing the transition from oral traditions to the possibilities offered by modern computational methods. Calvino explores how storytelling has historically operated within a limited set of variables—characters, actions, and outcomes—structured in complex codes to master the variety of human experiences. He draws attention to how folktales, despite seeming limitless, are actually finite combinations of narrative functions, as highlighted by the works of Vladimir Propp and Claude Lévi-Strauss.

Calvino's fascination extends to cybernetics, suggesting a parallel between the narrative structures of literature and the operational frameworks of computers. He posits that the processes of creating stories and the workings of the mind could be likened to cybernetic circuits, where electronic brains demonstrate potential models for understanding complex mental operations. This analogy leads to contemplation on whether machines could one day replicate or surpass human creativity in literature, navigating through narrative possibilities with a precision and variety far beyond human capability. For now, this computer "creativity" is stunted-- if even extant-- as I will discuss in my next section. However, this generator could serve as a prototype for the coming realization of Calvino's contemplationsm espoecially through the forced generation of color semiotics and themes via the "fantastic binomial" method that will employed in the prompting. 

More germane to the practical needs of the generator, "Cybernetics and Ghosts" also probes the impact of structural and combinatorial analysis on understanding literature. This methodical decomposition aligns with cybernetic principles, viewing literature as a system of logical operations, amenable to computational analysis. Calvino highlights the creative and critical potentials of this approach, suggesting that literature, in its essence, is a cybernetic phenomenon; a vast network of narrative possibilities explored through the interplay of predetermined linguistic elements and the spontaneous emergence of meaning. This lens and analytic methodology is how I will approach the texts of this Literature Review-- distilling them to their singular functions, and stringing these functions together for one operation. 

This "machine" is structurally inspired by the work of Calvino. However, the fairytale "generator" will turn to Calvino more directly within the prompts for the "emergence of meaning." I will prompt the generator to use Calvino for styling of the narrative arc, especially when handling the themes of *natural desires vs. societal expectations* (*The Baron in the Trees,* 1957). These influences, together, form a narrative ethos for my AI-powered "generator," one that respects the roots of folklore while eagerly reaching for the branches of technological possibility.

---
## Technical Considerations and Prompt Engineering 

The previous discussion on structuralist theories are not merely academic musings, but serve as the techincal backbone for the fairytale "generator." Embedding these narrative structures ensures that the resulting fairytales are both coherent and deeply rooted in the literature. I will do so through prompt engineering. 

The prompts of this "machine" will employ a multi-shot approach to generate a new "Little [Color] Riding Hood" text and accompanying images. This multi-shot approach has two major functions: maintaining authorial intent and controlling for style, both of which will be aligned with the theoretical frameworks and aesthetics of authors from the course syllabus. 

To do this, four prompts need to be built:

1. **PROMPT A**: this prompt executes a function-calling tool through the [OpenAI Assistants API](https://platform.openai.com/docs/assistants/overview?context=with-streaming) that returns a narrative arc made of "narratemes" and "stages" in strictly structured json.
    * The returned json will be made by referencing an embedded texts from Vladimir Propp and Joseph Campbell.
2. **PROMPT B**: This prompt will use the returned json from PROMPT A and the inputed [color] 
    * The json returned by PROMPT A will be looped back to the same [Assistant](https://platform.openai.com/docs/assistants/overview?context=with-streaming), asking for "enriching" of the narrative arc with the work of Jakobson, Bogatyrev, Rodari, and Campbell. An "enriched" json string will be returned after this loop. 
3. **PROMPT C**:This prompt will generate the tale. 
    * This unction and prompt will take the enriched JSON made in "PROMPT B" and the color to generate the text (which has other "prompt branching" as that text is used to generate images)
4. **PROMPT D**: This prompt will return the final images to a Camera Vision tool, using the same Assistant from PROMPT A. The images will be described, and this description will lightly edit the text to match/interact with the images.
 
Prompt engineering presents a unique challenge. It should be noted that prompts only "guide" the generation. AI models with a textual training are incredibly senstive to prompts, but, even with text input, no two AI generations are ever the same. In the compositional process-- somewhere from the creation of one word/pixel to the next-- there is always variability. Prompting is beyond the grasp of empirical study and mastery.

Therefore, my approach to engineering prompts is one of "creating space." LLMs and Diffusion *models* (the two types of AI deployed in this "generator") *are spatial*, constantly moving, association-trees of probables. *Therefore, the prompts must become spatial.* Writing a prompt is not like providing a recipe. The prompt engineer is, instead, providing an *environment*, whose edges and contours are defined by the logic and style of the prompt provided. They create structure by deciding a starting point-- within a vectored space-- for the generation to "blossom." What comes through this blossoming is, again, variable. It is this mercurial nature of the models that mimics human creativity. Therefore, via prompt-based "preprocessors", I will seek to control this output as much as possible-- such that the "creativity" employed reflects human thought, more than simple variability. Prompting remains epistemological, not ontological. This is where I deviate from the aspirations of Calvino in his "Cybernetics and Ghosts." This is done, not out of disagreement, but as a result of technical constraints. Though LLMs can generate text, they are not yet semiotically advanced enough to ascribe and strengthen meaning found in the newly-generated narratives. At least, not alone. Not yet. 

---

## PROMPT A: Structural Preprocessing

The generation of a structured json file via PROMPT A functions to align the ultimate AI output with the course scholarship. Before *generating* with AI, it is important to *constrain* the AI.

Preprocessing of this sort is often deployed when using AI models that generate images, such as Stable Diffusion(SD). SD operates on the principle of reversing a diffusion process, where it learns to transform a random distribution of pixels (noise) into coherent images through a meticulously controlled denoising procedure. During training, the model is exposed to numerous image-text pairs, enabling it to understand and replicate the relationship between textual descriptions and visual representations. This is achieved within a high-dimensional latent space, where the model gradually removes noise from a point in this space to generate an image that corresponds to a given textual prompt. 

As a user, this "reversing of diffusion" is mainly guided in two ways. One, through the selection of a model-- with certain training, and, therefore, "artistic" style. Two, through the input of  postive and negative textual prompts. As a conditional model, Stable Diffusion uses these prompts to guide the image generation, ensuring the output closely aligns with the described attributes. Though, as previously discussed, images generated-- even those generated with identical prompts-- are visually variable. 

By adding a "preprocessing" step to the generation, the user can exert more control over the image output. [Controlnet](https://github.com/Mikubill/sd-webui-controlnet) is the most common of these "preprocessors." In the context of image generation, controlnet models delineate the boundaries and key features of an inputted image. These boundaries and features are then communicated to the larger stable diffusion model and processes, akin to providing a detailed map for the AI to navigate with.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06PC5ZC2MV/screenshot_2024-03-15_at_11.46.13_am.png?pub_secret=52475a269e)

            left: blender environment fed into controlnet; right: resulting stable diffusion output, "constrained" by controlnet models and checkpoint models

PROMPT A seeks to implement a similar methodology. By defining a structured JSON file of narrative elements derived from the theoretical frameworks of Propp and Campbell, a textual "controlnet" is created. PROMPT A functions as a critical constraint mechanism, guiding the AI to produce tales that align with these established structures of Propp's 31 narratemes and Campebll's 12 stages.


### The Prompt

[prompt + code]

--- 

## PROMPT B: Thematic and Semiotic Enrichment

Now that the "preprocessing" is complete, our narrative skeleton is delivered. As previously described, the task of PROMPT B is providing chromatically-derived semiotics in/onto the narrative skeleton. The flesh that makes up a story. 

By revisiting the theoretical foundation laid out in the Literature Review, one can articulate specifications needed to craft a prompt that will return a thematically complex *Little [Color] Riding Hood.* This approach aims to operationalize concepts of semiotics, the "fantastic binomial," and Calvino's aesthetics. This will ensure that the inputted **[color]** is not used for surface-level styling, but is the geneuine originator of plot and theme.

This prompt "loop" is the mechanism through which this generator becomes a "cybernetic circuit," as posited by Calvino in "Cybernetics and Ghosts" (*The Uses of Literature,* 1986). In cybernetics, circuits represent the pathways through which information flows and is processed, leading to output based on a combination of inputs and the system's programming. Similarly, code loops within the narrative generator are structured sequences that process input (such as thematic elements, stylistic preferences, and narrative structures) to produce literary output.

This prompt, which feeds the JSON returned from PROMPT A, along with the user-chosen color, back to that very same assistant for enriching, acts as cybernetic circuit by:

* Processing Input: 
    * Just as cybernetic circuits receive and process various inputs to perform functions, code loops in the generator take in specified narrative elements and stylistic guidelines as their input.
* Executing Programmed Logic: 
    * The loops follow programmed logic to combine, recombine, and manipulate these inputs. This is akin to the way circuits follow the rules of cybernetics to process information.
* Generating Output: 
    * The final narrative output from these loops is comparable to the output of a cybernetic circuit, transformed through the system's internal processing.
* Feedback Mechanism: 
    * Both systems incorporate feedback mechanisms. In cybernetics, circuits adjust based on feedback to optimize performance. In the narrative generator, code loops can be refined based on the outcomes they produce, enhancing the quality and relevance of the generated narratives.

In essence, the fairytale generator outlined in this document funcrtions as a cybernetic circuit, meticulously crafting stories by navigating through a predefined narrative space, guided by the logic of storytelling and the variable ~~creative~~ potential inherent in the combination and recombination of narrative elements. This systematized approach to literature not only echoes Calvino's insights into the cybernetic nature of storytelling but also extends his vision into practical applications, harnessing computational logic to explore the infinite possibilities of narrative creation.

To execute this function, the prompt will need to meet several technical specifications. First, two elements need to be defined and enriched: 

* **Symbolic System of Color**: 
    * The user's chosen color (inputted after the preprocessing of PROMPT A), will be fed to this prompt in three forms: HEX, RGB, and Pantone. This color will be viewed through a predetermined lens of color theory. To better mimic the Munari, I will reference his chosen color theory as best I can. All together, the color and it's symbolic associations, will be produced as a single elements. 

* **Thematic Structure**:
    * **Nature vs. Society**: In this part of the prompt, I will ask the JSON returned from PROMPT A to be edited or expanded to center the thematic dichotomy of nature versus society. 
        

Theses two elements will then fed through a version of a Rodarian creative exercise (again, to transform that which is variable into something more closely approximating rigorous creativity): 

* **The Fantastic Binomial**:

    * **Inventive Juxtaposition**: This exercise will be employed by pairing a symbolic *interpretation of color* with a conflicting or complementary theme of *nature versus society*.
        * **Dialectical Tension**: This pairing should create a narrative tension that the AI must navigate, blending thematic depth with narrative innovation.
        * **Color as Dialectic**: Employ color to embody dualities—serving both as a mirror to societal constructs and a window into the untamed natural world.

This dialetic exchange between color and theme will ultimately produce a new structured narrative arc in JSON. It will not only feature plot points via Propp and Campbell, but will be expanded with chromatic themes and semiotics. In sum, the chosen color should not only enrich the visuals of the generated fairytale but also serve as a thematic fulcrum, exploring the tensions and harmonies between the natural world and societal norms.

--- 

## PROMPT C: Folktale Generation Prompt 

Building upon the foundation set by Munari and refined through our literature review, PROMPT C is engineered to take our "enriched" narrative structure and convert it into a vividly realized fairytale. This generation, using the user-designated color and JSON, will require a larger prompt with strict technical specifications: 

* **Color Integration**:
    * Color transcends aesthetic to become a structural element. It initiates narrative movements and conflicts, integrating deeply with the story's core mechanisms-- akin to an “auxiliary element” undergirding plot (Propp, 1928). 

* **Narrative Enrichment**:
    * The plot, as determined by PROMPT A, is rendered flexible and dynamic through the variability of generation. In order to constrain the AI, the prompt will have to be stringent in the injection of the narrative arc via the JSON. 

* **Animal Helpers and Allies**: 
    * A generator built to mimic Munari's *Riding-Hood* tales would not be complete without the use of thematic animals. This specification calls for characters, aligned with the tale's color theme, to serve pivotal roles in the protagonist's journey.

* **Stylistic Considerations**:
    * The narrative voice will primarily pay homage to Munari, but with Calvino-esque inclusions. Though much of structuralist theory-- and this document-- is tonally serious, the stories themselves are not. The final element of this prompt will encourage playfulness and humor in line with the folktale oral tradition.
    * Visually, the generator will draw inspiration from Munari's versatile approach to illustrations, aiming to produce images that mimic and produce watercolors, pens, collage, mixed media, and abstract forms. 

In essence, PROMPT C serves as the culmination of our narrative generation process, where the theoretical underpinnings, thematic explorations, and stylistic ambitions coalesce.

### The Prompt

[prompt + code]

---

### PROMPT D: Cybernetic Synthesis and the Human Creative Process

PROMPT D embodies the final cybernetic circuit, which is focused on the interplay of *what is textual* and *what is visual* in the ultimate output. As described in the section "Technical Considerations and Prompt Engineering:" 

> PROMPT D [...] will return the final images to a Camera Vision tool, using the same Assistant from PROMPT A. The images will be described, and this description will lightly edit the text to match/interact with the images.

This is a continuation of PROMPT C, which guides the generation of images with a specific aesthetic. While this aesthtic is in line with Munari, the process is not. Munari may have thought computationally, but he was an artist of the physical. When writing his *Riding-Hood* tales, Munari had to think of text and images simultaneously. They developed together. Munari did not engage the semiotics of color through intellectualism only-- he engaged with semiotics everytime he finished a sketch, every time he mixed paints. 

Alas, the AI models can not engage with the physical world in this way (yet). Therefore, another cybernetic loop is needed to better reflect the physical world and the human creative process. PROMPT D is just that loop, that will ensure that textual elements and generated visuals are not only complementary but mutually symbiotic. PROMPT D is an attempt at generative storytelling that is both deeply rooted in cybernetic theory and intimately connected to the human creative experience.


### The Prompt

[prompt + code]

---

## THE MACHINE 

This document, as stated in the introductory paragraph: 
> delineates the methodological approach, emphasizing prompt engineering that aligns with both classical narrative structures and the possibilities of "computational thinking."

However, as seen in sections where "The Prompt[s]" are featured, it is made visible that this delineation was with the ultimate goal of building a machine to execute these tasks. You can find this machine, combining all of the prompts, below: 

["Little-[Color]-Riding-Hood" Generator](https://colab.research.google.com/drive/1-oOYCJOjWdJGtmHfzn211qO-Y4QnfGNQ#scrollTo=X3chIQDdEQB6)

--- 
## Conclusion

*to be written following April's laboratories, but essentially focused on how AI and [other types of data analysis](https://journals.sagepub.com/doi/epub/10.1177/20539517211037862) can realize the ultimate goals of Levi Strauss and Calvino; with some reflections on cybernetic systems and what is means to make a computer behave creatively; as well as the creative process that went into the engineering of this generator: theory first, then prompt engineering, coding, and troubleshooting. How this process renders narrative structuralist theory truly rigorous. it either works or it doesn't.

the broader category of machine the generator falls into, the fairytale-makers computing fantasy,  are more than a single machine made possible and efficient through AI. This machine is not discrete to the study of narrative and literature. It is a particularly strong tool for those building with AI, that tests the capabailities of the models and how interaction with these models should be designed*













