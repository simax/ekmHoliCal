rem supervisor -w Server server.js

coffee --compile --watch .&
nodemon server.js
