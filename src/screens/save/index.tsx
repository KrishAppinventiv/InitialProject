
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import QRScanner from "../../services/scanner";
import styles from "./styles";
const dWidth = Dimensions.get("window").width;

const clr1 = "mediumseagreen";

const Scan = () => {
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState("");

  const openQRscanner = () => {
    setShowQR(true);
  };

  const onQrRead = (qrtext: string | null | undefined) => {
    setQrCode(qrtext as string);
    setShowQR(false);
  };

  return (
    <View style={styles.page}>
      {qrCode ? (
        <Text style={{ fontSize: 16, color: "black" }}>
          {"QR Value \n" + qrCode}
        </Text>
      ) : null}
      <Ionicons
        name={"scan-circle-outline"}
        size={qrCode ? dWidth * 0.4 : dWidth * 0.75}
        color={clr1}
      />
      <TouchableOpacity onPress={() => openQRscanner()} style={styles.btn}>
        <Text style={{ color: clr1 }}>Scan QR</Text>
      </TouchableOpacity>
      {showQR ? <QRScanner onRead={onQrRead} /> : null}
    </View>
  );
};

export default Scan;

