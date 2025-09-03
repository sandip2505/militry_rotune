import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function RulesTab() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>⚡ STRICT RULES (NON-NEGOTIABLE)</Text>
      
      <View style={styles.rulesContainer}>
        <View style={styles.rule}>
          <Text style={styles.ruleNumber}>1.</Text>
          <Text style={styles.ruleText}>❌ No social media (15 min/week max)</Text>
        </View>
        <View style={styles.rule}>
          <Text style={styles.ruleNumber}>2.</Text>
          <Text style={styles.ruleText}>❌ No junk food (cheat meal once/2 weeks)</Text>
        </View>
        <View style={styles.rule}>
          <Text style={styles.ruleNumber}>3.</Text>
          <Text style={styles.ruleText}>📖 Minimum 3 hrs daily self-learning</Text>
        </View>
        <View style={styles.rule}>
          <Text style={styles.ruleNumber}>4.</Text>
          <Text style={styles.ruleText}>💪 Fitness everyday (no off days)</Text>
        </View>
        <View style={styles.rule}>
          <Text style={styles.ruleNumber}>5.</Text>
          <Text style={styles.ruleText}>✅ Weekly progress review</Text>
        </View>
        <View style={styles.rule}>
          <Text style={styles.ruleNumber}>6.</Text>
          <Text style={styles.ruleText}>🔥 Zero excuse mode - कुछ भी हो, काम होगा!</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>🎯 DAILY TARGETS</Text>
      <View style={styles.targetsContainer}>
        <View style={styles.targetCard}>
          <Text style={styles.targetIcon}>📚</Text>
          <Text style={styles.targetTitle}>LEARNING</Text>
          <Text style={styles.targetDesc}>3+ hrs coding/DSA</Text>
        </View>
        <View style={styles.targetCard}>
          <Text style={styles.targetIcon}>💪</Text>
          <Text style={styles.targetTitle}>FITNESS</Text>
          <Text style={styles.targetDesc}>Hardcore workout</Text>
        </View>
        <View style={styles.targetCard}>
          <Text style={styles.targetIcon}>🥗</Text>
          <Text style={styles.targetTitle}>NUTRITION</Text>
          <Text style={styles.targetDesc}>Clean eating only</Text>
        </View>
        <View style={styles.targetCard}>
          <Text style={styles.targetIcon}>💼</Text>
          <Text style={styles.targetTitle}>WORK</Text>
          <Text style={styles.targetDesc}>Deep focus mode</Text>
        </View>
      </View>

      <View style={styles.motivationCard}>
        <Text style={styles.motivationTitle}>🪖 ZERO EXCUSE MINDSET</Text>
        <Text style={styles.motivationText}>
          "Even if tired, काम होगा ही! Military discipline means no compromises, no shortcuts, no excuses. Every mission completed builds the warrior within."
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
  rulesContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  rule: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  ruleNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
    width: 25,
  },
  ruleText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
  targetsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  targetCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  targetIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  targetTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 4,
  },
  targetDesc: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  motivationCard: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
  motivationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  motivationText: {
    fontSize: 14,
    color: '#FFF',
    lineHeight: 20,
    textAlign: 'center',
  },
});