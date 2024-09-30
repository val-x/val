import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions, useWindowDimensions } from 'react-native';

const WelcomeScreen = () => {
  const { height, width } = useWindowDimensions();

  const getPlatformName = () => {
    switch (Platform.OS) {
      case 'android':
        return 'Android';
      case 'ios':
        return 'iOS';
      case 'web':
        return 'Web';
      case 'windows':
        return 'Windows';
      case 'macos':
        return 'macOS';
      default:
        return 'Unknown';
    }
  };

  const isLandscape = width > height;

  return (
    <View style={[styles.container, isLandscape && styles.landscapeContainer]}>
      <Text style={[styles.title, isLandscape && styles.landscapeTitle]}>Welcome to Valen</Text>
      <Text style={[styles.subtitle, isLandscape && styles.landscapeSubtitle]}>Running on {getPlatformName()}</Text>
      <Text style={styles.screenInfo}>Screen: {width.toFixed(0)}x{height.toFixed(0)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  landscapeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  landscapeTitle: {
    fontSize: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  landscapeSubtitle: {
    fontSize: 16,
  },
  screenInfo: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
});

export default WelcomeScreen;