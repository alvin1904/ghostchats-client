'use client';

import logo from '@/assets/logo/logo-white.png';
import Image from 'next/image';
import styles from '@/app/styles/chat.module.css';
import ChatNav from '@/components/chat/Nav';
import ChatSidebar from '@/components/chat/Sidebar';
import ChatScreen from '@/components/chat/Chat';
import { themes } from '@/constants/constants';
import { useChatContext } from '@/context/chatContext';
import { montserratFont } from '@/utils/fonts';
import { useRouter } from 'next/navigation';

export default function Chat() {
	const { theme } = useChatContext();
	const { roomName } = useChatContext();
	const { roomId, closeSession } = useChatContext();
	const myRoomId = roomId;
	const router = useRouter();
	if (!myRoomId || roomId === '') {
		closeSession();
		router.push('/');
		console.error("Room ID doesn't exist");
		return <></>;
	} else
		return (
			<main className={styles.background + ` ${theme || themes.black}`}>
				<style jsx global>{`
					html {
						font-family: ${montserratFont.style.fontFamily};
					}
				`}</style>
				<div>
					<Image src={logo} alt="logo" width={32} height={32} />
				</div>
				<section className={styles.chat}>
					<ChatNav chatName={roomName || 'Dark Room'} />
					<ChatScreen />
					<ChatSidebar />
				</section>
			</main>
		);
}
