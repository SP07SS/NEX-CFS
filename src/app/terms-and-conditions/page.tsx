
"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function TermsAndConditionsPage() {
  const [lastUpdatedDate, setLastUpdatedDate] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdatedDate(new Date().toLocaleDateString());
  }, []);

  return (
    <MainLayout>
      <PageSection
        title="Terms and Conditions"
        subtitle="Please read these terms and conditions carefully before using the NEX CFS platform."
      >
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="flex flex-row items-center gap-3">
            <FileText className="w-7 h-7 text-primary" />
            <CardTitle>Our Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            {lastUpdatedDate && <p>Last Updated: {lastUpdatedDate}</p>}
            
            <div id="platform-use">
              <h3 className="text-xl font-semibold text-foreground mb-2">1. Use of Platform</h3>
              <p>
                Welcome to NEX CFS. By accessing or using our platform, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree with any part of these terms, you must not use our platform.
              </p>
            </div>
            
            <div id="loan-repayment">
              <h3 className="text-xl font-semibold text-foreground mb-2">2. Loan Repayment Terms</h3>
              <p>
                Specific terms for loan repayment, including interest rates, tenure, EMI schedules, and penalties for late payment, will be detailed in your individual loan agreement. It is your responsibility to understand and adhere to these terms.
              </p>
            </div>
            
            <div id="investment-risk">
              <h3 className="text-xl font-semibold text-foreground mb-2">3. Investment Risk Warning</h3>
              <p>
                All investments carry risk. NEX CFS provides a platform for investment opportunities, but we do not guarantee returns. The value of investments can go down as well as up. You should carefully consider your risk appetite and seek independent financial advice if necessary before investing.
              </p>
            </div>
            
            <div id="crowdfunding-process">
              <h3 className="text-xl font-semibold text-foreground mb-2">4. Crowdfunding Process</h3>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>
                  <strong>For Contributors/Supporters:</strong> Contributions made through our platform are subject to terms outlined for each campaign. While we vet projects, NEX CFS is not responsible for the ultimate success or failure of crowdfunded projects.
                </li>
                <li>
                  <strong>For Creators:</strong> If you are raising funds, you agree to use the funds for the stated purpose and provide regular updates to your backers as per platform guidelines.
                </li>
              </ul>
            </div>
            
            <div id="affiliate-earnings">
              <h3 className="text-xl font-semibold text-foreground mb-2">5. Affiliate Earnings</h3>
              <p>
                Affiliate commissions are earned based on successful referrals as per the terms of the Affiliate Program. NEX CFS reserves the right to modify commission structures and program terms. Payouts are subject to verification and adherence to program policies.
              </p>
            </div>

            <div id="trading">
              <h3 className="text-xl font-semibold text-foreground mb-2">6. Trading &amp; Market Services Terms</h3>
              <p>
                Access to trading services is subject to additional terms and conditions related to market risks, brokerage, and regulatory compliance. You must agree to these specific terms before using any trading features.
              </p>
            </div>
            
            <div id="account-termination">
              <h3 className="text-xl font-semibold text-foreground mb-2">7. Termination of Account</h3>
              <p>
                NEX CFS reserves the right to suspend or terminate your account if you violate these Terms and Conditions, engage in fraudulent activity, or for any other reason deemed necessary to protect the integrity of the platform.
              </p>
            </div>

            <div id="terms-changes">
              <h3 className="text-xl font-semibold text-foreground mb-2">8. Changes to Terms</h3>
              <p>
                We may update these Terms and Conditions from time to time. We will notify you of any significant changes. Your continued use of the platform after such changes constitutes your acceptance of the new terms.
              </p>
            </div>

            <div id="contact-legal">
              <h3 className="text-xl font-semibold text-foreground mb-2">9. Contact Us</h3>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:legal@nexcfs.com" className="text-primary hover:underline">legal@nexcfs.com</a>.
              </p>
            </div>
          </CardContent>
        </Card>
      </PageSection>
    </MainLayout>
  );
}
