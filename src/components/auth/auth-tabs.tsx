import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import SignupForm from "./signup-form";
import LoginForm from "./login-form";
import { Hospital, User } from "lucide-react";

type AuthTabsProps = {
  mode: 'login' | 'signup';
};

export default function AuthTabs({ mode }: AuthTabsProps) {
  const title = mode === 'login' ? 'Welcome Back!' : 'Create an Account';
  const description = mode === 'login' ? 'Log in to access your dashboard.' : 'Sign up to get started with QueueWise.';

  return (
    <Tabs defaultValue="patient" className="w-full max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patient"><User className="mr-2 h-4 w-4" /> Patient</TabsTrigger>
            <TabsTrigger value="hospital"><Hospital className="mr-2 h-4 w-4" /> Hospital</TabsTrigger>
          </TabsList>
          <TabsContent value="patient">
            {mode === 'signup' ? <SignupForm userType="patient" /> : <LoginForm userType="patient" />}
          </TabsContent>
          <TabsContent value="hospital">
            {mode === 'signup' ? <SignupForm userType="hospital" /> : <LoginForm userType="hospital" />}
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
