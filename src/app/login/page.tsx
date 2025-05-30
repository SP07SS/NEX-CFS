
"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from 'next/navigation';
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
import { toast } from "@/hooks/use-toast";

const loginFormSchema = z.object({
  emailOrMobile: z.string().min(1, { message: "Email or Mobile Number is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { emailOrMobile: "", password: "" },
    mode: "onChange",
  });

  function onSubmit(data: LoginFormValues) {
    const sampleUser = {
      email: 'test@example.com',
      password: 'password123',
      role: 'Crowdfunder', // Changed from 'Affiliate' to 'Crowdfunder'
      name: 'Test Crowdfunder' // Changed name for clarity
    };

    // Check against sample user first
    if (data.emailOrMobile === sampleUser.email && data.password === sampleUser.password) {
      try {
        localStorage.setItem('isUserLoggedIn', 'true');
        localStorage.setItem('currentUserRole', sampleUser.role);
        localStorage.setItem('currentUserName', sampleUser.name);
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${sampleUser.name}! (Sample User)`,
        });
        router.push('/dashboard');
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        toast({
          title: "Login Error",
          description: "Could not perform login with sample user. localStorage might be disabled.",
          variant: "destructive",
        });
      }
      return; // Exit after sample user login attempt
    }

    // If not sample user, check localStorage for registered user
    try {
      const registeredEmail = localStorage.getItem('registeredUserEmail');
      const registeredPassword = localStorage.getItem('registeredUserPassword');
      const registeredRole = localStorage.getItem('registeredUserRole');
      const registeredUserName = localStorage.getItem('registeredUserName');

      if (registeredEmail && data.emailOrMobile === registeredEmail && data.password === registeredPassword) {
        localStorage.setItem('isUserLoggedIn', 'true');
        localStorage.setItem('currentUserRole', registeredRole || 'Borrower');
        localStorage.setItem('currentUserName', registeredUserName || 'User');
        toast({
          title: "Login Successful!",
          description: `Welcome back, ${registeredUserName || 'User'}!`,
        });
        router.push('/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email/mobile or password. Please check your credentials or register.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      toast({
        title: "Login Error",
        description: "Could not perform login. localStorage might be disabled.",
        variant: "destructive",
      });
    }
  }

  return (
    <AuthLayout
        title="Welcome Back!"
        description="Log in to access your NEX CFS account."
      >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="emailOrMobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
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
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <Link href="/forgot-password"
                className="text-sm text-primary hover:underline">
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
