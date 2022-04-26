import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  submitNewUrl = (newUrl) => {
    postUrls(newUrl).then(data => {
      this.setState({
        urls: [...this.state.urls, data]
      })
    })
  }

  componentDidMount() {
    getUrls()
      .then((data) => {
        this.setState({
          urls: data.urls
        })
      })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm submitNewUrl={this.submitNewUrl}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
