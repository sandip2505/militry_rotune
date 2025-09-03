import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";

// Set default notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Android notification channel setup
const configureNotificationChannel = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("daily-reminders", {
      name: "Daily Reminders",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

// Function to schedule one notification
const scheduleNotification = async ({
  title,
  body,
  hour,
  minute,
  repeats = true,
}: {
  title: string;
  body: string;
  hour: number;
  minute: number;
  repeats?: boolean;
}) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: Platform.OS === "android" ? "default" : "default",
      },
      trigger: {
        hour,
        minute,
        repeats,
        type: "daily",
        channelId: Platform.OS === "android" ? "daily-reminders" : undefined,
      },
    });
    console.log(`Scheduled: "${title}" at ${hour}:${minute}`);
  } catch (error) {
    console.error("Error scheduling notification:", error);
    Alert.alert("Error", "Failed to schedule notification.");
  }
};

// Main setup function
export const setupDailyNotifications = async () => {
  try {
    let { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const request = await Notifications.requestPermissionsAsync();
      status = request.status;
    }

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Notifications are disabled.");
      return false;
    }

    await configureNotificationChannel();

    // Cancel old notifications to avoid duplication
    await Notifications.cancelAllScheduledNotificationsAsync();
    console.log("Previous notifications cleared.");

    // Schedule daily ones
    await scheduleNotification({
      title: "🌅 Start your work",
      body: "Good morning! It's time to begin your tasks.",
      hour: 8,
      minute: 0,
    });

    await scheduleNotification({
      title: "🕔 Attendance Reminder",
      body: "Please add your attendance before the day ends.",
      hour: 17,
      minute: 0,
    });

    return true;
  } catch (error) {
    console.error("Setup failed:", error);
    return false;
  }
};

// Cancel all notifications
export const cancelAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    Alert.alert("✅ Cancelled", "All notifications have been removed.");
  } catch (error) {
    console.error("Cancel failed:", error);
    Alert.alert("Error", "Could not cancel notifications.");
  }
};
