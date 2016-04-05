Streetlife front-end coding test
=================

You can see my app at http://brooke-balza-streetlife-test.herokuapp.com/

Alternatively, I used [Grunt](http://gruntjs.com/) to build this project. It should run on port 3000, and can be served by using:

```
$ grunt
```

###Comments and assumptions

I was somewhat unsure, from the spec provided, whether I was meant to link the full comment feed provided with the newsfeed - especially as part of the requirement was to only provide the latest two comments. I therefore created a separate comment feed in order to show how a longer list of comments might look.

I assumed that the comments_count property in the messages array translated to the total number of comments, and this is where the longer comment count on some of the posts comes from.

Many of the comments were empty; I filtered these out, but this then meant that in some cases, only one of the most recent comments is displayed.
