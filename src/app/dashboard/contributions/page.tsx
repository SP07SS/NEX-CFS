
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';

interface Contribution {
  id: string;
  projectName: string;
  amount: number;
  currency: string;
  date: string;
  status: 'Successful' | 'Pending' | 'Failed';
}

const mockContributions: Contribution[] = [
  { id: '1', projectName: 'EcoSolutions Inc.', amount: 1000, currency: 'INR', date: '2024-11-10', status: 'Successful' },
  { id: '2', projectName: 'HealthTech Innovations', amount: 500, currency: 'INR', date: '2024-10-22', status: 'Successful' },
  { id: '3', projectName: 'Artisan Collective Support', amount: 750, currency: 'INR', date: '2024-09-15', status: 'Successful' },
  { id: '4', projectName: 'Community Garden Project', amount: 200, currency: 'INR', date: '2024-08-01', status: 'Pending' },
  { id: '5', projectName: 'Tech for Good Initiative', amount: 1200, currency: 'INR', date: '2024-07-20', status: 'Successful' },
  { id: '6', projectName: 'Local Animal Shelter Fund', amount: 300, currency: 'INR', date: '2024-06-05', status: 'Failed' },
];

export default function ContributionsPage() {
  const router = useRouter();

  const getStatusClass = (status: Contribution['status']) => {
    switch (status) {
      case 'Successful':
        return 'text-green-500';
      case 'Pending':
        return 'text-yellow-500';
      case 'Failed':
        return 'text-red-500';
      default:
        return '';
    }
  };

  return (
    <MainLayout>
      <PageSection
        title="Your Contribution History"
        subtitle="Review all the projects you've supported and their current status."
      >
        <div className="flex justify-start mb-6">
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            {mockContributions.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockContributions.map((contribution) => (
                    <TableRow key={contribution.id}>
                      <TableCell className="font-medium">{contribution.projectName}</TableCell>
                      <TableCell className="text-right">{contribution.currency} {contribution.amount.toLocaleString()}</TableCell>
                      <TableCell>{contribution.date}</TableCell>
                      <TableCell className={getStatusClass(contribution.status)}>{contribution.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center">You haven't made any contributions yet.</p>
            )}
          </CardContent>
        </Card>
      </PageSection>
    </MainLayout>
  );
}
