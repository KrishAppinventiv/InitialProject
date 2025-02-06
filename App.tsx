import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RootNavigator from './src/navigator';
import { FontSizeProvider } from './src/utils/FontSizeContext';
import { ThemeProvider } from './src/utils/theme-context';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      
  
      const connected = state.isInternetReachable !== null ? state.isInternetReachable : false;
      setIsConnected(connected);
      setIsModalVisible(!connected); // Show modal when no internet
    });
  
    // Fetch initial network status
    NetInfo.fetch().then(state => {
      
  
      const connected = state.isInternetReachable !== null ? state.isInternetReachable : false;
      setIsConnected(connected);
      setIsModalVisible(!connected);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
  

  const checkInternetConnection = () => {
    NetInfo.fetch().then(state => {
      const connected = state.isConnected !== null ? state.isConnected : false;
      setIsConnected(connected);
      setIsModalVisible(!connected); 
    });
  };


  return (
    <>
      <ThemeProvider>
        <FontSizeProvider>
         
          <View style={styles.container}>
            <RootNavigator />
          
            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => {}}
            >
              <View style={styles.overlay}>
                <View style={styles.modalContent}>
                  <MaterialIcons name="wifi-off" size={50} color="red" />
                  <Text style={styles.modalText}>No Internet Connection</Text>
                  <Text style={styles.modalSubText}>
                    Please check your internet connection. The app will reconnect automatically.
                  </Text>
                  <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
                </View>
              </View>
            </Modal>
          </View>
          <Toast />
        </FontSizeProvider>
      </ThemeProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '85%',
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#333',
  },
  modalSubText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
  },
  loader: {
    marginTop: 10,
  },
});