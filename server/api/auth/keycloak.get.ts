import { prisma } from "~~/server/utils/db";

export default defineOAuthKeycloakEventHandler({
  async onSuccess(
    event,
    result: { user: { sub: string; preferred_username?: string } }
  ) {
    try {
      const userKeycloak = result.user;

      let user = await prisma.user.findFirst({
        where: {
          keycloakId: userKeycloak.sub
        }
      });

      if (isNull(user)) {
        user = await prisma.user.create({
          data: {
            keycloakId: userKeycloak.sub,
            pseudo: userKeycloak.preferred_username || "Nouveau joueur"
          }
        });
      }

      await setUserSession(event, { user });

      return sendRedirect(event, "/");
    } catch (error) {
      console.error("keycloak.get.ts => ", error);
      return sendRedirect(event, "/?authError=1");
    }
  }
});
