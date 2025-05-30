
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LayoutDashboard, DollarSign, Users, Briefcase, TrendingUp, Gift, History, AlertCircle, HandCoins, FileCheck2, BarChart3, Link2, LogOut, HeartHandshake, ArrowLeft, PieChartIcon, LineChartIcon } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

type UserRole = 'Borrower' | 'Crowdfunder' | 'Investor' | 'Affiliate' | null;

const mockInvestorPortfolioData = [
  { name: 'Tech Inc.', value: 120000, initial: 100000 },
  { name: 'Green Sol.', value: 250000, initial: 200000 },
  { name: 'Future AI', value: 80000, initial: 50000 },
  { name: 'BioHealth', value: 150000, initial: 120000 },
];

const mockInvestorRoiData = [
  { month: 'Jan', roi: 5.2 },
  { month: 'Feb', roi: 5.8 },
  { month: 'Mar', roi: 7.1 },
  { month: 'Apr', roi: 6.5 },
  { month: 'May', roi: 8.0 },
  { month: 'Jun', roi: 15.75 },
];

const mockAffiliateEarningsData = [
  { month: 'Jan', earnings: 2500 },
  { month: 'Feb', earnings: 3200 },
  { month: 'Mar', earnings: 2800 },
  { month: 'Apr', earnings: 4100 },
  { month: 'May', earnings: 3500 },
  { month: 'Jun', earnings: 5250 },
];

const mockAffiliateReferralSourceData = [
  { name: 'Social Media', value: 400 },
  { name: 'Direct Link', value: 300 },
  { name: 'Blog Post', value: 200 },
  { name: 'Email Campaign', value: 100 },
];
const CHART_COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];


