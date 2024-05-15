import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ListRenderItem,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const userImages = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',

];

const UserProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(prevState => !prevState);
  };

  const navigation = useNavigation(); // Use useNavigation para acessar a navegação

  const handleOpenCamera = () => {
    navigation.navigate('CameraScreen' as never); // Navegue para a tela CameraScreen quando o botão for pressionado
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Image
        source={{ uri: 'https://via.placeholder.com/150/0000FF/808080?text=Montanhas+ao+amanhecer' }}
        style={styles.profileImage}
      />
      <Text style={styles.username}>Nome do Usuário</Text>
      <Text style={styles.bio}>Bio do usuário</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.stats}>Seguidores: 2587</Text>
        <Text style={styles.stats}>Seguindo: 1326</Text>
      </View>
      <TouchableOpacity
        style={[styles.followButton, { backgroundColor: isFollowing ? 'gray' : 'blue' }]}
        onPress={toggleFollow}>
        <Text style={styles.followButtonText}>
          {isFollowing ? 'Deixar de Seguir' : 'Seguir'}
        </Text>
      </TouchableOpacity>

      <View style={styles.container}>
      {/* Botão para abrir a câmera */}
      <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
        <Text style={styles.buttonText}>Abrir Câmera</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );

  const renderItem: ListRenderItem<string> = ({ item }) => (
    <Image source={{ uri: item }} style={styles.feedImage} />
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={userImages}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bio: {
    marginTop: 5,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  stats: {
    marginRight: 20,
  },
  followButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  feedImage: {
    width: 100,
    height: 100,
    margin: 5,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default UserProfile;
