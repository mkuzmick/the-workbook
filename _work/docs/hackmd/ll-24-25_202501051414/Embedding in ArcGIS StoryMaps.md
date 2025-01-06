---
title: Embedding in ArcGIS StoryMaps

---

# <h1 style="background-color:Tomato;">Embedding in ArcGIS StoryMaps</h1>
## What is embedding? 🤩
* Bringing in media from an external source into your website 
## Why would you want to embed stuff? 🤔
* Imagine there is a buffet with a lot of food (potatoes, lettuce, steak etc.). You would probably take a little of everything that you want instead of getting up to take one dish at a time (unless you really love cardio, yay). Same goes with your website. Your website is like a plate that draws from the buffet of media from the internet and having everything on one plate (i.e. your website) makes it easier for you and your audience to interact with the information. 🍽️
![maxresdefault-4](https://hackmd.io/_uploads/SyvzkszWye.jpg)

## How do you embed on StoryMaps 😎
> There are two main types of embedding on StoryMaps: inline embedding and sidecar embedding. I'll be focusing on inline embedding for now but you can refer to the sample website at the end of the page for sidecar embedding too!
* Add a new element on your StoryMaps (the green "+" button) and select "Embed".
![Screenshot 2024-11-01 at 2.12.47 PM](https://hackmd.io/_uploads/HkmPAqG-Je.png)
* Insert the code below in the textbox (replacing https://www.harvard.edu) with the website you want to link to within the quotation marks. 
    * There are many more features you can add to the iframe embedding code but the code below is the most basic line you'll need to get your media embedded (see embedded StoryMap at the bottom of the page for reference).
>     <iframe src="https://www.harvard.edu"></iframe>
![Screenshot 2024-11-01 at 2.16.11 PM](https://hackmd.io/_uploads/BJ7dAcGZ1x.png)
* The embedded media will appear in your StoryMap and you can adjust it's appearance.
![Screenshot 2024-11-01 at 2.29.51 PM](https://hackmd.io/_uploads/rJPh0qfbyl.jpg)

## Additional features after embedding 🤓
* The two main options you have after embedding are **interactive** views and **card** views 
* The **interactive** view allows you to directly interact with the embedded media as if you were on that website. For example, you can search for articles about "BoardPlus".
![Screenshot 2024-11-01 at 2.52.08 PM](https://hackmd.io/_uploads/rkXj7sG-1e.jpg)
* The **card** view is a static placeholder that allows you to include a title, descriptio and link that redirects viewers to the website but you won't be able to interact with the website on the StoryMap itself.
    * Card view is sometimmes the only option you have when embedding certain media in sidecar templates, embedding for small devices (i.e. mobile phones) or when the website does not allow you to do inline embedding (eg. YouTube). 
        * Note that for website like YouTube, you **can** embed individual videos but you **cannot** embed the entire YouTube website.
![Screenshot 2024-11-01 at 2.36.01 PM](https://hackmd.io/_uploads/HyltXizW1x.png)

## Troubleshooting 🧐
* If your embedding adventures do not turn out as expected, don't worry, it is not a skill issue! Some reasons include:
    * The website does not allow for inline embedding (or sometimes it only allows you to embed it in card view)
    * The website's URL is wrong
    * The syntax is slightly off (watch out for the <> and </>)

## Practice what you preach 😃 
* I've embedded my sample ArcGIS StoryMap here which in itself embeds other websites! Inception moment🫨. As you might already be able to tell, the live view of the StoryMap on hackMD does not look excatly like the original StoryMap🫠! You can find the original StoryMap here: https://arcg.is/0Lj5T9
<iframe src="https://storymaps.arcgis.com/stories/8092b19837d44bc3ac4f31106a641231" width="100%" height="500px" style="border:4px double tomato;" title="Iframe Example" allowfullscreen></iframe>

## Useful Guides
* [Cheatsheet](https://storymaps.arcgis.com/stories/b299f08094ae4a18891b1d1de6118764) for the different types of embedding on StoryMaps