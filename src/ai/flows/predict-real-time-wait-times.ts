'use server';
/**
 * @fileOverview Predicts real-time wait times for a hospital queue.
 *
 * - predictRealTimeWaitTimes - Predicts wait times based on queue and appointment data.
 * - PredictRealTimeWaitTimesInput - The input type for predictRealTimeWaitTimes.
 * - PredictRealTimeWaitTimesOutput - The output type for predictRealTimeWaitTimes.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictRealTimeWaitTimesInputSchema = z.object({
  currentNumber: z.number().describe('The current number being served.'),
  estimatedWaitMinutes: z.number().describe('The current estimated wait time in minutes.'),
  appointmentSchedule: z.string().describe('A stringified JSON array of appointments, including patientId and date.'),
  hospitalId: z.string().describe('The ID of the hospital for which to predict wait times.'),
});
export type PredictRealTimeWaitTimesInput = z.infer<typeof PredictRealTimeWaitTimesInputSchema>;

const PredictRealTimeWaitTimesOutputSchema = z.object({
  predictedWaitTime: z.number().describe('The predicted wait time in minutes.'),
  reasoning: z.string().describe('The reasoning behind the predicted wait time.'),
});
export type PredictRealTimeWaitTimesOutput = z.infer<typeof PredictRealTimeWaitTimesOutputSchema>;

export async function predictRealTimeWaitTimes(input: PredictRealTimeWaitTimesInput): Promise<PredictRealTimeWaitTimesOutput> {
  return predictRealTimeWaitTimesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictRealTimeWaitTimesPrompt',
  input: {schema: PredictRealTimeWaitTimesInputSchema},
  output: {schema: PredictRealTimeWaitTimesOutputSchema},
  prompt: `You are an expert in predicting hospital wait times.

  Given the current queue status, appointment schedules, and hospital ID, predict the real-time wait time for patients.

  Current Number: {{{currentNumber}}}
  Current Estimated Wait Time: {{{estimatedWaitMinutes}}} minutes
  Appointment Schedule: {{{appointmentSchedule}}}
  Hospital ID: {{{hospitalId}}}

  Consider factors such as the number of appointments scheduled, the average appointment duration, and any potential delays.

  Provide a predicted wait time in minutes and a brief explanation of your reasoning.
  Format your response as a JSON object conforming to PredictRealTimeWaitTimesOutputSchema.
  `,
});

const predictRealTimeWaitTimesFlow = ai.defineFlow(
  {
    name: 'predictRealTimeWaitTimesFlow',
    inputSchema: PredictRealTimeWaitTimesInputSchema,
    outputSchema: PredictRealTimeWaitTimesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
