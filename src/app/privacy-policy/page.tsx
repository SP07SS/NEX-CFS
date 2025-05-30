
"use client";

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [lastUpdatedDate, setLastUpdatedDate] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdatedDate(new Date().toLocaleDateString());
  }, []);

  return (
    <MainLayout>
      <PageSection
        title="Privacy Policy"
        subtitle="Your privacy is important to us. This policy explains how NEX CFS collects, uses, and protects your personal information."
      >
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="flex flex-row items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-primary" />
            <CardTitle>Our Commitment to Your Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            {lastUpdatedDate && <p>Last Updated: {lastUpdatedDate}</p>}

            <div id="data-collection">
              <h3 className="text-xl font-semibold text-foreground mb-2">1. What Data We Collect</h3>
              <p>
                We collect information you provide directly to us, such as when you create an account, apply for a loan, make an investment, or communicate with us. This may include:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Personal identification information (Name, email address, phone number, Aadhar, PAN)</li>
                <li>Financial information (Bank account details, income details, credit history)</li>
                <li>Transactional information (Details about loans, investments, donations)</li>
                <li>Technical data (IP address, browser type, device information, usage data through cookies)</li>
              </ul>
            </div>

            <div id="data-usage">
              <h3 className="text-xl font-semibold text-foreground mb-2">2. How We Use Your Data</h3>
              <p>We use your data to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Provide, operate, and maintain our services</li>
                <li>Process your applications and transactions</li>
                <li>Verify your identity and perform credit checks</li>
                <li>Communicate with you, including customer support and service updates</li>
                <li>Improve and personalize our services</li>
                <li>Comply with legal and regulatory obligations</li>
                <li>Prevent fraud and enhance platform security</li>
              </ul>
            </div>

            <div id="data-security">
              <h3 className="text-xl font-semibold text-foreground mb-2">3. Data Security Measures</h3>
              <p>
                We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These include encryption, access controls, and regular security assessments. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </div>
            
            <div id="data-sharing">
              <h3 className="text-xl font-semibold text-foreground mb-2">4. Sharing Your Information</h3>
              <p>
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Third-party service providers who assist us in operating our platform (e.g., payment processors, credit bureaus), under strict confidentiality agreements.</li>
                <li>Regulatory authorities or law enforcement agencies if required by law.</li>
                <li>Other parties with your explicit consent.</li>
              </ul>
            </div>

            <div id="cookies">
              <h3 className="text-xl font-semibold text-foreground mb-2">5. Cookies and Tracking Technologies</h3>
              <p>
                We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </div>

            <div id="user-rights">
              <h3 className="text-xl font-semibold text-foreground mb-2">6. Your Rights (GDPR/Data Protection)</h3>
              <p>Depending on your jurisdiction, you may have rights such as:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>The right to access, update, or delete the information we have on you.</li>
                <li>The right of rectification.</li>
                <li>The right to object to processing.</li>
                <li>The right of restriction of processing.</li>
                <li>The right to data portability.</li>
                <li>The right to withdraw consent.</li>
              </ul>
              <p className="mt-2">Please contact us to exercise these rights.</p>
            </div>
            
            <div id="policy-changes">
              <h3 className="text-xl font-semibold text-foreground mb-2">7. Changes to This Privacy Policy</h3>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </div>

            <div id="contact-privacy">
              <h3 className="text-xl font-semibold text-foreground mb-2">8. Contact for Privacy Concerns</h3>
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact our Data Protection Officer at <a href="mailto:privacy@nexcfs.com" className="text-primary hover:underline">privacy@nexcfs.com</a>.
              </p>
            </div>
          </CardContent>
        </Card>
      </PageSection>
    </MainLayout>
  );
}
