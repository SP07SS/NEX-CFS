
'use server';
/**
 * @fileOverview A legal Q&A AI agent for NEX CFS.
 *
 * - askLegalQuestion - A function that handles user questions about legal documents.
 * - LegalQaInput - The input type for the askLegalQuestion function.
 * - LegalQaOutput - The return type for the askLegalQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LegalQaInputSchema = z.object({
  question: z.string().describe('The user question about legal documents.'),
});
export type LegalQaInput = z.infer<typeof LegalQaInputSchema>;

const LegalQaOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the legal question.'),
});
export type LegalQaOutput = z.infer<typeof LegalQaOutputSchema>;

// Summarized context from the website's legal pages
const legalContext = `
Summary of NEX CFS Terms and Conditions:
- Use of the platform implies agreement to Terms & Conditions and Privacy Policy.
- Loan repayment terms (interest, tenure, EMI, penalties) are in individual loan agreements.
- Investments carry risk; NEX CFS does not guarantee returns. Value can go up or down.
- Crowdfunding: Contributors are subject to campaign terms. NEX CFS is not responsible for project success/failure. Creators must use funds for stated purposes and provide updates.
- Affiliate Program: Commissions are earned per program terms. NEX CFS can modify terms and payouts are subject to verification.
- Trading Services: Subject to additional terms (market risks, brokerage, regulations).
- Account Termination: NEX CFS can suspend/terminate accounts for violations or fraudulent activity.
- Changes to Terms: NEX CFS may update terms and will notify users. Continued use means acceptance.
- Contact for Terms: legal@nexcfs.com.

Summary of NEX CFS Privacy Policy:
- Data Collected: Personal identification (name, email, phone, Aadhar, PAN), financial information (bank details, income, credit history), transactional information (loans, investments, donations), technical data (IP address, browser, device info, cookies).
- How Data is Used: To provide services, process applications/transactions, verify identity, perform credit checks, communicate (support, updates), improve services, comply with legal obligations, prevent fraud, enhance security.
- Data Security: Robust measures are in place (encryption, access controls, assessments), but no internet transmission is 100% secure.
- Sharing Information: Not sold. May be shared with third-party service providers (under confidentiality), regulatory authorities (if required by law), or other parties with explicit consent.
- Cookies: Used to track activity on the service. Users can manage cookie preferences via their browser.
- User Rights (GDPR/Data Protection): May include access, update, deletion, rectification, objection to processing, restriction of processing, data portability, and withdrawal of consent. Contact NEX CFS to exercise these rights.
- Policy Changes: Will be posted on the Privacy Policy page with an updated "Last Updated" date.
- Contact for Privacy Concerns: Data Protection Officer at privacy@nexcfs.com.
`;

export async function askLegalQuestion(input: LegalQaInput): Promise<LegalQaOutput> {
  return legalQaFlow(input);
}

const legalQaPrompt = ai.definePrompt({
  name: 'legalQaPrompt',
  input: {schema: LegalQaInputSchema},
  output: {schema: LegalQaOutputSchema},
  prompt: `You are a helpful AI assistant for NEX CFS. Your role is to answer user questions based *only* on the provided context about the NEX CFS Terms & Conditions and Privacy Policy.

  Provided Context:
  ---
  ${legalContext}
  ---

  User's Question: {{{question}}}

  Based *solely* on the context above, provide a concise answer to the user's question.
  If the question cannot be answered from the provided context, respond with: "I cannot answer this question based on the information I have. Please refer to the full documents or contact our legal team."
  Do not make up information or answer questions outside of this legal context.
  Your answer should be formatted clearly.
  `,
});

const legalQaFlow = ai.defineFlow(
  {
    name: 'legalQaFlow',
    inputSchema: LegalQaInputSchema,
    outputSchema: LegalQaOutputSchema,
  },
  async (input: LegalQaInput) => {
    const {output} = await legalQaPrompt(input);
    if (output) {
      return output;
    }
    return { answer: "I'm sorry, I encountered an issue processing your request. Please try again." };
  }
);
