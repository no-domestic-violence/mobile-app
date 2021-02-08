import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  cardView: {
    backgroundColor: 'white',
    margin: width * 0.02,
    borderRadius: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  buttonLabel: {
    fontSize: 14,
    color: '#FFF',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#1C5C9D',
    borderRadius: 15,
    padding: 10,
    marginVertical: width * 0.02,
    marginLeft: 20,
    marginRight: 20,
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
  author: {
    marginBottom: width * 0.0,
    marginHorizontal: width * 0.05,
    fontSize: 12,
    color: 'black',
    marginLeft: width * 0.05,
  },
  title: {
    marginHorizontal: width * 0.05,
    marginVertical: width * 0.05,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: width * 0.05,
  },
  image: {
    height: height / 4,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    marginVertical: height * 0.02,
  },
  created_at: {
    marginHorizontal: width * 0.5,
    marginBottom: 5,
    fontSize: 12,
    color: 'black',
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  violence_type: {
    marginHorizontal: width * 0.05,
    fontSize: 12,
    color: 'black',
    textAlign: 'left',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 6,
    marginBottom: 20,
  },
});
