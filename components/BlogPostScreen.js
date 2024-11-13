import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const BlogPostScreen = ({ route }) => {
  const { post } = route.params;
  return (
    <ScrollView style={styles.postContainer}>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postAuthor}>{`By ${post.author} on ${post.timestamp}`}</Text>
      <Text style={styles.postContent}>{post.content}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
  },
});

export default BlogPostScreen;