
"use client";

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Info, TrendingUp, TrendingDown } from 'lucide-react';

const creditScoreFormSchema = z.object({
  panNumber: z.string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "Invalid PAN format. Should be ABCDE1234F." })
    .min(10, { message: "PAN must be 10 characters."})
    .max(10, { message: "PAN must be 10 characters."}),
  mobileNumber: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
});

type CreditScoreFormValues = z.infer<typeof creditScoreFormSchema>;

interface ScoreResult {
  score: number;
  rating: string;
  advice: string;
  icon: React.ReactNode;
}

const CreditScoreChecker: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);

  const form = useForm<CreditScoreFormValues>({
    resolver: zodResolver(creditScoreFormSchema),
    defaultValues: {
      panNumber: "",
      mobileNumber: "",
    },
    mode: "onChange",
  });

  const generateMockScore = (): number => {
    // Generate a score, slightly biased towards "good" scores for demo
    const random = Math.random();
    if (random < 0.05) return Math.floor(Math.random() * (550 - 300 + 1)) + 300; // Very Poor (5%)
    if (random < 0.15) return Math.floor(Math.random() * (650 - 551 + 1)) + 551; // Poor (10%)
    if (random < 0.40) return Math.floor(Math.random() * (750 - 651 + 1)) + 651; // Fair (25%)
    if (random < 0.75) return Math.floor(Math.random() * (800 - 751 + 1)) + 751; // Good (35%)
    return Math.floor(Math.random() * (900 - 801 + 1)) + 801;             // Excellent (25%)
  };

  const getScoreRatingAndAdvice = (score: number): Omit<ScoreResult, 'score'> => {
    if (score >= 800) return { rating: "Excellent", advice: "Your excellent score means you'll likely get the best loan terms. Keep up the great financial habits!", icon: <CheckCircle className="w-6 h-6 text-green-500" /> };
    if (score >= 750) return { rating: "Good", advice: "Your good score should qualify you for competitive loan rates. Maintain timely payments.", icon: <TrendingUp className="w-6 h-6 text-sky-500" /> };
    if (score >= 650) return { rating: "Fair", advice: "Your score is fair. You may get loan approvals, but rates might be higher. Focus on improving your credit.", icon: <Info className="w-6 h-6 text-yellow-500" /> };
    if (score >= 550) return { rating: "Poor", advice: "Your score is poor. It might be challenging to get loans. Work on building a positive credit history.", icon: <TrendingDown className="w-6 h-6 text-orange-500" /> };
    return { rating: "Very Poor", advice: "Your score needs significant improvement. Consider credit counseling to understand steps to improve.", icon: <TrendingDown className="w-6 h-6 text-red-500" /> };
  };

  const onSubmit = async (data: CreditScoreFormValues) => {
    setIsLoading(true);
    setScoreResult(null);
    console.log("Checking score for:", data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockScore = generateMockScore();
    const { rating, advice, icon } = getScoreRatingAndAdvice(mockScore);
    
    setScoreResult({ score: mockScore, rating, advice, icon });
    setIsLoading(false);

    toast({
      title: "Credit Score Checked!",
      description: `Your simulated credit score is ${mockScore}.`,
    });
  };

  return (
    <Card className="shadow-xl w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Check Your Credit Score</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Enter your PAN and Mobile Number to get a simulated credit score. This is for illustrative purposes only.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="panNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="ABCDE1234F" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="9876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Checking..." : "Check Credit Score"}
            </Button>
          </form>
        </Form>

        {scoreResult && !isLoading && (
          <Card className="mt-6 bg-muted/30 animate-in fade-in zoom-in-95 duration-500">
            <CardHeader className="items-center text-center">
                {scoreResult.icon}
              <CardTitle className="text-4xl font-bold text-primary">{scoreResult.score}</CardTitle>
              <CardDescription className="text-lg font-semibold">{scoreResult.rating}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">{scoreResult.advice}</p>
            </CardContent>
          </Card>
        )}
         {isLoading && (
          <div className="mt-6 text-center py-8">
            <div role="status" className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-2 text-muted-foreground">Fetching your score...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditScoreChecker;
