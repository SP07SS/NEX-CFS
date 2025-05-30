
"use client";

import React, { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import PageSection from '@/components/page-section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HelpCircle, Bot, Send } from 'lucide-react';
import { askLegalQuestion, LegalQaInput } from '@/ai/flows/legal-qa-flow'; // Import the AI flow
import { toast } from '@/hooks/use-toast';

export default function LegalQAPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer(""); 

    try {
      const input: LegalQaInput = { question };
      const result = await askLegalQuestion(input);
      setAnswer(result.answer);
    } catch (error) {
      console.error("Error calling Legal Q&A flow:", error);
      setAnswer("Sorry, I encountered an error trying to answer your question. Please try again later.");
      toast({
        title: "Error",
        description: "Could not get an answer from the AI assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
    // setQuestion(""); // Optionally clear question after asking
  };

  return (
    <MainLayout>
      <PageSection
        title="Legal Information Q&A"
        subtitle="Have questions about our Terms & Conditions or Privacy Policy? Ask our AI assistant for a summary or clarification. This feature provides general information and is not a substitute for legal advice."
      >
        <Card className="max-w-2xl mx-auto shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-primary" /> AI-Powered Legal Assistant
            </CardTitle>
            <CardDescription>
              Type your question below regarding our legal documents. For example: "Summarize the section on account termination." or "What data do you collect?"
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleAskQuestion} className="space-y-4">
              <div>
                <label htmlFor="legal-question" className="block text-sm font-medium text-foreground mb-1">
                  Your Question
                </label>
                <Input
                  id="legal-question"
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g., What is your data retention policy?"
                  disabled={isLoading}
                  className="bg-input"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !question.trim()}>
                {isLoading ? (
                  <>
                    <Bot className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Ask AI Assistant
                  </>
                )}
              </Button>
            </form>

            {isLoading && !answer && (
                <div className="text-center text-muted-foreground pt-4">
                    <Bot className="mx-auto h-8 w-8 animate-pulse text-primary" />
                    <p className="mt-2">Thinking...</p>
                </div>
            )}

            {answer && !isLoading && (
              <Card className="bg-muted/30 animate-in fade-in zoom-in-95 duration-500 mt-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary"/> AI Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{answer}</p>
                </CardContent>
              </Card>
            )}
            
            <CardDescription className="text-xs text-center pt-4">
              Disclaimer: The AI assistant provides summaries and answers based on our published legal documents. This information is for general guidance only and does not constitute legal advice. For specific legal concerns, please consult with a legal professional.
            </CardDescription>
          </CardContent>
        </Card>
      </PageSection>
    </MainLayout>
  );
}
