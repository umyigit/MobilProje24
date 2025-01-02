import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useMotionSensor } from "../hooks/useMotionSensor";

const MotionScreen = () => {
  const { x, y, z } = useMotionSensor();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>X: {x.toFixed(2)}</Text>
      <Text style={styles.text}>Y: {y.toFixed(2)}</Text>
      <Text style={styles.text}>Z: {z.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
});

export default MotionScreen;
