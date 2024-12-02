import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

// Define the Movie interface
interface Movie {
  title: string;
  year: number;
  synopsis: string;
  cast: string[];
  director: string;
  genre: string;
  poster: string;
}

// Define the props for the DetailsScreen component
interface DetailsScreenProps {
  route: {
    params: {
      movie: Movie;
    };
  };
}

// Movie catalog with movie details
const movieCatalog: Record<string, Movie> = {
  'Inception': {
    title: 'Inception',
    year: 2010,
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'],
    director: 'Christopher Nolan',
    genre: 'Sci-Fi',
    poster: 'https://via.placeholder.com/150/0000FF/808080?text=Inception',
  },
  'Interstellar': {
    title: 'Interstellar',
    year: 2014,
    synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    director: 'Christopher Nolan',
    genre: 'Sci-Fi',
    poster: 'https://via.placeholder.com/150/0000FF/808080?text=Interstellar',
  },
  'Dunkirk': {
    title: 'Dunkirk',
    year: 2017,
    synopsis: 'Allied soldiers from Belgium, the British Empire and France are surrounded by the German Army, and evacuated during a fierce battle in World War II.',
    cast: ['Fionn Whitehead', 'Barry Keoghan', 'Mark Rylance'],
    director: 'Christopher Nolan',
    genre: 'War',
    poster: 'https://via.placeholder.com/150/0000FF/808080?text=Dunkirk',
  },
};

// DetailsScreen component to display movie details
const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { movie } = route.params;
  const movieDetails = movieCatalog[movie.title];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{movieDetails.title}</Text>
      <Image source={{ uri: movieDetails.poster }} style={styles.poster} />
      <Text style={styles.details}>Year: {movieDetails.year}</Text>
      <Text style={styles.details}>Genre: {movieDetails.genre}</Text>
      <Text style={styles.details}>Director: {movieDetails.director}</Text>
      <Text style={styles.details}>Cast: {movieDetails.cast.join(', ')}</Text>
      <Text style={styles.synopsis}>{movieDetails.synopsis}</Text>
    </ScrollView>
  );
};

// Styles for the DetailsScreen component
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
  poster: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 5,
  },
  synopsis: {
    fontSize: 14,
    color: '#aaaaaa',
    marginTop: 10,
  },
});

export default DetailsScreen;