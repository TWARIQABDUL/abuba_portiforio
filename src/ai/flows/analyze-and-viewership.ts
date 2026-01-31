'use server';

/**
 * @fileOverview Analyzes page view and video play events to determine significance for tracking site engagement.
 *
 * - analyzeAndViewership - Determines if a page view or video play event is significant.
 * - AnalyzeAndViewershipInput - The input type for the analyzeAndViewership function.
 * - AnalyzeAndViewershipOutput - The return type for the analyzeAndViewership function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeAndViewershipInputSchema = z.object({
  eventType: z.enum(['page_view', 'video_play']).describe('The type of event being analyzed.'),
  pageUrl: z.string().optional().describe('The URL of the page viewed (if applicable).'),
  videoTitle: z.string().optional().describe('The title of the video played (if applicable).'),
  userCountry: z.string().optional().describe('The country of the user viewing the page or video.'),
  eventTimestamp: z.string().describe('Timestamp of when the event occurred.'),
});
export type AnalyzeAndViewershipInput = z.infer<typeof AnalyzeAndViewershipInputSchema>;

const AnalyzeAndViewershipOutputSchema = z.object({
  isSignificant: z.boolean().describe('Whether the event is considered significant for tracking.'),
  reason: z.string().describe('The reason why the event is considered significant or not.'),
});
export type AnalyzeAndViewershipOutput = z.infer<typeof AnalyzeAndViewershipOutputSchema>;

export async function analyzeAndViewership(input: AnalyzeAndViewershipInput): Promise<AnalyzeAndViewershipOutput> {
  return analyzeAndViewershipFlow(input);
}

const analyzeAndViewershipPrompt = ai.definePrompt({
  name: 'analyzeAndViewershipPrompt',
  input: {schema: AnalyzeAndViewershipInputSchema},
  output: {schema: AnalyzeAndViewershipOutputSchema},
  prompt: `You are an analytics expert determining the significance of website events for Rwanda Visuals.

  Based on the event type, URL (if applicable), video title (if applicable), user country, and event timestamp, determine if the event is significant for tracking overall site engagement and identifying popular content.

  Consider these factors when determining significance:
  - Is the event a key interaction (e.g., video play)?
  - Is the event occurring on a high-value page (e.g., gallery, contact)?
  - Is the event originating from a target country (e.g., Rwanda)?
  - Is there a sudden surge in events of a particular type?

  Return a JSON object with 'isSignificant' (true or false) and a 'reason' explaining your determination.

  Here are the details of the event:
  Event Type: {{{eventType}}}
  Page URL: {{{pageUrl}}}
  Video Title: {{{videoTitle}}}
  User Country: {{{userCountry}}}
  Event Timestamp: {{{eventTimestamp}}}
  `,
});

const analyzeAndViewershipFlow = ai.defineFlow(
  {
    name: 'analyzeAndViewershipFlow',
    inputSchema: AnalyzeAndViewershipInputSchema,
    outputSchema: AnalyzeAndViewershipOutputSchema,
  },
  async input => {
    const {output} = await analyzeAndViewershipPrompt(input);
    return output!;
  }
);
