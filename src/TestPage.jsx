import { useEffect } from "react";
import { storage } from "./utils/storage";


const TestPage = () =>  {

//



const update = () => {
  const oldCour = localStorage.getItem("__courseId")
  const oldCategory = localStorage.getItem("__categoryId")
  const oldCh = localStorage.getItem("chapterId")
  const oldlessonId = localStorage.getItem("lessonId")

  if (oldCour || oldCategory || oldCh || oldlessonId) {
    storage.save("cousjvqpkbr3m", oldCour)
    localStorage.removeItem("__courseId")

    storage.save("cahrst1x7teq", oldCategory)
    localStorage.removeItem("__categoryId")

    storage.save("chapky89wsgnae", oldCh)
    localStorage.removeItem("chapterId")

    storage.save("leuhqzrsyh5e", oldlessonId)
    localStorage.removeItem("lessonId")

  }


}

useEffect(() => {

  console.log(storage.get("cousjvqpkbr3m"))
  console.log(storage.get("cahrst1x7teq"))
  console.log(storage.get("chapky89wsgnae"))
  console.log(storage.get("leuhqzrsyh5e"))

},[])

  return (
    <div>TestPage</div>
  )
}

;

export default TestPage;
