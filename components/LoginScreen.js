import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({ route }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = route.params;

  const handleLogin = async () => {
    try {
      const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // L'email est vérifié avec succès, vous pouvez procéder à la connexion
        console.log('Connexion avec les identifiants suivants :');
        console.log('Email :', email);
        console.log('Mot de passe :', password);

        // Marquer l'utilisateur comme connecté
        onLogin();
      } else {
        // L'email n'est pas vérifié ou il y a une erreur dans la requête
        Alert.alert('Erreur', 'Email invalide');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'email :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la vérification de l\'email');
    }
  };

  const handleForgotPassword = () => {
    // Afficher la fenêtre modale pour la récupération du mot de passe
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentification</Text>
      <TextInput
        style={styles.input}
        placeholder="Adresse email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleLogin} />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  forgotPasswordText: {
    fontSize: 16,
    marginTop: 8,
    color: 'blue',
  },
});

export default LoginScreen;
