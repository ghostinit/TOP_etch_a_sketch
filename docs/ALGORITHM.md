# Algorithm

I don't have enough experience to lay this all out at once so I'll keep this document updated as I encounter and work through each challenge this project will present.

# Establish base
- Create:
    - index.html
    - script.js
    - style.css

- Populate index.html with boilplate
- Insert style and script tags

# The Grid
Per the instructions we are to create the grid entirely through script.  All other functionality hinges on this.

Steps:
Create div in html to contain the grid

In the script
put desired grid count into a variable (it may change)

Run for loop to create rows
    Run for loop to create each cell in each row
        Insert individual divs into row
    Insert row into container

OK, this basically worked.  I now have a grid
Some hoops I had to jump through
- Creating each row and cell with 'flex: 1'

Other than that it worked how I expected

# The events
We are talking about upto 10,000 cells.  We don't want an event handler on each one.  So my plan is to set the event handler on the grid container and user event.target to set the background color.

Pseudo code
Set eventListener on gridcontainer
Call event.target.style.backgroudColor = "color" on it.

Let's see how that works.

Ok, that works, but also doesn't

New plan, we use 'mouseOver' no click initially

Totally worked!  Had to tweak a few other things, but the core functionality is in place
