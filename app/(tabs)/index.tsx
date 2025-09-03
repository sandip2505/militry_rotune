import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAudioModeAsync } from 'expo-audio';
import { Audio } from "expo-av";
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from "expo-notifications";
import * as TaskManager from 'expo-task-manager';
import React, { useEffect, useState } from "react";
import {
  Alert,
  AppState,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from "react-native";

// Background task name
const BACKGROUND_TASK_NAME = 'background-alarm-check';

// Configure notifications to show even when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Register background task
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
    // Get alarm settings from storage
    const alarmsEnabled = await AsyncStorage.getItem('alarmsEnabled');
    if (alarmsEnabled !== 'true') {
      return BackgroundFetch.BackgroundFetchResult.NoData;
    }

    // Check for current task and send notification if needed
    const currentTask = getCurrentTaskForBackground();
    if (currentTask) {
      const taskKey = `${currentTask.id}-${new Date().toDateString()}`;
      const alreadyTriggered = await AsyncStorage.getItem(taskKey);
      
      if (!alreadyTriggered) {
        // Send notification
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '🚨 MISSION ALERT! 🚨',
            body: `${currentTask.time} - ${currentTask.task}`,
            sound: 'alarm.wav', // Custom sound (you'll need to add this)
            priority: Notifications.AndroidNotificationPriority.MAX,
            vibrate: [0, 250, 250, 250],
          },
          trigger: null, // Immediate
        });
        
        // Mark as triggered
        await AsyncStorage.setItem(taskKey, 'true');
      }
    }

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error('Background task error:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Helper function for background task
function getCurrentTaskForBackground() {
  const tasks = [
    { id: "1", time: "4:30", task: "Wake up (No snooze!)", category: "morning", completed: false },
    { id: "2", time: "4:35", task: "Cold shower + freshen up", category: "morning", completed: false },
    { id: "3", time: "4:50", task: "Affirmations + visualization", category: "morning", completed: false },
    { id: "4", time: "5:10", task: "Hardcore Workout (GYM)", category: "morning", completed: false },
    { id: "5", time: "6:40", task: "Grooming + skin care", category: "morning", completed: false },
    { id: "6", time: "7:10", task: "Protein-rich breakfast", category: "morning", completed: false },
    { id: "7", time: "7:40", task: "Deep Learning (MERN + DSA)", category: "morning", completed: false },
    { id: "8", time: "9:30", task: "Job work (deep focus)", category: "job", completed: false },
    { id: "9", time: "12:30", task: "Lunch (clean food)", category: "job", completed: false },
    { id: "10", time: "13:00", task: "Job execution", category: "job", completed: false },
    { id: "11", time: "16:00", task: "Energy reset (50 pushups)", category: "job", completed: false },
    { id: "12", time: "16:15", task: "Wrap-up job + documentation", category: "job", completed: false },
    { id: "13", time: "19:30", task: "Light dinner", category: "evening", completed: false },
    { id: "14", time: "20:00", task: "Freelancing/Projects", category: "evening", completed: false },
    { id: "15", time: "21:30", task: "DSA/Leetcode practice", category: "evening", completed: false },
    { id: "16", time: "22:30", task: "Reading (tech/business)", category: "evening", completed: false },
    { id: "17", time: "23:00", task: "Night skincare + meditation", category: "evening", completed: false },
    { id: "18", time: "23:20", task: "Journal + next day planning", category: "evening", completed: false },
    { id: "19", time: "23:30", task: "Sleep (5-5.5 hrs)", category: "evening", completed: false },
  ];

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = currentHour * 60 + currentMinute;

  for (const task of tasks) {
    const [hour, minute] = task.time.split(":").map(Number);
    const taskTime = hour * 60 + minute;

    if (currentTime >= taskTime && currentTime < taskTime + 1) {
      return task;
    }
  }
  return null;
}

interface Task {
  id: string;
  time: string;
  task: string;
  category: "morning" | "job" | "evening";
  completed: boolean;
}

const tasks: Task[] = [
  { id: "1", time: "4:30", task: "Wake up (No snooze!)", category: "morning", completed: false },
  { id: "2", time: "4:35", task: "Cold shower + freshen up", category: "morning", completed: false },
  { id: "3", time: "4:50", task: "Affirmations + visualization", category: "morning", completed: false },
  { id: "4", time: "5:10", task: "Hardcore Workout (GYM)", category: "morning", completed: false },
  { id: "5", time: "6:40", task: "Grooming + skin care", category: "morning", completed: false },
  { id: "6", time: "7:10", task: "Protein-rich breakfast", category: "morning", completed: false },
  { id: "7", time: "7:40", task: "Deep Learning (MERN + DSA)", category: "morning", completed: false },
  { id: "8", time: "9:30", task: "Job work (deep focus)", category: "job", completed: false },
  { id: "9", time: "12:30", task: "Lunch (clean food)", category: "job", completed: false },
  { id: "10", time: "13:00", task: "Job execution", category: "job", completed: false },
  { id: "11", time: "16:00", task: "Energy reset (50 pushups)", category: "job", completed: false },
  { id: "12", time: "16:15", task: "Wrap-up job + documentation", category: "job", completed: false },
  { id: "13", time: "19:30", task: "Light dinner", category: "evening", completed: false },
  { id: "14", time: "20:00", task: "Freelancing/Projects", category: "evening", completed: false },
  { id: "15", time: "21:30", task: "DSA/Leetcode practice", category: "evening", completed: false },
  { id: "16", time: "22:30", task: "Reading (tech/business)", category: "evening", completed: false },
  { id: "17", time: "23:00", task: "Night skincare + meditation", category: "evening", completed: false },
  { id: "18", time: "23:20", task: "Journal + next day planning", category: "evening", completed: false },
  { id: "19", time: "23:30", task: "Sleep (5-5.5 hrs)", category: "evening", completed: false },
];

export default function TodayTab() {
  const [alarmsEnabled, setAlarmsEnabled] = useState<boolean>(false);
  const [currentAlarmTask, setCurrentAlarmTask] = useState<Task | null>(null);
  const [showAlarmPopup, setShowAlarmPopup] = useState<boolean>(false);
  const [alarmPlayer, setAlarmPlayer] = useState<Audio.Sound | null>(null);
  const [checkInterval, setCheckInterval] = useState<NodeJS.Timeout | null>(null);
  const [taskStates, setTaskStates] = useState<{ [key: string]: boolean }>({});

  // Initialize everything on app start
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Setup audio
      await setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Request notification permissions
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Notifications are required for alarms to work');
        return;
      }

      // Load saved alarm state
      const savedState = await AsyncStorage.getItem('alarmsEnabled');
      if (savedState === 'true') {
        setAlarmsEnabled(true);
        await startPersistentAlarms();
      }

      // Clear yesterday's task states at app start
      await clearOldTaskStates();

    } catch (error) {
      console.error('Initialization error:', error);
    }
  };

  const clearOldTaskStates = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const today = new Date().toDateString();
      
      for (const key of keys) {
        if (key.includes('-') && !key.includes(today)) {
          await AsyncStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error('Error clearing old states:', error);
    }
  };

  const startPersistentAlarms = async () => {
    try {
      // Schedule all daily notifications
      await Notifications.cancelAllScheduledNotificationsAsync();
      
      // Schedule notifications for each task
      for (const task of tasks) {
        const [hour, minute] = task.time.split(":").map(Number);
        
        await Notifications.scheduleNotificationAsync({
          content: {
            title: '🚨 MISSION ALERT! 🚨',
            body: `${task.time} - ${task.task}`,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.MAX,
            vibrate: [0, 250, 250, 250],
            sticky: false,
            autoDismiss: false,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour,
            minute,
            repeats: true,
          },
        });
      }

      // Register background task
      await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
        minimumInterval: 60, // 1 minute
        stopOnTerminate: false,
        startOnBoot: true,
      });

      // Start foreground checking
      const interval = setInterval(checkForTaskAlarm, 60000);
      setCheckInterval(interval);

      console.log('Persistent alarms started');
    } catch (error) {
      console.error('Error starting persistent alarms:', error);
    }
  };

  const stopPersistentAlarms = async () => {
    try {
      // Cancel all notifications
      await Notifications.cancelAllScheduledNotificationsAsync();
      
      // Unregister background task
      await BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK_NAME);
      
      // Clear foreground checking
      if (checkInterval) {
        clearInterval(checkInterval);
        setCheckInterval(null);
      }

      console.log('Persistent alarms stopped');
    } catch (error) {
      console.error('Error stopping persistent alarms:', error);
    }
  };

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "active" && alarmsEnabled) {
        checkForTaskAlarm();
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      subscription?.remove();
      if (alarmPlayer) {
        alarmPlayer.unloadAsync();
      }
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [alarmsEnabled]);

  const loadAndPlayAlarmSound = async (): Promise<Audio.Sound | null> => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/alarm.mp3"),
        { shouldPlay: true, isLooping: true, volume: 1.0 }
      );
      return sound;
    } catch (error) {
      console.error("Error loading alarm sound:", error);
      return null;
    }
  };

  const getCurrentTask = (): Task | null => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    for (const task of tasks) {
      const [hour, minute] = task.time.split(":").map(Number);
      const taskTime = hour * 60 + minute;

      if (currentTime >= taskTime && currentTime < taskTime + 1) {
        const taskKey = `${task.id}-${new Date().toDateString()}`;
        if (!taskStates[taskKey]) {
          return task;
        }
      }
    }
    return null;
  };

  const checkForTaskAlarm = async () => {
    if (!alarmsEnabled) return;

    const task = getCurrentTask();
    if (task && (!currentAlarmTask || currentAlarmTask.id !== task.id)) {
      await triggerTaskAlarm(task);
    }
  };

  const triggerTaskAlarm = async (task: Task) => {
    setCurrentAlarmTask(task);
    setShowAlarmPopup(true);

    // Play sound only when app is open
    const player = await loadAndPlayAlarmSound();
    if (player) {
      setAlarmPlayer(player);
    }

    // Vibrate device
    Vibration.vibrate([0, 500, 200, 500, 200, 500], true);

    // Mark as triggered
    const taskKey = `${task.id}-${new Date().toDateString()}`;
    setTaskStates(prev => ({ ...prev, [taskKey]: true }));
    await AsyncStorage.setItem(taskKey, 'true');
  };

  const dismissAlarm = async () => {
    if (alarmPlayer) {
      try {
        await alarmPlayer.stopAsync();
        await alarmPlayer.unloadAsync();
        setAlarmPlayer(null);
      } catch (error) {
        console.error("Error stopping alarm:", error);
      }
    }

    Vibration.cancel();
    setShowAlarmPopup(false);
    setCurrentAlarmTask(null);
  };

  const snoozeAlarm = async () => {
    const taskToSnooze = currentAlarmTask;
    await dismissAlarm();

    // Remove the trigger mark so it can trigger again
    if (taskToSnooze) {
      const taskKey = `${taskToSnooze.id}-${new Date().toDateString()}`;
      setTaskStates(prev => ({ ...prev, [taskKey]: false }));
      await AsyncStorage.removeItem(taskKey);
    }

    setTimeout(() => {
      if (taskToSnooze) {
        triggerTaskAlarm(taskToSnooze);
      }
    }, 5 * 60 * 1000);
  };

  const toggleAlarms = async () => {
    if (!alarmsEnabled) {
      setAlarmsEnabled(true);
      await AsyncStorage.setItem('alarmsEnabled', 'true');
      await startPersistentAlarms();
      
      Alert.alert(
        '🚀 PERSISTENT ALARMS ACTIVATED!',
        'Alarms will work even when app is closed. Never miss a mission!'
      );
    } else {
      setAlarmsEnabled(false);
      await AsyncStorage.setItem('alarmsEnabled', 'false');
      await stopPersistentAlarms();
      setTaskStates({});
      
      Alert.alert('⏰ Persistent alarms deactivated');
    }
  };

  const testAlarm = async () => {
    const testTask: Task = {
      id: "test",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }),
      task: "🔥 TEST ALARM - This is a test mission!",
      category: "morning",
      completed: false,
    };

    await triggerTaskAlarm(testTask);
  };

  const currentTask = getCurrentTask();

  return (
    <ScrollView style={styles.container}>
      {/* Status Card */}
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>📱 ALARM SYSTEM STATUS</Text>
        <Text style={styles.statusText}>
          {alarmsEnabled 
            ? '✅ FULLY ACTIVE - Works 24/7 even when app is closed!'
            : '❌ INACTIVE - Tap ACTIVATE to enable persistent alarms'
          }
        </Text>
      </View>

      {/* Current Mission Card */}
      <View style={styles.currentMissionCard}>
        <Text style={styles.sectionTitle}>🎯 CURRENT MISSION</Text>
        {currentTask ? (
          <View style={styles.activeMission}>
            <Text style={styles.missionTime}>{currentTask.time}</Text>
            <Text style={styles.missionTask}>{currentTask.task}</Text>
            <Text style={styles.missionStatus}>🔥 EXECUTE NOW!</Text>
          </View>
        ) : (
          <Text style={styles.noMission}>
            No active mission. Stay ready! 🚀
          </Text>
        )}
      </View>

      {/* Alarm Controls */}
      <TouchableOpacity
        style={[
          styles.controlButton,
          { backgroundColor: alarmsEnabled ? "#FF4444" : "#00AA00" }
        ]}
        onPress={toggleAlarms}
      >
        <Text style={styles.controlButtonText}>
          {alarmsEnabled ? "🔕 DISABLE PERSISTENT ALARMS" : "🔔 ACTIVATE PERSISTENT ALARMS"}
        </Text>
        <Text style={styles.controlButtonSubtext}>
          {alarmsEnabled 
            ? "Currently running 24/7 - Tap to stop" 
            : "Tap to enable alarms that work even when app is closed"
          }
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.testButton} onPress={testAlarm}>
        <Text style={styles.testButtonText}>🚨 TEST ALARM</Text>
        <Text style={styles.testButtonSubtext}>Test alarm with custom sound</Text>
      </TouchableOpacity>

      {/* Schedule Display */}
      <View style={styles.scheduleContainer}>
        <Text style={styles.sectionTitle}>📋 COMPLETE SCHEDULE</Text>
        
        <Text style={styles.categoryTitle}>🌅 MORNING (4:30 - 9:00)</Text>
        {tasks.filter((t) => t.category === "morning").map((task) => (
          <View key={task.id} style={[styles.taskItem, { backgroundColor: "#FFE5B4" }]}>
            <Text style={styles.taskTime}>{task.time}</Text>
            <Text style={styles.taskText}>{task.task}</Text>
            {taskStates[`${task.id}-${new Date().toDateString()}`] && (
              <Text style={styles.completedMarker}>✅</Text>
            )}
          </View>
        ))}

        <Text style={styles.categoryTitle}>🖥 JOB HOURS (9:30 - 19:00)</Text>
        {tasks.filter((t) => t.category === "job").map((task) => (
          <View key={task.id} style={[styles.taskItem, { backgroundColor: "#E5F3FF" }]}>
            <Text style={styles.taskTime}>{task.time}</Text>
            <Text style={styles.taskText}>{task.task}</Text>
            {taskStates[`${task.id}-${new Date().toDateString()}`] && (
              <Text style={styles.completedMarker}>✅</Text>
            )}
          </View>
        ))}

        <Text style={styles.categoryTitle}>🌇 EVENING (19:30 - 23:30)</Text>
        {tasks.filter((t) => t.category === "evening").map((task) => (
          <View key={task.id} style={[styles.taskItem, { backgroundColor: "#FFE5F1" }]}>
            <Text style={styles.taskTime}>{task.time}</Text>
            <Text style={styles.taskText}>{task.task}</Text>
            {taskStates[`${task.id}-${new Date().toDateString()}`] && (
              <Text style={styles.completedMarker}>✅</Text>
            )}
          </View>
        ))}
      </View>

      {/* Alarm Popup Modal */}
      <Modal
        visible={showAlarmPopup}
        transparent={true}
        animationType="slide"
        onRequestClose={dismissAlarm}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.alarmPopup}>
            <Text style={styles.alarmTitle}>🚨 MISSION ALERT! 🚨</Text>
            <Text style={styles.alarmTime}>{currentAlarmTask?.time || ""}</Text>
            <Text style={styles.alarmTask}>{currentAlarmTask?.task || ""}</Text>
            <Text style={styles.alarmMessage}>TIME TO EXECUTE!</Text>

            <View style={styles.alarmButtonContainer}>
              <TouchableOpacity style={styles.snoozeButton} onPress={snoozeAlarm}>
                <Text style={styles.alarmButtonText}>😴 SNOOZE 5MIN</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.dismissButton} onPress={dismissAlarm}>
                <Text style={styles.alarmButtonText}>✅ GOT IT!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },
  statusCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#00AA00",
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  statusText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
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
  controlButton: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  controlButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  controlButtonSubtext: {
    fontSize: 14,
    color: "#FFF",
    opacity: 0.9,
    textAlign: "center",
  },
  testButton: {
    backgroundColor: "#FF8C00",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
  },
  testButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  testButtonSubtext: {
    fontSize: 12,
    color: "#FFF",
    opacity: 0.9,
  },
  scheduleContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    elevation: 3,
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
  completedMarker: {
    fontSize: 16,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  alarmPopup: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 30,
    margin: 20,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  alarmTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF4444",
    marginBottom: 15,
    textAlign: "center",
  },
  alarmTime: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6B35",
    marginBottom: 10,
  },
  alarmTask: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "600",
  },
  alarmMessage: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF4444",
    marginBottom: 25,
    textAlign: "center",
  },
  alarmButtonContainer: {
    flexDirection: "row",
    gap: 15,
  },
  snoozeButton: {
    backgroundColor: "#FFA500",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 3,
  },
  dismissButton: {
    backgroundColor: "#00AA00",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 3,
  },
  alarmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});