'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ImportIcon as FileImport, BotIcon as Robot, Map, PackageIcon as PipelineIcon, Settings, User, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const menuItems = [
  { name: 'Import', icon: FileImport, href: '/import' },
  { name: 'Nexum Agents', icon: Robot, href: '/agents' },
  { name: 'Market Mapping', icon: Map, href: '/market-mapping' },
  { name: 'Pipelines', icon: PipelineIcon, href: '/pipelines' },
  { name: 'Settings', icon: Settings, href: '/settings' },
]

export function Sidebar({
  workbooks = [],
  isExpanded,
  onToggle
}: {
  workbooks: Array<{ name: string; slug: string }>,
  isExpanded: boolean,
  onToggle: () => void
}) {
  const pathname = usePathname()

  return (
    <div className={`flex flex-col bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-fg))] transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}>
      <div className="p-4 flex justify-between items-center">
        {isExpanded && <h1 className="text-2xl font-bold">Nexum Finance</h1>}
        <Button variant="ghost" size="icon" onClick={onToggle}>
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                className={`flex items-center px-4 py-2 mt-2 text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--sidebar-bg)_/_0.8)] hover:text-[hsl(var(--sidebar-fg)_/_0.8)] transition-colors ${
                  pathname === item.href 
                    ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold shadow-md' 
                    : ''
                }`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {isExpanded && <span>{item.name}</span>}
              </Link>
              {isExpanded && item.name === 'Nexum Agents' && workbooks && workbooks.length > 0 && (
                <ul className="ml-6 mt-2">
                  {workbooks.map((workbook) => (
                    <li key={workbook.slug}>
                      <Link 
                        href={`/agents/${workbook.slug}`}
                        className={`flex items-center px-4 py-2 text-sm text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--sidebar-bg)_/_0.8)] hover:text-[hsl(var(--sidebar-fg)_/_0.8)] transition-colors ${
                          pathname === `/agents/${workbook.slug}`
                            ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-semibold shadow-md' 
                            : ''
                        }`}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        {workbook.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {isExpanded && (
        <div className="p-4">
          <button className="flex items-center mt-2 text-[hsl(var(--sidebar-fg)_/_0.7)] hover:text-[hsl(var(--sidebar-fg))]">
            <User className="w-5 h-5 mr-2" />
            User Profile
          </button>
        </div>
      )}
    </div>
  )
}

