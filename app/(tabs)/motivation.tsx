import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function MotivationTab() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);

  const motivationalQuotes = [
    "I am the CEO of my life, and I'm winning! 🏆",
    "Discipline is the bridge between goals and accomplishment! 🌉",
    "No excuses, only results! 💪",
    "Success is built daily, not in a day! 🏗️",
    "Champions are made when nobody's watching! 👁️",
    "Pain is temporary, quitting lasts forever! 🔥",
    "Excellence is not a skill, it's an attitude! 🎯",
    "The only impossible journey is the one you never begin! 🚀",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.quoteCard}>
        <Text style={styles.quoteTitle}>💡 DYNAMIC MOTIVATION</Text>
        <Text style={styles.quote}>{motivationalQuotes[currentQuoteIndex]}</Text>
      </View>

      <View style={styles.mantraCard}>
        <Text style={styles.mantraTitle}>🎯 PERSONAL MANTRA</Text>
        <Text style={styles.mantraText}>
          "मैं अपनी life का CEO हूँ, और मैं जीत रहा हूँ! Every day is a battlefield, and I choose victory!"
        </Text>
      </View>

      <View style={styles.affirmationsCard}>
        <Text style={styles.affirmationsTitle}>🔥 DAILY AFFIRMATIONS</Text>
        <Text style={styles.affirmation}>1. I am disciplined and unstoppable</Text>
        <Text style={styles.affirmation}>2. I turn pain into power</Text>
        <Text style={styles.affirmation}>3. I am building my empire daily</Text>
        <Text style={styles.affirmation}>4. No obstacle can break my spirit</Text>
        <Text style={styles.affirmation}>5. I am the master of my destiny</Text>
      </View>

      <View style={styles.principlesContainer}>
        <Text style={styles.principlesTitle}>⚡ SUCCESS PRINCIPLES</Text>
        
        <View style={styles.principleRow}>
          <View style={styles.principleCard}>
            <Text style={styles.principleIcon}>🎯</Text>
            <Text style={styles.principleText}>FOCUS</Text>
          </View>
          <View style={styles.principleCard}>
            <Text style={styles.principleIcon}>💪</Text>
            <Text style={styles.principleText}>DISCIPLINE</Text>
          </View>
        </View>
        
        <View style={styles.principleRow}>
          <View style={styles.principleCard}>
            <Text style={styles.principleIcon}>🔥</Text>
            <Text style={styles.principleText}>PERSISTENCE</Text>
          </View>
          <View style={styles.principleCard}>
            <Text style={styles.principleIcon}>🏆</Text>
            <Text style={styles.principleText}>EXCELLENCE</Text>
          </View>
        </View>
      </View>

      <View style={styles.battleCryCard}>
        <Text style={styles.battleCryTitle}>🪖 ULTIMATE BATTLE CRY</Text>
        <Text style={styles.battleCryText}>
          "When it gets tough, I get tougher! When others quit, I DOMINATE! 
          मैं हार नहीं मानूंगा! I am a WARRIOR! 🔥⚡💪"
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
  quoteCard: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  quoteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  quote: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 24,
  },
  mantraCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  mantraTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 10,
    textAlign: 'center',
  },
  mantraText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  affirmationsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  affirmationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 15,
    textAlign: 'center',
  },
  affirmation: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    paddingLeft: 10,
    lineHeight: 20,
  },
  principlesContainer: {
    marginBottom: 15,
  },
  principlesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  principleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  principleCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    elevation: 3,
  },
  principleIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  principleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  battleCryCard: {
    backgroundColor: '#FF4444',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
  battleCryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  battleCryText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 22,
  },
});