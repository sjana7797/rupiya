"use client";

import { useState, useEffect, type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent } from "~/components/ui/card";
import { Slider } from "~/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import {
  CheckCircle,
  Star,
  ArrowRight,
  Menu,
  Calculator,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import RupyaLogo from "~/assets/image/rupya-logo.png";
import banner from "~/assets/image/drawing-man-woman-shaking-hands-with-stacks-books_979520-107172-removebg-preview.png";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerChildren = {
  animate: {
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const ScrollAnimationWrapper = ({ children }: { children: ReactNode }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      void controls.start("animate");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={controls}
      variants={fadeIn}
    >
      {children}
    </motion.div>
  );
};

export default function LandingPage() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTenure, setLoanTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const time = loanTenure;

    const emi =
      (principal * rate * Math.pow(1 + rate, time)) /
      (Math.pow(1 + rate, time) - 1);
    setEmi(Math.round(emi));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7fa]">
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center">
            <Image src={RupyaLogo} alt="Rupya Logo" className="h-14 w-auto" />
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              About Us
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Products
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
          </nav>
          <Button className="md:hidden" variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="bg-[#0a2540] py-16 text-white md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                  Business Loans Made Easy
                </h1>
                <p className="text-xl">
                  Get quick access to working capital loans up to ₹2 crore with
                  minimal documentation.
                </p>
                <form className="flex flex-col gap-4 sm:flex-row">
                  <Input
                    className="bg-white text-black"
                    placeholder="Enter your mobile number"
                    type="tel"
                  />
                  <Button className="bg-[#ffd400] text-[#0a2540] hover:bg-[#ffd400]/90">
                    Apply Now
                  </Button>
                </form>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={banner}
                  alt="Business Loan"
                  className="h-96 w-auto rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <ScrollAnimationWrapper>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-center text-3xl font-bold text-[#0a2540]">
                Why Choose Rupya?
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  {
                    title: "Quick Disbursal",
                    description:
                      "Get funds in your account within 3 days of approval.",
                  },
                  {
                    title: "Minimal Documentation",
                    description:
                      "Easy application process with minimal paperwork required.",
                  },
                  {
                    title: "Flexible Repayment",
                    description:
                      "Choose a repayment plan that suits your business needs.",
                  },
                ].map((feature, index) => (
                  <Card key={index} className="h-full">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                        <CheckCircle className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <section className="bg-white py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-center text-3xl font-bold text-[#0a2540]">
                How It Works
              </h2>
              <div className="grid gap-8 md:grid-cols-4">
                {[
                  {
                    title: "Apply Online",
                    description: "Fill out our simple online application form.",
                  },
                  {
                    title: "Quick Verification",
                    description: "We'll verify your details promptly.",
                  },
                  {
                    title: "Loan Approval",
                    description: "Get your loan approved within hours.",
                  },
                  {
                    title: "Receive Funds",
                    description: "Funds transferred to your account in 3 days.",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffd400] text-2xl font-bold text-[#0a2540]">
                      {index + 1}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <section className="bg-[#f5f7fa] py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-center text-3xl font-bold text-[#0a2540]">
                Now getting a loan is just a text away
              </h2>
              <div className="mx-auto max-w-4xl">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-[#0a2540]">
                          Apply via WhatsApp
                        </h3>
                        <p className="text-gray-600">
                          Get your loan approved quickly and easily through
                          WhatsApp. Our AI-powered chatbot will guide you
                          through the entire process.
                        </p>
                        <div className="flex items-center space-x-4">
                          <MessageSquare className="h-12 w-12 text-green-500" />
                          <div>
                            <p className="font-semibold">WhatsApp us at</p>
                            <p className="text-xl font-bold text-green-500">
                              +91 98765 43210
                            </p>
                          </div>
                        </div>
                        <Button className="w-full bg-green-500 hover:bg-green-600">
                          Start WhatsApp Chat
                        </Button>
                      </div>
                      <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-[#0a2540]">
                          Calculate your EMI
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor="loanAmount"
                              className="mb-1 block text-sm font-medium text-gray-700"
                            >
                              Loan Amount: ₹{loanAmount.toLocaleString()}
                            </label>
                            <Slider
                              id="loanAmount"
                              min={10000}
                              max={2000000}
                              step={10000}
                              value={[loanAmount]}
                              onValueChange={(value) =>
                                setLoanAmount(value[0] ?? 0)
                              }
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="interestRate"
                              className="mb-1 block text-sm font-medium text-gray-700"
                            >
                              Interest Rate: {interestRate}% per annum
                            </label>
                            <Slider
                              id="interestRate"
                              min={8}
                              max={24}
                              step={0.5}
                              value={[interestRate]}
                              onValueChange={(value) =>
                                setInterestRate(value[0] ?? 0)
                              }
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="loanTenure"
                              className="mb-1 block text-sm font-medium text-gray-700"
                            >
                              Loan Tenure: {loanTenure} months
                            </label>
                            <Slider
                              id="loanTenure"
                              min={3}
                              max={36}
                              step={1}
                              value={[loanTenure]}
                              onValueChange={(value) =>
                                setLoanTenure(value[0] ?? 0)
                              }
                            />
                          </div>
                        </div>
                        <div className="rounded-lg bg-[#ffd400] p-4 text-center">
                          <p className="text-2xl font-bold text-[#0a2540]">
                            Your EMI: ₹{emi.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-center text-3xl font-bold text-[#0a2540]">
                What Our Customers Say
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                {[
                  {
                    name: "Rahul S.",
                    business: "Small Business Owner",
                    quote:
                      "Rupya made it incredibly easy for me to get the working capital I needed for my business. The process was quick and hassle-free.",
                  },
                  {
                    name: "Priya M.",
                    business: "Entrepreneur",
                    quote:
                      "I was impressed by how quickly Rupya processed my loan application. The funds were in my account within days, helping me seize a time-sensitive business opportunity.",
                  },
                ].map((testimonial, index) => (
                  <Card key={index} className="h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center">
                        {Array({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-[#ffd400]" />
                        ))}
                      </div>
                      <p className="mb-4 text-gray-600">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="flex items-center">
                        <div className="mr-4 h-12 w-12 rounded-full bg-gray-200"></div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">
                            {testimonial.business}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper>
          <section className="bg-white py-16">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-center text-3xl font-bold text-[#0a2540]">
                Frequently Asked Questions
              </h2>
              <Accordion
                type="single"
                collapsible
                className="mx-auto w-full max-w-3xl"
              >
                {[
                  {
                    question:
                      "What is the maximum loan amount I can apply for?",
                    answer:
                      "You can apply for a business loan of up to ₹2 crore with Rupya, depending on your business profile and eligibility.",
                  },
                  {
                    question: "What documents do I need to apply for a loan?",
                    answer:
                      "The basic documents required are your PAN card, Aadhaar card, bank statements for the last 6 months, and business proof. Additional documents may be required based on your business type and loan amount.",
                  },
                  {
                    question: "How long does it take to get loan approval?",
                    answer:
                      "At Rupya, we strive for quick approvals. Typically, you can expect a decision within 24-48 hours of submitting a complete application with all required documents.",
                  },
                  {
                    question: "What are the interest rates for business loans?",
                    answer:
                      "Our interest rates are competitive and can vary based on factors such as your business profile, loan amount, and tenure. Rates typically range from 12% to 24% per annum.",
                  },
                  {
                    question: "Can I repay my loan early?",
                    answer:
                      "Yes, you can repay your loan early. Rupya offers flexible repayment options, including the ability to make prepayments or foreclose your loan. Some terms and conditions may apply.",
                  },
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </ScrollAnimationWrapper>

        <section className="bg-[#0a2540] py-16 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4 text-3xl font-bold">
                Ready to Grow Your Business?
              </h2>
              <p className="mb-8 text-xl">
                Apply now and get the funds you need to take your business to
                the next level.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-[#ffd400] px-8 py-3 text-lg text-[#0a2540] hover:bg-[#ffd400]/90">
                  Apply for a Loan <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Image
                src="/placeholder.svg?height=40&width=180"
                alt="Rupya Logo"
                width={180}
                height={40}
                className="mb-4"
              />
              <p className="text-sm text-gray-600">
                Rupya is a leading fintech company providing business loans to
                SMEs across India.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Fair Practices Code
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Connect With Us</h3>
              <div className="flex space-x-4">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Rupya. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
