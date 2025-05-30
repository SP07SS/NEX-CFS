
"use client";

import React from 'react'; 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ListChecks, FileText, Percent, CalendarDays } from "lucide-react"; 
import LoanEligibilityCalculator from '@/components/loan-eligibility-calculator';
import CreditScoreChecker from '@/components/credit-score-checker'; // Import the new component

const loanFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
  email: z.string().email({ message: "Invalid email address." }),
  loanType: z.enum([
    "personal", 
    "business", 
    "startup",
    "automobile",
    "property", 
    "gold",
    "loans_against_mutual_funds_and_shares",
    "loan_against_property_lap"
  ], { required_error: "Please select a loan type." }),
  loanAmount: z.coerce.number().min(1000, { message: "Loan amount must be at least 1000." }),
  panCard: z.any().refine(files => files && files.length > 0, "PAN card is required."), 
  aadharCard: z.any().refine(files => files && files.length > 0, "Aadhar card is required."),
  monthlyIncome: z.coerce.number().min(0, { message: "Monthly income cannot be negative."}),
  occupation: z.string().min(2, { message: "Occupation must be at least 2 characters." }),
});

type LoanFormValues = z.infer<typeof loanFormSchema>;

const defaultValues: Partial<LoanFormValues> = {
  fullName: "",
  mobile: "",
  email: "",
  loanAmount: 10000,
  monthlyIncome: 30000,
  occupation: "",
};

export default function LoanServicesPage() {
  const form = useForm<LoanFormValues>({
    resolver: zodResolver(loanFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: LoanFormValues) {
    const payload = {
      ...data,
      panCard: data.panCard[0]?.name || 'N/A',
      aadharCard: data.aadharCard[0]?.name || 'N/A',
    };
    toast({
      title: "Loan Application Submitted!",
      description: `Selected loan type: ${payload.loanType}. Other details logged.`,
    });
    console.log(payload);
     // form.reset(); // Optionally reset form
  }

  return (
    <MainLayout>
      <PageSection
        title="Loan Services"
        subtitle="Secure the funds you need with our flexible and transparent loan options. Whether for personal goals, business expansion, or launching a startup, we're here to help."
      >
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <LoanEligibilityCalculator />
          <CreditScoreChecker /> 
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Apply for a Loan</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Enter your mobile number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid md:grid-cols-2 gap-6">
                       <FormField
                        control={form.control}
                        name="loanType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type of Loan</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select loan type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="personal">Personal Loan</SelectItem>
                                <SelectItem value="business">Business Loan</SelectItem>
                                <SelectItem value="startup">Startup Loan</SelectItem>
                                <SelectItem value="automobile">Automobile Loan</SelectItem>
                                <SelectItem value="property">Property Loan</SelectItem> 
                                <SelectItem value="gold">Gold Loan</SelectItem>
                                <SelectItem value="loans_against_mutual_funds_and_shares">Loans against mutual funds and shares</SelectItem>
                                <SelectItem value="loan_against_property_lap">Loan against property (LAP)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="loanAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loan Amount (₹)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter desired loan amount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="monthlyIncome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Income (₹)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter your monthly income" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="occupation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occupation</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your occupation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                     <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="panCard"
                        render={() => (
                          <FormItem>
                            <FormLabel>Upload PAN Card</FormLabel>
                            <FormControl>
                              <Input type="file" {...form.register("panCard")} />
                            </FormControl>
                            <FormDescription className="text-xs">Please upload a clear copy of your PAN card.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="aadharCard"
                        render={() => (
                          <FormItem>
                            <FormLabel>Upload Aadhar Card</FormLabel>
                            <FormControl>
                               <Input type="file" {...form.register("aadharCard")} />
                            </FormControl>
                            <FormDescription className="text-xs">Please upload a clear copy of your Aadhar card.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Submitting..." : "Submit Loan Application"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="shadow-md">
              <CardHeader><CardTitle className="text-lg">Loan Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold flex items-center text-base"><ListChecks className="mr-2 h-5 w-5 text-primary"/>Eligibility Criteria</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground ml-2">
                    <li>Indian Citizen, Age 21-60</li>
                    <li>Salaried or Self-Employed</li>
                    <li>Good Credit Score</li>
                    <li>Minimum Monthly Income (varies by loan type)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold flex items-center text-base"><FileText className="mr-2 h-5 w-5 text-primary"/>Required Documents</h4>
                   <ul className="list-disc list-inside text-sm text-muted-foreground ml-2">
                    <li>PAN Card, Aadhar Card</li>
                    <li>Proof of Income (Salary Slips, Bank Statements)</li>
                    <li>Proof of Address</li>
                    <li>Business documents (for business/startup loans)</li>
                   </ul>
                </div>
                 <div>
                  <h4 className="font-semibold flex items-center text-base"><Percent className="mr-2 h-5 w-5 text-primary"/>Interest Rates &amp; Terms</h4>
                   <p className="text-sm text-muted-foreground">Competitive interest rates. Repayment terms from 12 to 60 months. Specifics depend on loan type and profile.</p>
                </div>
                <div>
                  <h4 className="font-semibold flex items-center text-base"><CalendarDays className="mr-2 h-5 w-5 text-primary"/>Repayment Terms</h4>
                   <p className="text-sm text-muted-foreground">Flexible EMI options. Easy online repayment portal. Prepayment options available with nominal charges.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageSection>
    </MainLayout>
  );
}
