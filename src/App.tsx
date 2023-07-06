import React, { useState, } from 'react'
import { DATA_SCHEMA } from '@/constants'
import Sidebar from './components/Sidebar'
import DBTable from './components/DBTable'

function App() {
  const [activeTable, setActiveTable] = useState<string>('')

  return (
    <div className={'main'}>
      <Sidebar
        active={activeTable}
        onSelect={setActiveTable}
      />

      <div className={'content'}>
        {
          !activeTable
            ? 'Select table'
            : <DBTable type={activeTable as keyof typeof DATA_SCHEMA}/>
        }
      </div>
    </div>
  )
}

export default App
