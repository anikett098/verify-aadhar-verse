import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UserFormData } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select a gender"),
  mobile: z.string().length(10, "Mobile number must be 10 digits"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "Please select a state"),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
  isNewApplication: z.boolean(),
  existingAadhar: z.string().optional().refine((val) => {
    if (!val) return true;
    return val.length === 12 || val.length === 0;
  }, {
    message: "Aadhar number must be 12 digits",
  }).superRefine((val, ctx) => {
    const formData = ctx.path[0] === "existingAadhar" ? ctx.input : {};
    if (formData.isNewApplication === false && (!val || val.length !== 12)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Aadhar number must be 12 digits for updates",
      });
      return false;
    }
    return true;
  }),
});

const CreateUpdateAadhar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUpdate = new URLSearchParams(location.search).get("update") === "true";
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dob: "",
      gender: "",
      mobile: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      isNewApplication: !isUpdate,
      existingAadhar: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    sessionStorage.setItem("aadharFormData", JSON.stringify(values));
    toast({
      title: "Form submitted successfully",
      description: "Proceeding to verification...",
    });
    navigate("/verification");
  };

  const isNewApplication = form.watch("isNewApplication");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-10">
        <div className="aadhar-container max-w-3xl">
          <div className="aadhar-card">
            <h1 className="text-3xl font-bold text-primary mb-6">
              {isNewApplication ? "Apply for New Aadhar" : "Update Existing Aadhar"}
            </h1>
            
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Button
                  type="button"
                  variant={isNewApplication ? "default" : "outline"}
                  className={isNewApplication ? "aadhar-button-primary" : ""}
                  onClick={() => form.setValue("isNewApplication", true)}
                >
                  New Application
                </Button>
                <Button
                  type="button"
                  variant={!isNewApplication ? "default" : "outline"}
                  className={!isNewApplication ? "aadhar-button-primary" : ""}
                  onClick={() => form.setValue("isNewApplication", false)}
                >
                  Update Existing
                </Button>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {!isNewApplication && (
                  <FormField
                    control={form.control}
                    name="existingAadhar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Existing Aadhar Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter 12-digit Aadhar number" 
                            {...field} 
                            maxLength={12}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
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
                    name="dob"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <Label htmlFor="other">Other</Label>
                            </div>
                          </RadioGroup>
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
                          <Input placeholder="Enter mobile number" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                            <SelectItem value="kerala">Kerala</SelectItem>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                            <SelectItem value="telangana">Telangana</SelectItem>
                            <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                            <SelectItem value="west-bengal">West Bengal</SelectItem>
                            {/* Add other states */}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIN Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter 6-digit PIN code" {...field} maxLength={6} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full aadhar-button-primary">
                  Proceed to Verification
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateUpdateAadhar;
