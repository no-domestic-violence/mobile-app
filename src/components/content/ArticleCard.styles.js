import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  cardView: {
    backgroundColor: 'white',
    margin: width * 0.03,
    borderRadius: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  title: {
    marginHorizontal: width * 0.05,
    marginVertical: width * 0.03,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    marginVertical: width * 0.05,
    marginHorizontal: width * 0.02,
    color: 'black',
    fontSize: 18,
    textAlign: 'justify',
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    height: height / 6,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    marginVertical: height * 0.02,
  },
  author: {
    marginBottom: width * 0.0,
    marginHorizontal: width * 0.0,
    fontSize: 15,
    color: 'black',
    marginLeft: 20,
  },
  violence_type: {
    marginBottom: width * 0.0,
    marginHorizontal: width * 0.05,
    fontSize: 12,
    color: 'dimgray',
    textAlign: 'right',
  },
  created_at: {
    marginHorizontal: width * 0.5,
    marginBottom: 20,
    fontSize: 11,
    color: 'dimgray',
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
    marginTop: -8,
  },
});
