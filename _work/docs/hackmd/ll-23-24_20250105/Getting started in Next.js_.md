---
title: Getting started in Next.js.
tags: [complit280x]

---

---
tags: complit280x
---

# Getting started in Next.js.

### start up your Next.js app

In terminal, navigate to your Development folder. From its parent folder (probably your Home folder), that would be
```
cd Development
```

Then start up a [Next.js](https://nextjs.org/) app with

```
npx create-next-app@latest my-workbook
```

You can call it anything you'd like (other than `my-lab-workbook`), but whatever you enter there will show up as a folder containing your starter NextJS app. So change directories into it. This command will also prompt a bunch of follow up questions, select "Yes" for all of them, except for the last question - select "No" for "Would you like to customize the default import alias?".

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F05MGNYPHM0/screenshot_2023-08-08_at_2.02.41_pm.png?pub_secret=55ef05b055)

Then, back in terminal: 
```
cd my-poetry
```

open it in Visual Studio code
```
code .
```
This command will open the current directory in vs code (make sure you were in the app rather than the Development folder). Once it's open, go back to the terminal command and hit `command` and `T` together to open up a new tab in the root of your app. In either of the two tabs, type the following to start the development server.

```
npm run dev
```
Once you do this, you should be able to go to [localhost:3000](http://localhost:3000/) in your browser (ex. Google Chrome).

If you would like to connect to Github, type in the following in Terminal and follow the log-in instructions with your Github account:

```
git remote add origin https://github.com/your-github-account-name/my-workbook.git
git branch -M main
git push -u origin main
```

## further reading

To learn about the default folder structure, check out NextJS's [documentation on project structure](https://nextjs.org/docs/getting-started/project-structure).

## next.js and react tutorials
* [next.js for beginners](https://www.youtube.com/watch?v=ZVnjOPwW4ZA)
* [react for beginners](https://www.youtube.com/watch?v=SqcY0GlETPk&t=0s)
* [another next.js tutorial - 30 mins](https://www.youtube.com/watch?v=NgayZAuTgwM)
* [next.js tutorial using client forms as example](https://www.youtube.com/watch?v=nSfu7sHPE9M)
* [next.js making a POST request](https://www.youtube.com/watch?v=X5M8MtKsIs8)