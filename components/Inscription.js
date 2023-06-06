import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Button } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Inscription = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [grade, setGrade] = useState('');
  const [etablissement, setEtablissement] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villesDesirees, setVillesDesirees] = useState('');

  const handleInscription = async () => {
    const userData = {
      nom,
      prenom,
      telephone,
      email,
      motDePasse,
      grade,
      etablissement,
      specialite,
      villeActuelle,
      villesDesirees,
    };

    try {
      const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // L'utilisateur a été ajouté avec succès à la base de données
        setNom('');
        setPrenom('');
        setTelephone('');
        setEmail('');
        setMotDePasse('');
        setGrade('');
        setEtablissement('');
        setSpecialite('');
        setVilleActuelle('');
        setVillesDesirees('');
      } else {
        console.error('Erreur lors de l\'inscription :', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Inscription :</Text>
        <Text>Nom :</Text>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="user" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={nom}
            onChangeText={setNom}
          />
        </View>

        <Text>Prénom :</Text>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="user" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={prenom}
            onChangeText={setPrenom}
          />
        </View>

        <Text>Téléphone :</Text>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="phone" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            value={telephone}
            onChangeText={setTelephone}
          />
        </View>

        <Text>Email :</Text>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="envelope" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text>Mot de passe :</Text>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="lock" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry={true}
            value={motDePasse}
            onChangeText={setMotDePasse}
          />
        </View>

        <Text>Grade :</Text>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="graduation-cap" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Grade"
            value={grade}
            onChangeText={setGrade}
          />
        </View>

        <Text>Établissement :</Text>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="university" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Établissement"
            value={etablissement}
            onChangeText={setEtablissement}
          />
        </View>

        <Text>Spécialité :</Text>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="user-md" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Spécialité"
            value={specialite}
            onChangeText={setSpecialite}
          />
        </View>

        <Text>Ville actuelle :</Text>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="map-marker-alt" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Ville actuelle"
            value={villeActuelle}
            onChangeText={setVilleActuelle}
          />
        </View>

        <Text>Villes désirées :</Text>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="map-marker-alt" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Villes désirées"
            value={villesDesirees}
            onChangeText={setVillesDesirees}
          />
        </View>

        <Button title="S'inscrire" onPress={handleInscription} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '90%',
  },
});

export default Inscription;
