# PokemonShowdownLite
Video Walkthough (Not added yet)

[Github Repo](https://github.com/BhavikChand/PokemonShowdownLite)

## Overview

This is a Pokemon team builder that lets you choose Pokemon as well as their moves from generation 1. Api is [here](https://pokeapi.co/)

We got styling help for this document from this [guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

## Introduction
Communication between the teams was managed through daily Slack messages, as well as through weekly Saturday meetings.
Slack was used for short questions/requests, such as testing out a feature on a branch, or letting the team know a PR was created and needs to be looked at.

Originally we had around 20 stories, with the idea being that the battle and team building would take up equal amounts of development time.

We split some stories, added some that were missing, and marked stories that were too vague or stretch goals. The end total at about 17 stories completed out of 23. Battle stories had much more difficulty than anticipated.

## Team Retrospective:
### [Bhavik Chand](https://github.com/BhavikChand/)
1. Bhavik's pull requests are [here](https://github.com/BhavikChand/PokemonShowdownLite/pulls?q=is%3Apr+is%3Amerged+author%3ABhavikChand)
2. Bhavik's issues are [here](https://github.com/BhavikChand/PokemonShowdownLite/issues?q=assignee%3ABhavikChand)

#### What was your role / which stories did you work on
I worked mostly on the Team Battle feature. The core mechanic of the project that will allow two players to battle each others pokemon.

+ What was the biggest challenge? 
  + The biggest challenge for me was all the logic involved in status ailments how they interacted with abilities and different buffs (Attack Drops and the like). Especially with moves having secondary effects.
+ Why was it a challenge?
  + There were 165 moves and a lot of them have secondary effects, chances to flinch, drop accuracy etc. It was a challange to keep track of all the moving parts before the damage calculation.
+ How was the challenge addressed?
  + I spent a lot of time trying to hardcode stuff and thne I came across PokemonShowDown's code and also the decompiled code from Pokemon Red and Blue. I thought about using it but I thought it might be too plagerisy so I decided agaisnt it. I ended up scrapping secondary effects, abilities, and statuses except for faint.
+ Favorite / most interesting part of this project
  + I learned a lot about pokemon logic and game development actors and buffs and the like in terms of rpgs.
+ If you could do it over, what would you change?
  + I would lower the scope of the project, I would probably do something along the lines of an auto battler. Where two teams create a team and they'd battle for them and see who comes out on top.
+ What is the most valuable thing you learned?
  + The most valuable thing I learned was time management, keeping the scope small than expanding when working on projects and keeping it agile.

### [Dylan Uribe](https://github.com/dyluri)
1. Dylan's pull requests are [here](https://github.com/BhavikChand/PokemonShowdownLite/pulls?q=is%3Apr+is%3Amerged+author%3Adyluri+)
2. Dylan's issues are [here](https://github.com/BhavikChand/PokemonShowdownLite/issues?q=assignee%3Adyluri)

#### What was your role / which stories did you work on
I mostly worked on the database structure, how a user views their teams on the home screen, as well as upgrading the pokemon search screen into the TeamBuilder screens.

+ What was the biggest challenge? 
  + I would say the biggest challenge was the team builder screens.
+ Why was it a challenge?
  + It was a lot of moving parts as well as figuring out different aspects of building a team. How do I fill out 6 team slots even if the user only has 2 pokemon in their team, how to ensure that the pokemon are deleted properly, and handling navigation?
+ How was the challenge addressed?
  + I looked up help for when things when I got stuck. Some of the planning was done on paper to help visualize how the screens looked compared to each other. Having the already existing Pokemon search screen made it very helpful to get started on the rest. After I set up the second screen, I would add 1 more part in the sequence every time until I got to the end. So I would add the modal and fix issues that came up, then include the link to the next page, the link back, the modal on that screen, etc.
+ Favorite / most interesting part of this project
  + The most interesting part to me was understanding the idea of components in the context of web development. The last class I took we did it mostly using nextjs, and express, so we were still writing mostly html and having each page be semi-unique. Making elements of the screen functions that we can re-use in multiple locations like normal functions is a very clever idea, that seems obvious in hindsight.
+ If you could do it over, what would you change?
  + I would start work earlier, but I think also better explanation of how the database worked would be good.
+ What is the most valuable thing you learned?
  + Create examples of how to insert/retrieve/interact with items into your database.

### [Andy Hernandez](https://github.com/Chgunz)
1. Andy's pull requests are [here](https://github.com/BhavikChand/PokemonShowdownLite/pulls?q=is%3Apr+is%3Amerged+author%3AChgunz)
2. Andy's issues are [here](https://github.com/BhavikChand/PokemonShowdownLite/issues?q=assignee%3AChgunz) 

#### What was your role / which stories did you work on
I worked mostly on 🥰

+ What was the biggest challenge? 
  + 😀
+ Why was it a challenge?
  + 😹.
+ How was the challenge addressed?
  + 🩵
+ Favorite / most interesting part of this project
  + 👍
+ If you could do it over, what would you change?
  + ✅
+ What is the most valuable thing you learned?
  + 🪄

### [Jorge Moreno](https://github.com/Jorge-Mor)

1. Jorge's pull requests are [here](https://github.com/BhavikChand/PokemonShowdownLite/pulls?q=is%3Apr+is%3Amerged+author%3Ajor-moreno)
2. Jorge's issues are [here](https://github.com/BhavikChand/PokemonShowdownLite/issues?q=assignee%3Ajor-moreno)
   
### What was your role / which stories did you work on
Most of my effort went towards getting the login and signup page to work with our DB, getting all of the information we needed from our API into our database (So that we did not overload the API with calls), getting a team search page to be able to search for a pokemon to add to the team and show all of their stats and I worked on a battle arena to display the created teams against an opponent team. 

+ What was the biggest challenge?
  + The biggest challenge was getting the arena set up correctly since it involved a lot of both front end and back end.
+ Why was it a challenge?
  + It was a challenge because getting the information involved a very complicated DB query since all the proper information existed but was spread out between 3 tables. Getting the arena setup similar to the style of Pokemon also involved tweaking to get the position correct. 
+ How was the challenge addressed?
  + This challenge was addressed by looking back at my previous homework for Intro to Databases since in that class we often did a lot of table-joining. I was able to find a pretty good example which allowed me to create a usable query for the battle arena. As for the actual arena, addressing this challenge involved a lot of looking at other react native examples and just trial and error. The biggest issue was just trying to position everything which just took time to get right. 
+ Favorite / most interesting part of this project
  + My favorite part of the project would be working on a team and seeing an idea grow and be executed. Usually, for projects in classes there is a pretty strict prompt to follow that does not allow for ideas to grow, this project was not the case. 
+ If you could do it over, what would you change?
  + I think the biggest issue we had was the scope of our project. Our idea was too big for a 3-week project and I think this gave us less time on more valuable aspects of the prompt. 
+ What is the most valuable thing you learned?
  + The most valuable thing that I learned working with type script and team work. Unlike other classes, this project NEEDS to be split up into actual tasks that can be completed on time so as to not block other teammates. 

## Conclusion

Video Walkthough (Not added yet)

[Github Repo](https://github.com/BhavikChand/PokemonShowdownLite)