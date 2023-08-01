import { Route, Routes } from "react-router-dom"
import TaskPage from "./pages/TaskPage"
import NewTaskPage from "./pages/NewTaskPage"
import SingleTaskPage from "./pages/SingleTaskPage"
import NotFound from "./pages/NotFound"
import CompletedTasks from "./pages/CompletedTasks"
import Signup from "./pages/Signup"
import SigninPage from "./pages/SigninPage"
import Header from "./components/Header"
import Footer from "./components/Footer"

const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<TaskPage/>} />
      <Route path='/sign-up' element={<Signup/>} />
      <Route path='/sign-in' element={<SigninPage/>} />
      <Route path='/task/:id' element={<SingleTaskPage/>} />
      <Route path='/tasks/done' element={<CompletedTasks/>} />
      <Route path='/create-task' element={<NewTaskPage/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App