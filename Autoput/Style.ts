import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center'
  },
  scrollView: {

  },
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8aa',
    borderBottomWidth: 2,
    borderColor: '#000000aa',
    width: '100%',
    alignItems: 'center',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
  },
  listItemText: {
    color: 'black',
    fontSize: 20,
    fontWeight: "500",
  },
  text: {
    color: 'black',
    fontSize: 23,
    textAlign: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});