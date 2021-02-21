import React, { useContext, useState } from "react";

import { SignInBtn} from "../../components";
import { UserContext } from "../../contexts/index";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { storage, db } from "../../../firebase";
import makeid from "../../helper/index";

import firebase from "firebase";
import { View , Text , TextInput , Button, StyleSheet} from "react-native";


export default function CreatePost() {
    
    const [user, setUser] = useContext(UserContext).user

    const [caption, setCaption] = useState("");

    const [image, setImage] = useState(null);

    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);

            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);

            var imagePreview = document.getElementById("image-preview");

            imagePreview.src = selectedImageSrc;
            imagePreview.style.display = "block";
        }
    };
    
    

    const handleUpload = () => {

        if (image) {
            var imageName = makeid(10);
            const uploadTask = storage.ref(`images/${imageName}.jpg`)
            .put(image);

            uploadTask.on("state_changed",(snapshot) => {
                // progress function 1%,2% ...
                
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
 
                setProgress(progress);

            },(error) => {
                console.log(error);
            },() => {
                //get download url upload the post info

                storage.ref("images").child(`${imageName}.jpg`)
                .getDownloadURL()
                .then((imageUrl) => {
                  
                    db.collection("posts").add({
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        caption:caption,
                        photoUrl: imageUrl,
                        username: user.email.replace("@gmail.com",""),
                        profileUrl: user.photoURL,
                    });
                });

                setCaption("");
                setProgress(0);
                setImage(null);

                document.getElementById("image-preview").style.display = "none";
            });

        }

    };

    return (
        <View style={styles.createPost}>

        {user ? (
        <View style={styles.createPost_loggedIn}>
        <Text>CreatePost</Text>
        <View style={styles.createPost_loggedInCenter}>
        <TextInput style={styles.createPost_textarea}
        rows = "3" 
        placeholder = "enter caption here ..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        ></TextInput>

        <View style={styles.createPost_imagePreview}>
            <img id="image-preview" alt="" />
        </View>

        </View>
        <View style={styles.createPost_loggedInBottom}>
        <View style={styles.createPost_imageUpload}>
        
            <label htmlFor="fileInput">
            <AddAPhotoIcon styles={{cursor:"pointer", fontSize:"20px"}}/>
            </label>
            <input id="fileInput" type="file" accept="image/*" onChange={handleChange}/>
        </View>
        <Button style={styles.createPost_uploadBtn} onClick={handleUpload} styles={{color : caption ? "#000" : 'lightgrey'}}>
        {`Upload ${ progress !=0 ? progress : ""}`}
        </Button>
        </View>
        </View>
         ):( 
        <View>
        <SignInBtn/>
        <Text styles={{ marginLeft : "12px"}}>
        to Post & Comment
        </Text>
        </View>)}

        </View>
    );
}

const styles = StyleSheet.create({
    createPost :{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding : "24px",
},

createPost_loggedIn:{
    backgroundColor: "white",
    width:"90%",
    borderRadius: "4px",
    padding : "12px 16px",
},

// createPost_imageUpload > input:{
//     display: none,
// },

createPost_uploadBtn :{
    border: "none",
    backgroundColor: "white",

},

createPost_loggedInBottom: {
    display: "flex",
    justifyContent: "space-between",
},

createPost_textarea: {
    border: "none",
    width :"100%",
   marginTop: "10px",
   fontSize: "14px",

    fontFamily: "Poppins",

},


imagePreview :{
    display: "none",
    height:"80px",
    margin: "8px 0px",
    borderRadius: "4px",
}, 

})
