import React from "react";
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import useBluetooth from "../hooks/useBluetooth";

const BluetoothScreen = () => {
  const { devices, startScan, connectToDevice } = useBluetooth();

  return (
    <View style={styles.container}>
      <Button title="Scan for Devices" onPress={startScan} />
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => connectToDevice(item)}>
            <Text style={styles.deviceText}>{item.name || "Unnamed Device"}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  deviceText: {
    fontSize: 16,
    marginVertical: 8,
    textAlign: "center",
  },
});

export default BluetoothScreen;
