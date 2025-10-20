

import Nav from "../Nav";
import flowers from "../assets/flowers.png";


function Home() {
  

  return (
    <>
      <Nav />
      <div className="main">
        <div className="hero">
          <h1>Some Big Words About Emily&apos;s Art Portfolio</h1>
          <img className="left-img" src={flowers} alt="" />
          <img className="right-img" src={flowers} alt="" />
        </div>
        <div className="about" id="about">
          <h2 className="left">About</h2>
        </div>
        <div className="contact" id="contact">
          <h2 className="right">Contact</h2>
        </div>

       
      </div>
    </>
  );
}

export default Home;
