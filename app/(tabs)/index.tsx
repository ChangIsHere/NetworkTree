// this file handle frontend routing

import React, { useEffect, useState } from 'react';
// we need useEffect and useState package from react
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator,
  Dimensions
} from 'react-native';
import axios from 'axios';
// we use axios package to fetch data from the backend

const { width } = Dimensions.get('window');
// get screen width for responsive design

const HomeScreen = () => {
  const [states, setStates] = useState<string[]>([]); // list of states fetched from the backend
  const [loading, setLoading] = useState(true);  // loading state for api data
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // index of the current chosen card

  useEffect(() => {
    axios.get('http://10.140.238.49:5000/states') // must replace with your backend API Url!!!
      // port must be the same -- 5000
      // ipconfig, and find the ipv4 address then replace it!
      .then(response => {
        setStates(response.data as string[]);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching states: ", error); // handle error
        setLoading(false);
      });
  }, []);

  // update selected card when user click on the card
  const handleStateSelection = (state: string) => {
    setSelectedState(state);
  };

  const handleScroll = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width * 0.6 + 16);
    setCurrentIndex(newIndex); // need to update the progress bar
    // card width + margin
  };

  const getProgressWidth = () => {
    if (states.length === 0) {
      return 0;
    }
    return ((currentIndex + 1) / states.length) * 100; // percentage
    // calculate progress 
  };

  // if loading, show loading indicator
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saving carousel test</Text>
      <FlatList
        data={states}
        horizontal
        // showsHorizontalScrollIndicator={false}
        // onMomentumScrollEnd={handleScroll}
        keyExtractor={(item, index) => index.toString()} // ensure unique keys for items
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.cards,
              item === selectedState ? styles.selectedCard : null, // Highlight selected card
            ]}
            onPress={() => handleStateSelection(item)}
          >
            <Text style={styles.cardText}>{item}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}// hide horizontal scroll bar
        pagingEnabled // snap to the next card
        onScroll={handleScroll} // trackscrolling event
        scrollEventThrottle={16}
      />
      {/* Progress bar container*/}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${getProgressWidth()}%` }]} />
      </View>
      {selectedState && (
        <Text style={styles.selectedText}>
          Selected State: {selectedState}
        </Text>
      )}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Arial',
  },
  cards: {
    width: width * 0.6,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  selectedCard: {
    backgroundColor: 'lightblue',
  },
  cardText: {
    fontSize: 16, // font size
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  progressContainer: {
    height: 4,
    width: '60%',
    backgroundColor: 'lightgray',
    borderRadius: 2,
    marginVertical: 5,
    alignSelf: 'center',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF', // 007 is blue
    borderRadius: 2,
  },
  selectedText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
});
export default HomeScreen;