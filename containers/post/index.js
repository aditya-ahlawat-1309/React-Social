import React ,{useState , useContext} from 'react';
import { Comment } from '../../components';
import CommentInput from '../../components/comment-input';
import { UserContext } from '../../contexts/index';
import { db, storage } from '../../../firebase';

import {View, Button , TextInput , Text ,StyleSheet} from "react-native";

export default function Post({profileUrl,
     username , 
     id , 
     photoURL ,
      caption ,
       comments
    }) 
    
    {
    
        const [user, setUser] = useContext(UserContext).user;
   
    const deletePost = () => {
        // delete the imagefrom firebase storage

                                                  
        // get reference to the image file we like to delete
        var imageRef = storage.refFromURL(photoURL);

        // delete the file

        imageRef.delete().then(function(){
            console.log("delete successful");
        }).catch(function(error){
            console.log(`Error ${error}`);
        });

        // step 2 : remove the post info from firebase firestore
        db.collection("posts").doc(id).delete().then(function(){
            console.log("delete post info successful");
        }).catch(function(error){
            console.log(`Error post info delete ${error}`);
        });
    }

    return (
        <View style={styles.post}>
        <View style={styles.post_header}>
        <View style={styles.post_headerLeft}>
            <img src={profileUrl} style={styles.post_profilePic}/>
            <Text styles={{marginLeft: "8px"}}>{username}</Text>
            <Button onClick={deletePost} style={styles.post_delete}>Delete</Button>
        </View>
        </View>  

        <View style={styles.post_center}>
            <img style={styles.post_photoUrl} src={photoURL} />
        </View> 


        <View>
            <Text>
                <Text styles={{fontWeight: "500" , marginRight:"4%"}}>{username}</Text>
                {caption}
            </Text>
        </View>

       


        {comments ? comments.map((comment) =>
         <Comment username={comment.username} caption={comment.comment}/>) : (<></>)} 

          {user ? <CommentInput comments ={comments} id={id}/> : <></> }
        
        </View>
    )
}

const style= StyleSheet.create ({
    post :{
    backgroundColor: "white",
    maxWidth: "600px",
    width: "90vw",
    padding : "16px",
},

post_header :{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

},

post_headerLeft: {
    display: "flex",
    aligItems: "center",
},

post_profilePic: {
    height: "35px",
    borderRadius:  "8px",
},

post_delete: {
    border :"none",
    backgroundColor: "white",
    cursor : "pointer",
    paddingLeft: "210%",
},



post_photoUrl: {
    width: "100%",
    objectFit: "cover",
    margin: "16px 0px",
},
})

