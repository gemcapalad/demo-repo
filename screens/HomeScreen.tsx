import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Assuming the file is named 'RootStackParamList.tsx'
import { Ionicons } from '@expo/vector-icons';
import debounce from 'lodash.debounce';

const API_KEY = 'YOUR_API_KEY_HERE';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

const HomeScreen: React.FC = () => {
  const [movies, setMovies] = useState<{ id: number; title: string; poster_path: string; release_date: string }[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.results) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setTotalPages(data.total_pages);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const loadMoreMovies = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const navigateToDetails = (movieId: number) => {
    navigation.navigate('Details', { movieId });
  };

  const handleSearch = useCallback(
    debounce((text) => {
      setSearch(text);
    }, 300),
    []
  );

  const renderItem = ({ item }: { item: { id: number; title: string; poster_path: string; release_date: string } }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigateToDetails(item.id)}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.releaseDate}>{item.release_date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search movies..."
          placeholderTextColor="#888"
          onChangeText={handleSearch}
          value={search}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={24} color="#888" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={movies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#121212',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: '#fff',
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  releaseDate: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default HomeScreen;