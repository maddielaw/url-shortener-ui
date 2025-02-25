import React from 'react';
import './UrlContainer.css';

const UrlContainer = props => {

  const removeUrl = (id) => {
    props.deleteUrl(id)
  }


  const urlEls = props.urls.map(url => {
    return (
      <div className="url" id={url.id} key={url.id}>
        <div className='btn-container'>
          <button className='delete-btn' onClick={() => removeUrl(url.id)}>X</button>
        </div>
        <h3 className='url-title'>{url.title}</h3>
        <a href={url.short_url} className='short-url' target="blank">{url.short_url}</a>
        <p className='long-url'>{url.long_url}</p>
      </div>
    )
  });

  return (
    <section className='url-container'>
      { urlEls.length ? urlEls : <p className='no-urls-yet'>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
