import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

const Accueil = () => {
  const [numProfsInscrits, setNumProfsInscrits] = useState(0);
  const [specialites, setSpecialites] = useState([]);
  const [grades, setGrades] = useState([]);
  const [villesDesirees, setVillesDesirees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    fetchNumProfsInscrits();
    fetchProfsBySpeciality();
    fetchProfsByGrade();
    fetchVillesDesirees();
  }, []);

  const fetchNumProfsInscrits = async () => {
    try {
      const response = await axios.get(
        'https://troubled-red-garb.cyclic.app/professeurs'
      );
      const data = response.data;
      const numProfsInscrits = data.length;
      setNumProfsInscrits(numProfsInscrits);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération du nombre de professeurs inscrits:',
        error
      );
    }
  };

  const fetchProfsBySpeciality = async () => {
    try {
      const response = await axios.get(
        'https://troubled-red-garb.cyclic.app/professeurs'
      );
      const data = response.data;
      const specialties = countProfessorsBySpecialty(data);
      const sortedSpecialties = [...specialties.entries()].sort(
        (a, b) => b[1] - a[1]
      );
      const top13Specialties = sortedSpecialties.slice(0, 13);
      const colors = [
        '#7BA05B',
        '#0070BB',
        '#856088',
        '#3D0C02',
        '#F5B041',
        '#FDEE00',
        '#2F4F4F',
        '#FF0800',
        '#AB274F',
        '#EEDC82',
        '#5A4FCF',
        '#C70039',
        '#900C3F',
      ];
      const chartData = top13Specialties.map(([label, value], index) => ({
        name: label,
        value,
        color: colors[index % colors.length],
        isSelected: false,
      }));
      setSpecialites(chartData);
      setIsLoading(false);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des statistiques par spécialité:',
        error
      );
      setIsLoading(false);
    }
  };

  const fetchProfsByGrade = async () => {
    try {
      const response = await axios.get(
        'https://troubled-red-garb.cyclic.app/professeurs'
      );
      const data = response.data;
      const grades = countProfessorsByGrade(data);
      const sortedGrades = [...grades.entries()].sort((a, b) => b[1] - a[1]);
      const top13Grades = sortedGrades.slice(0, 13);
      const colors = [
        '#C8A2C8',
        '#FDEE00',
        '#355E3B',
        '#007FFF',
        '#6050DC',
        '#8B0000',
        '#4B0082',
        '#00FFFF',
      ];
      const chartData = top13Grades.map(([label, value], index) => ({
        name: label,
        value,
        color: colors[index % colors.length],
        isSelected: false,
      }));
      setGrades(chartData);
      setIsLoading(false);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des statistiques par grade:',
        error
      );
      setIsLoading(false);
    }
  };

  const fetchVillesDesirees = async () => {
    try {
      const response = await axios.get(
        'https://troubled-red-garb.cyclic.app/professeurs'
      );
      const data = response.data;
      const villesDesirees = countProfessorsByDesiredCity(data);
      const sortedVillesDesirees = [...villesDesirees.entries()].sort(
        (a, b) => b[1] - a[1]
      );
      const top13VillesDesirees = sortedVillesDesirees.slice(0, 13);
      const colors = [
        '#FF0800',
        '#F7DC6F',
        '#007FFF',
        '#4B0082',
        '#DE5D83',
        '#008080',
        '#6050DC',
        '#7BA05B',
        '#F5B041',
        '#1ABC9C',
        '#B2BABB',
        '#F5B7B1',
        '#B7950B',
      ];
      const chartData = top13VillesDesirees.map(([label, value], index) => ({
        name: label,
        value,
        color: colors[index % colors.length],
        isSelected: false,
      }));
      setVillesDesirees(chartData);
      setIsLoading(false);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des statistiques par ville désirée:',
        error
      );
      setIsLoading(false);
    }
  };

  const countProfessorsBySpecialty = (data) => {
    const specialties = new Map();
    data.forEach((professeur) => {
      const { specialite } = professeur;
      if (specialties.has(specialite)) {
        specialties.set(specialite, specialties.get(specialite) + 1);
      } else {
        specialties.set(specialite, 1);
      }
    });
    return specialties;
  };

  const countProfessorsByGrade = (data) => {
    const grades = new Map();
    data.forEach((professeur) => {
      const { grade } = professeur;
      if (grades.has(grade)) {
        grades.set(grade, grades.get(grade) + 1);
      } else {
        grades.set(grade, 1);
      }
    });
    return grades;
  };

  const countProfessorsByDesiredCity = (data) => {
    const villesDesirees = new Map();
    data.forEach((professeur) => {
      const { villeDesiree } = professeur;
      if (villesDesirees.has(villeDesiree)) {
        villesDesirees.set(villeDesiree, villesDesirees.get(villeDesiree) + 1);
      } else {
        villesDesirees.set(villeDesiree, 1);
      }
    });
    return villesDesirees;
  };

  const handleSpecialiteSelection = (index) => {
    const updatedSpecialites = [...specialites];
    updatedSpecialites.forEach((item, i) => {
      if (i === index) {
        item.isSelected = true;
        setSelectedValue(item.name);
      } else {
        item.isSelected = false;
      }
    });
    setSpecialites(updatedSpecialites);
  };

  const handleGradeSelection = (index) => {
    const updatedGrades = [...grades];
    updatedGrades.forEach((item, i) => {
      if (i === index) {
        item.isSelected = true;
        setSelectedValue(item.name);
      } else {
        item.isSelected = false;
      }
    });
    setGrades(updatedGrades);
  };

  const handleVilleDesireeSelection = (index) => {
    const updatedVillesDesirees = [...villesDesirees];
    updatedVillesDesirees.forEach((item, i) => {
      if (i === index) {
        item.isSelected = true;
        setSelectedValue(item.name);
      } else {
        item.isSelected = false;
      }
    });
    setVillesDesirees(updatedVillesDesirees);
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    decimalPlaces: 0,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const renderSpecialitesTable = () => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={styles.tableContainer}>
        <Text style={styles.headerText}>
          Nombre de profs par spécialité (Top 15)
        </Text>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.headerText]}>Spécialité</Text>
          <Text style={[styles.tableCell, styles.headerText]}>Nombre</Text>
        </View>
        {specialites.slice(0, 15).map((specialite, index) => (
          <View
            key={specialite.name}
            style={[
              styles.tableRow,
              index % 2 === 0 ? styles.tableRowEven : null,
            ]}>
            <Text style={styles.tableCell}>{specialite.name}</Text>
            <Text style={styles.tableCell}>{specialite.value}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderVillesDesireesTable = () => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={styles.tableContainer}>
        <Text style={styles.headerText}>
          Villes les plus demandées (Top 15)
        </Text>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.headerText]}>
            Ville désirée
          </Text>
          <Text style={[styles.tableCell, styles.headerText]}>Nombre</Text>
        </View>
        {villesDesirees.slice(0, 15).map((ville, index) => (
          <View
            key={ville.name}
            style={[
              styles.tableRow,
              index % 2 === 0 ? styles.tableRowEven : null,
            ]}>
            <Text style={styles.tableCell}>{ville.name}</Text>
            <Text style={styles.tableCell}>{ville.value}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderGradesTable = () => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }
    return (
      <View style={styles.tableContainer}>
        <Text style={styles.headerText}>Nombre de profs par grade</Text>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.headerText]}>Grade</Text>
          <Text style={[styles.tableCell, styles.headerText]}>Nombre</Text>
        </View>
        {grades.slice(0, 15).map((grade, index) => (
          <View
            key={grade.name}
            style={[
              styles.tableRow,
              index % 2 === 0 ? styles.tableRowEven : null,
            ]}>
            <Text style={styles.tableCell}>{grade.name}</Text>
            <Text style={styles.tableCell}>{grade.value}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Statistiques</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Nombre de profs inscrits :</Text>
        <Text style={styles.num}>{numProfsInscrits}</Text>
        <View style={styles.separator} />
      </View>

      {isLoading ? (
        <Text style={styles.loadingText}>Chargement des statistiques...</Text>
      ) : (
        <>
          <Animatable.View animation="bounceInLeft" duration={2000}>
            <Text style={styles.subtitle}>
              Nombre de profs par spécialité :
            </Text>
            <View style={styles.chartContainer}>
              <PieChart
                data={specialites}
                width={300}
                height={220}
                chartConfig={chartConfig}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="110"
                absolute
                hasLegend={false}
              />
              <View style={styles.labelsContainer}>
                {specialites.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.label,
                      item.isSelected ? styles.selectedLabel : null,
                    ]}
                    onPress={() => handleSpecialiteSelection(index)}>
                    <View
                      style={[
                        styles.colorIndicator,
                        { backgroundColor: item.color },
                      ]}></View>
                    <Text
                      style={[
                        styles.labelText,
                        item.isSelected ? styles.selectedLabelText : null,
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.separator} />
          </Animatable.View>

          <Animatable.View animation="bounceInRight" duration={2000}>
            <Text style={styles.subtitle}>Villes les plus demandées :</Text>
            <View style={styles.chartContainer}>
              <PieChart
                data={villesDesirees}
                width={300}
                height={220}
                chartConfig={chartConfig}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="90"
                absolute
                hasLegend={false}
              />
              <View style={styles.labelsContainer}>
                {villesDesirees.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.label,
                      item.isSelected ? styles.selectedLabel : null,
                    ]}
                    onPress={() => handleVilleDesireeSelection(index)}>
                    <View
                      style={[
                        styles.colorIndicator,
                        { backgroundColor: item.color },
                      ]}
                    />
                    <Text
                      style={[
                        styles.labelText,
                        item.isSelected ? styles.selectedLabelText : null,
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Animatable.View>
          <View style={styles.separator} />
          <Animatable.View animation="bounceInLeft" duration={2000}>
            <Text style={styles.subtitle}>Nombre de profs par grade :</Text>
            <View style={styles.chartContainer}>
              <PieChart
                data={grades}
                width={300}
                height={220}
                chartConfig={chartConfig}
                accessor="value"
                backgroundColor="transparent"
                paddingLeft="90"
                absolute
                hasLegend={false}
              />
              <View style={styles.labelsContainer}>
                {grades.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.label,
                      item.isSelected ? styles.selectedLabel : null,
                    ]}
                    onPress={() => handleGradeSelection(index)}>
                    <View
                      style={[
                        styles.colorIndicator,
                        { backgroundColor: item.color },
                      ]}
                    />
                    <Text
                      style={[
                        styles.labelText,
                        item.isSelected ? styles.selectedLabelText : null,
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Animatable.View>
          <View style={styles.separator} />
          {renderSpecialitesTable()}
          {renderVillesDesireesTable()}
          {renderGradesTable()}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  num: {
    fontSize: 16,
  },
  loadingText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  labelsContainer: {
    marginLeft: 20,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 80,
  },
  labelText: {
    fontSize: 14,
    marginLeft: 5,
  },
  selectedLabel: {
    backgroundColor: '#EAEAEA',
    padding: 5,
    borderRadius: 5,
  },
  selectedLabelText: {
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#3B3C36',
    marginVertical: 10,
  },
  colorIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  tableContainer: {
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
  },
  tableRowEven: {
    backgroundColor: '#f9f9f9',
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 5,
  },
});

export default Accueil;
