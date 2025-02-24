import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { showToast } from '../CustomToast';

export const FullScreenImageModal = ({
  visible,
  imageUrl,
  onClose,
}: {
  visible: boolean;
  imageUrl: string;
  onClose: () => void;
}) => {
  console.log("ImageUrl", imageUrl);

  const getValidImageUrl = (url: string) => {
    if (!url) return ''; // Handle empty URL
    let cloudinaryBase = "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/";
    
    if (!url.startsWith("http")) {
      return cloudinaryBase + url; // Ensure it's a full URL
    }

    return url.includes('.') ? url.replace('/upload/', '/upload/f_auto,q_auto/') : `${url}.png`;
  };

  const downloadImage = async () => {
    try {
      const fixedUrl = getValidImageUrl(imageUrl);
      console.log("Downloading from URL:", fixedUrl);

      const fileName = fixedUrl.split('/').pop();
      const filePath = Platform.OS === "android"
        ? `${RNFS.DownloadDirectoryPath}/${fileName}`
        : `${RNFS.DocumentDirectoryPath}/${fileName}`;

     

      
      if (Platform.OS === "android" && Platform.Version < 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert("Permission Denied", "Storage permission is required to download images.");
          return;
        }
      }

      const downloadResult = await RNFS.downloadFile({
        fromUrl: fixedUrl,
        toFile: filePath,
        begin: (res) => console.log("Download started:", res),
        progress: (res) => console.log(`Download progress: ${res.bytesWritten}/${res.contentLength}`),
      }).promise;

      if (downloadResult.statusCode === 200) {
        Alert.alert('Success', 'Image downloaded successfully.');
        Share.open({ url: `file://${filePath}` });
      } else {
        throw new Error(`Failed with status ${downloadResult.statusCode}`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to download image.');
      console.error('Download error:', error);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
        <TouchableWithoutFeedback style={modalStyles.closeArea} onPress={onClose} >
      <View style={modalStyles.modalContainer}>
        

        <Image
          source={{ uri: imageUrl }}
          style={modalStyles.fullScreenImage}
          resizeMode="contain"
        />

        {/* Download Button */}
        <TouchableOpacity style={modalStyles.downloadButton} onPress={downloadImage}>
          <AntDesign name={"download"} size={24} color={'#ffffff'}/>
        </TouchableOpacity>
        
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeArea: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
  },
  downloadButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    padding: 10,
    borderRadius: 50,
  },
});
