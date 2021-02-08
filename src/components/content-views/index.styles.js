import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  carouselImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  carouselText: {
    paddingLeft: 10,
    color: '#000',
    marginTop: 10,
    bottom: 0,
    left: 0,
    right: 0,
    fontWeight: 'bold',
  },
  itemContainer: {
    margin: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderColor: 'grey',
  },
  itemIcon: {
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  itemImage: {
    height: 200,
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  watchItemContainer: {
    marginRight: 20,
  },
  watchItemIcon: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    opacity: 0.9,
  },
  watchItemView: {
    position: 'absolute',
    height: 5,
    width: '100%',
    backgroundColor: '#02ad94',
    opacity: 0.8,
  },
  watchItemImage: {
    height: 300,
    width: 200,
  },
});
