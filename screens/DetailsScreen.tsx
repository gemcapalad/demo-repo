import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Animated } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Movie = {
  title: string;
  overview: string;
  release_date: string;
  genre: string;
  poster: string;
  backdrop: string;
};

type DetailsScreenProps = StackScreenProps<RootStackParamList, 'Details'>;

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDFhODExZjIwYjEzOTA3Y2U3NTU3OWVjMGJjMGNjNiIsIm5iZiI6MTY2MzA2MDM1NC44NCwic3ViIjoiNjMyMDQ5ODI0MzUwMTEwMDdmOTg4M2UyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9._uqtLXljiOJnbJrm0PEEg84ggh-Yu31_XhJwIyUvNMI';

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setMovie({
          title: data.title,
          overview: data.overview,
          release_date: data.release_date,
          genre: data.genres.map((genre: { name: string }) => genre.name).join(', '),
          poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          backdrop: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
        });

        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId, fadeAnim, slideAnim]);

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Animated.Image source={{ uri: movie.backdrop }} style={[styles.backdrop, { opacity: fadeAnim }]} />
      <Animated.View style={[styles.overlay, { transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.title}>{movie.title}</Text>
        <Image source={{ uri: movie.poster }} style={styles.poster} />
        <Text style={styles.releaseDate}>Release Date: {movie.release_date}</Text>
        <Text style={styles.genre}>Genre: {movie.genre}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  backdrop: {
    width: '100%',
    height: 300,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    marginTop: 300,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  poster: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginVertical: 10,
  },
  releaseDate: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 16,
  },
  genre: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 16,
  },
  overview: {
    color: '#fff',
    margin: 10,
    textAlign: 'justify',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default DetailsScreen;