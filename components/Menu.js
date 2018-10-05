import React, {Component} from 'react';
import {Button, Text, TextInput, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import Chatkit from '@pusher/chatkit-server';
// import constants from './constants';
// import * as ConstVar from 'CTS';

class Menu extends Component {

    static propTypes: {
        onPress: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onSetRoom: PropTypes.func.isRequired,
    };

    state = {
        text: 'Troliste',
        signed: false
    };
    DisplayAllChatRooms = (roomName) => {
        if (this.state.text !== '') {
            this.setState({signed:true});
        }
        else {
            alert("Error");
        }
    };

    // CreateUser =()=>{
    //     const chatKit=new Chatkit.default({
    //         instanceLocator:"v1:us1:ceb84367-dafc-4fa7-9dab-1115b9887173",
    //         key:"27a0080b-b2bd-4aff-9356-2c0bf79584bf:ZWg5TNnylrFtOCAx2AQvJLfXMY3tVqpZxS2oRrOnDRw="
    //     });
    //     chatKit.createUser({
    //         id: 'Bunny',
    //         name: 'Hadil',
    //     })
    //         .then((user) => {
    //             console.log('Success', user);
    //         }).catch((err) => {
    //         console.log(err);
    //     });
    //
    // };
    // componentDidMount(){
    //     this.CreateUser();
    // }


    SetChatRoom=(roomName) =>{
        console.warn(roomName);
        const username = this.state.text;
        this.props.onSetRoom(roomName);
        this.props.onSubmit(username);
        this.props.onPress();
    }

    render() {
        const signed = this.state.signed;
        if (!signed) {
            return (

                <View style={styles.container}>
                    <Text>Sign In Here</Text>
                    <TextInput style={styles.input} placeholder='Write your Login here'
                               onChangeText={(text) => this.setState({text: text})}
                               value={this.state.text}/>
                    <Button title="Welcome" onPress={this.DisplayAllChatRooms}/>
                </View>);
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={styles.group}>
                        <Button title="BTS" onPress={()=>this.SetChatRoom('BTS')}/>
                        <Button title="EXO" onPress={()=>this.SetChatRoom('EXO')}/>
                    </View>

                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 200,
        textAlign: 'center'
    },
    group: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:20
    }
});
export default Menu;
