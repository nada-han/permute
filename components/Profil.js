import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Button } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Profil = () => {
  const [userData, setUserData] = useState(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [etablissement, setEtablissement] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villesDesirees, setVillesDesirees] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://troubled-red-garb.cyclic.app/user');
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          console.error('Error fetching user data:', data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setNom(userData.nom || '');
      setPrenom(userData.prenom || '');
      setTelephone(userData.telephone || '');
      setEmail(userData.email || '');
      setGrade(userData.grade || '');
      setEtablissement(userData.etablissement || '');
      setSpecialite(userData.specialite || '');
      setVilleActuelle(userData.villeActuelle || '');
      setVillesDesirees(userData.villesDesirees || '');
    }
  }, [userData]);

  const handleSupprimer = () => {
    console.log('Supprimer');
  };

  const handleModifier = () => {
    console.log('Modifier');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Profil :</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nom :</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="user" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setNom}
              value={nom}
              placeholder="Nom"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Prénom :</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="user" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setPrenom}
              value={prenom}
              placeholder="Prénom"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Téléphone :</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="phone" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setTelephone}
              value={telephone}
              placeholder="Téléphone"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email :</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="envelope" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Grade :</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="graduation-cap" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setGrade}
              value={grade}
              placeholder="Grade"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Établissement :</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="university" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setEtablissement}
              value={etablissement}
              placeholder="Établissement"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Spécialité :</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="user-md" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setSpecialite}
              value={specialite}
              placeholder="Spécialité"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ville actuelle :</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="map-marker-alt" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setVilleActuelle}
              value={villeActuelle}
              placeholder="Ville actuelle"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Villes désirées :</Text>
          <View style={styles.inputWrapper}>
            <FontAwesome5 name="map-marker-alt" style={styles.icon} />
            <TextInput
              style={styles.input}
              onChangeText={setVillesDesirees}
              value={villesDesirees}
              placeholder="Villes désirées"
            />
          </View>
        </View>

        <Button title="Modifier" onPress={handleModifier} />
        <Button title="Supprimer mon compte" onPress={handleSupprimer} />
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
});

export default Profil;
