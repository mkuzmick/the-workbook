---
title: project-launch-workflow-20240801

---

# project-launch-workflow-20240801
To launch a project, it has to get into **Airtable**, **Slack**, and **Google Drive**.

## Airtable

You'll be using the [ll-central-hub](https://airtable.com/app0UMi0vIUgRP7Os/tblx81ROYJWAqmNZ7/viw374gQ1uWbKgcLW?blocks=hide) airtable base.

### In the 'Metaprojects' table
* **Create a new metaproject** or **find an existing project** that makes sense.
    * If creating a new metaproject, fill out:
        * **MetaprojectId** (can have spaces)
        * **Abbreviation** (cannot have spaces)
        * **Title** (for courses: course title)
        * **MetaprojectType**
    * Click the plus sign in the **Projects** linked record field to add a new project.

### In your new project record
* Fill out the following fields:
    * **Title** (e.g., Faculty Consultation, Infographic Workshop, etc.)
    *  **ProjectAbbreviation** (no spaces)
    *  **Type**
    *  **_COURSES**:
        - Go to https://courses.my.harvard.edu/ and search the course. Then, click open the course. Next, find the "Course ID" (it's the set of numbers to the **right** of the class number, above the course description).
        - Go to [Bok.Courses](https://airtable.com/appdWbqCfObpxHg8J/tblCV2OqylR5BuV7y/viwYsnGhfJgo8tzoR?blocks=hide) base airtable.
            - Open the **Extensions** tab and then the **Course Searcher**.
            - Search for the course by course ID and click the right course to add it to Airtable.
            - Next, finish filling out the record you just created:
                - For **BokClient** - add "LL".
                - Add **BokWhitepages** - add the instructor.
                    - If the person doesn't show up, go to the [Bok.People](https://airtable.com/appVSO1v0pAQK0DaY/tblHHIxX7kUzdahma/viw462RVFPIRzwTnh?blocks=hide) airtable base. First search to see if the person is there already and just needs to have "LL" added to the **BokClient field**. If they don't exist yet at all, please add a new person record.*
                - Add **Curriculum Units**.
                - Add **Enrollment** (sometimes visible in the [my.harvard course pop-up](https://courses.my.harvard.edu/) or via the [the registrar](https://registrar.fas.harvard.edu/archive)).
        * Now that you've added the course to Bok.Courses, go back to the Project record you were working on and link it in the **_COURSE** field.
    * Add the **Term** when the project is happening.
    * Add **TemporalFocusStatus**.
    * Add **Context** (similar to **MetaprojectType**).
    * Add clients, either **primary** or **additional**.
        - If they don't come up, please first add via the [Bok.People](https://airtable.com/appVSO1v0pAQK0DaY/tblHHIxX7kUzdahma/viw462RVFPIRzwTnh?blocks=hide) airtable base (either adding "LL" to "BokClient" if they are in there already, or adding a new record). Then, add them as Client (and link their Bok.People record) in the ll-central-hub.
    - For **ProjectFolder**:
        - Go to [LL Projects on G-Drive](https://drive.google.com/drive/folders/1z-7U7xUWP73HhQ7QFw5-d7IFsk7FSFot) and create a project folder.
        - Drop the regular (non-public) link in the Project Folder field.
    - For **SlackChannelId**:
        - Link to the project channel. If one doesn't exist, create in slack and add it as a record in the SlackChannelIds table. (For AY 24-25, we are making new project channels for each project. Project channels from previous years should be renamed to include "z" and then archived.)
    - Fill out as many additional fields as possible.

*To add a new person record to [Bok.People](https://airtable.com/appVSO1v0pAQK0DaY/tblHHIxX7kUzdahma/viw462RVFPIRzwTnh?blocks=hide), start by using the "Person Search (enter search terms)" extension. Then, add their HU ID to a new record. Add "LL" as client, and their first name, last name, email, and linked records for units, ranks, and school.
## Slack
When creating a new slack channel for a project:
* invite the relevant LL people.
* In the bookmarks bar, we want to add the most essential links to the project. For projects not associated with courses, this may vary. But for courses, this is typically:
    - Link to the G-Drive project folder.
    - Create slack bookmark folders for:
        - Reference
        - Notes
        - Work


