import { Route, Routes } from "react-router-dom";
import Todo from "./page/Todo";
import Login from "./page/Login";


function App() {
 

  return (
  
   <>
   
     <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/register" element={<Login />} />


       
      </Routes>
   
   
   </>
  );
}

export default App;
