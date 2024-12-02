import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';

// Define the props for the HomeScreen component
interface HomeScreenProps {
  navigation: any;
}

// Movie data
const movies = [
  { id: '1', title: 'Inception', year: '2010', poster: 'https://via.placeholder.com/150/0000FF/808080?text=Inception' },
  { id: '2', title: 'Interstellar', year: '2014', poster: 'https://via.placeholder.com/150/0000FF/808080?text=Interstellar' },
  { id: '3', title: 'Dunkirk', year: '2017', poster: 'https://via.placeholder.com/150/0000FF/808080?text=Dunkirk' },
  { id: '4', title: 'The Dark Knight', year: '2008', poster: 'https://via.placeholder.com/150/0000FF/808080?text=The+Dark+Knight' },
  { id: '5', title: 'Memento', year: '2000', poster: 'https://via.placeholder.com/150/0000FF/808080?text=Memento' },
  { id: '6', title: 'The Prestige', year: '2006', poster: 'https://via.placeholder.com/150/0000FF/808080?text=The+Prestige' },
  { id: '7', title: 'Tenet', year: '2020', poster: 'https://via.placeholder.com/150/0000FF/808080?text=Tenet' },
  { id: '8', title: 'Batman Begins', year: '2005', poster: 'https://via.placeholder.com/150/0000FF/808080?text=Batman+Begins' },
];

// Constants for layout
const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const posterWidth = (screenWidth - 40) / numColumns;

// HomeScreen component
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter movies based on search query
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search movies..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredMovies}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item })}>
            <View style={[styles.poster, { width: posterWidth }]}>
              <Image
                source={{ uri: item.poster }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.movieTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Styles for the HomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#ffffff',
    marginBottom: 20,
  },
  poster: {
    height: 200,
    backgroundColor: '#333', // Placeholder color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  movieTitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default HomeScreen;