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

### [Jorge Moreno](https://github.com/Jorge-Mor)

## Conclusion

