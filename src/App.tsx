import { useState } from "react"
import { Admin } from "./components/Admin"
import type { View } from "./models"
import { Mod } from "./components/Mod";

function App() {
  const [view, setView] = useState<View>("user");

  return (
    <>
      <h1 className="text-center">Phones</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 mb-5">
            <button onClick={() => setView("admin")} className="btn btn-primary">Admin</button>
            <button onClick={() => setView("mod")} className="btn btn-primary">Mod</button>
            <button onClick={() => setView("user")} className="btn btn-primary">User</button>
          </div>

          <div className="col-sm-12">
            {view == "admin" && (<Admin></Admin>)}
            {view == "mod" && (<Mod></Mod>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
