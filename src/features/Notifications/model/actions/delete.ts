"use server";

import { dbClient } from "@/shared/db/prisma.client";

export async function deleteNotification(notificationId: number) {
  try {
    await dbClient.notification.delete({
      where: { id: notificationId },
    });
    return { message: "Notification deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete notification");
  }
}
