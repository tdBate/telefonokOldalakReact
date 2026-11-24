import { useState } from "react"
import { Admin } from "./components/Admin"
import type { View } from "./models"
import { Mod } from "./components/Mod";
import { User } from "./components/User";

function App() {
  const [view, setView] = useState<View>("user");

  return (
    <>
      <h1 className="text-center">Phones</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 mb-5">
            <button onClick={() => setView("admin")} className={view == "admin" ? "btn btn-success" : "btn btn-primary"}>Admin</button>
            <button onClick={() => setView("mod")} className={view == "mod" ? "btn btn-success" : "btn btn-primary"}>Mod</button>
            <button onClick={() => setView("user")} className={view == "user" ? "btn btn-success" : "btn btn-primary"}>User</button>
          </div>

          <div className="col-sm-12">
            {view == "admin" && (<Admin></Admin>)}
            {view == "mod" && (<Mod></Mod>)}
            {view == "user" && (<User></User>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
