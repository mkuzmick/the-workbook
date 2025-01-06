---
title: mk-bot-notes-20231125

---

# mk-bot-notes-20231125

## notes

### mongodb integration research

Beginning with this [video tutorial](https://www.youtube.com/watch?v=bhiEJW5poHU). Right now just working with the mongo website.

<iframe width="560" height="315" src="https://www.youtube.com/embed/bhiEJW5poHU?si=B-JRmiJnxU7Qr8G2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Now add mongoose and some schemas.
- moments
- people
- tools
- SlackEvents
- SlackMessages
- Emojis

https://www.youtube.com/watch?v=QAqK-R9HUhc

<iframe width="560" height="315" src="https://www.youtube.com/embed/QAqK-R9HUhc?si=aZ3aEr6RkgMpCm7v" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

or 

https://www.youtube.com/watch?v=jZ-dzj6ut54

<iframe width="560" height="315" src="https://www.youtube.com/embed/jZ-dzj6ut54?si=mR40JuzA_h1iOzK_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


### assistants and threads

- 

### scraping sidequest


https://www.youtube.com/watch?v=qo_fUjb02ns&t=5s

<iframe width="560" height="315" src="https://www.youtube.com/embed/qo_fUjb02ns?si=Vb8ECoJ1zzVHP4qd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## reference

AI scientists approach the design of bot swarms in various ways, depending on the specific task or problem they're trying to solve. Here are a few common approaches:

1. **Homogeneous Swarms**: In many cases, each bot in a swarm is identical and follows the same set of rules. The power of the swarm comes from the collective behavior that emerges from these simple, individual actions. This is common in simulations of natural phenomena, like bird flocking or fish schooling, where each individual follows the same basic rules, but the group as a whole displays complex behavior.

2. **Heterogeneous Swarms**: In other cases, each bot in the swarm may have a specific role or set of capabilities, much like the characters in a TV show. This is common in scenarios where a diverse set of skills or capabilities is needed to accomplish a task. For example, in a search and rescue scenario, some bots might be specialized for searching, others for rescuing, and others for coordinating the efforts of the rest of the swarm.

3. **Hybrid Approaches**: Sometimes, a swarm might include both homogeneous and heterogeneous elements. For example, a swarm might include several different types of bots, each type being homogeneous within itself but different from the others. Alternatively, a swarm might start out with identical bots, but allow them to learn and specialize over time based on their experiences.

4. **Redundancy and Robustness**: One of the key advantages of bot swarms is their robustness. If one bot fails or encounters a problem, others can take over its tasks. This is often achieved through redundancy, with multiple bots capable of performing the same task. This can be the case in both homogeneous and heterogeneous swarms.

In your case, if you're creating a swarm of bots to support a learning environment, you might lean more towards a heterogeneous design, with each bot specialized for a specific task. However, you could also incorporate elements of homogeneity and redundancy to ensure robustness and reliability.
