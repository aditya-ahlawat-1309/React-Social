import React,{useState , useContext} from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { UserContext } from '../../contexts/index';
import { db } from '../../../firebase';

import {View, Button, Text ,StyleSheet} from "react-native";

export default function CommentInput({comments, id }) {
    

    const [user, setUser] = useContext(UserContext).user;
    const [comment, setComment] = useState("");
    
    const [commentArray, setCommentArray] = useState(comments ? comments : []);

    const addComment = () => {
        // Add comment to post info
       if(comment != ""){
           
        commentArray.push({
            comment: comment,
            username: user.email.replace("@gmail.com","").toLowerCase(),
        });

        db.collection("posts")
        .doc(id)
        .update({
            comments: commentArray, 
        }).then(function(){
            console.log("comment added")
          
        }).catch(function (error){
            console.log(`Error ${error}`);
 
        });
       }

    };
    
    return (
        <View  style={styles.commentInput}>
            <TextInput rows="1"
            style={styles.commentInput_textarea}
            placeholder="Write a comment ..."
            value={comment}
            onChange = {(e) => setComment(e.target.value)}
            >
            </TextInput>

            <Button 
            onPress={addComment}
            style={styles.commentInput_btn}>Post</Button>
        </View>
    )
}

const styles = StyleSheet.create({
        
    commentInput: {
       display: "flex",

       justifyContent: "space-between",
    },
    

    commentInput_textarea: {
           border:"none",
    width: "100%",
    resize: "none",
    margin: "8px 0px",

    fontFamily: 'Poppins',
    
  webkitFontSmoothing: "antialiased",
  mozOsxFontSmoothing: "grayscale",
    },

    
    commentInput_btn: {
              backgroundColor: "white",
    border: "none",
    },

})
