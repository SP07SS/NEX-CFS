
"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // Import useRouter
import AuthLayout from '@/components/auth-layout';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const registrationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  mobile: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  role: z.enum(["Borrower", "Investor", "Crowdfunder", "Affiliate"], { required_error: "Please select your role." }),
  acceptTerms: z.boolean().refine(val => val === true, { message: "You must accept the Terms & Privacy Policy." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

export default function RegisterPage() {
  const router = useRouter(); // Initialize useRouter
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      // role: undefined, // No need to set undefined for enum if it's required
      acceptTerms: false,
    },
    mode: "onChange",
  });

  function onSubmit(data: RegistrationFormValues) {
    const userDetailsForFiles = {
      fullName: data.fullName,
      email: data.email,
      mobile: data.mobile,
      role: data.role,
      registrationDate: new Date().toISOString(),
    };

    // Simulate saving to Excel
    console.log("SIMULATION: Saving user registration data to Excel file...");
    console.log("Excel Data:", JSON.stringify(userDetailsForFiles, null, 2));
    console.log("Excel Data would also include: Details of any uploaded documents (if this form collected them, e.g., file names, storage paths).");

    // Simulate creating user folder and saving documents/details
    console.log(`SIMULATION: Creating folder for user "${data.fullName}"...`);
    console.log(`SIMULATION: If documents were uploaded via this form, they would be saved to this folder for "${data.fullName}".`);
    console.log(`SIMULATION: Creating Word document with user details for "${data.fullName}" in their folder.`);
    console.log("Word File Content (summary):", JSON.stringify(userDetailsForFiles, null, 2));


    // Store registration details in localStorage for mock login
    try {
      localStorage.setItem('registeredUserEmail', data.email);
      localStorage.setItem('registeredUserRole', data.role);
      // Storing password in localStorage is highly insecure for real apps,
      // but for this prototype, we'll store a mock password to "verify".
      localStorage.setItem('registeredUserPassword', data.password);
      localStorage.setItem('registeredUserName', data.fullName);


      toast({
        title: "Registration Successful!",
        description: "Your registration is complete. Data saving has been simulated (check console for details). You can now log in.",
      });
      form.reset();
      router.push('/login'); // Redirect to login page
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      toast({
        title: "Registration Error",
        description: "Could not save registration details for mock login. localStorage might be disabled or full.",
        variant: "destructive",
      });
    }
  }

  return (
    <AuthLayout
        title="Create an Account"
        description="Join NEX CFS today to access a world of financial opportunities."
      >
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
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Enter your 10-digit mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Create a strong password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="I want to be a..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Borrower">Borrower</SelectItem>
                    <SelectItem value="Investor">Investor</SelectItem>
                    <SelectItem value="Crowdfunder">Crowdfunder (Project Supporter)</SelectItem>
                    <SelectItem value="Affiliate">Affiliate</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Accept Terms &amp; Conditions</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    By signing up, you agree to our <Link href="/terms-and-conditions" className="underline hover:text-primary">Terms</Link> and <Link href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link>.
                  </p>
                   <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Registering..." : "Create Account"}
          </Button>
        </form>
      </Form>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
