---
title: cd j-term gallery

---

---
tags: cd
---

# cd j-term gallery proof of concept
* project goal: 
    * a gallery proof-of-concept, using mdf projects, as a prototype for any form of curation + display of work (student work, fellows work, LL work, etc.)
    * being able to do this quickly and polished enough that it's a legit service we can offer
    * understanding the structure of the code enough to be able to teach it if that's something we want to do
* who would do this
    * mdfs as a service they offer to courses they work with
    * LL staff as service we provide to courses
    * LL staff as a way to curate projects for reporting to clients, University
    * xtine as way to do reporting about mdf program
    * dd, mw interact with gallery as as a way to print
* what aspects would they do
    * mdfs could be given a template at the start of the year and learn how to tweak css
        * same for LL staff? everyone know basics of css modules + and maybe actually building the app more from ground up?
    * mdfs do rigorous documentation geared toward final gallery like this
        * and ongoing documentation itself gets displayed in gallery for mdf meetings (xtine does this with help of some mdfs?)
        * both for their projects
        * and of student work in the courses they support
    * connect it to codeLab for those who are excited to actually build it from scratch (or explore low-code options like Wix, etc.)
* how relevant to mdfs
    * addresses crucial part of students' work with multimodal forms - curates those projects into something special, something that tells the story of the work that happened
    * documentation they do as mdfs what enables the gallery of mdf projects to exist
    * similarly, they'd need students to undertake documentation in way that lends itself to media-rich, narratively-/thematically rich gallery
* sessions to do with mdfs that support this
    * documenting student work using different media
    * databasing to learn
    * interviewing (students about their work)?
    * finding the story in the project?
    * basic css?


### references/readings
* [The Process Genre, Salomé Aguilera Skvirsky](https://read.dukeupress.edu/books/book/2702/The-Process-GenreCinema-and-the-Aesthetic-of-Labor)
* [Practice, eds. Marcus Boon and Gabriel Levine](https://mitpress.mit.edu/9780262535397/practice/)
* [Fieldnotes: the makings of anthropology, Roger Sanjek](https://www.jstor.org/stable/10.7591/j.ctvv4124m)

## day 5
* optimize styling for printing 11 x 17, 8.5 x 11
* make 2 css modules
* make buttons for user to select css they want

## day 4
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06E0F9NR5W/screen_shot_2024-01-10_at_3.25.05_pm.png?pub_secret=7da6945861)

* changed tailwind to css modules
* imported google fonts
* [made documentation for using google fonts in next.js](https://hackmd.io/XJZcHvveQoSQQrbw7V8WRw)

### documentation/references
* [next.js fonts documentation](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

## day 3
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06D2RNAEUW/screen_recording_2024-01-09_at_3.56.21_pm_360.gif?pub_secret=653e3b04a0)
* added a copy to markdown button
* made a markdown function and changed the markdown styling a bit so that it had the correct h1s, h2s, image links, etc. 

time it took: about 1 hour


![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06DSNKCT6C/screen_recording_2024-01-09_at_12.33.38_pm_360.gif?pub_secret=e7fd8640c7)
* updated airtable base to just have single line text for mdf name and department name
* updated api route to pass in those fields
* updated page.js to view those fields
* added public media links to airtable base (images and gifs)

time it took: about 1.5 hours

## day 2

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F06CHMCCLF9/screenshot_2024-01-08_at_3.07.21_pm.png?pub_secret=3d3c2152f4)
* make next app
* get working api route
* basic styling in css tailwinds
* add media URLs into airtable
    * static images
    * gifs
    * videos?
* add caching into page.js (to limit data fetching requests)?

### documentation/references
* [creating a next app](https://hackmd.io/qz_n8IV4QAepX2Sha2bZew)
* [nextjs app router documentation](https://nextjs.org/docs/app/building-your-application/routing)
* [nextjs server components documentation](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
* [nextjs client components documentation](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
* [github oauth scopes](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps)
* [pushing local repos to github](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories)
* [using personal access tokens in the command line](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#using-a-personal-access-token-on-the-command-line)
* [next js css tailwinds documentation](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css)
* [css tailwinds](https://tailwindcss.com/docs/utility-first)

time it took: about 3-4 hours, including reading documentation

## day 1
* make backend/relational database in airtable
    * table 1: projects
    * table 2: mdfs
* connection to theme of documentation/curation
    * documentation = means of making a backend (the substance of the backend)
    * database/backend = means of curation (makes the curated view possible)

### documentation/references
* [codeLab database resource](/P7zK2SD9S7umazTlJmsD6A)

time it took: about 1 hour

