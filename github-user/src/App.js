import React from "react";
import axios from "axios";


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


  handleChange = event => {
    this.setState({
      breedName: event.target.value
    });
  };


  fetchBreed = event => {
    event.preventDefault();
    axios
      .get(`https://dog.ceo/api/breed/${this.state.breedName}/images`)
      .then(res => {
        this.setState({ doggos: res.data.message });
      });
  };
  render() {
    return (
      <div className="App">
        <h1>Github-User</h1>
        <h2>user:</h2> {this.state.userName} <br/>
        <img width="200" src={this.state.avatar} /><br/>
        <h2>Followers: </h2>
        {this.state.followers.map((person) => (
          <div>
            {person.login} <br/>
            <img width="200" src={person.avatar_url} />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
