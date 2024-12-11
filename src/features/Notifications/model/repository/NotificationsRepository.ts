import { dbClient } from "@/shared/db/prisma.client";
import { PrismaClient, Notification } from "@prisma/client";

class NotificationsRepository {
  async createNotification({
    userId,
    message,
    senderId,
    type,
  }: {
    userId: string;
    message: string;
    senderId: string;
    type?: string;
  }): Promise<Notification> {
    try {
      const notification = await dbClient.notification.create({
        data: {
          userId,
          senderId,
          message,
          type,
        },
      });
      return notification;
    } catch (error) {
      console.error("Error creating notification:", error);
      throw new Error("Could not create notification");
    }
  }

  async getNotificationsForUser(userId: string): Promise<Notification[]> {
    try {
      const notifications = await dbClient.notification.findMany({
        where: { userId },
        orderBy: {
          createdAt: "desc",
        },
      });
      return notifications;
    } catch (error) {
      console.error("Error getting notifications:", error);
      throw new Error("Could not retrieve notifications");
    }
  }

  async markAsRead(notificationId: number): Promise<Notification> {
    try {
      const updatedNotification = await dbClient.notification.update({
        where: { id: notificationId },
        data: { read: true },
      });
      return updatedNotification;
    } catch (error) {
      console.error("Error updating notification status:", error);
      throw new Error("Could not mark notification as read");
    }
  }

  async deleteNotification(notificationId: number): Promise<Notification> {
    try {
      const deletedNotification = await dbClient.notification.delete({
        where: { id: notificationId },
      });
      return deletedNotification;
    } catch (error) {
      console.error("Error deleting notification:", error);
      throw new Error("Could not delete notification");
    }
  }
}

export const notificationsRepository = new NotificationsRepository();
