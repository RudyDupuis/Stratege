export default defineEventHandler(async () => {
  try {
    return prisma.user.findMany({
      orderBy: {
        eloScore: "desc"
      },
      take: 100
    });
  } catch (error) {
    console.error(`Get Top 100 users error:`, error);
  }
});
