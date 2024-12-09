import React from 'react';
import { Typography } from '@mui/material';

export default function Faq() {
    return (
        <div>
            <div className='flex mx-auto px-32 mt-16'>
                <p className="text-2xl font-bold">FAQ <span className='text-xs'>(Frequently Asked Questions)</span></p>
            </div>

            <div className='flex mx-auto px-32 mt-12'>
                <div className='space-y-10 text-lg'>
                    <div>
                        <p className='font-semibold mb-1'>1. How do I create an account on SneakeRate? 🔑</p>
                        <p>You can create an account by clicking on the "Sign Up" button on our
                            <span className='text-green-400 font-bold'>
                                <a href='/login'> Signup Page</a>
                            </span>.
                            <span className="ml-1">
                                Fill in the required information, and you'll be ready to start exploring!
                            </span>
                    </p>
                    </div>
                    <div>
                        <p className='font-semibold mb-1'>2. Can I leave reviews for sneakers? ⭐️</p>
                        <p>Absolutely! We encourage all users to share their experiences by leaving reviews on sneakers they've purchased.</p>
                    </div>
                    <div>
                        <p className='font-semibold mb-1'>3. How can I contact customer support? 📨</p>
                        <p>If you have any questions or need assistance, you can reach our customer support team through the "Contact Us" page on our website.</p>
                    </div>
                    <div>
                        <p className='font-semibold mb-1'>4. Is there a mobile app for SneakeRate? 📱</p>
                        <p>Currently, SneakeRate is a web application, but we may release a mobile app for better accessibility in the future!</p>
                    </div>
                    <div>
                        <p className='font-semibold mb-1'>5. How can I stay updated on new sneaker releases? 💌</p>
                        <p>Follow us on our social media channels and subscribe to our newsletter to receive the latest updates and news about sneaker releases!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
