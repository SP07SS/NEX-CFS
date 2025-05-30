
import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link, linkText = "Learn More" }) => {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-2xl hover:scale-[1.05] hover:-translate-y-1 transition-all duration-300 ease-in-out bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="text-primary bg-primary/10 p-3 rounded-full">
          {icon}
        </div>
        <CardTitle className="text-xl text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base text-muted-foreground">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full group border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <Link href={link}>
            {linkText}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
