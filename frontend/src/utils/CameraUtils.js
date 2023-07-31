import * as ImagePicker from "expo-image-picker";

// Function to handle camera capture
export const handleCameraCapture = async () => {
  const cameraPermissionResult =
    await ImagePicker.requestCameraPermissionsAsync();
  const mediaLibraryPermissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (
    cameraPermissionResult.granted === false ||
    mediaLibraryPermissionResult.granted === false
  ) {
    alert("Camera and media library permissions are required!");
    return "null";
  }

  const cameraResult = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    base64: true,
  });

  if (!cameraResult.canceled && cameraResult.assets.length > 0) {
    const localUri = cameraResult.assets[0].base64;

    const base64Img = `data:image/jpg;base64,${localUri}`;
    return base64Img;
  }

  return null;
};

// Function to handle media library selection
export const handleMediaLibrarySelect = async () => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access the media library is required!");
    return null;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    base64: true,
  });

  if (!pickerResult.canceled && pickerResult.assets.length > 0) {
    const localUri = pickerResult.assets[0].base64;
    const base64Img = `data:image/jpg;base64,${localUri}`;
    return base64Img;
  }

  return null;
};
