export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    return prisma.user.findUnique({
      where: { keycloakId: String(id) }
    });
  } catch (error) {
    console.error(`Get Top 100 users error:`, error);
  }
});
