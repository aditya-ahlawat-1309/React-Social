import React,{useState , useContext} from 'react'
import {View, Button , TextInput , Text ,StyleSheet} from "react-native";

 import { UserContext } from '../../contexts/index'

import {SignInBtn} from "../../components";

export default function Navbar() {

  const [user, setUser] = useContext(UserContext).user;
   

    return (
        <View style={styles.navbar}>
            <Text>React Social</Text>
            

            {user ? <img style={styles.navbar_img} src={user.photoURL} />: <SignInBtn/>} 
        </View>
    )
}

const styles= StyleSheet.create({
    navbar :{
    display : "flex",
    justifyContent: "space-between",
    padding: "12 24",
    backgroundColor: "white",
},

navbar_img :{
    height: "35",
    borderRadius: "8",
},
})


