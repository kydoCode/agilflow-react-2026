import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Nom minimum 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe minimum 6 caractères'),
  role: z.enum(['teammate', 'developer', 'tester', 'product owner', 'scrum master', 'administrator']),
});
