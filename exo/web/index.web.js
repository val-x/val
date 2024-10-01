import { AppRegistry } from 'react-native';
   import App from '../packages/app/App'; // Adjusted path since App.js is in the same directory
   import { name as appName } from '../packages/app/app.json'; // Ensure this path is correct

   AppRegistry.registerComponent(appName, () => App);
   AppRegistry.runApplication(appName, {
     initialProps: {},
     rootTag: document.getElementById('app-root'),
   });