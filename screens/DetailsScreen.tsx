import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

interface Movie {
  title: string;
  year: number;
  synopsis: string;
  cast: string[];
  director: string;
  genre: string;
  poster: string;
}

interface DetailsScreenProps {
  route: {
    params: {
      movie: Movie;
    };
  };
}

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
  'The Dark Knight': {
    title: 'The Dark Knight',
    year: 2008,
    synopsis: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    director: 'Christopher Nolan',
    genre: 'Action',
    poster: 'https://via.placeholder.com/150/0000FF/808080?text=The+Dark+Knight',
  },
  'Memento': {
    title: 'Memento',
    year: 2000,
    synopsis: 'A man with short-term memory loss attempts to track down his wife\'s murderer.',
    cast: ['Guy Pearce', 'Carrie-Anne Moss', 'Joe Pantoliano'],
    director: 'Christopher Nolan',
    genre: 'Thriller',
    poster: 'https://via.placeholder.com/150/0000FF/808080?text=Memento',
  },
  'The Prestige': {
    title: 'The Prestige',
    year: 2006,
    synopsis: 'After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.',
    cast: ['Christian Bale', 'Hugh Jackman', 'Scarlett Johansson'],
    director: 'Christopher Nolan',
    genre: 'Drama',
    poster: 'https://via.placeholder.com/150/0000FF/808080?text=The+Prestige',
  },
  'Tenet': {
    title: 'Tenet',
    year: 2020,
    synopsis: 'Armed with only one word, Tenet, and fighting for the survival of the world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
    cast: ['John David Washington', 'Robert Pattinson', 'Elizabeth Debicki'],
    director: 'Christopher Nolan',
    genre: 'Action',
    poster: 'https://via.placeholder.com/150/0000FF/808080?text=Tenet',
  },
  'Batman Begins': {
    title: 'Batman Begins',
    year: 2005,
    synopsis: 'After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.',
    cast: ['Christian Bale', 'Michael Caine', 'Ken Watanabe'],
    director: 'Christopher Nolan',
    genre: 'Action',
    poster: 'https://via.placeholder.com/150/0000FF/808080?text=Batman+Begins',
  },
};

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  details: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
  poster: {
    width: 150,
    height: 200,
    marginBottom: 10,
  },
  synopsis: {
    fontSize: 16,
    marginBottom: 10,
    color: '#FFFFFF',
  },
});
export default DetailsScreen;
export { DetailsScreenProps };