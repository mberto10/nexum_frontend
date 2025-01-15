import Link from 'next/link'
import { Sidebar } from '../../components/Sidebar'

export default function NotFound() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">Workbook Not Found</h2>
        <p className="mb-4">Sorry, the requested workbook could not be found.</p>
        <Link href="/agents" className="text-blue-500 hover:underline">
          Return to Nexum Agents
        </Link>
      </main>
    </>
  )
}

