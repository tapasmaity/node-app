import React from 'react'

function Home() {

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <div className='m-5'>
      <h1>Welcome to Home</h1>
      <button onClick={() => logOut()}>Log out</button>
    </div>
  )
}

export default Home;