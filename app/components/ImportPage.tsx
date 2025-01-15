'use client'

import { useState } from 'react'
import { Search, Loader } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function ImportPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [importedCompanies, setImportedCompanies] = useState([
    { name: 'Apple Inc.', ticker: 'AAPL', lastUpdated: '2023-06-10' },
    { name: 'Microsoft Corporation', ticker: 'MSFT', lastUpdated: '2023-06-09' },
    { name: 'Amazon.com Inc.', ticker: 'AMZN', lastUpdated: '2023-06-08' },
  ])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const searchTerm = (e.target as HTMLFormElement).querySelector('input')?.value
    if (!searchTerm) return

    setIsLoading(true)
    try {
      const response = await fetchFromAPI('/api/search', {
        method: 'POST',
        body: JSON.stringify({ query: searchTerm })
      });
      
      setImportedCompanies(response.companies);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <Input 
          type="text" 
          placeholder="Search for a company..." 
          className="flex-grow"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Indexing...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search
            </>
          )}
        </Button>
      </form>
      <div className="bg-card shadow rounded-lg border border-border">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Ticker</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {importedCompanies.map((company, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-background' : 'bg-muted'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{company.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{company.ticker}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{company.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

