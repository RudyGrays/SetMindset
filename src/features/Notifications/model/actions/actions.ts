"use server";

import { dbClient } from "@/shared/db/prisma.client";
import { Notification } from "@prisma/client";

export async function createNotification({
  userId,
  senderId,
  message,
  type,
}: {
  userId: string;
  senderId: string;
  message: string;
  type?: string;
}): Promise<Notification> {
  try {
    const notification = await dbClient.notification.create({
      data: {
        userId,
        message,
        read: false,
        type: type,
        senderId: senderId,
      },
    });
    return notification;
  } catch (error) {
    throw new Error("Failed to create notification");
  }
}

export async function getNotificationsForUser(userId: string) {
  try {
    const notifications = await dbClient.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return notifications;
  } catch (error) {
    throw new Error("Failed to fetch notifications");
  }
}

export async function markAsRead(notificationId: number) {
  try {
    const updatedNotification = await dbClient.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
    return updatedNotification;
  } catch (error) {
    throw new Error("Failed to mark notification as read");
  }
}
