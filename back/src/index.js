const app = require("./app");
const port = 3000


async function main(){
  
  await app.listen(port);
  console.log(`app listening on port ${port}`);

}

main();