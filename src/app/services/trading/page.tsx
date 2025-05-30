
"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription as ShadcnCardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Activity, CandlestickChart, Briefcase, LineChart, CalendarIcon, FileUp, Search, Wallet, CreditCard, Landmark as BankIcon, BarChartHorizontalBig, ExternalLink, UserPlus, LayoutDashboard, Filter, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockScreener from '@/components/stock-screener';
import AssetTicker from '@/components/asset-ticker';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart as RechartsLineChart, Line as RechartsLine, CartesianGrid as RechartsCartesianGrid, XAxis as RechartsXAxis, YAxis as RechartsYAxis, Tooltip as RechartsTooltip, ResponsiveContainer as RechartsResponsiveContainer } from 'recharts';


const tradingAccountFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "Invalid PAN format (e.g., ABCDE1234F)." }),
  dateOfBirth: z.date({ required_error: "Date of birth is required." }),
  addressStreet: z.string().min(5, { message: "Street address must be at least 5 characters." }),
  addressCity: z.string().min(2, { message: "City must be at least 2 characters." }),
  addressState: z.string().min(2, { message: "State must be at least 2 characters." }),
  addressPincode: z.string().regex(/^\d{6}$/, { message: "Pincode must be 6 digits." }),
  bankAccountNumber: z.string().min(5, { message: "Enter a valid bank account number." }),
  bankIfscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: "Enter a valid IFSC code (e.g., SBIN0123456)." }),
  nomineeName: z.string().optional(),
  nomineeRelationship: z.string().optional(),
  tradingExperience: z.enum(["beginner", "intermediate", "advanced"], { required_error: "Trading experience is required." }),
  annualIncome: z.enum(["lt_1L", "1L_5L", "5L_10L", "10L_25L", "gt_25L"], { required_error: "Annual income is required." }),
  uploadPanCard: z.any().refine(files => files && files.length > 0, "PAN card upload is required."),
  uploadAadharCard: z.any().refine(files => files && files.length > 0, "Aadhar card upload is required."),
  uploadAddressProof: z.any().refine(files => files && files.length > 0, "Address proof upload is required."),
  uploadBankProof: z.any().refine(files => files && files.length > 0, "Bank proof (cheque/statement) is required."),
  acceptTerms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
});

type TradingAccountFormValues = z.infer<typeof tradingAccountFormSchema>;

const mockChartData = [
  { name: 'Jan', price: 150 }, { name: 'Feb', price: 155 }, { name: 'Mar', price: 160 },
  { name: 'Apr', price: 158 }, { name: 'May', price: 165 }, { name: 'Jun', price: 170 },
  { name: 'Jul', price: 172 }, { name: 'Aug', price: 168 }, { name: 'Sep', price: 175 },
  { name: 'Oct', price: 180 }, { name: 'Nov', price: 178 }, { name: 'Dec', price: 185 },
];


