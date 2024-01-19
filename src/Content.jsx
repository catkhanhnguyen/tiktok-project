import React from 'react'

function Content() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then()
  return (
    <div>Content</div>
  )
}

export default Content