import { useState } from 'react'
import './App.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Header } from './components/Header';
import { VistaCrud } from './views/VistaCrud';
import { DashboardProvider } from './context/DashboardContext';

function App() {

  return (
    <>
      <DashboardProvider>
        <div>
          <Header />
          <VistaCrud />
        </div>
      </DashboardProvider>
    </>
  )
}

export default App
