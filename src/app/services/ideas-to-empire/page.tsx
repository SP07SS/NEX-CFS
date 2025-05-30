
import React from 'react';
import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Lightbulb, DraftingCompass, Coins, TrendingUp, Globe, Users, BookOpen, Network, Rocket } from 'lucide-react';

const journeySteps = [
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: "Ideation & Validation",
    description: "Refine your groundbreaking idea with our experts. We help you validate your concept and identify your target market for a strong foundation.",
    imageHint: "brainstorming session",
  },
  {
    icon: <DraftingCompass className="w-8 h-8 text-primary" />,
    title: "Prototyping & MVP",
    description: "Transform your validated idea into a tangible Minimum Viable Product (MVP). Our resources assist in design, development, and initial testing.",
    imageHint: "product design",
  },
  {
    icon: <Coins className="w-8 h-8 text-primary" />,
    title: "Seed Funding & Incubation",
    description: "Secure the crucial seed funding to kickstart your operations. Our incubation program provides the initial capital and support structure.",
    imageHint: "investment growth",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: "Growth & Mentorship",
    description: "Scale your startup with strategic guidance. Access our network of experienced mentors for insights on market penetration and operational excellence.",
    imageHint: "business strategy",
  },
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "Market Expansion & Empire Building",
    description: "Explore new markets and expand your reach. We support your journey towards building a sustainable and impactful business empire.",
    imageHint: "global business",
  },
];

const offerings = [
  {
    icon: <Users className="w-7 h-7 text-primary" />,
    title: "Expert Mentorship",
    description: "Connect with seasoned entrepreneurs and industry leaders who provide invaluable guidance and support.",
  },
  {
    icon: <Coins className="w-7 h-7 text-primary" />,
    title: "Funding Opportunities",
    description: "Access seed funding, angel investor networks, and venture capital connections to fuel your startup's growth.",
  },
  {
    icon: <BookOpen className="w-7 h-7 text-primary" />,
    title: "Essential Resources",
    description: "Leverage our suite of tools, templates, legal advice, and co-working space options (coming soon).",
  },
  {
    icon: <Network className="w-7 h-7 text-primary" />,
    title: "Networking & Community",
    description: "Become part of a vibrant community of innovators, collaborators, and potential partners.",
  },
];

const cardBaseClass = "shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 ease-in-out";

export default function IdeasToEmpirePage() {
  return (
    <MainLayout>
      <PageSection
        title="Ideas to Startup to Business Empire"
        subtitle="NEX CFS is your partner in transforming visionary ideas into thriving businesses. We provide the ecosystem, resources, and funding to launch and scale your venture from concept to market leadership."
        className="bg-gradient-to-br from-background to-muted/30"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-semibold text-primary mb-4">Your Vision, Our Mission</h3>
            <p className="text-muted-foreground mb-3">
              Every successful empire begins with a single, powerful idea. At NEX CFS, we understand the journey of an entrepreneur – the challenges, the triumphs, and the relentless pursuit of innovation. Our "Ideas-Startup-Business-Empire" program is meticulously designed to nurture your vision at every stage.
            </p>
            <p className="text-muted-foreground">
              We offer more than just funding; we provide a holistic ecosystem. From validating your concept and building your MVP to securing investment and scaling your operations, we're with you every step of the way. Let's build the future, together.
            </p>
            <Button size="lg" asChild className="mt-6">
              <Link href="/contact">Share Your Idea</Link>
            </Button>
          </div>
          <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Conceptual image of idea turning into a business"
              fill
              style={{ objectFit: "cover" }}
              data-ai-hint="abstract innovation"
            />
          </div>
        </div>
      </PageSection>

      <PageSection title="The Journey: From Spark to Scale" className="bg-card">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journeySteps.map((step) => (
            <Card key={step.title} className={`${cardBaseClass} flex flex-col`}>
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3 inline-block">
                  {step.icon}
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </CardContent>
              <CardContent className="pt-0 mt-auto">
                 <div className="w-full h-40 relative rounded-md overflow-hidden mt-4">
                    <Image src={`https://placehold.co/400x200.png`} alt={step.title} fill style={{objectFit: "cover"}} data-ai-hint={step.imageHint} />
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection title="What NEX CFS Offers Entrepreneurs">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerings.map((offering) => (
            <Card key={offering.title} className={`${cardBaseClass} text-center p-6`}>
              <div className="flex justify-center mb-4">
                {offering.icon}
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">{offering.title}</h4>
              <p className="text-sm text-muted-foreground">{offering.description}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection title="Success Stories" subtitle="Inspiring journeys of entrepreneurs we've empowered." className="bg-muted/50">
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className={cardBaseClass}>
              <div className="w-full h-48 relative">
                <Image src={`https://placehold.co/400x250.png`} alt={`Success Story ${i}`} fill style={{objectFit: "cover"}} data-ai-hint="startup success" />
              </div>
              <CardContent className="p-4">
                <h4 className="font-semibold text-foreground mb-1">Startup Name {i}</h4>
                <p className="text-xs text-primary mb-2">Sector: Tech / E-commerce / Health</p>
                <p className="text-sm text-muted-foreground">A brief placeholder for a success story highlighting their achievements with NEX CFS support...</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
            <p className="text-muted-foreground">More success stories coming soon!</p>
        </div>
      </PageSection>

      <PageSection title="Ready to Build Your Empire?" className="text-center">
        <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Have an idea that could change the world, or at least your industry? Don't let it stay just an idea. NEX CFS is looking for passionate founders like you.
        </p>
        <Button size="lg" asChild className="px-10 py-6 text-lg">
          <Link href="/contact?subject=IdeaSubmission">Submit Your Idea for Review</Link>
        </Button>
      </PageSection>
    </MainLayout>
  );
}
