
import React from 'react';
import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Rss, Megaphone } from 'lucide-react';
import Image from 'next/image';

export default function BlogPage() {
  const featuredArticles = [
    { title: "Top 5 Investment Tips for Beginners", category: "Investment Tips", imageHint: "financial planning" },
    { title: "Startup Success: How We Funded Our Dream", category: "Startup Success Stories", imageHint: "team success" },
    { title: "Understanding Loan EMIs: A Simple Guide", category: "Loan Advice", imageHint: "calculator money" },
  ];

  const adSlots = [
    { id: "leaderboard", width: 728, height: 90, title: "Sponsored Content", description: "Your ad banner here (728x90).", imageHint: "advertisement banner" },
    { id: "medium-rectangle", width: 300, height: 250, title: "Promoted Product", description: "Your ad here (300x250).", imageHint: "product advertisement" },
    { id: "small-square", width: 200, height: 200, title: "Special Offer", description: "Ad slot (200x200).", imageHint: "special offer" },
  ];

  return (
    <MainLayout>
      <PageSection
        title="NEX CFS Blog"
        subtitle="Stay informed with our latest articles on investment, finance, startup stories, and market news. Empowering you with knowledge for financial success."
      >
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="flex flex-row items-center gap-3">
            <Rss className="w-6 h-6 text-primary" />
            <CardTitle>Our Insights</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Our blog section is coming soon! We'll be sharing valuable insights, tips, and stories to help you navigate the world of finance.
            </p>
            <h3 className="text-xl font-semibold text-foreground mb-4">Featured Article Snippets (Coming Soon)</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {featuredArticles.map(article => (
                <Card key={article.title} className="overflow-hidden shadow-lg hover:shadow-xl hover:scale-[1.05] hover:-translate-y-1 transition-all duration-300 ease-in-out">
                  <Image src={`https://placehold.co/400x200.png`} data-ai-hint={article.imageHint} alt={article.title} width={400} height={200} className="w-full h-48 object-cover"/>
                  <CardContent className="p-4">
                    <p className="text-xs text-primary font-semibold mb-1">{article.category.toUpperCase()}</p>
                    <h4 className="font-semibold text-foreground mb-2">{article.title}</h4>
                    <p className="text-sm text-muted-foreground">A brief summary of the article will appear here...</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Features like search bar, tags, author info, and more categories will be available.
            </p>
          </CardContent>
        </Card>
      </PageSection>

      <PageSection
        title="Advertisements"
        subtitle="Sponsored content and special offers from our partners."
        className="bg-muted/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">
          {adSlots.map(ad => (
            <Card key={ad.id} className="w-full shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 ease-in-out">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm text-primary">
                  <Megaphone size={16}/>
                  {ad.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Image 
                  src={`https://placehold.co/${ad.width}x${ad.height}.png`} 
                  alt={ad.description} 
                  width={ad.width} 
                  height={ad.height} 
                  className="rounded-md mb-2 max-w-full h-auto"
                  data-ai-hint={ad.imageHint}
                />
                <CardDescription className="text-xs">{ad.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
         <p className="text-center text-xs text-muted-foreground mt-8">
            Note: These are placeholder ad slots for demonstration purposes.
          </p>
      </PageSection>
    </MainLayout>
  );
}
