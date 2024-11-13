import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProgramDetails = ({ route, navigation }) => {
  const { program } = route.params;

  const renderContentCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.contentCard} 
      onPress={() => navigation.navigate('BlogPostScreen', { post: item })}
    >
      <Ionicons name={item.icon} size={32} color={getColorForType(item.type)} />
      <Text style={styles.contentTitle}>{item.title}</Text>
      <Text style={[styles.contentType, { color: getColorForType(item.type) }]}>{item.type}</Text>
    </TouchableOpacity>
  );

  const getColorForType = (type) => {
    const colors = {
      Understanding: '#3498db',
      Nutrition: '#2ecc71',
      Exercise: '#e74c3c',
      Meditation: '#9b59b6',
      Tracking: '#f1c40f',
      Treatment: '#1abc9c'
    };
    return colors[type] || '#95a5a6';
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={program}
        renderItem={({ item }) => (
          <View style={styles.weekContainer}>
            <Text style={styles.weekTitle}>Week {item.week}</Text>
            <FlatList
              horizontal
              data={item.content}
              renderItem={renderContentCard}
              keyExtractor={content => content.id}
              showsHorizontalScrollIndicator={false}
              style={styles.contentList}
            />
          </View>
        )}
        keyExtractor={item => item.week.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  weekContainer: {
    marginBottom: 24,
  },
  weekTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
  },
  contentList: {
    paddingLeft: 16,
  },
  contentCard: {
    width: 150,
    height: 180,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 8,
  },
  contentType: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ProgramDetails;