export default function TradingServicesPage() {
  const form = useForm<TradingAccountFormValues>({
    resolver: zodResolver(tradingAccountFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      panNumber: "",
      addressStreet: "",
      addressCity: "",
      addressState: "",
      addressPincode: "",
      bankAccountNumber: "",
      bankIfscCode: "",
      nomineeName: "",
      nomineeRelationship: "",
      acceptTerms: false,
    },
    mode: "onChange",
  });

  function onSubmit(data: TradingAccountFormValues) {
    const submissionData = {
        ...data,
        dateOfBirth: data.dateOfBirth ? format(data.dateOfBirth, "yyyy-MM-dd") : undefined,
        uploadPanCard: data.uploadPanCard[0]?.name || 'N/A',
        uploadAadharCard: data.uploadAadharCard[0]?.name || 'N/A',
        uploadAddressProof: data.uploadAddressProof[0]?.name || 'N/A',
        uploadBankProof: data.uploadBankProof[0]?.name || 'N/A',
    };
    console.log("Trading Account Application Data:", submissionData);
    toast({
      title: "Application Submitted!",
      description: "Your trading account application has been received. We will review it and get back to you shortly.",
    });
    form.reset();
  }

  const mockWatchlist = [
    { symbol: "RELIANCE", price: 2950.75, change: "+12.50 (+0.42%)", changeColor: "text-green-500" },
    { symbol: "TCS", price: 3890.20, change: "-5.10 (-0.13%)", changeColor: "text-red-500" },
    { symbol: "INFY", price: 1640.00, change: "+8.80 (+0.54%)", changeColor: "text-green-500" },
    { symbol: "HDFCBANK", price: 1530.50, change: "-1.05 (-0.07%)", changeColor: "text-red-500" },
  ];

  const mockPositions = [
    { symbol: "ITC", qty: 100, avgPrice: 430.50, ltp: 433.10, pnl: "+260.00", pnlColor: "text-green-500" },
    { symbol: "SBIN", qty: 50, avgPrice: 780.20, ltp: 775.00, pnl: "-260.00", pnlColor: "text-red-500" },
  ];

  return (
    <MainLayout>
      <PageSection
        title="Trading & Market Services"
        subtitle="Empower your trading journey with our advanced tools, real-time data, and expert insights. Open an account today to access stocks, mutual funds, and portfolio management."
      >
        <AssetTicker />
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <Accordion type="single" collapsible className="w-full lg:col-span-2 space-y-6" defaultValue="item-1">
            <AccordionItem value="item-1">
              <Card className="shadow-xl">
                <AccordionTrigger className="w-full">
                  <CardHeader className="flex flex-row justify-between items-center w-full p-6">
                    <div>
                      <CardTitle className="flex items-center text-left"><UserPlus className="mr-2 h-6 w-6 text-primary"/> Open Your Trading Account</CardTitle>
                      <ShadcnCardDescription className="text-left">Fill in the details below to start your trading journey.</ShadcnCardDescription>
                    </div>
                  </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <h3 className="text-lg font-semibold text-foreground border-b pb-2">Personal Details</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl><Input placeholder="As per PAN card" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField control={form.control} name="mobile" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile Number</FormLabel>
                              <FormControl><Input type="tel" placeholder="10-digit mobile number" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="panNumber" render={({ field }) => (
                            <FormItem>
                              <FormLabel>PAN Number</FormLabel>
                              <FormControl><Input placeholder="Permanent Account Number" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>
                        <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date of Birth</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )} />

                        <h3 className="text-lg font-semibold text-foreground border-b pb-2 mt-4">Address Details</h3>
                        <FormField control={form.control} name="addressStreet" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address</FormLabel>
                              <FormControl><Input placeholder="House No, Street Name, Locality" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        <div className="grid md:grid-cols-3 gap-6">
                          <FormField control={form.control} name="addressCity" render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl><Input placeholder="City name" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="addressState" render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl><Input placeholder="State name" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="addressPincode" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pincode</FormLabel>
                              <FormControl><Input placeholder="6-digit pincode" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>
                        
                        <h3 className="text-lg font-semibold text-foreground border-b pb-2 mt-4">Bank Details</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="bankAccountNumber" render={({ field }) => (
                                <FormItem>
                                <FormLabel>Bank Account Number</FormLabel>
                                <FormControl><Input placeholder="Your account number" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="bankIfscCode" render={({ field }) => (
                                <FormItem>
                                <FormLabel>IFSC Code</FormLabel>
                                <FormControl><Input placeholder="Bank IFSC code" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <h3 className="text-lg font-semibold text-foreground border-b pb-2 mt-4">Nominee Details (Optional)</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="nomineeName" render={({ field }) => (
                                <FormItem>
                                <FormLabel>Nominee Name</FormLabel>
                                <FormControl><Input placeholder="Full name of nominee" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="nomineeRelationship" render={({ field }) => (
                                <FormItem>
                                <FormLabel>Relationship with Nominee</FormLabel>
                                <FormControl><Input placeholder="e.g., Spouse, Parent, Child" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <h3 className="text-lg font-semibold text-foreground border-b pb-2 mt-4">Financial & Trading Background</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="tradingExperience" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Trading Experience</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select experience level" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="beginner">Beginner (&lt;1 year)</SelectItem>
                                        <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                                        <SelectItem value="advanced">Advanced (&gt;3 years)</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="annualIncome" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Annual Income</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select income range" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="lt_1L">&lt; ₹1 Lakh</SelectItem>
                                        <SelectItem value="1L_5L">₹1 Lakh - ₹5 Lakhs</SelectItem>
                                        <SelectItem value="5L_10L">₹5 Lakhs - ₹10 Lakhs</SelectItem>
                                        <SelectItem value="10L_25L">₹10 Lakhs - ₹25 Lakhs</SelectItem>
                                        <SelectItem value="gt_25L">&gt; ₹25 Lakhs</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        
                        <h3 className="text-lg font-semibold text-foreground border-b pb-2 mt-4">Document Uploads (KYC)</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="uploadPanCard" render={() => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1"><FileUp size={16}/> PAN Card</FormLabel>
                                    <FormControl><Input type="file" {...form.register("uploadPanCard")} /></FormControl>
                                    <FormDescription className="text-xs">Clear copy of your PAN card.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="uploadAadharCard" render={() => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1"><FileUp size={16}/> Aadhar Card</FormLabel>
                                    <FormControl><Input type="file" {...form.register("uploadAadharCard")} /></FormControl>
                                    <FormDescription className="text-xs">Clear copy of your Aadhar card (front & back).</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FormField control={form.control} name="uploadAddressProof" render={() => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1"><FileUp size={16}/> Address Proof</FormLabel>
                                    <FormControl><Input type="file" {...form.register("uploadAddressProof")} /></FormControl>
                                    <FormDescription className="text-xs">e.g., Utility bill, Passport (if Aadhar not used or different address).</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="uploadBankProof" render={() => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1"><FileUp size={16}/> Bank Proof</FormLabel>
                                    <FormControl><Input type="file" {...form.register("uploadBankProof")} /></FormControl>
                                    <FormDescription className="text-xs">e.g., Cancelled cheque, Latest bank statement.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <FormField control={form.control} name="acceptTerms" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm mt-6">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Accept Terms & Conditions</FormLabel>
                                <p className="text-xs text-muted-foreground">
                                I agree to the NEX CFS <Link href="/terms-and-conditions#trading" className="underline hover:text-primary">trading terms</Link> and <Link href="/privacy-policy" className="underline hover:text-primary">privacy policy</Link>.
                                </p>
                                <FormMessage />
                            </div>
                            </FormItem>
                        )} />

                        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                          {form.formState.isSubmitting ? "Submitting Application..." : "Submit Application"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>

            <AccordionItem value="item-2">
              <Card className="shadow-xl">
                 <AccordionTrigger className="w-full">
                  <CardHeader className="flex flex-row justify-between items-center w-full p-6">
                    <div>
                      <CardTitle className="flex items-center text-left"><LayoutDashboard className="mr-2 h-6 w-6 text-primary"/>Real-Time Trading Interface</CardTitle>
                      <ShadcnCardDescription className="text-left">Simulated trading terminal for stocks and derivatives.</ShadcnCardDescription>
                    </div>
                  </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="space-y-4">
                      <div className="w-full h-64 md:h-96 bg-muted/20 rounded-md flex items-center justify-center p-4 relative">
                        <ChartContainer config={{ price: { label: "Price", color: "hsl(var(--chart-1))" } }} className="w-full h-full">
                          <RechartsLineChart data={mockChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }} accessibilityLayer>
                            <RechartsCartesianGrid vertical={false} strokeDasharray="3 3" />
                            <RechartsXAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} fontSize={10} />
                            <RechartsYAxis domain={['dataMin - 5', 'dataMax + 5']} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                            <RechartsLine type="monotone" dataKey="price" stroke="var(--color-price)" strokeWidth={2} dot={false} />
                          </RechartsLineChart>
                        </ChartContainer>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                          <Card className="md:col-span-1 bg-card">
                              <CardHeader className="p-4"><CardTitle className="text-base">Order Entry</CardTitle></CardHeader>
                              <CardContent className="p-4 space-y-3">
                                  <Input placeholder="Symbol (e.g., INFY)" />
                                  <Input type="number" placeholder="Quantity" />
                                  <Input type="number" placeholder="Price (for Limit)" />
                                  <Select defaultValue="limit">
                                      <SelectTrigger><SelectValue placeholder="Order Type" /></SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="market">Market</SelectItem>
                                          <SelectItem value="limit">Limit</SelectItem>
                                      </SelectContent>
                                  </Select>
                                  <div className="flex gap-2">
                                      <Button className="flex-1 bg-green-600 hover:bg-green-700">Buy</Button>
                                      <Button className="flex-1 bg-red-600 hover:bg-red-700">Sell</Button>
                                  </div>
                              </CardContent>
                          </Card>

                          <div className="md:col-span-2">
                              <Tabs defaultValue="watchlist" className="w-full">
                                  <TabsList className="grid w-full grid-cols-3">
                                      <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
                                      <TabsTrigger value="positions">Positions</TabsTrigger>
                                      <TabsTrigger value="orders">Orders</TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="watchlist">
                                      <Table>
                                          <TableHeader><TableRow><TableHead>Symbol</TableHead><TableHead>LTP</TableHead><TableHead>Change</TableHead></TableRow></TableHeader>
                                          <TableBody>
                                              {mockWatchlist.map(stock => (
                                                  <TableRow key={stock.symbol}>
                                                      <TableCell>{stock.symbol}</TableCell>
                                                      <TableCell>{stock.price.toFixed(2)}</TableCell>
                                                      <TableCell className={stock.changeColor}>{stock.change}</TableCell>
                                                  </TableRow>
                                              ))}
                                          </TableBody>
                                      </Table>
                                  </TabsContent>
                                  <TabsContent value="positions">
                                      <Table>
                                          <TableHeader><TableRow><TableHead>Symbol</TableHead><TableHead>Qty</TableHead><TableHead>Avg. Price</TableHead><TableHead>LTP</TableHead><TableHead>P&L</TableHead></TableRow></TableHeader>
                                          <TableBody>
                                              {mockPositions.map(pos => (
                                                  <TableRow key={pos.symbol}>
                                                      <TableCell>{pos.symbol}</TableCell>
                                                      <TableCell>{pos.qty}</TableCell>
                                                      <TableCell>{pos.avgPrice.toFixed(2)}</TableCell>
                                                      <TableCell>{pos.ltp.toFixed(2)}</TableCell>
                                                      <TableCell className={pos.pnlColor}>{pos.pnl}</TableCell>
                                                  </TableRow>
                                              ))}
                                          </TableBody>
                                      </Table>
                                  </TabsContent>
                                  <TabsContent value="orders">
                                      <p className="p-4 text-center text-muted-foreground">No pending orders.</p>
                                  </TabsContent>
                              </Tabs>
                          </div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center mt-2">This is a simulated trading interface for demonstration purposes.</p>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>

            <AccordionItem value="item-3">
              <Card className="shadow-xl">
                <AccordionTrigger className="w-full">
                   <CardHeader className="flex flex-row justify-between items-center w-full p-6">
                    <div>
                      <CardTitle className="flex items-center text-left"><Filter className="mr-2 h-6 w-6 text-primary"/>Stock Screener</CardTitle>
                      <ShadcnCardDescription className="text-left">Discover investment opportunities with advanced filtering.</ShadcnCardDescription>
                    </div>
                  </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="pt-0">
                    <StockScreener />
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          </Accordion>

          <div className="space-y-6 lg:col-span-1">
            <Card className="shadow-md">
              <CardHeader><CardTitle className="flex items-center"><Wallet className="mr-2 h-5 w-5 text-primary"/>Trading Account Funds</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Available Margin:</span>
                      <span className="font-semibold text-foreground">₹ 1,25,000.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Used Margin:</span>
                      <span className="font-semibold text-foreground">₹ 25,000.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Account Balance:</span>
                      <span className="font-semibold text-foreground">₹ 1,50,000.00</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1"><CreditCard className="mr-1 h-4 w-4"/> Add Funds</Button>
                      <Button variant="outline" size="sm" className="flex-1"><BankIcon className="mr-1 h-4 w-4"/> Withdraw</Button>
                  </div>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="flex items-center"><Briefcase className="mr-2 h-5 w-5 text-primary"/>Mutual Fund SIPs</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">Easily invest in a wide range of mutual funds through Systematic Investment Plans (SIPs). Start small, invest regularly, and grow your wealth over time.</p>
                <Button variant="outline" className="w-full">Explore Mutual Funds</Button>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader><CardTitle className="flex items-center"><LineChart className="mr-2 h-5 w-5 text-primary"/>Portfolio Builder</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">Our tools help you construct and manage a diversified portfolio aligned with your financial goals and risk tolerance.</p>
                <Button variant="outline" className="w-full">Manage Your Portfolio</Button>
              </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle className="flex items-center"><BarChartHorizontalBig className="mr-2 h-5 w-5 text-primary"/>Market News & Analysis</CardTitle></CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm">
                        <li className="text-muted-foreground hover:text-primary"><Link href="#">Market hits all-time high on global cues <ExternalLink className="inline ml-1 h-3 w-3" /></Link></li>
                        <li className="text-muted-foreground hover:text-primary"><Link href="#">RBI keeps repo rate unchanged <ExternalLink className="inline ml-1 h-3 w-3" /></Link></li>
                        <li className="text-muted-foreground hover:text-primary"><Link href="#">Tech stocks rally on AI optimism <ExternalLink className="inline ml-1 h-3 w-3" /></Link></li>
                    </ul>
                     <Button variant="link" className="p-0 h-auto mt-2 text-primary">View All News</Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </PageSection>
    </MainLayout>
  );
}
