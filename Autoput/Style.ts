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
  settingsText: {
    color: 'black',
    fontSize: 23,
    textAlign: 'left',
  },
  img: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#ee162a',
    padding: 9,
    margin: 0,
    width: '100%',
  },
  btnText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  input: {
    color: 'black',
    padding: 10,
    fontSize: 25,
  },
  placeholderTextColor: {
    color: 'grey',
  },
});