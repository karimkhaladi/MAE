import React, { useState } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import img1 from '../photos/img1.png'
import img2 from '../photos/img2.jpg'
import img3 from '../photos/img3.jpg'
import img4 from '../photos/img4.webp'
import img5 from '../photos/img5.jpg'
/* Install pure-react-carousel using -> npm i pure-react-carousel */

function News() {
    return (
        <div className="container mx-auto">
        <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
            {/* Carousel for desktop and large size devices */}
            <CarouselProvider className="lg:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={5} visibleSlides={2} step={1} infinite={true}>
                <div className="w-full relative flex items-center justify-center">
                    <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 focus:outline-none cursor-pointer" id="prev">
                        <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </ButtonBack>
                    <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                        <Slider>
                            <div id="slider" className="h-80 flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                <Slide index={0}>
                                    <img src={img1} alt="black chair and white table" className="object-cover object-center w-80 h-80 hover:scale-125 transition duration-300 ease-in-out transform" />
                                </Slide>
                                <Slide index={1}>
                                    <img src={img2} alt="sitting area" className="object-cover object-center w-80 h-80 hover:scale-125 transition duration-300 ease-in-out transform" />
                                </Slide>
                                <Slide index={2}>
                                    <img src={img3} alt="sitting area" className="object-cover object-center w-80 h-80 hover:scale-125 transition duration-300 ease-in-out transform" />
                                </Slide>
                                <Slide index={3}>
                                    <img src={img4} alt="sitting area" className="object-cover object-center w-80 h-80 hover:scale-125 transition duration-300 ease-in-out transform" />
                                </Slide>
                                <Slide index={4}>
                                    <img src={img5} alt="black chair and white table" className="object-cover object-center w-80 h-80 hover:scale-125 transition duration-300 ease-in-out transform" />    
                                </Slide>   
                            </div>
                        </Slider>
                    </div>
                    <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 mr-8 focus:outline-none cursor-pointer" id="next">
                        <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </ButtonNext>
                </div>
            </CarouselProvider>

                {/* Carousel for tablet and medium size devices */}
                <CarouselProvider className="lg:hidden md:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={6} visibleSlides={2} step={1} infinite={true}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                    <Slide index={0}>
                                            <img src={img1} alt="black chair and white table" className="object-cover object-center w-full" />
                                    </Slide>
                                    <Slide index={1}>
                                        <img src={img2} alt="sitting area" className="object-cover object-center w-full" />
                                            
                                    </Slide>
                                    <Slide index={2}>
                                        <img src={img3} alt="sitting area" className="object-cover object-center w-full" />
                                    </Slide>
                                    <Slide index={3}>
                                       <img src={img4} alt="sitting area" className="object-cover object-center w-full" />      
                                    </Slide>
                                    <Slide index={4}>
                                        <img src={img5} alt="black chair and white table" className="object-cover object-center w-full" />
                                    </Slide>
                                   </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 mr-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for mobile and Small size Devices */}
                <CarouselProvider className="block md:hidden " naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={7} visibleSlides={1} step={1} infinite={true}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-80 h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="h-full w-full flex lg:gap-8 md:gap-6 items-center justify-start transition ease-out duration-700">
                                    <Slide index={0}>
                                       <img src={img1} alt="black chair and white table" className="object-cover object-center w-full" />  
                                    </Slide>
                                    <Slide index={1}>
                                        <img src={img2} alt="sitting area" className="object-cover object-center w-full" />
                                    </Slide>
                                    <Slide index={2}>
                                        <img src={img3} alt="sitting area" className="object-cover object-center w-full" />
                                    </Slide>
                                    <Slide index={3}>
                                        <img src={img4} alt="sitting area" className="object-cover object-center w-full" />
                                    </Slide>
                                    <Slide index={4}>
                                        <img src={img5} alt="black chair and white table" className="object-cover object-center w-full" /> 
                                    </Slide>
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 mr-8" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
            </div>
        </div>
    );
}

export default News