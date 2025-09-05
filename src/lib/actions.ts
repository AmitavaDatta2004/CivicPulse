'use server';

import {
  assessIssueSeverity,
  type AssessIssueSeverityInput,
} from '@/ai/flows/assess-issue-severity';

export async function submitReportAction(data: {
  photoDataUri: string;
  category: string;
  textNote: string;
}) {
  try {
    const aiInput: AssessIssueSeverityInput = {
      photoDataUri: data.photoDataUri,
      category: data.category,
      textNote: data.textNote,
    };

    const assessment = await assessIssueSeverity(aiInput);

    console.log('AI Assessment:', assessment);

    // Mock saving the ticket to a database
    const ticketId = `CP-${Math.floor(10000 + Math.random() * 90000)}`;

    return { success: true, ticketId: ticketId, assessment };
  } catch (error) {
    console.error('Error submitting report:', error);
    return { success: false, error: 'Failed to submit report.' };
  }
}
