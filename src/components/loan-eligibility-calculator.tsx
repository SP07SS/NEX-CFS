
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const AFFORDABILITY_RATIO = 0.4; // 40% of disposable income for EMI

const LoanEligibilityCalculator: React.FC = () => {
  const [grossIncome, setGrossIncome] = useState<number>(50000);
  const [tenureYears, setTenureYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [otherEmis, setOtherEmis] = useState<number>(5000);

  const [loanEligibility, setLoanEligibility] = useState<number>(0);
  const [monthlyEmi, setMonthlyEmi] = useState<number>(0);

  const calculateEmi = useCallback((principal: number, ratePerAnnum: number, years: number): number => {
    if (principal <= 0 || years <= 0 || ratePerAnnum < 0) return 0;
    const monthlyRate = ratePerAnnum / 12 / 100;
    const numberOfMonths = years * 12;

    if (monthlyRate === 0) {
      return numberOfMonths > 0 ? Math.round(principal / numberOfMonths) : 0;
    }

    const emi =
      principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, numberOfMonths) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    return Math.round(emi);
  }, []);

  const calculatePrincipal = useCallback((emi: number, ratePerAnnum: number, years: number): number => {
    if (emi <= 0 || years <= 0 || ratePerAnnum < 0) return 0;
    const monthlyRate = ratePerAnnum / 12 / 100;
    const numberOfMonths = years * 12;

    if (monthlyRate === 0) {
      return numberOfMonths > 0 ? Math.round(emi * numberOfMonths) : 0;
    }
    
    const principal =
      (emi * (Math.pow(1 + monthlyRate, numberOfMonths) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths));
    return Math.round(principal);
  }, []);

  useEffect(() => {
    const disposableIncome = grossIncome - otherEmis;
    if (disposableIncome <= 0) {
      setLoanEligibility(0);
      setMonthlyEmi(0);
      return;
    }

    const maxAffordableEmi = Math.max(0, disposableIncome * AFFORDABILITY_RATIO);
    
    const calculatedEligibility = calculatePrincipal(maxAffordableEmi, interestRate, tenureYears);
    setLoanEligibility(calculatedEligibility);

    if (calculatedEligibility > 0) {
        const calculatedEmiForEligibility = calculateEmi(calculatedEligibility, interestRate, tenureYears);
        setMonthlyEmi(calculatedEmiForEligibility);
    } else {
        setMonthlyEmi(0);
    }

  }, [grossIncome, tenureYears, interestRate, otherEmis, calculateEmi, calculatePrincipal]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSliderChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (value: number[]) => {
    setter(value[0]);
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>, min: number, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value)) { // Allow temporary empty input for user experience
      setter(min); // Or some other default, or allow NaN to be handled in calculation
      return;
    }
    if (value < min) value = min;
    if (value > max) value = max;
    setter(value);
  };
  
  const formatSliderLabel = (value: number, type: 'currency' | 'year' | 'percent') => {
    if (type === 'currency') {
        if (value >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`;
        if (value >= 100000) return `${(value / 100000).toFixed(1)} L`;
        if (value >= 1000) return `${(value / 1000).toFixed(0)} K`;
        return `${value}`;
    }
    if (type === 'year') return `${value} Yrs`;
    if (type === 'percent') return `${value.toFixed(2)}%`;
    return `${value}`;
  }


  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Calculate Loan Eligibility</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-3 gap-8 items-start">
        {/* Inputs Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Gross Income */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="grossIncomeInput" className="text-sm font-medium">Gross Income (Monthly)</Label>
              <Input
                type="number"
                id="grossIncomeInput"
                value={grossIncome}
                onChange={handleInputChange(setGrossIncome, 10000, 10000000)}
                min={10000} max={10000000}
                className="w-36 h-8 text-sm text-right"
                placeholder="e.g. 50000"
              />
            </div>
            <Slider
              id="grossIncomeSlider"
              min={10000}
              max={10000000}
              step={5000}
              value={[grossIncome]}
              onValueChange={handleSliderChange(setGrossIncome)}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatSliderLabel(10000, 'currency')}</span>
              <span>{formatSliderLabel(10000000, 'currency')}</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="tenureYearsInput" className="text-sm font-medium">Tenure (Years)</Label>
               <Input
                type="number"
                id="tenureYearsInput"
                value={tenureYears}
                onChange={handleInputChange(setTenureYears, 1, 30)} // Max tenure 30 years is common
                min={1} max={30}
                className="w-24 h-8 text-sm text-right"
                 placeholder="e.g. 20"
              />
            </div>
            <Slider
              id="tenureYearsSlider"
              min={1}
              max={30} 
              step={1}
              value={[tenureYears]}
              onValueChange={handleSliderChange(setTenureYears)}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatSliderLabel(1, 'year')}</span>
              <span>{formatSliderLabel(30, 'year')}</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="interestRateInput" className="text-sm font-medium">Interest Rate (% P.A.)</Label>
              <Input
                type="number"
                id="interestRateInput"
                value={interestRate}
                onChange={handleInputChange(setInterestRate, 0.1, 20)} // Max rate 20%
                step={0.01} min={0.1} max={20}
                className="w-24 h-8 text-sm text-right"
                placeholder="e.g. 8.5"
              />
            </div>
            <Slider
              id="interestRateSlider"
              min={0.1}
              max={20}
              step={0.01}
              value={[interestRate]}
              onValueChange={handleSliderChange(setInterestRate)}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatSliderLabel(0.1, 'percent')}</span>
              <span>{formatSliderLabel(20, 'percent')}</span>
            </div>
          </div>

          {/* Other EMIs */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="otherEmisInput" className="text-sm font-medium">Other EMIs (Monthly)</Label>
              <Input
                type="number"
                id="otherEmisInput"
                value={otherEmis}
                 onChange={handleInputChange(setOtherEmis, 0, 500000)}
                min={0} max={500000}
                className="w-36 h-8 text-sm text-right"
                placeholder="e.g. 5000"
              />
            </div>
            <Slider
              id="otherEmisSlider"
              min={0}
              max={500000} 
              step={1000}
              value={[otherEmis]}
              onValueChange={handleSliderChange(setOtherEmis)}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatSliderLabel(0, 'currency')}</span>
              <span>{formatSliderLabel(500000, 'currency')}</span>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="md:col-span-1 space-y-6 p-6 bg-muted/50 rounded-lg flex flex-col justify-center items-center text-center">
          <div>
            <p className="text-sm text-muted-foreground">Loan Eligibility</p>
            <p className="text-3xl font-bold text-primary my-1">{formatCurrency(loanEligibility)}</p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Loan EMI</p>
            <p className="text-2xl font-semibold text-foreground my-1">{formatCurrency(monthlyEmi)} <span className="text-xs">/month</span></p>
          </div>
          <Button className="w-full mt-6" size="lg">Apply Now</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanEligibilityCalculator;

    