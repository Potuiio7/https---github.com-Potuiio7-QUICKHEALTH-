"use server";

import { predictRealTimeWaitTimes, PredictRealTimeWaitTimesInput } from "@/ai/flows/predict-real-time-wait-times";
import { z } from "zod";

const WaitTimeSchema = z.object({
    currentNumber: z.coerce.number().min(0, "Current number must be positive."),
    estimatedWaitMinutes: z.coerce.number().min(0, "Wait time must be positive."),
    appointmentSchedule: z.string().min(1, "Appointment schedule is required."),
});

export type WaitTimeState = {
    prediction?: {
        predictedWaitTime: number;
        reasoning: string;
    };
    error?: string;
    message?: string;
};

export async function predictWaitTimeAction(
    prevState: WaitTimeState,
    formData: FormData
): Promise<WaitTimeState> {

    const validatedFields = WaitTimeSchema.safeParse({
        currentNumber: formData.get('currentNumber'),
        estimatedWaitMinutes: formData.get('estimatedWaitMinutes'),
        appointmentSchedule: formData.get('appointmentSchedule'),
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.toString(),
        };
    }

    const aiInput: PredictRealTimeWaitTimesInput = {
        ...validatedFields.data,
        hospitalId: "mock-hospital-123", // Using a mock ID
    };

    try {
        const result = await predictRealTimeWaitTimes(aiInput);
        return { prediction: result };
    } catch (e) {
        const error = e instanceof Error ? e.message : "An unknown error occurred.";
        return { error };
    }
}
