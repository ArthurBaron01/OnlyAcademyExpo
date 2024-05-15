import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CameraScreen = () => {
  const [facing, setFacing] = useState<'front' | 'back'>('back'); // Definindo o tipo de estado como 'front' | 'back'
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles2.container}>
        <Text style={{ textAlign: 'center' }}>Precisamos da sua permissão para acessar a câmera</Text>
        <Button onPress={requestPermission} title="Conceder permissão" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles2.container}>
      <CameraView style={styles2.camera} facing={facing}>
        <View style={styles2.buttonContainer}>
          <TouchableOpacity style={styles2.button} onPress={toggleCameraFacing}>
            <Text style={styles2.text}>Virar Câmera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles2 = StyleSheet.create({
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
