import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

const CameraScreen = () => {
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<{ uri: string } | null>(null); // Definir tipo correto para photo
  const cameraRef = useRef<any>(null); // Usar any para evitar problemas de tipo

  if (!permission) {
    // Permissões da câmera ainda estão carregando.
    return <View />;
  }

  if (!permission.granted) {
    // Permissões da câmera não foram concedidas ainda.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisamos da sua permissão para acessar a câmera</Text>
        <Button onPress={requestPermission} title="Conceder permissão" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData); // Configurar photo corretamente
    }
  };

  const uploadPicture = async () => {
    if (photo) {
      const formData = new FormData();
      formData.append('photo', {
        uri: photo.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any); // Ajuste temporário para contornar erro de tipo

      try {
        const response = await axios.post('http://192.168.100.4:3000/uploadFoto', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Foto enviada com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao enviar foto:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Virar Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Tirar Foto</Text>
          </TouchableOpacity>
          {photo && (
            <TouchableOpacity style={styles.button} onPress={uploadPicture}>
              <Text style={styles.text}>Enviar Foto</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CameraScreen;
