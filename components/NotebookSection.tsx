'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Search, BarChart2, Lightbulb, Globe, Zap } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type NotebookEntry = {
  id: string;
  command: string;
  option: string;
  content: string;
  isLoading: boolean;
  showDetails: boolean;
  showSources: boolean;
}

const options = [
  { value: 'auto', label: 'Auto', icon: Zap },
  { value: 'retrieval', label: 'Retrieval', icon: Search },
  { value: 'analysis', label: 'Analysis', icon: BarChart2 },
  { value: 'scenario', label: 'Scenario', icon: Lightbulb },
  { value: 'web', label: 'Web Research', icon: Globe },
]

const LoadingBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
    <div
      className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
)

const LoadingAnimation = () => {
  const steps = [
    'Retrieving data',
    'Analyzing information',
    'Generating insights',
    'Finalizing response'
  ];
  const [progress, setProgress] = useState(steps.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = [...prevProgress];
        const incompleteSteps = newProgress.findIndex(p => p < 100);
        if (incompleteSteps !== -1) {
          newProgress[incompleteSteps] = Math.min(100, newProgress[incompleteSteps] + 25);
        }
        return newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">{step}</span>
            <span className="text-muted-foreground">{progress[index]}%</span>
          </div>
          <LoadingBar progress={progress[index]} />
        </div>
      ))}
    </div>
  );
};

export function NotebookSection() {
  const [entries, setEntries] = useState<NotebookEntry[]>([])
  const [command, setCommand] = useState('')
  const [selectedOption, setSelectedOption] = useState(options[0].value)
  const [isContextOpen, setIsContextOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [entries])

  const handleInputChange = (value: string) => {
    setCommand(value)
    if (value.endsWith('@')) {
      setIsContextOpen(true)
    } else {
      setIsContextOpen(false)
    }
  }

  const handleContextSelect = (entryId: string) => {
    const selectedEntry = entries.find(entry => entry.id === entryId)
    if (selectedEntry) {
      setCommand(prev => prev.replace(/@$/, `@${selectedEntry.id} `))
    }
    setIsContextOpen(false)
  }

  const addEntry = async () => {
    if (command) {
      const newEntry: NotebookEntry = {
        id: Date.now().toString(),
        command,
        option: selectedOption,
        content: '',
        isLoading: true,
        showDetails: false,
        showSources: false,
      }
      setEntries([...entries, newEntry])
      setCommand('')

      try {
        console.log('Sending API request:', { command, type: selectedOption, entryId: newEntry.id });
        const response = await fetchFromAPI(command, selectedOption, newEntry.id);
        console.log('Received API response:', response);
        setEntries(currentEntries =>
          currentEntries.map(entry =>
            entry.id === newEntry.id
              ? { ...entry, isLoading: false, content: response.content }
              : entry
          )
        );
      } catch (error) {
        console.error('Command execution failed:', error);
        setEntries(currentEntries =>
          currentEntries.map(entry =>
            entry.id === newEntry.id
              ? { ...entry, isLoading: false, content: 'Error: Command execution failed' }
              : entry
          )
        );
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isContextOpen) {
      addEntry()
    }
  }

  const toggleDetails = (id: string) => {
    setEntries(currentEntries =>
      currentEntries.map(entry =>
        entry.id === id ? { ...entry, showDetails: !entry.showDetails } : entry
      )
    )
  }

  const toggleSources = (id: string) => {
    setEntries(currentEntries =>
      currentEntries.map(entry =>
        entry.id === id ? { ...entry, showSources: !entry.showSources } : entry
      )
    )
  }

  const OptionIcon = ({ option }: { option: string }) => {
    const selectedOption = options.find(opt => opt.value === option)
    if (selectedOption && selectedOption.value !== 'auto') {
      const Icon = selectedOption.icon
      return <Icon className="w-5 h-5 text-primary" />
    }
    return null
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id} className="border-l-4 border-l-primary">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-base font-medium text-primary">{entry.command}</CardTitle>
            <OptionIcon option={entry.option} />
          </CardHeader>
          <div className="mx-6 border-t border-border" />
          <CardContent className="pt-0 px-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleDetails(entry.id)}
              className="mx-6 mt-2 mb-3 p-0 h-auto font-normal text-muted-foreground hover:text-foreground"
            >
              {entry.showDetails ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Hide Reasoning
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show Reasoning
                </>
              )}
            </Button>
            {entry.showDetails && (
              <div className="mx-6 mb-3 text-xs text-muted-foreground">
                <p>Reasoning: {entry.option}</p>
              </div>
            )}
            {entry.isLoading ? (
              <LoadingAnimation />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm text-foreground">
                  <h4 className="font-medium mb-2">Response:</h4>
                  <div className="whitespace-pre-wrap">
                    {entry.content}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSources(entry.id)}
                    className="mt-2 p-0 h-auto font-normal text-muted-foreground hover:text-foreground"
                  >
                    {entry.showSources ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-1" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-1" />
                        Show Details
                      </>
                    )}
                  </Button>
                  {entry.showSources && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <p><strong>Type:</strong> {entry.option}</p>
                      <p><strong>Entry ID:</strong> {entry.id}</p>
                      <p><strong>Command:</strong> {entry.command}</p>
                    </div>
                  )}
                </div>
                <div className="bg-muted rounded-md p-4">
                  <pre className="text-sm text-muted-foreground overflow-auto">
                    {JSON.stringify(entry, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-2">
          <div className="flex items-center space-x-2">
            <Select value={selectedOption} onValueChange={setSelectedOption}>
              <SelectTrigger className="w-[140px] bg-transparent border-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <option.icon className="w-4 h-4 mr-2" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative flex-grow">
              <Input
                ref={inputRef}
                placeholder="Enter a command..."
                value={command}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none focus-visible:ring-0 text-sm pl-0"
              />
              {isContextOpen && (
                <Popover open={isContextOpen} onOpenChange={setIsContextOpen}>
                  <PopoverTrigger asChild>
                    <div className="absolute inset-0 opacity-0" />
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search previous entries..." />
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                          {entries.map((entry) => (
                            <CommandItem
                              key={entry.id}
                              onSelect={() => handleContextSelect(entry.id)}
                            >
                              {entry.command}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { fetchFromAPI } from '@/lib/api';