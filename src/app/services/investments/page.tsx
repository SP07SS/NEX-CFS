
"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { TrendingUp, ShieldCheck, Briefcase, BarChartHorizontalBig, FileCheck2 } from "lucide-react";
import Image from "next/image";

const investmentFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  investorType: z.enum(["individual", "institutional", "accredited"], { required_error: "Please select investor type." }),
  riskAppetite: z.enum(["low", "medium", "high"], { required_error: "Please select risk appetite." }),
  preferredInvestmentType: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one preferred investment type.",
  }),
  panCard: z.any().refine(files => files?.length > 0, "PAN card is required."),
  aadharCard: z.any().refine(files => files?.length > 0, "Aadhar card is required."),
  bankDetails: z.any().refine(files => files?.length > 0, "Bank details document is required."), 
});

type InvestmentFormValues = z.infer<typeof investmentFormSchema>;

const investmentTypes = [
  { id: "equity", label: "Startup Equity" },
  { id: "debt", label: "Corporate Debt" },
  { id: "real_estate", label: "Real Estate Ventures" },
  { id: "mutual_funds", label: "Managed Mutual Funds" },
] as const;


export default function InvestmentOpportunitiesPage() {
  const form = useForm<InvestmentFormValues>({
    resolver: zodResolver(investmentFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      preferredInvestmentType: [],
    },
    mode: "onChange",
  });

  function onSubmit(data: InvestmentFormValues) {
    toast({
      title: "Investment Interest Submitted!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    console.log(data);
  }

  const investmentDeals = [
    { name: "Tech Innovators Ltd.", sector: "Technology", risk: "High", potentialReturn: "25-30% Annually", minInvestment: "₹5,00,000", imageHint: "startup team" },
    { name: "Green Energy Solutions", sector: "Renewable Energy", risk: "Medium", potentialReturn: "15-20% Annually", minInvestment: "₹2,00,000", imageHint: "solar panel" },
    { name: "Urban Realty Corp.", sector: "Real Estate", risk: "Low-Medium", potentialReturn: "10-14% Annually", minInvestment: "₹10,00,000", imageHint: "cityscape architecture" },
  ];

  const cardBaseClass = "hover:shadow-2xl hover:scale-[1.05] hover:-translate-y-1 transition-all duration-300 ease-in-out";

  return (
    <MainLayout>
      <PageSection
        title="Investment Opportunities"
        subtitle="Unlock your financial potential with NEX CFS. We offer curated investment opportunities in high-growth businesses and promising startups, complete with verified risk ratings and comprehensive ROI tracking."
      >
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><TrendingUp className="mr-2 h-6 w-6 text-primary"/> Curated Deals</CardTitle>
                <CardDescription>Explore a selection of vetted investment opportunities.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {investmentDeals.map((deal, index) => (
                  <Card key={index} className={`overflow-hidden ${cardBaseClass}`}>
                    <div className="grid md:grid-cols-3 items-center">
                        <div className="md:col-span-1 p-1">
                            <Image src={`https://placehold.co/300x200.png`} width={300} height={200} alt={deal.name} className="rounded-md object-cover w-full h-full" data-ai-hint={deal.imageHint}/>
                        </div>
                        <div className="md:col-span-2 p-4">
                            <h4 className="font-semibold text-lg">{deal.name}</h4>
                            <p className="text-sm text-muted-foreground">Sector: {deal.sector}</p>
                            <div className="flex flex-wrap gap-2 text-xs mt-2">
                                <span className={`px-2 py-1 rounded-full ${deal.risk === 'High' ? 'bg-red-100 text-red-700' : deal.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>Risk: {deal.risk}</span>
                                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700">Return: {deal.potentialReturn}</span>
                                <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700">Min: {deal.minInvestment}</span>
                            </div>
                             <Button variant="outline" size="sm" className="mt-3">View Details</Button>
                        </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><FileCheck2 className="mr-2 h-6 w-6 text-primary"/> Express Your Interest</CardTitle>
                <CardDescription>Provide your details to get started with investment opportunities.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl><Input type="email" placeholder="Your email address" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="investorType" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Investor Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select investor type" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="individual">Individual</SelectItem>
                                <SelectItem value="institutional">Institutional</SelectItem>
                                <SelectItem value="accredited">Accredited Investor</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField control={form.control} name="riskAppetite" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Risk Appetite</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl><SelectTrigger><SelectValue placeholder="Select risk appetite" /></SelectTrigger></FormControl>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField control={form.control} name="preferredInvestmentType" render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Preferred Investment Types</FormLabel>
                            <FormDescription>Select all that apply.</FormDescription>
                          </div>
                          {investmentTypes.map((item) => (
                            <FormField key={item.id} control={form.control} name="preferredInvestmentType"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item.id])
                                            : field.onChange( (field.value || []).filter( (value) => value !== item.id ) )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="font-medium">KYC Documents</p>
                     <div className="grid md:grid-cols-3 gap-6">
                      <FormField control={form.control} name="panCard" render={() => (
                          <FormItem>
                            <FormLabel>PAN Card</FormLabel>
                            <FormControl><Input type="file" {...form.register("panCard")} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField control={form.control} name="aadharCard" render={() => (
                          <FormItem>
                            <FormLabel>Aadhar Card</FormLabel>
                            <FormControl><Input type="file" {...form.register("aadharCard")} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField control={form.control} name="bankDetails" render={() => (
                          <FormItem>
                            <FormLabel>Bank Details (e.g. Cheque)</FormLabel>
                            <FormControl><Input type="file" {...form.register("bankDetails")} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Submitting..." : "Submit Investment Interest"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className={cardBaseClass}>
              <CardHeader><CardTitle className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5 text-primary"/>Why Invest With Us?</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Verified Opportunities:</strong> All deals are thoroughly vetted by our expert team.</p>
                <p><strong className="text-foreground">Risk Ratings:</strong> Transparent risk assessments to help you make informed decisions.</p>
                <p><strong className="text-foreground">Portfolio Diversification:</strong> Access a range of asset classes and sectors.</p>
                <p><strong className="text-foreground">Growth Potential:</strong> Invest in businesses with high growth prospects.</p>
              </CardContent>
            </Card>
             <Card className={cardBaseClass}>
              <CardHeader><CardTitle className="flex items-center"><BarChartHorizontalBig className="mr-2 h-5 w-5 text-primary"/>Investment Dashboard</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                 <p>Once you invest, you'll gain access to a personalized dashboard:</p>
                <ul className="list-disc list-inside ml-2">
                    <li>Track your investments in real-time.</li>
                    <li>Monitor ROI and performance metrics.</li>
                    <li>Receive regular updates and reports.</li>
                    <li>Manage your portfolio with ease.</li>
                </ul>
                <Button variant="outline" className="w-full mt-2" asChild><Link href="/login">Access Dashboard (Login Required)</Link></Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageSection>
    </MainLayout>
  );
}
