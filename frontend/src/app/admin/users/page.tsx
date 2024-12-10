"use client"

import React from "react";
import { useState, useEffect } from "react";
import testDataFile from "@/testJsons/users.json";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import UserCard from "@/components/UserCard";
import { useSocketIO } from "@/services/admin/userConnection";

export default function AdminUsers() {
    const testData = testDataFile.users;
    const[searchedWord, setSearchedWord] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(testData);
    const { userCount } = useSocketIO();
    const [connectedUsers, setConnectedUsers] = useState(0);

    useEffect(() => {
        const filtered = testData.filter((user) =>
            user.name.toLowerCase().includes(searchedWord.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchedWord]);

    useEffect(() => {
        setConnectedUsers(userCount);
    }, [userCount]);

    const handleSearch = (word: string) => {
        setSearchedWord(word);
    };

    return (
        <div>
            <div className="flex flex-row items-center ml-20 mb-5">
                <span className="flex w-2.5 h-2.5 bg-green-500 rounded-full me-1.5 flex-shrink-0"></span>
                {connectedUsers} Users Online
            </div>
            <div className="mb-10">
                <SearchBar onSearch={handleSearch}/>
            </div>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredUsers.map((user) => (
                        <UserCard
                            key={user.id}
                            id={user.id}
                            imageUrl={user.imageUrl}
                            name={user.name}
                        />
                    ))}
                </div>
            </div>
        </div>
)};