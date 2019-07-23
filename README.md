# MERN-Stack-Example
Basic Posts app using the MERN stack. Part of my ongoing self-tutorials in website/web app development.

Basic fully CRUD enabled app using the MERN stack (authentication TBD):

    MongoDB Atlas
    Mongoose ODM for MongoDB modeling
    Node.js JavaScript runtime
    Express web framework for Node.js
    React JS library for UI dev.

Other Node and React packages I've used to teach myself with this, my skills with them still pretty incomplete:

    nodemon
    concurrently
    axios (alternative to Fetch API)
    react router (and DOM bindings)
    bootstrap 4 (not ReactStrap which would have been much better).

This does not have any state management at this time. It's not yet needed but Redux is probably what I'll use since I've learned at least the design pattern for Redux so far. But not yet how to wire it into React and intelligently design a complex state tree for a large app.

LS

add-auth branch: adds authentication via JWT tokens, stored in local storage. Protected routes are added via React Router now as well.
