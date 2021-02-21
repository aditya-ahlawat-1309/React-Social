import React, {useContext} from 'react'
import {View , Text , StyleSheet} from  "react-native";
import {signInWithGoogle} from "../../services/auth"
import { UserContext } from '../../contexts/index';

export default function SignInBtn() {
   const [user, setUser ] = useContext(UserContext).user;
   
   

   const signInBtnClick = async () => {
    let userBySignIn = await signInWithGoogle();
    if(userBySignIn) setUser(userBySignIn);
    console.log(userBySignIn);
   }; 

    return (
        <View style={styles.signInBtn} onClick={signInBtnClick}>
            <Text>Sign In With Google</Text>
        </View>
    );
}

const styles= StyleSheet.create ({
    signInBtn: {
    backgroundColor: "#de5246",
    maxWidth: "150px",
    textAlign:  "center",
    padding : "8px 16px",
    borderRadius :"4px",
    color: "white",
    fontSize:"14px",
    fontWeight: "500",
    
},
})


