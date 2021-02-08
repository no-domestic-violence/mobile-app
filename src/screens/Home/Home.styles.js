import { StyleSheet } from 'react-native';
import { Colors } from '../../styles';

export const styles = StyleSheet.create({
  homePageView: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  headers: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 5,
  },
  rowHeaders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchBoxView: {
    flexDirection: 'row',
    marginVertical: 20,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 4,
  },
  searchbox: {
    padding: 12,
    paddingLeft: 20,
    fontSize: 16,
  },
  searchboxIcon: {
    position: 'absolute',
    right: 20,
    top: 14,
  },
  carouselContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    overflow: 'visible',
  },
  watchListView: {
    marginHorizontal: 14,
    marginVertical: 20,
  },
  viewMoreBtn: {
    color: '#02ad94',
    fontSize: 14,
    fontWeight: 'normal',
  },
});
