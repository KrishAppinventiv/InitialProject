import axios from 'axios';

export const uploadAudioToCloudinary = async (filePath) => {
  const data = new FormData();
  data.append('file', { uri: filePath, type: 'audio/m4a', name: 'voice_note.m4a' });
  data.append('upload_preset', 'your_upload_preset'); 

  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/upload', data);
    return response.data.secure_url; 
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
};