const UserRoleSpecificContent: React.FC<{ role: UserRole }> = ({ role }) => {
  const router = useRouter();
  const cardBaseClass = "shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 ease-in-out";

  const [totalReferrals, setTotalReferrals] = useState(25);
  const [successfulConversions, setSuccessfulConversions] = useState(10);
  const [totalEarnings, setTotalEarnings] = useState(5250);
  const [conversionRate, setConversionRate] = useState(40);

  useEffect(() => {
    if (role === 'Affiliate') {
      const newTotalReferrals = Math.floor(Math.random() * 91) + 10;
      const newSuccessfulConversions = Math.floor(Math.random() * (newTotalReferrals + 1));
      const newEarnings = newSuccessfulConversions * (Math.floor(Math.random() * 401) + 100);
      const newConversionRate = newTotalReferrals > 0 ? Math.round((newSuccessfulConversions / newTotalReferrals) * 100) : 0;

      setTotalReferrals(newTotalReferrals);
      setSuccessfulConversions(newSuccessfulConversions);
      setTotalEarnings(newEarnings);
      setConversionRate(newConversionRate);
      
      // Update earnings data for the chart
      mockAffiliateEarningsData[mockAffiliateEarningsData.length - 1].earnings = newEarnings;
    }
  }, [role]);


  const handleCopyLink = () => {
    const link = 'https://nexcfs.com/ref/your-unique-id';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link)
        .then(() => {
          toast({ title: "Link Copied!", description: "Referral link copied to clipboard." });
        })
        .catch(err => {
          toast({ title: "Error", description: "Could not copy link.", variant: "destructive" });
          console.error('Could not copy text: ', err);
        });
    } else {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = link;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            toast({ title: "Link Copied!", description: "Referral link copied to clipboard (fallback method)." });
        } catch (err) {
            toast({ title: "Error", description: "Could not copy link. Please copy manually.", variant: "destructive" });
            console.error('Fallback: Oops, unable to copy', err);
        }
    }
  };

  switch (role) {
    case 'Borrower':
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className={cardBaseClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><FileCheck2 className="text-primary" /> Loan Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Your Personal Loan application for <span className="font-semibold text-foreground">₹5,00,000</span> is currently <span className="text-yellow-500 font-semibold">Under Review</span>.</p>
              <p className="text-xs text-muted-foreground mt-2">Expected update by: Dec 25, 2024</p>
            </CardContent>
          </Card>
          <Card className={cardBaseClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><DollarSign className="text-primary" /> Upcoming EMIs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Next EMI: <span className="font-semibold text-foreground">₹12,500</span> for Personal Loan</p>
              <p className="text-xs text-muted-foreground">Due Date: Jan 05, 2025</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => router.push('/dashboard/borrower/repayment-schedule')}>View Repayment Schedule</Button>
            </CardContent>
          </Card>
          <Card className={cardBaseClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><History className="text-primary" /> Application History</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Business Loan - ₹10,00,000 (Approved)</li>
                <li>Vehicle Loan - ₹8,00,000 (Rejected)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      );
    case 'Crowdfunder':
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className={cardBaseClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><HeartHandshake className="text-primary" /> Recent Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">₹1,000 to <span className="font-semibold text-foreground">EcoSolutions Inc.</span> (Nov 10, 2024)</p>
              <p className="text-muted-foreground">₹500 to <span className="font-semibold text-foreground">HealthTech Innovations</span> (Oct 22, 2024)</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => router.push('/dashboard/contributions')}>View All Contributions</Button>
            </CardContent>
          </Card>
          <Card className={cardBaseClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="text-primary" /> Supported Project Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground"><span className="font-semibold text-foreground">EcoSolutions Inc.</span> just launched their beta product! Your contribution helped make this possible.</p>
              <Link href="#" className="text-sm text-primary hover:underline mt-1 block">Read more</Link>
            </CardContent>
          </Card>
           <Card className={cardBaseClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><HandCoins className="text-primary" /> Your Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Total Contributed: <span className="font-semibold text-foreground">₹2,500</span></p>
              <p className="text-muted-foreground">Projects Supported: <span className="font-semibold text-foreground">3</span></p>
            </CardContent>
          </Card>
        </div>
      );
    case 'Investor':
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className={`${cardBaseClass} lg:col-span-2`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Briefcase className="text-primary" /> Investment Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Tech Innovators Ltd. - Current Value: <span className="font-semibold text-foreground">₹1,20,000</span> (+20%)</p>
              <div className="h-60">
                <ChartContainer config={{
                    value: { label: "Current Value", color: "hsl(var(--chart-2))" },
                    initial: { label: "Initial Investment", color: "hsl(var(--chart-1))" },
                  }} className="w-full h-full">
                  <BarChart data={mockInvestorPortfolioData} accessibilityLayer>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="initial" fill="var(--color-initial)" radius={4} />
                    <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </div>
               <Button variant="outline" size="sm" className="mt-4" onClick={() => router.push('/dashboard/investor/portfolio')}>Manage Portfolio</Button>
            </CardContent>
          </Card>
          <Card className={cardBaseClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="text-primary" /> Overall ROI</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold text-green-500 mb-2">15.75% <span className="text-xs text-muted-foreground align-middle">YTD</span></p>
                 <div className="h-48">
                    <ChartContainer config={{ roi: { label: "ROI (%)", color: "hsl(var(--chart-1))" } }} className="w-full h-full">
                        <LineChart data={mockInvestorRoiData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} accessibilityLayer>
                            <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={10}/>
                            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} domain={['dataMin - 2', 'dataMax + 2']}/>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line type="monotone" dataKey="roi" stroke="var(--color-roi)" strokeWidth={2} dot={false}/>
                        </LineChart>
                    </ChartContainer>
                 </div>
            </CardContent>
          </Card>
          <Card className={`${cardBaseClass} lg:col-span-3`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><AlertCircle className="text-primary" /> New Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Check out <span className="font-semibold text-foreground">FinTech Disruptors</span> - Seed Round Opening Soon.</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => router.push('/dashboard/investor/deals')}>Explore Deals</Button>
            </CardContent>
          </Card>
        </div>
      );
    case 'Affiliate':
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className={cardBaseClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BarChart3 className="text-primary" /> Referral Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Total Referrals: <span className="font-semibold text-foreground">{totalReferrals}</span></p>
              <p className="text-muted-foreground">Successful Conversions: <span className="font-semibold text-foreground">{successfulConversions}</span></p>
              <p className="text-muted-foreground">Conversion Rate: <span className="font-semibold text-foreground">{conversionRate}%</span></p>
              <div className="h-48 mt-4">
                <ChartContainer config={{ referrals: { label: "Referrals" } }} className="w-full h-full">
                  <PieChart accessibilityLayer>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                    <Pie data={mockAffiliateReferralSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} labelLine={false} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                      {mockAffiliateReferralSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          <Card className={cardBaseClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><DollarSign className="text-primary" /> Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">₹{totalEarnings.toLocaleString('en-IN')}</p>
              <p className="text-xs text-muted-foreground">This Month</p>
               <div className="h-48 mt-4">
                 <ChartContainer config={{ earnings: { label: "Earnings (₹)", color: "hsl(var(--chart-2))" } }} className="w-full h-full">
                    <LineChart data={mockAffiliateEarningsData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }} accessibilityLayer>
                        <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={10}/>
                        <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="earnings" stroke="var(--color-earnings)" strokeWidth={2} dot={false} />
                    </LineChart>
                 </ChartContainer>
              </div>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => router.push('/dashboard/affiliate/earnings-report')}>View Earnings Report</Button>
            </CardContent>
          </Card>
           <Card className={cardBaseClass}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Link2 className="text-primary" /> Your Referral Link</CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground truncate bg-muted p-2 rounded-md">https://nexcfs.com/ref/your-unique-id</p>
               <Button variant="ghost" size="sm" className="mt-2" onClick={handleCopyLink}>Copy Link</Button>
            </CardContent>
          </Card>
        </div>
      );
    default:
      return (
        <Card className="w-full max-w-md mx-auto shadow-lg animate-in fade-in zoom-in-95 duration-500">
            <CardHeader className="items-center text-center">
              <LayoutDashboard className="w-12 h-12 text-primary mb-2" />
              <CardTitle>Loading Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-muted-foreground">Please wait while we prepare your dashboard...</p>
            </CardContent>
        </Card>
      );
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string>("User");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    try {
      const loggedInStatus = localStorage.getItem('isUserLoggedIn') === 'true';
      const role = localStorage.getItem('currentUserRole') as UserRole;
      const name = localStorage.getItem('currentUserName');

      setIsLoggedIn(loggedInStatus);
      if (loggedInStatus) {
        setCurrentUserRole(role);
        setUserName(name || `${role || ''} User`);
      } else {
        setCurrentUserRole(null);
        setUserName("User");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setIsLoggedIn(false);
      setCurrentUserRole(null);
      setUserName("User");
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('isUserLoggedIn');
      localStorage.removeItem('currentUserRole');
      localStorage.removeItem('currentUserName');
      localStorage.removeItem('registeredUserEmail');
      localStorage.removeItem('registeredUserRole');
      localStorage.removeItem('registeredUserPassword');
      localStorage.removeItem('registeredUserName');
    } catch (error) {
        console.error("Error clearing localStorage:", error);
    }
    setIsLoggedIn(false);
    setCurrentUserRole(null);
    setUserName("User");
    toast({ 
      title: "Logged Out Successfully!",
      description: "You have been securely logged out.",
    });
    router.push('/login');
  };

  return (
    <MainLayout>
      <PageSection
        title={isLoading ? "Loading Dashboard..." : (isLoggedIn && userName ? `Welcome Back, ${userName}!` : "Your Dashboard")}
        subtitle={isLoading ? "Please wait..." : (isLoggedIn && currentUserRole ? `Here's an overview of your activities as a ${currentUserRole}.` : "Please log in to access your dashboard.")}
      >
        {isLoggedIn && (
          <div className="flex justify-end mb-6">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        )}
        {isLoading ? (
           <div className="flex justify-center items-center h-64">
            <LayoutDashboard className="w-12 h-12 text-primary animate-pulse" />
            <p className="ml-4 text-muted-foreground">Fetching your details...</p>
           </div>
        ) : isLoggedIn && currentUserRole ? (
          <UserRoleSpecificContent role={currentUserRole} />
        ) : (
          <Card className="w-full max-w-md mx-auto shadow-lg animate-in fade-in zoom-in-95 duration-500">
            <CardHeader className="items-center text-center">
              <LayoutDashboard className="w-12 h-12 text-primary mb-2" />
              <CardTitle>Access Your Dashboard</CardTitle>
              <CardDescription>Log in to manage your account, track your progress, and access personalized features.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild size="lg">
                <Link href="/login">Log In</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </PageSection>
    </MainLayout>
  );
}
