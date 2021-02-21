import React,{useState , useEffect} from 'react'
import { Post } from '..'
import { db } from '../../../firebase';
import {View, Button , TextInput , Text ,StyleSheet} from "react-native";


export default function Feed() {
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        
        db.collection("posts").onSnapshot((snapshot) =>
        {
            setPosts(snapshot.docs.map((doc) => ({id:doc.id , post:doc.data()})));
           
        })
    }, [])
    
    return (
        <View style={styles.feed}>
            
            {posts.map(({id,post}) => {
                return (<Post
                key={id}
                id={id}
                    profileUrl = {post.profileUrl}
                    username={post.username}
                    photoURL={post.photoUrl}
                    caption={post.caption}
                    comments={post.comments}
                />
                );
            })}
        </View>
    );
}

const styles= StyleSheet.create ({
    feed :{
   display:"flex",
   flexDirection: "column",
   alignItems: "center",
   
},
})