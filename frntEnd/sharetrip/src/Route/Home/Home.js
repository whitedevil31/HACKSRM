import react from "react";
import "./Home.css";
import logo from "../../assets/Logo.jpg";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="container-home">
      <div className="navbar">
        <div className="logo-navbar">
          <img src={logo} alt="sharetrip logo" className="logo" />
        </div>
       
        
        <div className="navbar-content">
          <Link to="/">
            <button className="navbar-content-ind">HOME</button>
          </Link>

          <Link to="/about">
            {" "}
            <button className="navbar-content-ind">ABOUT</button>
          </Link>
          <Link to="/contact">
            <button className="navbar-content-ind">CONTACT US</button>
          </Link>

          <Link to="/login">
            {" "}
            <button className="navbar-content-ind">LOGIN</button>
          </Link>
          <Link to="/users">
            {" "}
            <button className="navbar-content-ind">SIGNUP</button>
          </Link>
        </div>
      </div>
      <div >
      <section id="wrap">
        <main>
          <h1>RIDER</h1>
          <p>Traveling shouldn't be that hard, right?</p>
         
        </main>
      </section>
      <section class="more">
        <h2>Why Rider?</h2>
        <div class="description" id="description-one">
          <div class="image-box"></div>
          <div class="word-box">
            <p>Rider is a traveling application that provides drivers with the ability to <a href="./html/create-ride-offer.html" class="shortcut">create ride offers</a> and passengers to join available ride offers.</p>
            <p>With Rider, you get to optimize the use of your ride, save fuel, money, time and most of all: you get to share! <a href="./html/signup.html" class="shortcut">Sign up</a> now to see how easy traveling can be. Seriously <a href="./html/signup.html" class="shortcut">sign up</a> now.</p>
          </div>
        </div>
      </section>

      <section class="more">
        <h2>Grab The Wheel!</h2>
        <div class="description" id="description-two">
          <div class="image-box"></div>
          <div class="word-box">
            <p>Getting started with Rider is as easy as just one click. All you have to do is <a href="./html/signup.html" class="shortcut">sign up</a>, <a href="./html/create-ride-offer.html" class="shortcut">create a ride offer</a> (if you want to offer a ride) and wait for requests.</p>
            <p>After creating a ride offer, you recieve requests from people who would like to ride with you, you can either accept or reject them and you're done.</p>
            <p>See, it's that easy. <a href="./html/signup.html" class="shortcut">Sign up</a> now to ride your way!</p>
          </div>
        </div>
        <div id="btn-wrap">
          <a href="./html/signup.html" class="pill">Sign up</a>
          <a href="./html/login.html" class="pill">Log in</a>      
        </div>
      </section>
      </div>
      <footer>
          <span>&copy; ConnTtrip</span>
          <span>Made by <a href="https://github.com/VatsaanS" target="_blank" rel="noopener">Srivatsaan S</a></span>
      </footer>
    </div>
  );
};

export default Home;
