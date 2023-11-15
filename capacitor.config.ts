import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cheroee.combinedemo',
  appName: 'ECG',
  webDir: 'build',
  server: {
    androidScheme: 'http'
  },
  android: {
  
  }
};

export default config;
