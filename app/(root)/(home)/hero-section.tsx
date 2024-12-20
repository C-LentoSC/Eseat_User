"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { Label } from "@/components/ui/label";

export function HeroSection() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    // Handle login submission here
    console.log(data);
  }

  return (
    <section className="relative min-h-[calc(100dvh-100px)] w-full overflow-hidden bg-hero-bg bg-cover bg-center py-24 flex">
      <div className=" grid my-container gap-8 lg:grid-cols-2 lg:gap-16 self-center">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-myColor2 sm:text-5xl">
            Best Bus Ticket Service
            <br />
            In Sri Lanka
          </h1>
          <p className="mb-8 max-w-lg text-gray-600">
            Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
          </p>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <Card className="w-full max-w-md xl:max-w-lg shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-center text-myColor2">
                Login to your account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="email" className=" text-myColor2">
                          Email
                        </Label>
                        <FormControl>
                          <Input
                            placeholder="example@gmail.com"
                            className="py-5"
                            type="email"
                            {...field}
                          />
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
                        <Label htmlFor="password" className=" text-myColor2">
                          Password
                        </Label>
                        <div className="relative">
                          <FormControl>
                            <Input
                              placeholder="Enter your password"
                              className="py-5"
                              type={showPassword ? "text" : "password"}
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-between">
                    <Button type="submit" className="w-full py-5 mt-5">
                      Login now
                    </Button>
                  </div>
                  <div className="text-right">
                    <Button variant="link" className="p-0">
                      Forgot?
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
