import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Windows, Linux, Apple, Docker } from 'lucide-react';

const AgentIcon = ({ name }) => {
  switch (name) {
    case 'Windows':
      return <Windows size={24} color="#fff" />;
    case 'Linux':
      return <Linux size={24} color="#fff" />;
    case 'MacOS':
      return <Apple size={24} color="#fff" />;
    case 'Docker':
      return <Docker size={24} color="#fff" />;
    default:
      return null;
  }
};

const WelcomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          ngrok is your app's front door—a globally distributed reverse
          proxy that secures, protects and accelerates your
          applications and network services, no matter where you run
          them.
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Agents</Text>
          {['MacOS', 'Windows', 'Linux', 'Docker', 'RaspberryPi', 'FreeBSD'].map((agent) => (
            <Text key={agent} style={styles.option}><AgentIcon name={agent} /> {agent}</Text>
          ))}
        </View>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>SDKs</Text>
          {['Go', 'NodeJS', 'Rust', 'Python', 'Java', 'Ruby', '.Net'].map((sdk) => (
            <Text key={sdk} style={styles.option}>{sdk}</Text>
          ))}
        </View>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Infrastructure</Text>
          <Text style={styles.option}>Kubernetes</Text>
        </View>
      </View>

      <Text style={styles.lookingFor}>Looking for something else?</Text>

      <View style={styles.connectSection}>
        <Text style={styles.connectNumber}>1</Text>
        <Text style={styles.connectTitle}>Connect</Text>
        <Text style={styles.connectSubtitle}>Establish ingress for your application</Text>

        <View style={styles.agentBox}>
          <View style={styles.agentInfo}>
            <Windows color="#fff" size={24} />
            <Text style={styles.agentText}>Windows</Text>
          </View>
          <TouchableOpacity style={styles.choosePlatform}>
            <Text style={styles.choosePlatformText}>Choose another platform</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.installationTitle}>Installation</Text>
        <View style={styles.installationOptions}>
          <Text style={[styles.installOption, styles.activeOption]}>Chocolatey</Text>
          <Text style={styles.installOption}>Download</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1c37',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0b0',
    lineHeight: 24,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  column: {
    flex: 1,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  option: {
    fontSize: 14,
    color: '#a0a0b0',
    marginBottom: 5,
  },
  lookingFor: {
    fontSize: 14,
    color: '#a0a0b0',
    textAlign: 'center',
    marginTop: 20,
  },
  connectSection: {
    backgroundColor: '#0f1025',
    padding: 20,
    marginTop: 20,
  },
  connectNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  connectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  connectSubtitle: {
    fontSize: 16,
    color: '#a0a0b0',
    marginBottom: 20,
  },
  agentBox: {
    backgroundColor: '#1a1c37',
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  choosePlatform: {
    backgroundColor: '#2d2f4a',
    padding: 10,
    borderRadius: 5,
  },
  choosePlatformText: {
    color: '#fff',
    fontSize: 12,
  },
  installationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  installationOptions: {
    flexDirection: 'row',
  },
  installOption: {
    color: '#a0a0b0',
    marginRight: 15,
    fontSize: 14,
  },
  activeOption: {
    color: '#4a90e2',
    borderBottomWidth: 2,
    borderBottomColor: '#4a90e2',
  },
});

export default WelcomeScreen;