import * as React from 'react';
// import { StyleSheet, Image } from 'react-native';
import { WebView } from 'react-native-webview';


export default function WebViewComponent(props){
    console.log(props)
    return (
        <WebView source={{ uri: props.route.params.link }} />
    )
}