
import React from 'react';
import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList, FileUp, CheckCircle2, Coins, LogIn, MousePointerClick, HeartHandshake, Eye, UserPlus, ListChecks, DollarSign, Gauge, Link as LinkIconLucide, Send } from 'lucide-react';


interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface UserJourneyProps {
  userType: string;
  steps: Step[];
  bgColorClass?: string;
}

const UserJourney: React.FC<UserJourneyProps> = ({ userType, steps, bgColorClass = 'bg-card' }) => (
  <Card className={`w-full ${bgColorClass} hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 ease-in-out`}>
      <CardHeader>
          <CardTitle className="text-2xl text-center text-primary">{userType}</CardTitle>
      </CardHeader>
      <CardContent className="relative pt-6">
            <div className="relative space-y-8 md:space-y-0 md:flex md:gap-8">
              {steps.map((step, index) => {
                return (
                  <div key={index} className="flex md:flex-col md:items-center md:text-center md:w-1/4 relative">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-4 md:mr-0 md:mb-2">
                      {step.icon}
                    </div>
                    <div className="flex-grow">
                        <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    {index < steps.length - 1 && (
                      <div className="absolute left-6 top-14 h-full w-0.5 bg-border md:hidden"></div>
                    )}
                  </div>
                );
              })}
            <div className="absolute top-1/2 left-0 right-0 hidden md:flex items-center justify-between px-16 transform -translate-y-1/2 -z-10">
              {steps.map((_, index) => {
                return (
                  <React.Fragment key={`arrow-segment-${index}`}>
                      <div className="w-8 h-8 bg-card border rounded-full flex items-center justify-center text-sm">
                          {index + 1}
                      </div>
                    {index < steps.length - 1 && (
                      <div className="flex-grow h-0.5 bg-border mx-2"></div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
      </CardContent>
  </Card>
);

const borrowerSteps: Step[] = [
  { icon: <ClipboardList className="w-5 h-5" />, title: 'Apply Online', description: 'Fill out our simple loan application form with your details and loan requirements.' },
  { icon: <FileUp className="w-5 h-5" />, title: 'Upload Documents', description: 'Securely upload necessary documents like PAN, Aadhar, and income proof.' },
  { icon: <CheckCircle2 className="w-5 h-5" />, title: 'Get Approved', description: 'Our team reviews your application quickly. Get approval status and loan offer.' },
  { icon: <Coins className="w-5 h-5" />, title: 'Receive Funds & Repay', description: 'Receive funds and repay your loan through convenient monthly EMIs.' },
];

const crowdfunderSteps: Step[] = [
  { icon: <LogIn className="w-5 h-5" />, title: 'Sign Up/Log In', description: 'Create an account or log in to access crowdfunding projects.' },
  { icon: <MousePointerClick className="w-5 h-5" />, title: 'Browse & Select', description: 'Browse verified startups and choose a project you want to support.' },
  { icon: <HeartHandshake className="w-5 h-5" />, title: 'Contribute Securely', description: 'Make your contribution through our secure payment gateway.' },
  { icon: <Eye className="w-5 h-5" />, title: 'Track Impact', description: 'Receive updates from the startup and see how your contribution is making a difference.' },
];

const investorSteps: Step[] = [
  { icon: <UserPlus className="w-5 h-5" />, title: 'Register & Verify', description: 'Register as an investor and complete your KYC verification.' },
  { icon: <ListChecks className="w-5 h-5" />, title: 'Explore Deals', description: 'Explore curated investment deals with detailed information and risk ratings.' },
  { icon: <DollarSign className="w-5 h-5" />, title: 'Invest & Grow', description: 'Choose opportunities that align with your goals and invest to grow your portfolio.' },
  { icon: <Gauge className="w-5 h-5" />, title: 'Monitor Portfolio', description: 'Monitor your investments and track returns through your personal dashboard.' },
];

const affiliateSteps: Step[] = [
  { icon: <UserPlus className="w-5 h-5" />, title: 'Sign Up', description: 'Sign up for our affiliate program by providing basic details.' },
  { icon: <LinkIconLucide className="w-5 h-5" />, title: 'Get Your Link', description: 'Receive your unique referral link and access marketing materials.' },
  { icon: <Send className="w-5 h-5" />, title: 'Share & Promote', description: 'Share your link with friends, family, and your audience to invite them to NEX CFS.' },
  { icon: <Coins className="w-5 h-5" />, title: 'Earn Commissions', description: 'Earn commissions for every successful referral that results in a loan or investment.' },
];


export default function HowItWorksPage() {
  return (
    <MainLayout>
      <PageSection
          title="How NEX CFS Works"
          subtitle="Navigating our platform is simple. Here’s a step-by-step guide for each user type to help you get started and make the most of our services."
      >
          <div className="space-y-12">
              <UserJourney userType="For Borrowers" steps={borrowerSteps} bgColorClass="bg-primary/5" />
              <UserJourney userType="For Crowdfunders / Project Supporters" steps={crowdfunderSteps} bgColorClass="bg-secondary/20" />
              <UserJourney userType="For Investors" steps={investorSteps} bgColorClass="bg-primary/5" />
              <UserJourney userType="For Affiliates" steps={affiliateSteps} bgColorClass="bg-secondary/20" />
          </div>
          <PageSection title="Visual Guides" subtitle="Coming Soon" className="mt-12 text-center">
              <p className="text-muted-foreground">Infographics and detailed flowcharts for each user journey will be added here to provide a more visual explanation.</p>
          </PageSection>
      </PageSection>
    </MainLayout>
  );
}
