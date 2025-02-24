

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import QRScanner from "../../services/scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

const dWidth = Dimensions.get("window").width;
const clr1 = "mediumseagreen";

const Scan = () => {
  const [showQR, setShowQR] = useState(false);
  const [qrCodes, setQrCodes] = useState<string[]>([]);

  // Load saved QR codes from AsyncStorage when the component mounts
  useEffect(() => {
    const loadQrCodes = async () => {
      try {
        const savedQrCodes = await AsyncStorage.getItem("qrCodes");
        if (savedQrCodes) {
          setQrCodes(JSON.parse(savedQrCodes));
        }
      } catch (error) {
        console.error("Failed to load QR codes:", error);
      }
    };

    loadQrCodes();
  }, []);


  useEffect(() => {
    const saveQrCodes = async () => {
      try {
        await AsyncStorage.setItem("qrCodes", JSON.stringify(qrCodes));
      } catch (error) {
        console.error("Failed to save QR codes:", error);
      }
    };

    saveQrCodes();
  }, [qrCodes]);

  const openQRscanner = () => {
    setShowQR(true);
  };

  const onQrRead = (qrtext: string | null | undefined) => {
    if (qrtext) {
      setQrCodes((prevCodes) => [qrtext, ...prevCodes]);
    }
    setShowQR(false);
  };

  return (
    <View style={styles.page}>
      <Ionicons
        name={"scan-circle-outline"}
        size={qrCodes.length ? dWidth * 0.4 : dWidth * 0.75}
        color={clr1}
        style={styles.icon}
      />
      
      <TouchableOpacity onPress={openQRscanner} style={styles.btn}>
        <Text style={styles.btnText}>Scan QR</Text>
      </TouchableOpacity>
      
      {showQR && <QRScanner onRead={onQrRead} />}

      {!showQR && qrCodes.length > 0 && (
  <FlatList
    data={qrCodes}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
      <View style={styles.qrCard}>
        <Text style={styles.qrText}>{item}</Text>
      </View>
    )}
  />
)}
    </View>
  );
};

export default Scan;