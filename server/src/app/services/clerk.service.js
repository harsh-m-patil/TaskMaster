import { createClerkClient } from "@clerk/backend";

export class ClerkService {
  static getClerkClient() {
    // Ensure the client is created after dotenv config is loaded
    return createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    });
  }
  static async getUserLists() {
    const clerkClient = this.getClerkClient();
    const users = await clerkClient.users.getUserList();
    return [users, null];
  }

  static async getUser(userId) {
    const clerkClient = this.getClerkClient();
    const user = await clerkClient.users.getUser(userId);
    return user;
  }
}
