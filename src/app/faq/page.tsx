
"use client"; 

import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Search, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const faqData = {
  loans: [
    { q: "What types of loans do you offer?", a: "We offer Personal Loans, Business Loans, and Startup Loans, each tailored to specific needs." },
    { q: "What is the eligibility criteria for a loan?", a: "General criteria include being an Indian citizen, aged 21-60, with a good credit score and stable income. Specific criteria vary by loan type." },
    { q: "How long does the loan approval process take?", a: "We aim for quick approvals. Typically, it can take anywhere from 24 hours to a few business days, depending on the loan type and document verification." },
    { q: "What are the interest rates?", a: "Our interest rates are competitive and vary based on loan type, amount, tenure, and your credit profile. Detailed rates will be provided upon application." },
  ],
  crowdfunding: [
    { q: "How can I support a startup project?", a: "Logged-in users can browse listed startups and contribute directly. Non-users can make an anonymous contribution to the NEX CFS general pool." },
    { q: "Can I track my contribution?", a: "Yes, if you are a logged-in user and contribute to a specific startup, you can track its progress and how funds are used via your dashboard." },
    { q: "How are startups verified for crowdfunding?", a: "Our team conducts a due diligence process to verify the legitimacy and potential of startups listed on our platform for crowdfunding." },
  ],
  investmentTrading: [
    { q: "What investment opportunities are available?", a: "We offer curated deals in businesses and startups, along with tools for stock trading and mutual fund SIPs." },
    { q: "How is investment risk assessed?", a: "Each opportunity comes with a verified risk rating (Low, Medium, High) based on thorough analysis." },
    { q: "Can I track my investments and ROI?", a: "Yes, investors get access to a personal dashboard with real-time tracking of investments and ROI metrics." },
  ],
  affiliateProgram: [
    { q: "How does the affiliate program work?", a: "Register for the program, get your unique referral link, share it, and earn commissions when your referrals use our loan or investment services." },
    { q: "How are commissions tracked and paid?", a: "Commissions are tracked in real-time on your affiliate dashboard and paid out to your registered bank account periodically." },
    { q: "Is there a limit to how much I can earn?", a: "There's no cap on your potential earnings. The more successful referrals you make, the more you earn." },
  ],
};

const FaqSearch = () => {
  return (
    <form className="mb-8 flex gap-2 max-w-xl mx-auto">
      <Input
        placeholder="Search FAQs..."
        className="flex-grow"
      />
      <Button type="submit">
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  );
};

const userQuestionFormSchema = z.object({
  userQuestion: z.string().min(10, { message: "Question must be at least 10 characters." }),
});
type UserQuestionFormValues = z.infer<typeof userQuestionFormSchema>;

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState(""); 

  const questionForm = useForm<UserQuestionFormValues>({
    resolver: zodResolver(userQuestionFormSchema),
    defaultValues: { userQuestion: "" },
    mode: "onChange",
  });

  function onQuestionSubmit(data: UserQuestionFormValues) {
    toast({
      title: "Question Submitted!",
      description: "Thank you for your question. We'll review it and get back to you if needed or update our FAQs.",
    });
    console.log("User question:", data.userQuestion);
    questionForm.reset();
  }

  const cardBaseClass = "hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 ease-in-out";

  return (
    <MainLayout>
      <PageSection
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our services. If you can't find what you're looking for, please contact us or submit your question below."
      >
        <FaqSearch />

        <Accordion type="single" collapsible className="w-full space-y-6">
          <Card className={cardBaseClass}>
            <AccordionItem value="loans" className="border-b-0">
              <AccordionTrigger className="px-6 py-4 text-xl font-semibold text-primary hover:no-underline rounded-t-lg data-[state=open]:bg-primary/5">
                Loan Services
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-0">
                <Accordion type="single" collapsible className="w-full space-y-1">
                  {faqData.loans.map((item, index) => (
                    <AccordionItem value={`loan-${index}`} key={`loan-${index}`}>
                      <AccordionTrigger className="text-left py-3 text-base hover:underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-3 pl-2">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Card>

          <Card className={cardBaseClass}>
            <AccordionItem value="crowdfunding" className="border-b-0">
              <AccordionTrigger className="px-6 py-4 text-xl font-semibold text-primary hover:no-underline rounded-t-lg data-[state=open]:bg-primary/5">
                Crowdfunding Platform
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-0">
                <Accordion type="single" collapsible className="w-full space-y-1">
                  {faqData.crowdfunding.map((item, index) => (
                    <AccordionItem value={`crowdfunding-${index}`} key={`crowdfunding-${index}`}>
                      <AccordionTrigger className="text-left py-3 text-base hover:underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-3 pl-2">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Card>

          <Card className={cardBaseClass}>
            <AccordionItem value="investmentTrading" className="border-b-0">
              <AccordionTrigger className="px-6 py-4 text-xl font-semibold text-primary hover:no-underline rounded-t-lg data-[state=open]:bg-primary/5">
                Investment & Trading
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-0">
                <Accordion type="single" collapsible className="w-full space-y-1">
                  {faqData.investmentTrading.map((item, index) => (
                    <AccordionItem value={`investmentTrading-${index}`} key={`investmentTrading-${index}`}>
                      <AccordionTrigger className="text-left py-3 text-base hover:underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-3 pl-2">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Card>

          <Card className={cardBaseClass}>
            <AccordionItem value="affiliateProgram" className="border-b-0">
              <AccordionTrigger className="px-6 py-4 text-xl font-semibold text-primary hover:no-underline rounded-t-lg data-[state=open]:bg-primary/5">
                Affiliate Program
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-0">
                <Accordion type="single" collapsible className="w-full space-y-1">
                  {faqData.affiliateProgram.map((item, index) => (
                    <AccordionItem value={`affiliateProgram-${index}`} key={`affiliateProgram-${index}`}>
                      <AccordionTrigger className="text-left py-3 text-base hover:underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-3 pl-2">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Card>
        </Accordion>
      </PageSection>

      <PageSection
        title="Have a Question?"
        subtitle="If you didn't find an answer above, please submit your question here. We'll do our best to address it."
        className="mt-8"
      >
        <Card className="max-w-xl mx-auto shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <CardHeader>
            <CardTitle>Ask Your Question</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...questionForm}>
              <form onSubmit={questionForm.handleSubmit(onQuestionSubmit)} className="space-y-6">
                <FormField
                  control={questionForm.control}
                  name="userQuestion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Question</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your question here..."
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={questionForm.formState.isSubmitting}>
                  {questionForm.formState.isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Submit Question
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </PageSection>
    </MainLayout>
  );
}
