---
title: airtable-workflow-plan-22040701

---

# airtable-workflow-plan-22040701

There are two main types of airtable bases we'll be using - 
* **permanent bases** that have everything (of which there will be relatively few of these). These will contain ALL metaprojects, projects, clients, tags, etc. that will then link out to other bases.
* **temporal bases** we turn over because of how much data they contain

What this will look like in practice:
* Permanent bases: [ll-central-hub](https://airtable.com/app0UMi0vIUgRP7Os/tbleNFFSynLfZAVtB/viw1UPpzSrd8bGoJp?blocks=hide)
* Temporal bases we'll turn over: 
    * main ones: [ll-work-base-24.3](https://airtable.com/appN3NB28TdhG2S7x/tblHsMq7e2MwOiqsd/viwCGKl6UTQvUk3BV?blocks=hide)(projects + tasks for the semester) and the **photo-video base**.
    * we're also capturing [events](https://airtable.com/appz6747e6NfLDtLB/tblOq0T6EnIXUZ8lG/viwvJZPZ5FjgXhoeL?blocks=hide)
    * more hidden ones: TBD but likely moment-bases.

in terms of the temporal bases, there is another distinction:
* **Captured** - these moment bases will be edited mostly automatically to capture data for that week(/or temporal status TBD) in order to hold onto all of the high input data (or this data will be added to a private repostiory, or sinoloy, or JSON dump, etc.)
* **Digested** - the work base is a prime example of the fact that data from slack will need to be minimally digested due to size constraints (so probably not every slack message in a project channel, but summaries, write-ups, we'll want there etc.). the key thing is to determine what type of manipulations we want to perform, and to hold onto the output of that in the work base.


 
## overall system idea
* hackMD is a whiteboard - no guarantee that anything will be held onto 
* slack utility and project channels are where we drop everything - the source of truth
* airtable is used to sorting and storytelling, and will hold summaries of what's inputted in slack

