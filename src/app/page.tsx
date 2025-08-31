import { generateLandingPageContent } from "@/ai/flows/generate-landing-page-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardPen, Timer, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const content = await generateLandingPageContent({
    targetAudience: 'patients'
  });

  const features = [
    {
      title: "Streamlined Booking",
      description: "Easily book appointments with your preferred hospital and doctor in just a few clicks.",
      icon: <ClipboardPen className="w-12 h-12 text-primary" />,
    },
    {
      title: "Real-Time Queue",
      description: "See your position in the queue live and get accurate wait time predictions.",
      icon: <Users className="w-12 h-12 text-primary" />,
    },
    {
      title: "Reduced Wait Times",
      description: "Our smart system optimizes schedules to get you seen faster.",
      icon: <Timer className="w-12 h-12 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="Hospital waiting room"
          fill
          className="object-cover -z-10 brightness-50"
          data-ai-hint="hospital waiting room"
          priority
        />
        <div className="container px-4 md:px-6 z-10">
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline tracking-tight">
              {content.headline}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              {content.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="font-bold">
                <Link href="/signup">{content.callToAction}</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="font-bold">
                <Link href="/dashboard">Check Wait Times</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-headline">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A simple, three-step process to a better healthcare experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <ClipboardPen className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-headline">1. Register & Book</h3>
              <p className="text-muted-foreground">
                Sign up in seconds and book an appointment with your chosen hospital.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-headline">2. Join the Queue</h3>
              <p className="text-muted-foreground">
                Receive your queue number digitally and monitor your progress in real-time.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <Timer className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-headline">3. Get Seen Faster</h3>
              <p className="text-muted-foreground">
                Arrive just in time for your appointment, thanks to our accurate wait time predictions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-headline">
              A New Standard in Patient Care
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {content.body}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline pt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-headline mb-4">
              Ready to Transform Your Hospital Visit?
            </h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Join QuickHealth today and experience healthcare that values your time.
            </p>
            <Button asChild size="lg" variant="secondary" className="font-bold">
              <Link href="/signup">{content.callToAction}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
