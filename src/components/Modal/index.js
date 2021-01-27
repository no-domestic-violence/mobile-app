import React from 'react';
import Modal from 'react-native-modal';
import { View, Text, Button } from 'react-native';
import { styles } from './Modal.styles';

const ModalComponent = ({ isVisible, setModalVisible, navigation }) => {
  return (
    <Modal isVisible={isVisible}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.modalContainer}>
          <Text style={styles.textSuccess}>
            Your password was successfully changed!
          </Text>
          <Button
            title="Ok"
            onPress={() => {
              setModalVisible(false);
              navigation.navigate('User');
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
