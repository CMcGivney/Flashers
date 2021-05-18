import React from 'react';

const landingStyle = {
  backgroundImage: "url(https://picsum.photos/900/900?random=1)",
  backgroundSize: "cover",
  backgroundPosition: "50% 0px",
  height: "100vh",
  width: "100%",
  textAlign: "center",
  display: "flex",
  flexFlow: "column nowrap",
  justifyContent:"center",

}
const textStyle = {
  color: "white",
  textShadow: "1px 1px 3px black",
  zIndex: "1",
  fontSize: "3em",
  fontWeight: "400",
  padding: "1rem 1rem",
}
const Landing = () => {
 

 
 return(
  <div style={landingStyle}>
  <h1 style={textStyle}>Welcome to my little GraphQL project</h1>
  <p style={textStyle}>I am trying to learn and put together a flashcard/social media like app.</p>
  
  </div>
 )
}

export default Landing;