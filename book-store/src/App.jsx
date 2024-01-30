import Home from './components/Home'
import Form from './components/Form'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

export default function App() {
  return (
    // BrowserRouter for initiating and linking of pages
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Form" element={<Form />} />
    </Routes>
  </BrowserRouter>
  )
}
