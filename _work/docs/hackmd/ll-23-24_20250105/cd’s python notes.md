---
title: cd’s python notes

---

---
tags: cd
---

# cd's python notes

## python basics
* print("hello world")
    * executing a statement example
    * print a built-in python function
    * "hello world" = string
* name = input("what is your name?")
    * input function: gives you chance to enter value
    * if you answer the question ("xtine"), it will assign the value 'xtine' to the variable "name"
* exit()
    * calling the exit function 
    * takes us out of python interpreter and into the command line
* python uses indentation to indicate where code belongs (so sometimes you'll need to tab, when you're defining a function, ex.)


## data types
* integers
* floats
* strings
* boolean 
* sequences
* dictionaries


## declaring variables
the "if__name" function (below) basically tells the Python interpreter that the function should be run as a command in terminal (not exported as a module).
```def main():
  print("Hello world!")
  sophie = input("what is your name?")
  print("Nice to meet you,", sophie)

if __name__ == "__main__":
    main()
```