import Link from "next/link";
import {ChatBubbleLeftIcon, TrashIcon} from "@heroicons/react/24/outline";
import {usePathname, useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {collection, deleteDoc, doc, orderBy, query} from "@firebase/firestore";
import {db} from "../../firebase";

type Props = {
    id: string;
}

const ChatRow = ({id}: Props) => {
    const pathName = usePathname()
    const router = useRouter()
    const {data: session} = useSession();
    const [isActive, setIsActive] = useState(false)

    const [messages] = useCollection(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
    )

    useEffect(() => {
        if (!pathName) return;
        setIsActive(pathName.includes(id));
    }, [id, pathName]);

    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id))
        router.replace('/')
    }

    return (
        <Link href={`/chat/${id}`} className={`chatRow justify-center ${isActive && "bg-gray-700/50"}`}>
            <ChatBubbleLeftIcon className="h-5 w-5"/>
            <p className="flex-1 hidden md:inline-flex truncate">
                {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
            </p>
            <TrashIcon onClick={removeChat} className="h-5 w-5 text-gray-700 hover:text-red-700"/>
        </Link>
    );
};

export default ChatRow;