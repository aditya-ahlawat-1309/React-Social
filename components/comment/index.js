import React from 'react'
import { View,Text } from 'react-native';

export default function Comment({username, caption}) {
    return (
        <View className="comment">
             <Text>
                <Text styles={{fontWeight: "500" , marginRight:"4%"}} >
                {username}
                </Text>
                {caption}
            </Text>
        </View>
    );
}


