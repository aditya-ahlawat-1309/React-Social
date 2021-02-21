import React from 'react'

import { SignInBtn } from '../../components'
import { CreatePost, Navbar } from '../../containers'
import Feed from '../../containers/feed'
import {View, Button , TextInput , Text ,StyleSheet} from "react-native";


export default function Home() {
    return (
        <View style={styles.home}>
        <Navbar/>
            <CreatePost/>
            <Feed/>
        </View>
    )
}

const styles = StyleSheet.create({
    home:{
    backgroundColor: "#f3f2ef",
    height :"100vh",
    
},
})


