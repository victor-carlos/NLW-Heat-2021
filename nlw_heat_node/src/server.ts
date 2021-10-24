import { serverHttp } from "./app"

serverHttp.listen(4000, () => {
  console.log("I'm alive on 4000!")
})