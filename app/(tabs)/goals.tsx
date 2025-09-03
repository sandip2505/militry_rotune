import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
}

export default function GoalsTab() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: 'Learning Hours', current: 0, target: 21, unit: 'hrs' },
    { id: '2', title: 'Workout Days', current: 0, target: 7, unit: 'days' },
    { id: '3', title: 'Freelance Hours', current: 0, target: 10, unit: 'hrs' },
    { id: '4', title: 'DSA Problems', current: 0, target: 35, unit: 'problems' },
    { id: '5', title: 'Reading Sessions', current: 0, target: 7, unit: 'sessions' },
    { id: '6', title: 'Meditation Days', current: 0, target: 7, unit: 'days' },
  ]);

  const updateGoal = (goalId: string, increment: boolean) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = increment 
          ? Math.min(goal.current + 1, goal.target)
          : Math.max(goal.current - 1, 0);
        return { ...goal, current: newCurrent };
      }
      return goal;
    }));
  };

  const getProgressColor = (current: number, target: number): string => {
    const percentage = (current / target) * 100;
    if (percentage < 30) return '#FF4444';
    if (percentage < 70) return '#FFA500';
    return '#00AA00';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>🎯 WEEKLY TARGETS</Text>
      
      {goals.map(goal => (
        <View key={goal.id} style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>{goal.title}</Text>
            <Text style={styles.goalNumbers}>
              {goal.current}/{goal.target} {goal.unit}
            </Text>
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    width: `${(goal.current / goal.target) * 100}%`,
                    backgroundColor: getProgressColor(goal.current, goal.target)
                  }
                ]} 
              />
            </View>
          </View>
          
          <View style={styles.goalControls}>
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => updateGoal(goal.id, false)}
            >
              <Ionicons name="remove-circle" size={30} color="#FF4444" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.controlButton}
              onPress={() => updateGoal(goal.id, true)}
            >
              <Ionicons name="add-circle" size={30} color="#00AA00" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>📊 WEEKLY SUMMARY</Text>
        <Text style={styles.summaryText}>
          Overall Progress: {Math.round(
            goals.reduce((acc, goal) => acc + (goal.current / goal.target), 0) / goals.length * 100
          )}%
        </Text>
        <Text style={styles.summaryFocus}>
          🔥 Focus Areas: Learning, Fitness, Freelancing
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  goalCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  goalNumbers: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  progressBarContainer: {
    marginBottom: 15,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  goalControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  controlButton: {
    padding: 5,
  },
  summaryCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 5,
  },
  summaryFocus: {
    fontSize: 14,
    color: '#FFF',
  },
});