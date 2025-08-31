'use server';

/**
 * @fileOverview A landing page content generation AI agent.
 *
 * - generateLandingPageContent - A function that generates landing page content.
 * - GenerateLandingPageContentInput - The input type for the generateLandingPageContent function.
 * - GenerateLandingPageContentOutput - The return type for the generateLandingPageContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLandingPageContentInputSchema = z.object({
  targetAudience: z
    .enum(['hospitals', 'patients'])
    .describe('The target audience for the landing page content.'),
  tone: z
    .string()
    .default('professional')
    .describe('The tone of the landing page content.'),
});
export type GenerateLandingPageContentInput = z.infer<
  typeof GenerateLandingPageContentInputSchema
>;

const GenerateLandingPageContentOutputSchema = z.object({
  headline: z.string().describe('The main headline for the landing page.'),
  subheadline: z.string().describe('A supporting subheadline.'),
  body: z.string().describe('The main body content of the landing page.'),
  callToAction: z.string().describe('A call to action for the landing page.'),
});
export type GenerateLandingPageContentOutput = z.infer<
  typeof GenerateLandingPageContentOutputSchema
>;

export async function generateLandingPageContent(
  input: GenerateLandingPageContentInput
): Promise<GenerateLandingPageContentOutput> {
  return generateLandingPageContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLandingPageContentPrompt',
  input: {schema: GenerateLandingPageContentInputSchema},
  output: {schema: GenerateLandingPageContentOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in creating landing pages for healthcare technology companies.

You will generate compelling landing page content for QuickHealth, a digital queue and appointment management system for hospitals.

The content should target the specified audience and use the specified tone.

Target Audience: {{{targetAudience}}}
Tone: {{{tone}}}

Here are some key benefits and features of QuickHealth:
- Streamlined appointment booking process
- Real-time queue visualization
- Reduced patient wait times
- Improved hospital efficiency
- Enhanced patient satisfaction

Here's the content:

Headline: {{{headline}}}
Subheadline: {{{subheadline}}}
Body: {{{body}}}
Call to Action: {{{callToAction}}}`,
});

const generateLandingPageContentFlow = ai.defineFlow(
  {
    name: 'generateLandingPageContentFlow',
    inputSchema: GenerateLandingPageContentInputSchema,
    outputSchema: GenerateLandingPageContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input, {
      config: {
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_ONLY_HIGH',
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE',
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_LOW_AND_ABOVE',
          },
        ],
      },
    });
    return output!;
  }
);
