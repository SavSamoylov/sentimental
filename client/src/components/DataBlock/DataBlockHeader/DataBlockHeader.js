import React from 'react';

const DataBlockHeader = (props) => {
    return (
        <header className=''>
          <h1 className=''>Sentimental</h1>
          <button onClick={props.toggleTweetBlock}>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
          </button>
        </header>
    );
}

export default DataBlockHeader;