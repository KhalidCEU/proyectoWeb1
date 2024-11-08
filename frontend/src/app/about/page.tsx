import React from 'react';
import { Typography } from '@mui/material';

export default function About() {
    return (
        <div>
            <div className='flex mx-auto px-32 mt-16'>
                <p className="text-2xl font-bold">About</p>
            </div>

            <div className='flex mx-auto px-32 mt-12'>
                <div className="text-black text-justify text-xl">
                    <span className='text-green-500'>SneakeRate </span>
                    is your go-to web application designed to connect sneaker enthusiasts with the most comprehensive and reliable information in the market.
                    Our platform empowers users to evaluate and review a vast catalog of sneakers, making it easier to choose the perfect pair for every individual.
                    <br/>
                    <br/>

                    <p className='text-lg font-semibold mb-5'>Our motivation ❤️</p>
                    Our <span className='text-purple-500'>passion for sneakers </span>drives us to create a space where consumers can find trustworthy guidance for their online purchases.
                    In today's fast-paced market, the overwhelming number of options can leave many feeling lost.
                    At SneakeRate, we understand that authentic opinions are crucial for making informed decisions.
                    That’s why we strive to provide a community where sneaker lovers can share their insights and experiences.

                    <br/>
                    <br/>

                    <p className='text-lg font-semibold mb-4'>What we offer 🏅</p>
                    <ul className='list-disc pl-5 mb-2 text-lg'>
                            <li className='mb-3'>
                                <span className='font-semibold'>Comprehensive Catalog:</span> Explore an extensive range of sneakers, complete with detailed reviews and ratings from fellow users.
                            </li>
                            <li className='mb-3'>
                                <span className='font-semibold'>User Reviews:</span> Gain insights from real sneaker enthusiasts to help you make the best choice.
                            </li>
                            <li className='mb-3'>
                                <span className='font-semibold'>Community Engagement:</span> Join a vibrant community of sneaker lovers who share your passion and help each other navigate the sneaker landscape.
                            </li>
                    </ul>

                    <br/>

<<<<<<< HEAD:frontend/src/app/about/page.tsx
                    <p className='mb-32'>
                        At SneakeRate, we believe that every sneaker purchase should be informed and satisfying. Join us in celebrating the culture of sneakers and
                        find your next favorite pair today! This text captures the essence of your application, highlighting its purpose, motivation, and offerings
                        in a clear and engaging manner. Feel free to adjust any sections to better fit your brand's voice or specific features!
                    </p>
=======
                    At SneakeRate, we believe that every sneaker purchase should be informed and satisfying. Join us in celebrating the culture of sneakers and
                    find your next favorite pair today! This text captures the essence of your application, highlighting its purpose, motivation, and offerings
                    in a clear and engaging manner. Feel free to adjust any sections to better fit your brand's voice or specific features!
>>>>>>> 734dcd3 (fix: restructure About page to avoid invalid HTML nesting):src/app/about/page.tsx
                </div>
            </div>
        </div>
    );
};
