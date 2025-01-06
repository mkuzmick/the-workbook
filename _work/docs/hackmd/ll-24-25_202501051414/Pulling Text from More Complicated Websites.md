---
title: Pulling Text from More Complicated Websites
tags: [sc]

---

# So your HTML document was blank
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EYM6JBC3/empty_html.png?pub_secret=72686e4e98)
### Why did this happen?

Some websites use more than just HTML to styilize is why our HTML file shows up blank. 

# How to work around this
## Opening up the HTML file in Visual Studio Code
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EYMBBWKV/open_with_vscode.png?pub_secret=04d388ca75)

The best way to check under the hood is to open up this file in a source-code editor. 

Visual Studio Code is a common application people use. Feel free to use your preference.

## Editing in Visual Studio Code
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07FBEV2TQ9/find_body_paragraph.png?pub_secret=7150373c09)

Once you have your html file open in a code editor hunt down the <body> section. This is where the text of the website would be. 
    
Now we can see why we were unable to view the text before, the website uses javascript and not just plain HTML.
    
Not to worry! We don't need javascript to get the text.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EVTRHMN1/find_lines_between__body_.png?pub_secret=37c8bdce76)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07FMJQB0JC/delete_lines_between__body_.png?pub_secret=ab9fb846e5)
    
The next step is to delete everything between <body>. We have to go to the webpage to get what we need.

## Inspecting the webpage

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07ES6CV02J/inspect_webpage.png?pub_secret=14d6dfc381)
    
Once you're back on the webpage, right click and you'll get a few options. Select *inspect*.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EJ8WB3CP/pick_an_element.png?pub_secret=30c0408ee3)
    
A lot will appear once you do so. You'll notice it looks similar to the HTML document. We don't want everything there, only the text. To do that, click the element picker.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EYRB9RJ6/highlight_box_surrounding_text.png?pub_secret=98e83d6ad0)
    
Once you click that you can highlight different portions of the page. This will highlight that portion within the markup language. Since we just want the text, select the box around the text. In this example it is the purple box.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07FMKBV2V6/copy_outer_html.png?pub_secret=85c879a6b6)
    
Once you've done that, copy the *Outer HTML*. After copying that it's time to go back to Visual studio code.

## Back into Visual Studio Code

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07EYN8F5L3/paste_outer_html.png?pub_secret=95b8a45125)
    
Now you can paste the Outer HTML you just copied into the body. 

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07ES700P7G/save_vscode_file.png?pub_secret=f686514bcd)
    
Once it's pasted in, make sure to save. You can do this by going to File > Save or using the shortcut ⌘ S.

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07F1B58QJ0/fixed_html.png?pub_secret=1e77c37c26)

## Export your text file as a PDF!
    
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F07F1B58QJ0/fixed_html.png?pub_secret=1e77c37c26)
    
Now when you open your HTML file in the TextEdit application you should see the websites text! 

Go to File > Export as PDF. Choose where you want to save it and there you have it!