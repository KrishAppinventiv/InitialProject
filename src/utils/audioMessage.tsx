import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { vh } from './dimension';


type AudioMessageProps = {
    message: any;
    isCurrentUser: boolean;
    playAudio: (audioUrl: string, messageId: string) => Promise<void>;
    isAudioPlaying: boolean;
    audioProgress: number;
  };
  
const AudioMessage: React.FC<AudioMessageProps> = ({
    message,
    isCurrentUser,
    playAudio,
    isAudioPlaying,
    audioProgress,
  }) => {
    const isPlaying = message.isPlaying; 
  
    console.log("🎵 AudioMessage - Current Message ID:", message._id);
    console.log("▶️ Playing Message ID:", isPlaying ? "Playing" : "Not Playing");
    console.log("🔊 isPlaying:", isPlaying);
  
    if (!message.audio) return null;
  
    // Animate bars when playing
    const barHeights = [12, 8, 14, 9, 13, 7, 10, 11].map((height, i) =>
      isPlaying ? height + Math.sin(audioProgress * 10 + i) * 3 : height
    );
  
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: isCurrentUser ? "#0078fe" : "#f0f0f0",
          borderRadius: 20,
          padding: 10,
          marginVertical: vh(5),
          marginHorizontal: vh(8),
          width: vh(120),
        }}
      >
        <TouchableOpacity
          onPress={() => playAudio(message.audio, message._id)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Play/Pause Button */}
          <View
            style={{
              backgroundColor: isCurrentUser ? "#ffffff40" : "#00000020",
              borderRadius: 20,
              padding: 8,
            }}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={20}
              color={isCurrentUser ? "white" : "black"}
            />
          </View>
  
          {/* Animated Bars */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
            {barHeights.map((height, i) => (
              <View
                key={i}
                style={{
                  width: 3,
                  height,
                  backgroundColor: isCurrentUser ? "white" : "black",
                  borderRadius: 5,
                  opacity: 0.6,
                  transform: [{ scaleY: isPlaying ? 1.2 : 1 }],
                }}
              />
            ))}
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  
  
  

export default AudioMessage

const styles = StyleSheet.create({})