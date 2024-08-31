import { StyleSheet } from 'react-native';

const Inputstyles = StyleSheet.create({
  dailyAllowanceContainer: {
    margin: 12,
  },
  clearBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 10,

  
  },
  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'rgba(255, 199, 23, 1)',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  textLabel: {
    fontWeight: '600',
    fontSize: 14,
    margin: 8,
    color: 'gray'
  },
  optional: {
    color: 'wheat',
    fontSize: 12,
    fontWeight: '500'
    
  }

});

export default Inputstyles;
