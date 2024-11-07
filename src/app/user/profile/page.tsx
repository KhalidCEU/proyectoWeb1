

import React from 'react';
import Image from 'next/image';
import ProfileTestData from '@/testJsons/profilePage.json'

export default function Profile() {
    const testData = ProfileTestData;

    function parseDate (date: string) {
        const parsedDate = new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
        return parsedDate;
    }

    return (
        <div className="container mx-auto">
            {/* <p className="text-2xl ml-20">Profile</p> */}
            <div className="flex flex-col items-center mt-10">
                <Image
                        className='mb-4'
                        src="/elon.png"
                        width={200}
                        height={200}
                        alt="Profile pic"
                />
                <p className="font-semibold">{testData.ratings} ratings</p>

                <div className="md:w-2/3 mt-10 ">
                    <div className="flex flex-col items-start">
                        { testData && testData.comments.length > 0 ?
                            testData.comments.map((comment, index) =>
                            <p key={index} className="mb-10" >
                                {comment.comment} - {parseDate(comment.date)}
                            </p>
                            ) : (
                                <p className='text-gray-500 italic'>You haven't made any comments yet.</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
