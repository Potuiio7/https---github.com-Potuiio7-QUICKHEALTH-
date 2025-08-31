"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Hospital } from "@/lib/types";

type SignupFormProps = {
  userType: 'patient' | 'hospital';
};

const patientSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  hospitalId: z.string({ required_error: "Please select a hospital." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const hospitalSchema = z.object({
  name: z.string().min(2, { message: "Hospital name is required." }),
  location: z.string().min(2, { message: "Location is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const formSchema = z.union([patientSchema, hospitalSchema]);

// Mock data for hospitals
const mockHospitals: Hospital[] = [
  { id: "1", name: "Accra General Hospital", location: "Accra", email: "", phone: "" },
  { id: "2", name: "Kumasi Polyclinic", location: "Kumasi", email: "", phone: "" },
  { id: "3", name: "Takoradi Medical Center", location: "Takoradi", email: "", phone: "" },
];

export default function SignupForm({ userType }: SignupFormProps) {
  const { toast } = useToast();
  const currentSchema = userType === 'patient' ? patientSchema : hospitalSchema;
  
  const form = useForm<z.infer<typeof currentSchema>>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      ...(userType === 'patient' && { hospitalId: "" }),
      ...(userType === 'hospital' && { location: "" }),
    },
  });

  function onSubmit(values: z.infer<typeof currentSchema>) {
    console.log("Signup form submitted:", { userType, ...values });
    // Placeholder for Firebase Auth and Firestore write
    toast({
      title: "Account Created",
      description: "Welcome to QuickHealth! Please check your email for verification.",
    });
    // Redirect logic would go here
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{userType === 'patient' ? "Full Name" : "Hospital Name"}</FormLabel>
              <FormControl>
                <Input placeholder={userType === 'patient' ? "John Doe" : "City General Hospital"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {userType === 'hospital' && (
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Accra, Ghana" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="024 123 4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {userType === 'patient' && (
          <FormField
            control={form.control}
            name="hospitalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Hospital</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a hospital" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockHospitals.map(hospital => (
                      <SelectItem key={hospital.id} value={hospital.id}>
                        {hospital.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign Up as {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </Button>
      </form>
    </Form>
  );
}
