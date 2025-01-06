---
title: Impact/Challenges of GAI in STEM Education and Research

---

# Impact/Challenges of GAI in STEM Education/Research 

## Harvard Day 

### Natural Science Approach to Understanding and Interpreting Generative AI 

Dr. Hidenori Tanaka 

* Natural Science of Artificial Intellgience 
    * Conventional Paradigm in COmputer Science 
        * a computer precisely executes algorithms based on programs written by humans 
    * Paradigm of Deep Learning: Engineering with Emergent Abilities 
        * capabilities of generative AI emerges with the scaling of data, model, and compute 
        * challenges: hallucinations. biases/fairness, unintended plagiarism 
        * *empirical characterization and theoretical modeling of emergent phenomena, akin to physics* 

* Intertwining of "technology" and "scientific understanding" (industrial revolutions) drives creation of new physics 
    * Therefore what physics will emerge during this next industrial revolution?
    * And what does this say about emergent abilities and deep leanring with AI 
        * compositional concepts illustrated through stable diffusion images 
        * "concept distance" on a graph quanitfies the "imagination" necessary to generate images from the training set. 
        * AI can compose and sequentially learn to generate from the least to the most imaginative object 
            * MW Q: how is "imagination" here being defined? 
                * theory, based on the graphs: imagination and creativity are being defined according to the "concept distance" of the AI creation away from the training data. 
        * capabilities that require composition of atomic abilities (skills) show emergent curves 
* Conclusions 
    * INSERT IMAGE TRANSCRIPTION
* Questions 
    * someone asked about a paper out of europe that demonstrated that these were not "emergent" abilities, but far more discrete when observed/given data in a more controlled way. 

### Enhancing Academic Research with Locally-Run LLMs

Dr Nikhil Mukund 

* Question that drove this research: 
    * what if you had an "AI Co-Pilot," but for research? 
        * word of caution: while thgey function as excellent idea generators, they are essentially text-predictors and must be used with cuation 

* Now, why a local LLM instead of what is currently available? 
    * Outlining the issues with chatGPT 
        * mostly privacy, cost, and limitations in domain knowledge 
    * Argues that open models are catching up with chatGPT (especoially chatGPT 3.5) 
        * specificially references Mixtral 8X7B LLM
            * the architectural differences in these models, allow locally run models to at least compete with larger, private ones. 

* Can/Should you finetune your locally run LLM? 
    * you can, espeiclaly ig you have highly specific use cases that require knowledge of specifc data 
        * BUT: 
            * it requires specialized hardware and is costly 
    * Mukund presents an alternative to fine-tuning: "retrieval-augmented-generation"
        * essentially, embedding, which I believe is what Evangelos is doing with his tutor bot, but with a LLM thaqt is running locally 


### Panel Discussion 

* In these talks, we have focused on the use of LLMs for higher education. How about younger students? 
    * Dr. Kavita Bala mentioned Khan Academy-- which has rolled out a suite of characters and tutor bots 
        * however, she has said it is difficult to predict, especially how far behind we are on analyzing social networks 

