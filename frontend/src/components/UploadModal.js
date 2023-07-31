import React from "react";
import { Modal, StyleSheet, Pressable, View, Text } from "react-native";
import {
  handleCameraCapture,
  handleMediaLibrarySelect,
} from "../utils/CameraUtils";
import { useUploadUserImageMutation } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../slices/userStore";

const UploadModal = ({
  modalVisible,
  setModalVisible,
  userID,
  setUploading,
}) => {
  const dispatch = useDispatch();

  const [uploadUserImage, { isLoading, isError }] =
    useUploadUserImageMutation();

  const handleImageUpload = async (image) => {
    try {
      setUploading(true);
      const data = await uploadUserImage({
        userID,
        image,
      }).unwrap();
      dispatch(setUserInfo(data));
      setUploading(false);
    } catch (error) {
      console.error("Backend request error:", error);
    }
  };

  const openCamera = async () => {
    setModalVisible(false);
    const imageUrl = await handleCameraCapture();
    if (imageUrl) {
      handleImageUpload(imageUrl);
    }
  };

  const openMediaLibrary = async () => {
    setModalVisible(false);
    const imageUrl = await handleMediaLibrarySelect();
    if (imageUrl) {
      handleImageUpload(imageUrl);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable style={styles.modalOption} onPress={openCamera}>
            <Text style={styles.modalOptionText}>Camera</Text>
          </Pressable>
          <Pressable style={styles.modalOption} onPress={openMediaLibrary}>
            <Text style={styles.modalOptionText}>Device</Text>
          </Pressable>
          <Pressable
            style={styles.modalOption}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalOptionText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default UploadModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalOptionText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    fontWeight: 600,
  },
});
