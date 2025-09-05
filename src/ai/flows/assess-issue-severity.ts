'use server';

/**
 * @fileOverview An AI agent that assesses the severity of a reported issue based on an image.
 *
 * - assessIssueSeverity - A function that handles the issue severity assessment process.
 * - AssessIssueSeverityInput - The input type for the assessIssueSeverity function.
 * - AssessIssueSeverityOutput - The return type for the assessIssueSeverity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessIssueSeverityInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  category: z.string().describe('The category of the reported issue.'),
  textNote: z.string().optional().describe('Optional text note describing the issue.'),
});
export type AssessIssueSeverityInput = z.infer<typeof AssessIssueSeverityInputSchema>;

const AssessIssueSeverityOutputSchema = z.object({
  severityScore: z
    .number()
    .describe('A score from 1-100 indicating the severity of the issue.'),
  justification: z
    .string()
    .describe('A justification for the assigned severity score.'),
});
export type AssessIssueSeverityOutput = z.infer<typeof AssessIssueSeverityOutputSchema>;

export async function assessIssueSeverity(
  input: AssessIssueSeverityInput
): Promise<AssessIssueSeverityOutput> {
  return assessIssueSeverityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessIssueSeverityPrompt',
  input: {schema: AssessIssueSeverityInputSchema},
  output: {schema: AssessIssueSeverityOutputSchema},
  prompt: `You are an AI assistant that assesses the severity of civic issues based on images and descriptions.

You will receive an image of the issue, its category, and an optional text note. Your task is to determine a severity score from 1 to 100, where 1 is the least severe and 100 is the most severe. You must also provide a justification for the assigned score.

Consider the following factors when determining the severity:
- The potential impact on public safety
- The potential impact on the environment
- The potential impact on the local economy
- The urgency of the issue

Here is the information about the issue:
Category: {{{category}}}
Text Note: {{{textNote}}}
Image: {{media url=photoDataUri}}

Based on the above information, provide a severity score and a justification.
`,
});

const assessIssueSeverityFlow = ai.defineFlow(
  {
    name: 'assessIssueSeverityFlow',
    inputSchema: AssessIssueSeverityInputSchema,
    outputSchema: AssessIssueSeverityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
