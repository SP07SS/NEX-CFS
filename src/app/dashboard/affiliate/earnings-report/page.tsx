
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function AffiliateEarningsReportPage() {
  const router = useRouter();

  return (
    <MainLayout>
      <PageSection
        title="Affiliate Earnings Report"
        subtitle="Track your referral earnings in detail."
      >
        <div className="flex justify-start mb-6">
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-muted-foreground">
              This feature is coming soon. You'll find detailed reports on your commissions, payout history, and referral performance here.
            </p>
          </CardContent>
        </Card>
      </PageSection>
    </MainLayout>
  );
}
