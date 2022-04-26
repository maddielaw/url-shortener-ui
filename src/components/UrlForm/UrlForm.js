import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const newUrl = {
      title: this.state.title,
      long_url: this.state.urlToShorten
    }
    this.props.submitNewUrl(newUrl)
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <form className='form' onSubmit={(e) => this.handleSubmit(e)}>
        <input
          className='title-input'
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
          required
        />

        <input
          className='url-input'
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
          required
        />

        <button className='submit' type='submit'>Shorten Please!</button>
      </form>
    )
  }
}

export default UrlForm;
