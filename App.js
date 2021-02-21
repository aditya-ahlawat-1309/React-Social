
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Login/LoginScreen';
import LoginScreen from './Login/LoginScreen';
import { UserContextProvider } from './ReactSocial/contexts';
import {Home} from "./ReactSocial/pages/index"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      timePassed: false
    };
  }

  render() {
    setTimeout(() => {this.setState({timePassed: true})}, 1700);
    if (!this.state.timePassed){
      return (
        <View style={styles.Screen}>
       <Text style={styles.h1}>Tiles</Text>
       </View>
      );
    }else{
      
      return (
        <UserContextProvider>
      <Home/>
      </UserContextProvider>
      // <Login/>
      );
  }
  }
}


const styles =StyleSheet.create({
  
  Screen:{
         
         backgroundColor: "black",
    fontWeight: "bold",
    minHeight: "100%",
    },


  h1 : {
    
    fontWeight: "bold",
    
    textAlign: "center",
    justifyContent: "center",
    marginTop:"150px",
    fontSize: "15vw",
    color: "white",
    },
})

export default App;
