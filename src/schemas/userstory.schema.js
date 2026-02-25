import { z } from 'zod';

export const userStorySchema = z.object({
  asA: z.string().min(1, 'Champ requis'),
  iWant: z.string().min(3, 'Minimum 3 caractères'),
  soThat: z.string().min(3, 'Minimum 3 caractères'),
  priority: z.enum(['Low', 'Medium', 'High']),
  status: z.enum(['BACKLOG', 'TO_DO', 'DOING', 'TO_TEST', 'ISSUE', 'DONE']),
});
