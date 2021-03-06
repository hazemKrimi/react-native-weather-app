import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackParams } from './types/types';
import Home from './screens/Home';
import Search from './screens/Search';
import NavBar from './components/NavBar';

const Stack = createStackNavigator<StackParams>();

const App: React.FC = () => {
  const navigationRef = useRef<NavigationContainerRef | null>(null);

  const navigate = (name: string, params: object) => {
    navigationRef.current?.navigate(name, params);
  }

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='white'
      />
      <NavBar navigate={navigate} />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name='Home'
            component={Home}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Search'
            component={Search}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
