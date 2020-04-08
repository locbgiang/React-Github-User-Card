import React from "react";
import axios from "axios";
import './App.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      avatar: '',
      followers: []
    };
  }
  
  componentDidMount() {
    axios.get("https://api.github.com/users/locbgiang").then(response => {
      this.setState({
        userName: response.data.login,
        avatar: response.data.avatar_url
      });
    });
    axios.get(`https://api.github.com/users/locbgiang/followers`).then(res => {
      this.setState({
        followers: res.data
      });
      console.log('follower executed');
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Github-User</h1>
        <h2>User:</h2>
        <div className='userCard'>
          {this.state.userName} 
          <img src={this.state.avatar} />
        </div>
        <h2>Followers:</h2>
        <div className='followersArea'>
          {this.state.followers.map((person) => (
              <div className='card'>
                {person.login} 
                <img src={person.avatar_url} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
