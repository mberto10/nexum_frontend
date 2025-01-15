
'use client'

import { NexumAgentsPage } from '../components/NexumAgentsPage'

export default function Agents() {
  const addWorkbook = (name: string, slug: string) => {
    // Implement workbook addition logic here
    console.log('Adding workbook:', name, slug)
  }

  return (
    <div className="p-8">
      <NexumAgentsPage addWorkbook={addWorkbook} />
    </div>
  )
}
