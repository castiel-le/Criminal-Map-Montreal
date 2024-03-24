/**
 * Give server a specific port to listen
 * @author Castiel Le & Nael Louis
 */

const app = require("./app")

/** 
* Make the server listen on port 3001
*/
app.listen(process.env.PORT || 3001, () => {
  console.log("Server listening on port 3001")
})