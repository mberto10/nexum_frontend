
'use client'

import React, { useState, useCallback } from 'react'
import { Sidebar } from './components/Sidebar'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [workbooks, setWorkbooks] = useState<Array<{ name: string; slug: string }>>([])
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  const addWorkbook = useCallback((name: string, slug: string) => {
    console.log('addWorkbook called with:', name, slug);
    setWorkbooks(prev => {
      const newWorkbooks = [...prev, { name, slug }];
      console.log('Updated workbooks:', newWorkbooks);
      return newWorkbooks;
    });
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarExpanded(prev => !prev);
  }, []);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar workbooks={workbooks} isExpanded={isSidebarExpanded} onToggle={toggleSidebar} />
      <main className="flex-1 overflow-auto">
        {React.Children.map(children, child =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, { addWorkbook })
            : child
        )}
      </main>
    </div>
  )
}
