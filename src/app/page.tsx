
import React from 'react';
import PageSection from '@/components/page-section';
import ServiceCard from '@/components/service-card';
import MainLayout from '@/components/layout/main-layout';
import { Landmark, Users, TrendingUp, Activity, Share2, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: <Landmark className="h-8 w-8" />,
    title: 'Loan Services',
    description: 'Flexible personal, business, and startup loans with competitive rates and quick approvals. Tailored solutions to meet your borrowing needs.',
    link: '/services/loans',
    linkText: 'Explore Loan Options'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Crowdfunding Platform',
    description: 'Support innovative startups or raise funds for your own project. Connect with a community of backers and creators.',
    link: '/services/crowdfunding',
    linkText: 'Discover Crowdfunding'
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Investment Opportunities',
    description: 'Access curated investment deals in verified businesses and startups. Diversify your portfolio and grow your wealth.',
    link: '/services/investments',
    linkText: 'View Investments'
  },
  {
    icon: <Activity className="h-8 w-8" />,
    title: 'Trading & Market Services',
    description: 'Utilize our real-time trading interface, mutual fund SIP tools, and portfolio builder for smart market participation.',
    link: '/services/trading',
    linkText: 'Start Trading'
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: 'Affiliate Program',
    description: 'Join our affiliate network and earn commissions by referring friends, family, and colleagues to our diverse financial services.',
    link: '/services/affiliate',
    linkText: 'Become an Affiliate'
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: 'Ideas-Startup-Business-Empire',
    description: 'Transform your innovative ideas into reality. We provide the support and resources to build your business from the ground up.',
    link: '/services/ideas-to-empire',
    linkText: 'Launch Your Idea'
  },
];

export default function ServicesPage() {
  return (
    <MainLayout>
      <PageSection
        title="Our Financial Services"
        subtitle="NEX CFS offers a comprehensive suite of digital finance solutions designed to empower individuals and businesses. Explore our offerings to find the perfect fit for your financial goals."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
              linkText={service.linkText}
            />
          ))}
        </div>
      </PageSection>
    </MainLayout>
  );
}
