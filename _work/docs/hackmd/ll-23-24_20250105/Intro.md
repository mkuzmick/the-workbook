---
title: Intro

---

# Intro

### Goal
We want to *postulate* and *prototype* the ways in which AI can be mapped onto assignments at Harvard College. In particular, we will focus on the humanities and how artificial intelligence can span multiple fields. Our mission encompasses a wide range of solutions, from a mere improvement of existing systems using AI to the creation of entirely assignment types that perform that same functions as current assignments. By delineating a clear methodology, we will clarify the goal and its subsequent processes.
### Methodology
To ground this goal, we will assess different types of traditional and alternative assignments. For an original foray, we selected the following two assignment types and to really drill down.
1. Expository essay (traditional)
2. Creative writing project (inventive)
First, we will break down the pedagogical aims behind each of these projects. This section will align with the abstractive ideas of education: each assignment functions as a machine that runs a function to bring a person’s understand from point A to point B. Let’s quickly look at a more defined abstraction of this. $$\forall m \in M, f(m): P \rightarrow K$$
Let’s digest this expression:
- $M$ represents the set off all assignments — aka, machines
- $f$ is the function that takes a given assignment $m \in M$ and maps it from some potential $P$ to some knowledge $K$
	- $P = {p_1, p_2,\ldots, p_n}$, where ${p_1, p_2,\ldots, p_n}$ are elements of the set of all potential cores of human capacity that can be developed. Namely, they are abstract representations of an individual’s brain capacity meted out as $n$ cores of potential that can be raised from an arbitrary level $0$ to a maximum arbitrary of $100$. Each core can be thought of as a discipline that is developed over time. 
	$K = {k_1, k_2,\ldots, k_n}$, where ${k_1, k_2,\ldots, k_n}$ are the indicator-variable elements of the set of all knowledge that a human holds. At first, all values are initialized to zero, as no real knowledge is held by the infant. Namely, $\forall k_i \in K$, $k_i = 0$. Over time, however, there is some threshold $0 \leq t_i \leq 100$ for each $i$ such that if the corresponding potential core $p_i \geq t_i$, then we set $k_i = 1$. 

With this formalism in mind, we will explore what each of these two assignments do through this abstraction. By determining the knowledge flow of each assignment, it will be easier to pinpoint the gaps that the assignments have in facilitating efficient knowledge accumulation. Then, we will suggest AI implementations that round out the holes in the original assignments, looking for improvements to extant assignments and new ones altogether.

### Assignment one: the expository essay

> *“Give the pupils something to do, not something to learn; and the doing is of such a nature as to demand thinking; learning naturally results.”*
> 	- John Dewey

This famous quote from education philosopher John Dewey underscores the original intention behind the expository essay: to give students “something to do, not something to learn.” In this regard, the expository essay is an active machine that veers *away* from memorization and *toward* active creation as pedagogical method. This will be the main idea that drives an abstractive understanding of an expository essay.

##### Formalism of the expository essay machine
Let $m_e$ be the machine (assignment) formally representing the expository essay. When the machine function $f$ runs on the expository essay, $f(m_e)$, we know there will be some accumulation of knowledge points in certain human potential cores. Let’s analyze what cores are improved by $m_e$. 
1. $p_{e1} =$ **Analytical thinking and critical analysis**
    - **Description**: The ability to break down complex topics into component parts for better understanding and to evaluate arguments or propositions critically.
    - **Increment Mechanism**: Writing expository essays requires students to dissect subjects, compare and contrast different perspectives, and critically assess the validity of arguments. This active engagement strengthens their analytical capabilities, making it easier to navigate complex problems and construct well-reasoned conclusions.
2. $p_{e2} =$ **Research proficiency**
    - **Description**: The skill set involved in identifying, evaluating, and synthesizing research materials into coherent arguments.
    - **Increment Mechanism**: The expository essay has students seek out relevant information, discern the quality of sources, and integrate findings into their writing. This process hones their research abilities, enriching their approach to information gathering and assessment.
3.  $p_{e3} =$ **Argumentative skills and persuasion**
    - **Description**: The capacity to construct coherent, logical arguments and persuade others of their validity.
    - **Increment Mechanism**: Through crafting thesis statements and supporting arguments, students learn to present their ideas persuasively. The requirement to defend their viewpoints against potential counterarguments further refines their ability to argue effectively.
1.  $p_{e4} =$ **Organization**
    - **Description**: The competence in organizing thoughts, structuring ideas coherently, and presenting information in a logical sequence.
    - **Increment Mechanism**: The structured nature of expository essays teaches students the importance of logical flow and coherence. They learn to outline their essays, develop structured paragraphs, and ensure that each segment contributes towards their overarching thesis.
2.  $p_{e5} =$ **Writing proficiency**
    - **Description**: The skill in using language effectively for communication, including clarity, style, and grammatical accuracy.
    - **Increment Mechanism**: Continuous practice in essay writing polishes students' writing skills, enhancing their ability to communicate ideas clearly and effectively. Feedback on their work also aids in refining their style and correcting grammatical issues.
3. $p_{e6} =$  **Information literacy**
    - **Description**: The capability to recognize when information is needed and to locate, evaluate, and use effectively the needed information.
    - **Increment Mechanism**: The need to support arguments with evidence in expository essays reinforces the skills necessary for effective information literacy. Students become adept at not only finding relevant information but also at critically assessing its reliability and relevance.
4.  $p_{e7} =$ **Ethical scholarship**
    - **Description**: Understanding and upholding academic integrity, including proper citation and avoiding plagiarism.
    - **Increment Mechanism**: As students are required to cite their sources and construct original arguments, they become more familiar with the ethical dimensions of scholarship. This awareness fosters a commitment to integrity in their academic endeavors.

It’s impossible in this high-level approach to really quantify the ways in which $m_e$ increments $p_{e1}, p_{e2},\ldots,p_{e7}$. However, this breakdown will allow a structured way to look at the primary benefits of an essay. 

