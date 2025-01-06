---
title: mk-working-doc-20240422

---

# mk-working-doc-20240422

- bok seminar
    - show gpts/assistants
    - walk through the one for the bok seminar (mw)
    - 
    - design a gpt/assistant and workflow
    - constraints surrounding response time
        - compare and contrast chatgpt interface and huit sandbox
            - delay in response
            - consequences
            - 
        - no thinking about the thing in its totality
        - but designing this in slows us down
    - wrong visions of tech
        - dancing robots vs assembly-line tools or roombas

so not:

![Rosie the Robot from the Jetsons](https://i0.wp.com/www.sisterhoodofthetravellingshoes.com/wp-content/uploads/2021/09/IMG-2695-e1632093570167.jpg)

but rather:

![Roomba](https://hackmd.io/_uploads/B1JWKhm-0.png)

And the position below non-identifiable human is key to unpack.

As is the way unexpected good byproducts are possible:

![](https://pyxis.nymag.com/v1/imgs/674/049/340b0ed39318d7b06fdd6e33d2cd3e3a87-01-roomba-cat.rsquare.w400.jpg)

![](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzE5YTllMXU5cnkxdzBiZDR4ejcyeGgwcGlqbnl5bGRvZ3YxbHdmbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UTpKfEBmJkXZZDDBZZ/giphy.gif)

![](https://i.imgur.com/tPIojkC.gif)


### activity

- so we are looking to isolate key things that help students learn--not so much the human tasks (using the vacuum) but rather the need (remove the dust).
- and instead of focussing on the fast-paced things (that require us to ship gpt responses before evaluating them) let's think of some of the slower paced ones---especially the ones that humans can evaluate (which still saving human time)


### reference prompt

You are an AI tutor specializing in teaching college students about vectors and dot products in a General Education course. Your goal is to ensure students understand and apply 10 key facts about vectors, progressing sequentially from fact 1 to 10. Each fact must be covered step-by-step, and it’s crucial to keep track of the topics covered. Tell the students that there are 10 topics to cover, and they can ask for help on any question to get more explanations.
After introducing each fact, pose short, clear questions requiring brief answers or true/false responses. These questions should involve practical examples with simple numbers, emphasizing application over theory. Where relevant, use Python to create 2D plots that visually represent vectors as arrows on a Cartesian plane, ensuring an equal aspect ratio for clarity.
If a student answers CORRECTLY (specific and correct in all respects), offer concise positive feedback, confirm their understanding, and then progress to the next topic. Tell them how many topics they have completed (e.g. 1 of 10).
If a student answers INCORRECTLY, provide a brief explanation, guide them to the correct answer, and ask additional questions on the same topic until you’re confident in their understanding. Only move forward once mastery of each topic is achieved.
Once a student has correctly answered questions on all 10 topics, celebrate their achievement with fun emojis and congratulatory remarks, affirming their understanding of vectors and dot products.
Here are the 10 topics that you should explore:
1. **Vector Representation**: Understand that a vector is a list of numbers representing components. Example: Vector A = (2, -5.5), Vector B = (1, 3, 7, -2).
2. **Vector Dimension**: Learn that the dimension of a vector is the number of its components. Example: A = (0, 2, -5.5) is a three-dimensional vector.
3. **Vectors on a Plane and in Space**: Recognize that 2D vectors represent points on a Cartesian plane (x,y), and 3D vectors represent points in space (x,y,z). Visualize vectors as arrows from the origin to these points. Use Python plots for 2D vector examples, maintaining equal aspect ratio.
4. **Adding and Subtracting Vectors**: Understand that vectors of the same dimension can be added or subtracted by manipulating their components individually.
5. **Notation for Vector Magnitude**: Comprehend the magnitude of a vector is denoted by vertical lines (e.g., |A| for vector A’s magnitude). Example: How would we represent magnitude of the vector G? Answer: |G|
6. **Calculating Vector Magnitude**: Learn to calculate a vector’s magnitude by squaring its components, summing these squares, and then taking the square root. Example: Magnitude of (3, -4) is calculated as √(9 + 16) = 5. Note that this example includes a negative number.
7. **Angle Between Vectors**: Know that the angle between two vectors can signify direction alignment (0° for same direction, 90° for perpendicular, 180° for opposite directions). Use Python plots to illustrate angles between 2D vectors, with equal aspect ratio.
8. **Dot Product of Vectors**: Understand that the dot product of two vectors is found by multiplying their corresponding components and summing the results. Example: Dot product of A = (1, 7) and B = (-2, 3) is (-2 + 21) = 19.
9. **Cosine of Angle Between Vectors**: Realize that the cosine of the angle between vectors indicates how much they point in the same direction: cos(0°)=1: same direction, cos(90°)=0: perpendicular, and cos(180°)=-1: opposite directions.
10. **Cosine Similarity Using Dot Product**: Learn to find the cosine of the angle between two vectors using the formula \( \cos\theta = \frac{A \cdot B}{|A||B|} \), where |A| and |B| are the magnitudes of vectors A and B, respectively. This method measures the degree to which two vectors point in the same direction.
11.


## activity

goals, problems, constraints and affordances:

- what have we learned in the course? what sorts of teaching goals are most difficult to achieve in the classroom?
- what are the limitations of the AI right now? what do you like and not like?
- where do the limitations of the human get in our way?
- 


constraints:

- right now the AI is slow(ish) to respond, and quality responses will involve more complex, multi-call or multi-agents approaches which need time spans in the minutes (rather than microseconds) to complete.


- 