
"use client";

import React from 'react'; // Added this line
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MessageSquare, MapPin, Send, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from "next/link";

const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, {message: "Subject must be at least 5 characters."}),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { fullName: "", email: "", subject: "", message: "" },
    mode: "onChange",
  });

  function onSubmit(data: ContactFormValues) {
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });
    console.log(data);
    form.reset();
  }

  return (
    <MainLayout>
      <PageSection
        title="Get in Touch"
        subtitle="We're here to help! Whether you have a question about our services, need support, or want to give feedback, please don't hesitate to reach out."
      >
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" /> Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the subject of your message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your message" {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
              <Card>
                  <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0"/>
                          <div>
                              <h4 className="font-semibold">Email Support</h4>
                              <Link href="mailto:support@nexcfs.com" className="text-sm text-muted-foreground hover:text-primary">support@nexcfs.com</Link>
                          </div>
                      </div>
                      <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0"/>
                           <div>
                              <h4 className="font-semibold">Phone Support</h4>
                              <p className="text-sm text-muted-foreground">+91 123 456 7890</p>
                          </div>
                      </div>
                       <div className="flex items-start gap-3">
                          <MessageSquare className="w-5 h-5 text-primary mt-1 flex-shrink-0"/>
                           <div>
                              <h4 className="font-semibold">WhatsApp Support</h4>
                              <Link href="https://wa.me/911234567890" target="_blank" className="text-sm text-muted-foreground hover:text-primary">+91 123 456 7890</Link>
                          </div>
                      </div>
                      <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0"/>
                          <div>
                              <h4 className="font-semibold">Office Address</h4>
                              <p className="text-sm text-muted-foreground">123 Finance Street, Digital City, India 560001</p>
                              <p className="text-xs text-muted-foreground mt-1">(Google Map Placeholder)</p>
                              {/* Example for actual map: <iframe src="google_map_embed_url"></iframe> */}
                          </div>
                      </div>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader><CardTitle>Connect With Us</CardTitle></CardHeader>
                  <CardContent className="flex space-x-4">
                      <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook size={24} /></Link>
                      <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary"><Twitter size={24} /></Link>
                      <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary"><Linkedin size={24} /></Link>
                       <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram size={24} /></Link>
                  </CardContent>
              </Card>
          </div>
        </div>
      </PageSection>
    </MainLayout>
  );
}
