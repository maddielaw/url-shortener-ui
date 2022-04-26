import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      getError: '',
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
      .catch((error) => {
        this.setState({getError: error.message})
      })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1 className='page-title'>URL Shortener</h1>
          <UrlForm submitNewUrl={this.submitNewUrl} />
          {this.state.getError && <p className='error-msg'>{this.state.getError}</p>}
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
