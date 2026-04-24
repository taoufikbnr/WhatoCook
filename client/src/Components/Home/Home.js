import React, { useState } from "react";
import { Carousel, FormControl } from "react-bootstrap";
import "./home.css"

const Home = () => {


  return (
    <> 
    <Carousel  >
  <Carousel.Item interval={1000}>
    <img 
      className="d-block w-100"
      src="https://cdn.wallpapersafari.com/37/34/t8w4sf.jpg"
      alt="Fruits"
    />
    <Carousel.Caption >
      <h3>Fruits</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={750}>
    <img 
      className="d-block w-100"
      src="https://media.istockphoto.com/photos/set-of-summer-alcoholic-cocktails-popular-bright-refreshing-colorful-picture-id1311102320?b=1&k=20&m=1311102320&s=170667a&w=0&h=ZverLYNrVf_1DUEN8Ztftaz3kTSaVFl1Zyr81Tuw-Mk="
      alt="Second slide"
    />
    <Carousel.Caption >
      <h3>Smoothies</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img 
      className="d-block w-100"
      src="http://img.over-blog-kiwi.com/0/98/03/83/20170130/ob_17aae4_505700d54c3b5495c95f385776532b47-large.jpeg"
      alt="Third slide"
    />
    <Carousel.Caption >
      <h3>Healthy Food</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>

  </>
  );
};


export default Home;
