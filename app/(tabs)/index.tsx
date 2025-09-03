import * as Notifications from "expo-notifications";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

interface Task {
  id: string;
  time: string;
  task: string;
  category: "morning" | "job" | "evening";
  completed: boolean;
}

const tasks: Task[] = [
  {
    id: "1",
    time: "4:30",
    task: "Wake up (No snooze!)",
    category: "morning",
    completed: false,
  },
  {
    id: "2",
    time: "4:35",
    task: "Cold shower + freshen up",
    category: "morning",
    completed: false,
  },
  {
    id: "3",
    time: "4:50",
    task: "Affirmations + visualization",
    category: "morning",
    completed: false,
  },
  {
    id: "4",
    time: "5:10",
    task: "Hardcore Workout (GYM)",
    category: "morning",
    completed: false,
  },
  {
    id: "5",
    time: "6:40",
    task: "Grooming + skin care",
    category: "morning",
    completed: false,
  },
  {
    id: "6",
    time: "7:10",
    task: "Protein-rich breakfast",
    category: "morning",
    completed: false,
  },
  {
    id: "7",
    time: "7:40",
    task: "Deep Learning (MERN + DSA)",
    category: "morning",
    completed: false,
  },
  {
    id: "8",
    time: "9:30",
    task: "Job work (deep focus)",
    category: "job",
    completed: false,
  },
  {
    id: "9",
    time: "12:30",
    task: "Lunch (clean food)",
    category: "job",
    completed: false,
  },
  {
    id: "10",
    time: "13:00",
    task: "Job execution",
    category: "job",
    completed: false,
  },
  {
    id: "11",
    time: "16:00",
    task: "Energy reset (50 pushups)",
    category: "job",
    completed: false,
  },
  {
    id: "12",
    time: "16:15",
    task: "Wrap-up job + documentation",
    category: "job",
    completed: false,
  },
  {
    id: "13",
    time: "19:30",
    task: "Light dinner",
    category: "evening",
    completed: false,
  },
  {
    id: "14",
    time: "20:00",
    task: "Freelancing/Projects",
    category: "evening",
    completed: false,
  },
  {
    id: "15",
    time: "21:30",
    task: "DSA/Leetcode practice",
    category: "evening",
    completed: false,
  },
  {
    id: "16",
    time: "22:30",
    task: "Reading (tech/business)",
    category: "evening",
    completed: false,
  },
  {
    id: "17",
    time: "23:00",
    task: "Night skincare + meditation",
    category: "evening",
    completed: false,
  },
  {
    id: "18",
    time: "23:20",
    task: "Journal + next day planning",
    category: "evening",
    completed: false,
  },
  {
    id: "19",
    time: "23:30",
    task: "Sleep (5-5.5 hrs)",
    category: "evening",
    completed: false,
  },
];

export default function TodayTab() {
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(false);

  const getCurrentTask = (): Task | null => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    for (const task of tasks) {
      const [hour, minute] = task.time.split(":").map(Number);
      const taskTime = hour * 60 + minute;

      if (currentTime >= taskTime && currentTime < taskTime + 30) {
        return task;
      }
    }
    return null;
  };

  const scheduleNotifications = async () => {
    if (!notificationsEnabled) return;

    await Notifications.cancelAllScheduledNotificationsAsync();

    for (const task of tasks) {
      const [hour, minute] = task.time.split(":").map(Number);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🚀 MISSION ALERT",
          body: `${task.task} - NO EXCUSE MODE!`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour,
          minute,
        },
      });
    }
  };

  const sendTestNotification = async () => {
    if (!notificationsEnabled) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        setNotificationsEnabled(true);
        await scheduleNotifications();
        Alert.alert(
          "🔥 LOCKED AND LOADED!",
          "All 19 mission alerts activated!"
        );
      } else {
        Alert.alert(
          "Permission needed",
          "Enable notifications for mission alerts"
        );
      }
    } else {
      setNotificationsEnabled(false);
      await Notifications.cancelAllScheduledNotificationsAsync();
      Alert.alert("Mission alerts deactivated");
    }
  };

  const currentTask = getCurrentTask();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.currentMissionCard}>
        <Text style={styles.sectionTitle}>🎯 CURRENT MISSION</Text>
        {currentTask ? (
          <View style={styles.activeMission}>
            <Text style={styles.missionTime}>{currentTask.time} AM/PM</Text>
            <Text style={styles.missionTask}>{currentTask.task}</Text>
            <Text style={styles.missionStatus}>🔥 EXECUTE NOW!</Text>
          </View>
        ) : (
          <Text style={styles.noMission}>
            No active mission. Stay ready! 🚀
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.testButton}
        onPress={sendTestNotification}
      >
        <Text style={styles.testButtonText}>🔥 TEST MISSION ALERT</Text>
        <Text style={styles.testButtonSubtext}>Tap to test notification</Text>
      </TouchableOpacity>

      <View style={styles.scheduleContainer}>
        <Text style={styles.sectionTitle}>📋 COMPLETE SCHEDULE</Text>
        <Text style={styles.autoNotificationText}>
          ✅ Auto notifications are ACTIVE for all missions!
        </Text>

        <Text style={styles.categoryTitle}>🌅 MORNING (4:30 - 9:00)</Text>
        {tasks
          .filter((t) => t.category === "morning")
          .map((task) => (
            <View
              key={task.id}
              style={[styles.taskItem, { backgroundColor: "#FFE5B4" }]}
            >
              <Text style={styles.taskTime}>{task.time}</Text>
              <Text style={styles.taskText}>{task.task}</Text>
            </View>
          ))}

        <Text style={styles.categoryTitle}>🖥 JOB HOURS (9:30 - 19:00)</Text>
        {tasks
          .filter((t) => t.category === "job")
          .map((task) => (
            <View
              key={task.id}
              style={[styles.taskItem, { backgroundColor: "#E5F3FF" }]}
            >
              <Text style={styles.taskTime}>{task.time}</Text>
              <Text style={styles.taskText}>{task.task}</Text>
            </View>
          ))}

        <Text style={styles.categoryTitle}>🌇 EVENING (19:30 - 23:30)</Text>
        {tasks
          .filter((t) => t.category === "evening")
          .map((task) => (
            <View
              key={task.id}
              style={[styles.taskItem, { backgroundColor: "#FFE5F1" }]}
            >
              <Text style={styles.taskTime}>{task.time}</Text>
              <Text style={styles.taskText}>{task.task}</Text>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },
  currentMissionCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  activeMission: {
    alignItems: "center",
  },
  missionTime: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B35",
  },
  missionTask: {
    fontSize: 16,
    color: "#333",
    marginVertical: 10,
    textAlign: "center",
  },
  missionStatus: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF4444",
  },
  noMission: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
  },
  testButton: {
    backgroundColor: "#FF4444",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  testButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  testButtonSubtext: {
    fontSize: 14,
    color: "#FFF",
    opacity: 0.9,
  },
  scheduleContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    elevation: 3,
  },
  autoNotificationText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00AA00",
    textAlign: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#E8F5E8",
    borderRadius: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6B35",
    marginTop: 15,
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  taskTime: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    width: 50,
  },
  taskText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    marginLeft: 10,
  },
});
