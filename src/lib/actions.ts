'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors.map((e) => e.message).join(' ');
    return { success: false, message: `Validation Error: ${errorMessages}` };
  }

  try {
    // Here you would typically send an email (e.g., using Resend, Nodemailer)
    // or save the message to a database.
    console.log('Form data received:', validatedFields.data);

    // Simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, message: 'Thank you for your message! We will get back to you soon.' };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, message: 'An unexpected error occurred. Please try again later.' };
  }
}
