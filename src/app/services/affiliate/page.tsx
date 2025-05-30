
"use client";

import React, { useState } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Share2, Award, PieChart, Banknote, Users, FileUp, CheckCircle } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";

const affiliateFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
  bankAccountNumber: z.string().min(5, { message: "Enter a valid bank account number."}),
  bankIfscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: "Enter a valid IFSC code."}),
  panCard: z.any().refine(files => files && files.length > 0, "PAN card is required."),
  aadharCard: z.any().refine(files => files && files.length > 0, "Aadhar card is required."),
  acceptTerms: z.boolean().refine(val => val === true, { message: "You must accept the affiliate terms." }),
});

type AffiliateFormValues = z.infer<typeof affiliateFormSchema>;

const features = [
    { icon: <Share2 className="w-7 h-7 text-primary" />, title: "Simple Referrals", description: "Share your unique referral link with your network." },
    { icon: <Award className="w-7 h-7 text-primary" />, title: "Generous Commissions", description: "Get rewarded for every successful referral for loans or investments." },
    { icon: <PieChart className="w-7 h-7 text-primary" />, title: "Real-Time Tracking", description: "Track your referrals, earnings, and payouts instantly via your dashboard." },
    { icon: <Banknote className="w-7 h-7 text-primary" />, title: "Easy Payouts", description: "Receive your commissions directly to your registered bank account periodically." },
  ];

export default function AffiliateProgramPage() {
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  const form = useForm<AffiliateFormValues>({
    resolver: zodResolver(affiliateFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      bankAccountNumber: "",
      bankIfscCode: "",
      acceptTerms: false,
    },
    mode: "onChange",
  });

  const generateReferralCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'NEXCFS-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  async function onSubmit(data: AffiliateFormValues) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const payload = {
        ...data,
        panCard: data.panCard[0]?.name || 'N/A',
        aadharCard: data.aadharCard[0]?.name || 'N/A',
    };
    toast({
      title: "Affiliate Registration Submitted!",
      description: "Your application is being processed. You'll be notified upon approval.",
    });
    console.log(payload);
    
    setReferralCode(generateReferralCode());
    setRegistrationComplete(true);
    form.reset(); 
  }
  
  const cardBaseClass = "shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out";

  return (
    <MainLayout>
      <PageSection
        title="NEX CFS Affiliate Program"
        subtitle="Partner with NEX CFS and earn by referring new users to our platform. It's simple, rewarding, and helps others achieve their financial goals."
      >
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <Card className="lg:col-span-2 shadow-lg">
            {!registrationComplete ? (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-primary"/> Join Our Affiliate Network
                  </CardTitle>
                  <CardDescription>Register below to become a NEX CFS affiliate and start earning.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl><Input placeholder="Enter your full name" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl><Input type="email" placeholder="Enter your email" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField control={form.control} name="mobile" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl><Input type="tel" placeholder="Enter 10-digit mobile" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-foreground">Bank Details for Payout</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField control={form.control} name="bankAccountNumber" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bank Account Number</FormLabel>
                                <FormControl><Input placeholder="Account number" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                           <FormField control={form.control} name="bankIfscCode" render={({ field }) => (
                              <FormItem>
                                <FormLabel>IFSC Code</FormLabel>
                                <FormControl><Input placeholder="Bank IFSC code" {...field} /></FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2 text-foreground">KYC Documents</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="panCard"
                                render={() => ( 
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1"><FileUp size={16} /> PAN Card</FormLabel>
                                    <FormControl>
                                    <Input type="file" {...form.register("panCard")} />
                                    </FormControl>
                                    <FormDescription className="text-xs">Upload a clear copy of your PAN card.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="aadharCard"
                                render={() => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1"><FileUp size={16} /> Aadhar Card</FormLabel>
                                    <FormControl>
                                    <Input type="file" {...form.register("aadharCard")} />
                                    </FormControl>
                                    <FormDescription className="text-xs">Upload a clear copy of your Aadhar card.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                      </div>

                      <FormField control={form.control} name="acceptTerms" render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Accept Affiliate Terms</FormLabel>
                              <p className="text-xs text-muted-foreground">
                                I agree to the NEX CFS <Link href="/terms-and-conditions#affiliate-earnings" className="underline hover:text-primary">Affiliate Program terms and conditions</Link>.
                              </p>
                               <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Registering..." : "Register as Affiliate"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </>
            ) : (
              <div className="animate-in fade-in-90 slide-in-from-top-4 duration-500">
                <CardHeader className="items-center text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <CardTitle className="text-2xl">Registration Successful!</CardTitle>
                  <CardDescription>Welcome to the NEX CFS Affiliate Program.</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Unique Referral Code:</p>
                    <p className="text-2xl font-bold text-primary bg-primary/10 p-3 rounded-md inline-block my-2">{referralCode}</p>
                    <p className="text-xs text-muted-foreground">Share this code to start earning!</p>
                  </div>
                  <Button asChild size="lg" className="w-full md:w-auto">
                    <Link href="/dashboard">Go to Your Dashboard</Link>
                  </Button>
                   <Button variant="outline" onClick={() => setRegistrationComplete(false)}  className="w-full md:w-auto md:ml-2">
                    Register Another Affiliate
                  </Button>
                </CardContent>
              </div>
            )}
          </Card>
          
          <div className="space-y-6">
            <Card className={cardBaseClass}>
                <CardHeader>
                    <CardTitle>Program Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                            <div className="flex-shrink-0 mr-3 mt-1">{feature.icon}</div>
                            <div>
                                <h4 className="font-semibold text-foreground">{feature.title}</h4>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card className={cardBaseClass}>
                <CardHeader>
                  <CardTitle>Ready to Earn?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Image src="https://placehold.co/400x250.png" width={400} height={250} alt="Affiliate Success" className="rounded-lg mb-2 w-full" data-ai-hint="person success"/>
                  <p className="text-sm text-muted-foreground">
                    Once registered and approved, you'll get access to your affiliate dashboard with your unique referral link, marketing materials, and performance analytics.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                      <Link href="/faq#affiliateProgram">Learn More in FAQ</Link>
                  </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </PageSection>
    </MainLayout>
  );
}
