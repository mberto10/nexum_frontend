'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const indexedCompanies = [
  { name: 'Apple Inc.', ticker: 'AAPL' },
  { name: 'Microsoft Corporation', ticker: 'MSFT' },
  { name: 'Amazon.com Inc.', ticker: 'AMZN' },
  { name: 'Alphabet Inc.', ticker: 'GOOGL' },
  { name: 'Meta Platforms Inc.', ticker: 'META' },
]

export function NexumAgentsPage({ addWorkbook }: { addWorkbook: (name: string, slug: string) => void }) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const router = useRouter()

  const handleCreateWorkbook = () => {
    if (selectedCompany) {
      const company = indexedCompanies.find(c => c.ticker === selectedCompany)
      if (company) {
        const slug = company.ticker.toLowerCase();
        addWorkbook(company.name, slug);
        router.push(`/agents/${slug}`);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Nexum Agents</h2>
      <div className="flex items-end space-x-4">
        <div className="flex-grow">
          <label htmlFor="company-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select a company
          </label>
          <Select onValueChange={setSelectedCompany} value={selectedCompany || undefined}>
            <SelectTrigger id="company-select" className="w-full">
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent>
              {indexedCompanies.map((company) => (
                <SelectItem key={company.ticker} value={company.ticker}>
                  {company.name} ({company.ticker})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleCreateWorkbook} disabled={!selectedCompany}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Workbook
        </Button>
      </div>
      {selectedCompany && (
        <p className="text-sm text-muted-foreground">
          Click "Create Workbook" to generate a workbook for the selected company.
        </p>
      )}
    </div>
  )
}