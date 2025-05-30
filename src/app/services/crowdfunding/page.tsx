
"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartHandshake, Users, ShieldCheck, BarChart3, QrCode } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const contributionFormSchema = z.object({
  contributionAmount: z.coerce.number().min(1, { message: "Minimum contribution is 1 unit of selected currency." }),
  currency: z.string().min(3, { message: "Please select a currency."}),
  startup: z.string().optional(), // Optional, as non-logged-in users won't select
  paymentMethod: z.enum(["credit_card", "debit_card", "upi", "net_banking"], { required_error: "Please select a payment method."}),
});

type ContributionFormValues = z.infer<typeof contributionFormSchema>;

const startups = [
  { id: "startup1", name: "EcoSolutions Inc." },
  { id: "startup2", name: "HealthTech Innovations" },
  { id: "startup3", name: "EduFuture Labs" },
];

const paymentMethodLabels: Record<string, string> = {
  "credit_card": "Credit Card",
  "debit_card": "Debit Card",
  "upi": "UPI",
  "net_banking": "Net Banking",
};

const currencies = [
    { code: "INR", name: "Indian Rupee (₹)" },
    { code: "USD", name: "US Dollar ($)" },
    { code: "EUR", name: "Euro (€)" },
    { code: "GBP", name: "British Pound (£)" },
    { code: "JPY", name: "Japanese Yen (¥)" },
    { code: "AUD", name: "Australian Dollar (A$)" },
    { code: "CAD", name: "Canadian Dollar (C$)" },
];

const mockBanks = [
  { id: "bank_a", name: "NEX Bank" },
  { id: "bank_b", name: "CFS National Bank" },
  { id: "bank_c", name: "Global Trust Bank" },
];