* A question on cost 
    * how much these [complex searches and AI use-cases](https://app.undermind.ai/home/) (espeically for STEM work) cost? Not just the cost to researchers, but to the company and then for energy consumption 
        * one of the researchers responded that while it is more expensive than using google, it is far less expesnive than if they had hired a human 
            * everyone agreed that as this scales, the cost will go down 
                * just like with every technology 
            * however, good note on the obscene amount of energy it costs to train these models, costs we aren't seeiong passed on to the customers (us) but exist regardless 

* how much programming should a STEM undergrad have? 
    * Dr Bala: too early to say, this will change and evolve in ways we cannot see 

* back to cost: how can we afford ot build these models to compete? How can we ensure equity? 
    * Dr. Bala is advocating that governments and universities should we leading th eway in creating open-source, well-trained models with good data. We must lead the way to keep this equitable-- or else business and capitalism will win out. 

* privacy and security with senstivie data: 
    * what's better-- contracts with these companies that ensure privacy or building a system we can run locally? 
        * Dr. Bala: currently, both. while costs will go lower over time, we also need to be honest about th edata we're putting in. In some domains, these compnaies have no interest. Others are/need to be highly protected. 

* philosophical question from an education/pedagogy standpoint: how do these mahcines change us? especially around hallucinations 
    * Joshua, from [undermind](https://app.undermind.ai/home/), is not worried at all. Humans are, if anything, more likely to provide false information, and we've been dealing with that for all of history. 
        * you always need to have due dilligence
    * Dr. Bala nuances that point,arguin that these machines are far more convincing than humans, and will defend their false positions at a higher level than humans.
        * regardless, we will get very addicted to having these ai "companions" is all parts of our life, especially as functionalities are collapsed into single bots with tailored-for-us personalities 
            * and this, like most technologies, may have net "good" but there will be extreme examples on either end.
                * a huge lack of trust in anything in younger generations 


---
lunch hour 
--- 


### what should today's undergraduate know about GAI? 

Dr. Logan McCarty

* Showed a demo of live-polling using OpenAI 
* So, what do undergrads need? 
    * some considerations: 
        * AI-created content will eventually be undetectable, unavoidable, and, often, unreliable
        * need essential new skills: 
            * traceable validation of informatyion and reasoning 
            * skill hierarchies will be upended: 
                * coding, datascience, legal advice, etc. 
            * competence will be devauled 
                * discover and exploit unique/unusual skills. 

### Automated question modification to challenge AI models 

Dr Soroush Vosoughi 

* Introduction 
    * he has been working on machine learning and LLM for years 
    * exciting to have all the attention on his field, but there is also significant pushback on full integration of these technologies 
    * he works with the Minds, Machines, and Society group at Dartmouth, which has a goal of mitgating GAIs anti-social tendencies and to increase transparency and trustworthiness. 

* This is an approach to assist with student use of LLMs to assist them with courework
    * gave data on how well chatGPT scored on various tests (AP, LSAT, etc.)
        * amazing at most subjects, except for high level math and English 
    * reference to the Cornell paper on [Generative Artificial Intelligence for Education and Pedagogy](https://teaching.cornell.edu/generative-artificial-intelligence/cu-committee-report-generative-artificial-intelligence-education)
    * He asks where people fall on the spectrum from prohibiting chatGPT, allowing with attribution, or to encourage.

* Fortifying Assignments Aginst Generative AI 
    * Senstiivty of LLMs to Prompts
        * they are highly sensitive to the textual specifics of the ionput, often yielding disparate responses to prompts that are semantically similar of textually distinct. 
            * this has given rise to prompt enginerring 
            * but the theoretical basis for such prompt dependency remains largely unexplored. 
    * Knowledge discontinuities in LLMs
        * we need to define and investigate the conditions necessitating prompt engineering 
            * better prompt = better answer, therefore there exists a knowlkedge inequity among users 
        * there also exist "knowledge discontinuities"-- essentially gaps in the knowledge base of LLMs
            * *so, theoretically, you could use prompt engineering to nudge your assignment into a knowledge discontinuity without changing the semantic content of the question itself*. 
                * write your question in a way that mirrors the style of a different educational domain 
                    * they have created an automation that does this automatically, based on their research 
                        * MW question: but for how long will this last? this feels like intellectual pacman-- you are constantly attempting to "outrun" the knowledge of a LLM by mapping out these knowledge discontinuities and exploiting them. 


### AI and STEM Education 

PhD Jack Maier 

* Introduction 
    * "When will I need to use this?"
        * so why should they learn STEM? 
            * when we have apps and tools to solve virtually any question outside of the highest levels
    * He is a phd student, so how does he use it? 
        * explaining concepts 
        * writing code 
        * highlighting AI use in experimental work 
            * AI finding crystal structures robots carrying out 24/7 lab work 

* Two major questions: 
    * Where do humans fit into the scientific process? 
    * What is the use of STEM education in the age of AI?

* So, is there anything we can ultimately do better than AI and robotics? 
    * what is our place in the universe? 
        * we are better at being human 
            * MW: what does that mean? organic bodies with souls? lol 
    * Therefore: 
        * education should go from "producing specialized workers" to "making the best human" 

* What does it mean to be human?
    * holistic education 
        * "let no one ignorant of geometry enter here" -Plato 
            * math and logic are foundational, before getting to work in the world of rhetoric and the humanities 

### Comparing AI-Supported Instruction vs. Active Learning in Introductory Physics

Dr. Gregory Kestin

* AI tutors 
    * Sal Khan as a propoonent, sayign that AI tutoring bots will revolutionize education 
        * though critics argue that AI could have degenerative effects 

* They wanted to use an AI tutor for their class, with a focus on educationla principles from traditional teaching 
    * They did not do embeddings or fine-tuning, but they did a lot of system prompts. 
        * caps lock, repetition of direction, specific directions 

* They tested "active learning" vs AI tutor-supported learning 
    * they split the class in half 
    * TDLR via many graphs; the AI-supported students learned twice as much and felt more engaged and motivated 

* What is it? 
    * It's a UI with OpenAI API calls, with a system prompt 


### A and Mathematics: Applications in Low Income, K-12 Contexts 

Damion Mannings 

* This talk is a response to the emergence of tutor bot usage 
    * with a specific look at low-income communities, as one of the best indicators of future success 
        * adds a note for rural communities 
            * MW is pleased 
    * and a specific focus on mathematics as a case study 

* Why math? 
    * math anxiety is high 
    * low math can indicate a lack of prepadness for tests, which correlates to later success

### ChaGPT in CS50 

* same presentation as usual 
    * duck debugger 
    * scaled to students in class and to those who are taking it online
    * the "heart" system to control use 
        * which they say has a learning objective, but I think it's to limit the cost of the API calls 

--- 

## MIT DAY 

### Keynote: Generative AI: What's it good for, and what's it good at?

* What's it good for, and what it's good at? 
    * outline
        * does generative AI present an existential threat or is it a remarkable opportunity?
            * yes. 
                * GAI changes the nature of interaction with computers
                * lowers barrier of entry for sophisticated computing
                * presents challenges regarding verification and validation 
            * fast moving and scalable 
            * GAI disrupts our current model of higher education 

* 1188 Explorer Assistant 
    * a custom GPT, with guardrails and constraints 
        * a basic system prompt 

* What GAI good for in STEM? 
    * Teaching 
    * Admin 
    * Research 
        * INSERT IMAGE TRANSCRIPT 

* Stubs examples: 
    * editing student work 
    * creating a cover for a book 
    * crafting homework assignments for students 
    * live student input 
    * creating histograms and python out of complex data sets 

* Work in progress: 
    * facilitated browsing of 20 years of Rubin Observatory project documentation 
    * GAI integration into commissioning and operations of the observatory 
    * facilitated administrative screening of data use 
    * GENED course on GAI 


* Is there a prospet fo GAI making independent intellectual breakthroughs? 
    * currently mostly an efficiency tool 
        * MW NOTE: though I would argue examples like [this](https://arstechnica.com/ai/2023/11/googles-deepmind-finds-2-2m-crystal-structures-in-materials-science-win/) demonstrate some breakthroughs, though not novel. 
    * but yes, eventually (especially with reinforcement learning models)

* Will the intinsic lack of GAI reproducibility impact the scientific method? 
    * yes, until we fully understand the "black box" qualities 


### A2rchi 

[slides here](https://drive.google.com/file/d/1l3RsMdECoe5vklpyh__z4kM3qw0UsBy1/view?usp=drivesdk)

* For academic usecases, how to modfy LLMs for our purposes 
    * potential solutions
        * our own LLM
        * finetuning 
        * Or RAG (and embeddings)
            * cheapest, easiest form, one step above a system prompts 
            * RAG outperfroms finetuning, and is far cheaper 

* RAG tools 
    * Not directly application: 
        * DSPy
        * LlamaIndex
        * LangChain 
        * HuggingFace
    * Too niche: 
        * Moveworks
        * cohere
        * Julius 
    * So they made their own! 
        * [A2rchi](https://github.com/mit-submit/A2rchi) 
            * end-to-end RAG, compatible with an API 
                * all open source 
                * command line interface 
                * built in monitoring 
                * admin portal 
                * many interfaces
                    * automated help desk service, etc


### GenPhys and Beyond: Unveiling the Synergy of Physics and Diffusion Models in Generative Processes

* Physics is generative 
    * so, how can we apply physics to diffusion models (camera vision)? 
    * is there a universal converter to build a bridge beetween physics and generative models? 
        * PDEs as a converter, espeically between equations and illustrations 
            * especially in dispersion and diffusion 
                * PDEs are also smooth and linera, but if you go beyond to other equations, such as reaction-diffusion and Naiver Stokes equations

### Supernova Science in the AI Era 

* Realtime ANalysis with Large Language Models 
    * a golden age of (triaged) discovery 
        * very few supernovae were observed with lesser technology
        * one observatory (the Rubin) will detect 10 million supernovae candidates per night 
    * The Young Suopernova Experiment (YSE)
        * purchasing time on the hawaiian observatory 
            * overlapping the captured data with other telescopes in order to triage phenomena that could be supernova 
            * a variable mix of data (some written, some birghtness, etc). 

* Question: can we use AI to help us triage all this data effieciently 
    * the SpeakYSE (lol) 
    * a LLM referencing this data, which you are able to quickly query 
        * up to five different tables
        * however, there are still hallucinations 
            * they have added a vectorized natural language database to help reduce hallucinations 
    * They are attempting to create an enormous embedding via RAG, in many different modalities, to give the LLM expertise knowledge to improve the way in queries and analyzes the data 
        * this allows the LLM to contextualize the data it is retrieving (and helps the researchers not miss anything, even if it outside of the "norm")
            * multimodal embeddings (so this plus A2rchi?)
                * gaglian2@mit.edu




         

