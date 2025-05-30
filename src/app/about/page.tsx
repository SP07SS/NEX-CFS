
import React from 'react';
import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, Gem, Users, Zap, CheckSquare } from 'lucide-react';
import Image from 'next/image';

interface ValueItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  { icon: <Target className="w-8 h-8 text-primary" />, title: 'Transparency', description: 'We operate with utmost clarity in all our processes and communications. No hidden fees, no surprises – just straightforward financial solutions.' },
  { icon: <Eye className="w-8 h-8 text-primary" />, title: 'Security', description: 'Your data and investments are protected with state-of-the-art security measures. We prioritize your financial safety and privacy.' },
  { icon: <Zap className="w-8 h-8 text-primary" />, title: 'Empowerment', description: 'We aim to empower individuals and businesses by providing accessible financial tools and opportunities for growth and success.' },
  { icon: <Users className="w-8 h-8 text-primary" />, title: 'User-Centric', description: 'Our users are at the heart of everything we do. We strive to deliver exceptional service and tailored solutions to meet your unique needs.' },
  { icon: <Gem className="w-8 h-8 text-primary" />, title: 'Innovation', description: 'We continuously innovate to bring you cutting-edge financial products and a seamless digital experience.' },
  { icon: <CheckSquare className="w-8 h-8 text-primary" />, title: 'Integrity', description: 'We uphold the highest ethical standards, ensuring trust and reliability in all our interactions and services.' },
];

export default function AboutUsPage() {
  const cardBaseClass = "shadow-md hover:shadow-xl hover:scale-[1.05] hover:-translate-y-1 transition-all duration-300 ease-in-out";
  return (
    <MainLayout>
      <PageSection
        title="About NEX CFS"
        subtitle="Democratizing finance, empowering dreams. Learn about our journey, mission, and the values that drive us to build a better financial future for everyone."
      >
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src="https://placehold.co/600x400.png"
              alt="NEX CFS Team discussing financial future"
              fill 
              style={{objectFit: "cover"}} 
              className="rounded-lg shadow-lg"
              data-ai-hint="team collaboration"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-primary">Our Founding Story</h3>
            <p className="text-muted-foreground">
              NEX CFS was founded with a simple yet powerful idea: to make financial services more accessible, transparent, and user-friendly for everyone. We saw the challenges individuals and businesses faced in navigating traditional financial systems and envisioned a platform that could bridge these gaps. Leveraging technology and a passion for innovation, NEX CFS was born to empower every business idea with funding and every individual with the tools to achieve financial well-being.
            </p>
            <p className="text-muted-foreground">
              Since our inception, we've been committed to building a comprehensive digital finance hub that caters to diverse needs – from loans and investments to crowdfunding and affiliate partnerships. Our journey is one of continuous growth, driven by our core values and the success of our users.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection title="Our Guiding Principles" className="bg-primary/5">
        <div className="grid md:grid-cols-2 gap-8">
            <Card className={cardBaseClass}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Target className="w-7 h-7" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To democratize finance for everyone by providing accessible, transparent, and innovative digital financial solutions that empower individuals and businesses to achieve their goals.</p>
              </CardContent>
            </Card>
            <Card className={cardBaseClass}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Eye className="w-7 h-7" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">To be the leading digital finance platform that empowers every business idea with funding and every individual with the opportunity for financial growth and security.</p>
              </CardContent>
            </Card>
        </div>
      </PageSection>

      <PageSection title="Core Values">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <Card key={value.title} className={`text-center shadow-lg hover:shadow-2xl hover:scale-[1.05] hover:-translate-y-1 transition-all duration-300 ease-in-out p-6`}>
                <div className="flex justify-center mb-4">
                    {value.icon}
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>
      </PageSection>
      
      <PageSection title="Milestones & Recognition" subtitle="Our journey of growth and impact." className="bg-muted">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">This section will highlight key achievements, awards, and media features as NEX CFS grows.</p>
            <div className="mt-6 flex justify-center">
                <Image 
                    src="https://placehold.co/700x300.png" 
                    alt="Timeline or Awards Graphic Placeholder" 
                    width={700} 
                    height={300} 
                    className="rounded-md"
                    data-ai-hint="award infographic"
                />
            </div>
          </CardContent>
        </Card>
      </PageSection>
    </MainLayout>
  );
}
