import { BrowserRouter, Route, Routes } from "react-router";
import Home from './pages/Home'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App