export default function CrowdfundingPage() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    try {
      setIsUserLoggedIn(localStorage.getItem('isUserLoggedIn') === 'true');
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setIsUserLoggedIn(false); 
    }
    setIsLoading(false);
  }, []);


  const form = useForm<ContributionFormValues>({
    resolver: zodResolver(contributionFormSchema),
    defaultValues: { contributionAmount: 100, currency: "INR", paymentMethod: undefined, startup: "" },
    mode: "onChange",
  });

  const watchedPaymentMethod = form.watch("paymentMethod");

  async function onSubmit(data: ContributionFormValues) {
    setIsProcessingPayment(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    setIsProcessingPayment(false);

    const contributionTarget = isUserLoggedIn && data.startup && data.startup !== "NEX_CFS_POOL"
      ? startups.find(s => s.id === data.startup)?.name || "the selected startup"
      : "the NEX CFS General Pool";

    const finalData = {
      ...data,
      startup: isUserLoggedIn && data.startup && data.startup !== "NEX_CFS_POOL" ? data.startup : "NEX_CFS_POOL", 
    };

    const paymentDetailsForExcel = {
        contributionAmount: finalData.contributionAmount,
        currency: finalData.currency,
        target: contributionTarget,
        paymentMethod: finalData.paymentMethod,
        isUserLoggedIn: isUserLoggedIn,
        timestamp: new Date().toISOString(),
        // In a real scenario, you might add mock payment transaction IDs or masked card numbers if simulating more deeply
      };
  
      console.log("SIMULATION: Saving received payment details to Excel file...");
      console.log("Excel Payment Data:", JSON.stringify(paymentDetailsForExcel, null, 2));

    const paymentMethodFriendlyName = paymentMethodLabels[finalData.paymentMethod] || finalData.paymentMethod;

    let toastDescription = `Thank you! Your contribution of ${finalData.currency} ${finalData.contributionAmount} using ${paymentMethodFriendlyName} has been processed to ${contributionTarget}. Payment details logged for Excel simulation.`;

    if (finalData.paymentMethod === "upi") {
      toastDescription = `Thank you! If this were a live app, you'd be redirected to your UPI app to complete the payment. Your contribution of ${finalData.currency} ${finalData.contributionAmount} to ${contributionTarget} is being processed. Payment details logged for Excel simulation.`;
    }

    toast({
      title: "Contribution Processed!",
      description: toastDescription,
    });
    console.log("Contribution Data:", finalData);
    form.reset({ 
        contributionAmount: 100, 
        currency: "INR", 
        paymentMethod: undefined, 
        startup: isUserLoggedIn ? "" : undefined 
    });
  }
  
  const cardBaseClass = "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 ease-in-out";

  if (isLoading) {
    return (
      <MainLayout>
        <PageSection title="Crowdfunding Platform" subtitle="Loading...">
          <div className="flex justify-center items-center h-64">
            <HeartHandshake className="w-12 h-12 text-primary animate-pulse" />
            <p className="ml-4 text-muted-foreground">Checking your status...</p>
          </div>
        </PageSection>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageSection
        title="Crowdfunding Platform"
        subtitle="Support groundbreaking startups or raise capital for your innovative ideas. Join a community dedicated to fostering growth and innovation."
      >
        <Tabs defaultValue="contribute" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
            <TabsTrigger value="contribute">Support a Project</TabsTrigger>
            <TabsTrigger value="learn">How It Works</TabsTrigger>
          </TabsList>
          <TabsContent value="contribute">
            <Card className="mt-6 animate-in fade-in zoom-in-95 duration-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <HeartHandshake className="w-6 h-6 text-primary"/>
                    {isUserLoggedIn ? "Support a Startup" : "Make a Contribution"}
                </CardTitle>
                <CardDescription>
                  {isUserLoggedIn
                    ? "Choose a startup to support or contribute to the general NEX CFS innovation pool. Track your impact and see how your contributions make a difference."
                    : "Make a one-time contribution to the NEX CFS general pool. Your contribution helps us support a wide range of innovative projects."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {isUserLoggedIn && (
                      <FormField
                        control={form.control}
                        name="startup"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Startup (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || ""} >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Contribute to NEX CFS Pool or select a startup" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="NEX_CFS_POOL">NEX CFS General Pool</SelectItem>
                                {startups.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                            <CardDescription className="text-xs text-muted-foreground pt-1">If no startup is selected, your contribution goes to the general pool.</CardDescription>
                          </FormItem>
                        )}
                      />
                    )}
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="currency"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Currency</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {currencies.map(c => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="contributionAmount"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Enter amount" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Payment Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="credit_card" />
                                </FormControl>
                                <FormLabel className="font-normal">Credit Card</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="debit_card" />
                                </FormControl>
                                <FormLabel className="font-normal">Debit Card</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="upi" />
                                </FormControl>
                                <FormLabel className="font-normal">UPI</FormLabel>
                              </FormItem>
                               <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="net_banking" />
                                </FormControl>
                                <FormLabel className="font-normal">Net Banking</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Conditional Mock Payment Fields */}
                    {watchedPaymentMethod && (
                      <div className="space-y-4 p-4 border rounded-md bg-muted/30 animate-in fade-in duration-300">
                        <h4 className="text-sm font-medium text-foreground">
                          Complete {paymentMethodLabels[watchedPaymentMethod]} Details (Mock)
                        </h4>
                        {(watchedPaymentMethod === "credit_card" || watchedPaymentMethod === "debit_card") && (
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="mockCardNumber">Card Number</Label>
                              <Input id="mockCardNumber" placeholder="xxxx xxxx xxxx xxxx" disabled />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="mockExpiryDate">Expiry Date</Label>
                                <Input id="mockExpiryDate" placeholder="MM/YY" disabled />
                              </div>
                              <div>
                                <Label htmlFor="mockCvv">CVV</Label>
                                <Input id="mockCvv" placeholder="CVV" disabled />
                              </div>
                            </div>
                          </div>
                        )}
                        {watchedPaymentMethod === "upi" && (
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="mockUpiId">UPI ID</Label>
                              <Input id="mockUpiId" placeholder="yourname@bankupi" disabled />
                            </div>
                            <div className="text-center my-3">
                                <p className="text-sm text-muted-foreground">Or scan QR code to pay:</p>
                                <div className="flex justify-center mt-2">
                                <Image 
                                    src="https://placehold.co/150x150.png" 
                                    alt="Mock UPI QR Code" 
                                    width={150} 
                                    height={150} 
                                    className="rounded-md border"
                                    data-ai-hint="qr code"
                                />
                                </div>
                            </div>
                          </div>
                        )}
                        {watchedPaymentMethod === "net_banking" && (
                          <div>
                            <Label htmlFor="mockBankSelect">Select Bank</Label>
                            <Select disabled>
                              <SelectTrigger id="mockBankSelect">
                                <SelectValue placeholder="Select your bank" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockBanks.map(bank => (
                                  <SelectItem key={bank.id} value={bank.id}>{bank.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">These fields are for demonstration purposes only.</p>
                      </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isProcessingPayment || !watchedPaymentMethod}>
                      {isProcessingPayment ? "Processing..." : "Contribute Now"}
                    </Button>
                  </form>
                </Form>
                {!isUserLoggedIn && (
                    <p className="mt-4 text-sm text-muted-foreground">
                        As a non-logged-in user, your contribution will be anonymous to the NEX CFS general pool. No tracking or receipt will be provided. 
                        <Button variant="link" asChild className="p-0 h-auto ml-1"><Link href="/login">Log in</Link></Button> or <Button variant="link" onClick={() => { setIsUserLoggedIn(true); toast({title: "Simulating Login", description: "You are now simulating a logged-in user."})}} className="p-0 h-auto ml-1">Simulate Login</Button> to contribute to specific startups and track your contributions.
                    </p>
                )}
                 {isUserLoggedIn && (
                    <p className="mt-4 text-sm text-muted-foreground">
                        You are logged in. Contributions to specific startups can be tracked in your dashboard. 
                        <Button variant="link" onClick={() => { setIsUserLoggedIn(false); toast({title: "Simulating Anonymous User", description: "You are now simulating an anonymous contributor."})}} className="p-0 h-auto ml-1">Simulate contributing anonymously</Button>.
                    </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="learn">
             <div className="grid md:grid-cols-2 gap-6 mt-6 animate-in fade-in zoom-in-95 duration-500">
              <Card className={cardBaseClass}>
                <CardHeader className="flex flex-row items-center gap-3">
                    <HeartHandshake className="w-8 h-8 text-primary"/>
                    <CardTitle>For Supporters/Contributors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                    <p><strong>Logged-In Users:</strong> Create an account or log in to browse verified startup projects. Contribute directly to causes you believe in. Track how your contributions are utilized through regular updates from startups and view your contribution history in your personal dashboard.</p>
                    <p><strong>Anonymous Contributors:</strong> Make a one-time contribution to the NEX CFS general innovation pool without creating an account. These funds support a broad range of projects vetted by our team. Please note, anonymous contributions are not trackable and do not receive individual receipts.</p>
                </CardContent>
              </Card>
               <Card className={cardBaseClass}>
                <CardHeader className="flex flex-row items-center gap-3">
                    <Users className="w-8 h-8 text-primary"/>
                    <CardTitle>For Project Creators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                    <p>Have an innovative idea? Apply to list your project on NEX CFS. Our team reviews applications for viability and impact. If approved, create a compelling campaign page to attract supporters. Receive funds, provide updates to your backers, and bring your vision to life.</p>
                    <p>We provide tools and guidance to help you run a successful crowdfunding campaign.</p>
                </CardContent>
              </Card>
               <Card className={cardBaseClass}>
                <CardHeader className="flex flex-row items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-primary"/>
                    <CardTitle>Security &amp; Trust</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                   <p>NEX CFS employs robust security measures to protect all transactions and user data. We verify startups to ensure legitimacy and transparency. Our platform is designed to build trust between contributors and creators.</p>
                </CardContent>
              </Card>
              <Card className={cardBaseClass}>
                <CardHeader className="flex flex-row items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-primary"/>
                    <CardTitle>Impact Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                    <p>For logged-in contributors, our platform provides insights into the impact of your contributions. Startups are encouraged to share progress reports, milestones achieved, and how funds are being used, offering transparency and connection to the projects you support.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </PageSection>
    </MainLayout>
  );
}

