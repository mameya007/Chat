import React from "react";
import {GiftedChat} from "react-native-gifted-chat";
import Chatkit from "@pusher/chatkit";

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/ceb84367-dafc-4fa7-9dab-1115b9887173/token";
const CHATKIT_INSTANCE_LOCATOR = "v1:us1:ceb84367-dafc-4fa7-9dab-1115b9887173";
import PropTypes from 'prop-types';

export default class MyChat extends React.Component {
    static infos: {
        name: 'aaa'
    }
    static propTypes:{
        username:PropTypes.string.isRequired,
        roomId:PropTypes.int.isRequired,
    };

    state = {
        messages: []
    };

    componentDidMount() {

        // This will create a `tokenProvider` object. This object will be later used to make a Chatkit Manager instance.
        const tokenProvider = new Chatkit.TokenProvider({
            url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
        });

        // This will instantiate a `chatManager` object. This object can be used to subscribe to any number of rooms and users and corresponding messages.
        // For the purpose of this example we will use single room-user pair.
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: CHATKIT_INSTANCE_LOCATOR,
            userId: this.props.username,
            tokenProvider: tokenProvider
        });

        // In order to subscribe to the messages this user is receiving in this room, we need to `connect()` the `chatManager` and have a hook on `onNewMessage`. There are several other hooks that you can use for various scenarios. A comprehensive list can be found [here](https://docs.pusher.com/chatkit/reference/javascript#connection-hooks).
        chatManager.connect().then(currentUser => {
            this.currentUser = currentUser;
            this.currentUser.subscribeToRoom({
                roomId: this.props.roomId,
                hooks: {
                    onNewMessage: this.onReceive.bind(this)
                }
            });
        });
    }

    onReceive(data) {
        const {id, senderId, text, createdAt} = data;
        const incomingMessage = {
            _id: id,
            text: text,
            createdAt: new Date(createdAt),
            user: {
                _id: senderId,
                name: senderId,
                avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
            }
        };

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, incomingMessage)
        }));
    }

    onSend([message]) {
        this.currentUser.sendMessage({
            text: message.text,
            roomId: this.props.roomId
        });
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: this.props.username
                }}
            />
        );
    }
}