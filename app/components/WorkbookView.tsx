import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type CompanyInfo = {
  name: string
  ticker: string
  industry: string
  founded: string
}

type NewsItem = {
  title: string
  date: string
}

type UrlLink = {
  title: string
  url: string
}

type WorkbookViewProps = {
  companyInfo: CompanyInfo
  recentNews: NewsItem[]
  urlLinks: UrlLink[]
}

export function WorkbookView({ companyInfo, recentNews, urlLinks }: WorkbookViewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Company Info</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Name:</strong> {companyInfo.name}</p>
            <p><strong>Ticker:</strong> {companyInfo.ticker}</p>
            <p><strong>Industry:</strong> {companyInfo.industry}</p>
            <p><strong>Founded:</strong> {companyInfo.founded}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentNews.map((news, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">{news.title}</p>
                  <p className="text-muted-foreground">{news.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>URL Links</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1">
              {urlLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-center text-muted-foreground">Blank interface for future content</p>
      </div>
    </div>
  )
}

