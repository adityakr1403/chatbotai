"use client";
import React from 'react';
import NewChat from "@/components/NewChat";
import {useSession} from "next-auth/react";
import {signOut} from "next-auth/react";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, orderBy, query} from "@firebase/firestore";
import {db} from "../../firebase";
import ChatRow from "@/components/ChatRow";


const SideBar = () => {
    const {data: session} = useSession()
    const [chats, loading, error] = useCollection(
        session && query(
            collection(db, 'users', session.user?.email!, 'chats'),
            orderBy('createdAt', 'desc')
        )
    )
    console.log(chats)

    return (
        <div className="p-2 flex flex-col h-screen">
            <div className="flex-1">
                <div>
                    {/*    New Chat */}
                    <NewChat/>
                    <div>
                        {/*    Model Selection */}
                    </div>
                    {/*  Map through the char rows  */}
                    {
                        chats?.docs.map((chat) => (
                            <ChatRow key={chat.id} id={chat.id}/>
                        ))
                    }
                </div>

            </div>
            {
                session && <img onClick={() => signOut()}
                                className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-20 hover:opacity-50"
                                src={session.user?.image!} alt=""/>
            }
        </div>
    );
};

export default SideBar;