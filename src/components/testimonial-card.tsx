
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarSrc?: string;
  avatarFallback: string;
  imageSrc?: string;
  imageAlt?: string;
  imageHint?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  name,
  role,
  avatarSrc,
  avatarFallback,
  imageSrc,
  imageAlt = "Testimonial related image",
  imageHint
}) => {
  return (
    <Card className="shadow-lg hover:shadow-2xl hover:scale-[1.05] hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden bg-card text-card-foreground">
      {imageSrc && (
         <div className="w-full h-48 relative">
            <Image src={imageSrc} alt={imageAlt} fill style={{objectFit:"cover"}} data-ai-hint={imageHint} />
         </div>
      )}
      <CardContent className="p-6">
        <blockquote className="italic text-muted-foreground mb-4">"{quote}"</blockquote>
      </CardContent>
      <CardFooter className="flex items-center gap-4 bg-background/50 p-4">
        <Avatar>
          {avatarSrc && <AvatarImage src={avatarSrc} alt={name} />}
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCard;
