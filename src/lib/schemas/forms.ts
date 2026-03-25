import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Informe o assunto"),
  message: z.string().min(10, "Mensagem muito curta (mín. 10 caracteres)"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const volunteerFormSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(8, "Informe um telefone"),
  city: z.string().min(2, "Informe sua cidade"),
  interest: z.string().optional(),
  availability: z.string().optional(),
  motivation: z.string().min(10, "Conte um pouco mais (mín. 10 caracteres)"),
});

export type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

export const donationIntentSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  amountHint: z.string().optional(),
  message: z.string().optional(),
});

export type DonationIntentValues = z.infer<typeof donationIntentSchema>;
