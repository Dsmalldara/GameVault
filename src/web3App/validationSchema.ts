// validationSchema.ts
import { z } from 'zod';

export const crowdfundingSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  purpose: z.string().min(1, { message: 'Purpose is required' }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a positive number',
  }),
  timeframe: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Timeframe must be a positive number',
  }),
});
