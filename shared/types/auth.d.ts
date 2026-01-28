import type { User as UserPrisma } from "../../prisma/generated/client";

declare module "#auth-utils" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends UserPrisma {}
}
