"use client"
import React, {FormEvent, useState} from 'react';
import {PaperAirplaneIcon} from "@heroicons/react/24/solid";
import {useSession} from "next-auth/react";
import {addDoc, collection, serverTimestamp} from "@firebase/firestore";
import {db} from "../../firebase";

interface ChatInputProps {
    chatId?: string
}


const ChatInput = ({chatId}: ChatInputProps) => {
    const [prompt, setPrompt] = useState("")
    const {data: session} = useSession()

    // use swr to get model
    const model = "text-davinci-003"

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return;

        if (!session?.user?.email || !chatId) return;

        const input = prompt.trim()
        setPrompt("")
        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`,
            }
        }
        await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            message
        )

        // Toast notification to say loading!

        await fetch("/api/askQuestion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: input, chatId, model, session
            })
        }).then(
            () => {
                //     toast notification to say successful!
            }
        )
    }

    return (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
            <form
                onSubmit={sendMessage}
                className="p-5 space-x-5 flex"
            >
                <input
                    className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
                    disabled={!session}
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    type="text"
                    placeholder="Type your message here..."
                />
                <button
                    disabled={!prompt || !session}
                    type="submit"
                    className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300
                    disabled:cursor-not-allowed"
                >
                    <PaperAirplaneIcon className="h-4 w-4 -rotate-45"/>
                </button>
            </form>
            <div>
                {/*    Model Selection*/}
            </div>

        </div>
    );
};

export default ChatInput;