import z from "zod";

export const userSchema = z.object({
  keycloakId: z.string(),
  pseudo: z.string().min(3).max(20),
  avatarId: z.number().min(1),
  eloScore: z.number().min(0)
});
