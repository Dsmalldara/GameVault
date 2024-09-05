import { z } from 'zod';

export const crowdfundingSchema = z.object({
  creator: z.string().min(1, { message: 'Creator address is required' }),
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  fundingGoal: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Funding goal must be a positive number',
  }),
  durationTime: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
    message: 'Duration time must be at least 1 day',
  }),
});
