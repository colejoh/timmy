# Timmy Purdue Website

Hey there. You are probably here becasue you want to make changes to [purduetimmy.com](http://purduetimmy.com "purduetimmy.com"). The goal of this guide is to walk you through just that.

## Identifying your changes
The first step is to identify *what* it is you want to change. The main three things that you'd want to change are:
 - Text on the site (i.e. updating the service page to tell everyone about a new service location)
 - Images on the site (i.e. changing team members or their titles)
 - Layout of the site (i.e. adding or removing a page)

The good news is that two of these three things can easily be done. You can very easily change the copy on the page, or switch out team members.

Unfortuanly given the original constrains of the project, larger page/layout changes will involve getting your hands dirty with coding.

## Changing text
Good news, this is as easy as updating a Google document. This site uses a Google Sheet as its source of data.

The link to that sheet is [here](https://docs.google.com/spreadsheets/d/1GbH7U-0cQXYZAzCg0be5MdQlkYu7XFssJA4zM4gkaYM/edit#gid=0 "here")

This sheet is 100% public to view, but you need permissions to edit. Someone in your org should be an owner and can help you out with getting access.

Once you have access to the Google Sheet, it's as simple as finding the page, then the section, then updating the cell.

**Important**:  Only change columns C-F. If you change A or B, you will break the site.

## Changing a team member
On this site, the only images that are easily updatable are the team member images. Again, given the constraints of the project, making every image dynamic would have been out of scope.

How to change a member:
 1.  Upload the new team member's image to your favorite image sharing site (I've used https://imgbb.com/ here).
 2. Copy the direct image link. This will be a link ending in something like .jpg or .png
 3. Find the existing member you want to remove [here](https://docs.google.com/spreadsheets/d/1GbH7U-0cQXYZAzCg0be5MdQlkYu7XFssJA4zM4gkaYM/edit#gid=0 "here") then swap out the image, name, and role.


## Changing site layout
To change the site layout, you'll first want to know how to code. Depending on the size of the change, this could be knowledge of basic HTML all the way up to working with Node.js and handlebars templates.

If you are confident in your ability to do this, you'll want to contact me so I can get you set up with everything.
