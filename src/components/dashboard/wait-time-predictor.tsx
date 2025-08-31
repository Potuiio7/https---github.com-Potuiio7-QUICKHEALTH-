"use client";

import { useFormState, useFormStatus } from "react-dom";
import { predictWaitTimeAction, WaitTimeState } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Loader2 } from "lucide-react";

const initialState: WaitTimeState = {};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Predict Wait Time
        </Button>
    );
}

export default function WaitTimePredictor() {
  const [state, formAction] = useFormState(predictWaitTimeAction, initialState);

  const defaultAppointmentSchedule = JSON.stringify([
    { patientId: 'p001', date: new Date(Date.now() + 10 * 60 * 1000).toISOString() },
    { patientId: 'p002', date: new Date(Date.now() + 25 * 60 * 1000).toISOString() },
    { patientId: 'p003', date: new Date(Date.now() + 45 * 60 * 1000).toISOString() }
  ], null, 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Wait Time Predictor</CardTitle>
        <CardDescription>
          Enter current queue data to get a real-time wait time prediction.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentNumber">Current Number Serving</Label>
            <Input id="currentNumber" name="currentNumber" type="number" defaultValue="15" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimatedWaitMinutes">Current Est. Wait (minutes)</Label>
            <Input id="estimatedWaitMinutes" name="estimatedWaitMinutes" type="number" defaultValue="45" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appointmentSchedule">Appointment Schedule (JSON)</Label>
            <Textarea
              id="appointmentSchedule"
              name="appointmentSchedule"
              rows={6}
              defaultValue={defaultAppointmentSchedule}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <SubmitButton />
          {state?.error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          {state?.prediction && (
            <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Prediction Result</AlertTitle>
                <AlertDescription>
                    <p className="font-bold text-2xl text-primary">{state.prediction.predictedWaitTime} minutes</p>
                    <p className="text-sm text-muted-foreground mt-2">{state.prediction.reasoning}</p>
                </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
