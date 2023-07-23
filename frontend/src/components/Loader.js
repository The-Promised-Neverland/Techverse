import { View, Text, Modal } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native';

const Loader = ({ modalVisible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    width: 100,
                    height: 100,
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 35,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                }}>
                    <ActivityIndicator size={'large'} />
                </View>
            </View>
        </Modal>
    )
}

export default Loader