import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Button } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Rechercher = () => {
  const [specialite, setSpecialite] = useState('');
  const [villeActuelle, setVilleActuelle] = useState('');
  const [villesDesirees, setVillesDesirees] = useState('');
  const [specialiteOptions, setSpecialiteOptions] = useState([]);
  const [villeActuelleOptions, setVilleActuelleOptions] = useState([]);
  const [villesDesireesOptions, setVillesDesireesOptions] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch specialite options from API
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        // Extract unique specialite values from data
        const uniqueSpecialites = Array.from(new Set(data.map(item => item.specialite)));

        // Transform specialite values into options format
        const options = uniqueSpecialites.map(item => ({
          label: item,
          value: item,
        }));

        // Set specialite options
        setSpecialiteOptions(options);
      })
      .catch(error => console.log(error));

    // Fetch villeActuelle options from API
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        // Extract unique villeActuelle values from data
        const uniqueVilleActuelles = Array.from(new Set(data.map(item => item.villeFaculteActuelle)));

        // Transform villeActuelle values into options format
        const options = uniqueVilleActuelles.map(item => ({
          label: item,
          value: item,
        }));

        // Set villeActuelle options
        setVilleActuelleOptions(options);
      })
      .catch(error => console.log(error));

    // Fetch villesDesirees options from API
    fetch('https://tiny-worm-nightgown.cyclic.app/professeurs')
      .then(response => response.json())
      .then(data => {
        // Extract unique villesDesirees values from data
        const uniqueVillesDesirees = Array.from(new Set(data.map(item => item.villeDesiree)));

        // Transform villesDesirees values into options format
        const options = uniqueVillesDesirees.map(item => ({
          label: item,
          value: item,
        }));

        // Set villesDesirees options
        setVillesDesireesOptions(options);
      })
      .catch(error => console.log(error));
  }, []);

  const handleSearch = async () => {
    try {
      // Prepare search query parameters
      const params = {
        specialite,
        villeActuelle,
        villesDesirees,
      };

      // Build query string
      const queryString = Object.keys(params)
        .map(key => key + '=' + encodeURIComponent(params[key]))
        .join('&');

      // Perform search request
      const response = await fetch(`https://tiny-worm-nightgown.cyclic.app/professeurs?${queryString}`);
      const data = await response.json();

      // Set search results
      setResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Rechercher :</Text>
        <Text>Spécialité :</Text>
        <RNPickerSelect
          items={specialiteOptions}
          placeholder={{ label: 'Sélectionnez une spécialité', value: null }}
          value={specialite}
          onValueChange={value => setSpecialite(value)}
          style={pickerSelectStyles}
        />

        <Text>Ville actuelle :</Text>
        <RNPickerSelect
          items={villeActuelleOptions}
          placeholder={{ label: 'Sélectionnez une ville actuelle', value: null }}
          value={villeActuelle}
          onValueChange={value => setVilleActuelle(value)}
          style={pickerSelectStyles}
        />

        <Text>Villes désirées :</Text>
        <RNPickerSelect
          items={villesDesireesOptions}
          placeholder={{ label: 'Sélectionnez des villes désirées', value: null }}
          value={villesDesirees}
          onValueChange={value => setVillesDesirees(value)}
          style={pickerSelectStyles}
        />

        <Button title="Rechercher" onPress={handleSearch} />

        <Text style={styles.resultTitle}>Résultats de recherche :</Text>
        {Array.isArray(results) && results.length > 0 ? (
          results.map((result, index) => (
            <View style={styles.resultItem} key={index}>
              <Text>{result.nom}</Text>
              <Text>{result.prenom}</Text>
              <Text>{result.email}</Text>
              <Text>{result.telephone}</Text>
              <Text>{result.grade}</Text>
              <Text>{result.specialite}</Text>
              
            </View>
          ))
        ) : (
          <Text>Aucun résultat trouvé.</Text>
        )}
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
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  resultItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
                                    
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 40,
    marginBottom: 10,
    padding: 10,
  },
  inputAndroid: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 40,
    marginBottom: 10,
    padding: 10,
  },
});

export default Rechercher;
