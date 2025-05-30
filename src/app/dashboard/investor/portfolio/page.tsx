
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function InvestmentPortfolioPage() {
  const router = useRouter();

  return (
    <MainLayout>
      <PageSection
        title="Investment Portfolio Management"
        subtitle="Manage and track your investments."
      >
        <div className="flex justify-start mb-6">
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-muted-foreground">
              This feature is coming soon. Here you will be able to view detailed performance of your investments, manage holdings, and see transaction history.
            </p>
          </CardContent>
        </Card>
      </PageSection>
    </MainLayout>
  );
}
