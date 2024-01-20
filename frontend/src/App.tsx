import { useState } from 'react'
import reactLogo from "./react.svg"
import viteLogo from "./vite.svg"
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>} />
        {/*<Route path="/search" element={<Search Page />} />*/}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
