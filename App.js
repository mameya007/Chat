import React, {Component} from "react";
import Chat from "./components/Chat";
import Menu from "./components/Menu";

export default class App extends Component {


    constructor() {
        super();
        this.state = {
            page: 'Menu',
            CurrentRoomID: 0,
            BTSId: 17663660,
            EXOId: 17733701,
            Username: ''
        }
    }


    SetRoom = (roomName) => {
        if (roomName === 'BTS')
            this.setState(previousState => ({
                CurrentRoomID: previousState.BTSId
            }));
        else if (roomName === "EXO")
            this.setState(previousState => ({
                CurrentRoomID: previousState.EXOId
            }));
        console.warn(this.state.CurrentRoomID);
    }

    ToChat = () => {
        const chat = 'Chat';
        this.setState({page: chat});
    }
    SetUsername = (username) => {
        this.setState({Username: username});
    }

    // componentWillMount() {
    //     const menu='menu';
    //     this.ToRoom(menu);
    // }

    render() {
        const page = this.state.page;
        if (page === 'Chat')
            return <Chat roomId={this.state.CurrentRoomID} username={this.state.Username}/>;
        else
            return <Menu onSetRoom={this.SetRoom} onSubmit={this.SetUsername} onPress={this.ToChat}/>
    }
}