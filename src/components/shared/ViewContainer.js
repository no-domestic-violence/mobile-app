import {
    View,
  } from 'react-native';
import { Colors, Typography } from '../../styles';

export default function ViewContainer() {
    return (
      <View style={styles.view}>

      </View>
    );
  }

  const styles = StyleSheet.create({
    view: {
      backgroundColor: Colors.primary,
      flex: 1,
      alignItems: 'center',
      height: '100%',
    },
  });