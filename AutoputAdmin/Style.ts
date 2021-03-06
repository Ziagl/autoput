import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center'
  },
  dialog: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 23,
    textAlign: 'left',
  },
  input: {
    color: 'black',
    padding: 10,
    fontSize: 25,
  },
  btn: {
    backgroundColor: '#ee162a',
    padding: 9,
    margin: 0,
    width: '100%',
  },
  modalBtn: {
    backgroundColor: '#ee162a',
    padding: 9,
    margin: 10,
    width: 250,
  },
  modalCloseBtn: {
    backgroundColor: '#ee162a',
    padding: 9,
    margin: 10,
    marginTop: 30,
    width: 250,
  },
  btnText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  loader: {
    width: 100,
    height: 100,
  },
  menu: {
    marginRight: 16,
  },
  menuText: {
    color: 'black',
    fontSize: 20,
  },
  dropdownIconColor: {
    color: 'black',
  },
  dropdownButton: {
    width: '100%',
  },
  timePickerColor: {
    color: 'black',
  },
  timePickerItemStyle: {
    margin: 24,
  },
  placeholderTextColor: {
    color: 'grey',
  },
  detailScrollView: {
    width: '100%',
    backgroundColor: '#f8f8f8aa',
  },
  // login styles
  loginInput: {
    color: 'black',
    backgroundColor: 'lightgrey',
    height: 60,
    width: 200,
    padding: 8,
    fontSize: 30,
    marginBottom: 10,
  },
  loginBtn: {
    backgroundColor: '#ee162a',
    padding: 9,
    marginTop: 20,
    width: 200,
  },
  loginBtnText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  loginError: {
    color: '#ee162a',
    marginTop: 20,
    fontSize: 30,
    fontWeight: '500',
  },
  settingsText: {
    color: 'black',
    fontSize: 23,
    textAlign: 'left',
  },
  scrollView: {

  },
});