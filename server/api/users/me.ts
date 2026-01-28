export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const user = session.user;

  try {
    if (isUndefined(user)) {
      throw new Error("User not found in session");
    }

    const updatedUser = await prisma.user.update({
      where: { keycloakId: user.keycloakId },
      data: userSchema.parse(await readBody(event))
    });

    await setUserSession(event, { user: updatedUser });

    return { user: updatedUser };
  } catch (error) {
    console.error(`Update user profile error:`, error);
  }
});
