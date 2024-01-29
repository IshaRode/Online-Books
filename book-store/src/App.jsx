import Home from './components/Home'
import Form from './components/Form'
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Form" element={<Form />} />
    </Routes>
  </BrowserRouter>
  )
}
