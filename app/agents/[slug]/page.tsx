'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NotebookSection } from "@/components/NotebookSection"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function WorkbookPage({ params }: { params: { slug: string } }) {
  const [showCards, setShowCards] = useState(true)

  const ToggleButton = ({ isVisible, setIsVisible }: { isVisible: boolean, setIsVisible: (value: boolean) => void }) => (
    <Button variant="outline" size="sm" onClick={() => setIsVisible(!isVisible)}>
      {isVisible ? 'Hide Cards' : 'Show Cards'}
      {isVisible ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
    </Button>
  )

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Workbook: {params.slug.toUpperCase()}</h2>
        <ToggleButton isVisible={showCards} setIsVisible={setShowCards} />
      </div>
      
      {showCards && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-primary">Recent News</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Company announces new product line</li>
                <li>Quarterly earnings exceed expectations</li>
                <li>Strategic partnership formed with tech giant</li>
                <li>Expansion into emerging markets</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-primary">Market Movements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-500" /> Stock price up 2.5%
                </li>
                <li className="flex items-center">
                  <TrendingDown className="w-4 h-4 mr-2 text-red-500" /> Industry index down 0.8%
                </li>
                <li className="flex items-center">
                  <Minus className="w-4 h-4 mr-2 text-yellow-500" /> Market volatility stable
                </li>
                <li className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-500" /> Trading volume increased 15%
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="bg-background rounded-lg shadow-sm">
        <NotebookSection />
      </div>
    </div>
  )
}

