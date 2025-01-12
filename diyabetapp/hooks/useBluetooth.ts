import { useState, useEffect } from "react";
import { BleManager, Device } from "react-native-ble-plx";

const useBluetooth = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const manager = new BleManager();

  useEffect(() => {
    return () => {
      manager.destroy();
    };
  }, []);

  const startScan = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }

      if (device && device.name) {
        setDevices((prevDevices) => [...prevDevices, device]);
      }
    });
    
    setTimeout(() => {
      manager.stopDeviceScan();
    }, 10000); // 10 saniye
  };

  const connectToDevice = async (device: Device) => {
    try {
      const connectedDevice = await manager.connectToDevice(device.id);
      setConnectedDevice(connectedDevice);
      console.log("Connected to:", connectedDevice.name);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  return { devices, connectedDevice, startScan, connectToDevice };
};

export default useBluetooth;
