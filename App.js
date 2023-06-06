import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './components/Accueil';
import Inscription from './components/Inscription';
import Apropos from './components/Apropos';
import LoginScreen from './components/LoginScreen'; // Modifier le chemin d'importation
import Profil from './components/Profil';
import Rechercher from './components/Rechercher';
import Combinaisons from './components/Combinaisons';

const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {isLoggedIn && (
          <TouchableOpacity onPress={handleLogout} style={styles.signOutButton}>
            <Text style={styles.signOutButtonText}>Déconnexion</Text>
          </TouchableOpacity>
        )}
      </DrawerContentScrollView>
    );
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header />
        <Drawer.Navigator
          useLegacyImplementation
          initialRouteName="Accueil"
          drawerContent={CustomDrawerContent}
        >
          <Drawer.Screen name="Accueil" component={Accueil} />
          {!isLoggedIn && <Drawer.Screen name="Inscription" component={Inscription} />}
          <Drawer.Screen name="A propos" component={Apropos} />
          {isLoggedIn && (
            <>
              <Drawer.Screen name="Profil" component={Profil} />
              <Drawer.Screen name="Rechercher" component={Rechercher} />
              <Drawer.Screen name="Combinaisons" component={Combinaisons} />
            </>
          )}
          {!isLoggedIn && (
            <Drawer.Screen
              name="Connexion"
              component={LoginScreen}
              initialParams={{ onLogin: handleLogin }}
            />
          )}
        </Drawer.Navigator>
      </View>
      <View>
        <Footer />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signOutButton: {
    backgroundColor: '#f00',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  signOutButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default App;
