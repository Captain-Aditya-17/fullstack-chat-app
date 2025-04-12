import {create} from 'zustand';
import {toast} from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import {useAuthStore} from './useAuthStore';


export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async ()=>{
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get('/message/users')
            set({users: res.data})
        } catch (error) {
            console.log(error)
        }
        finally {
            set({isUsersLoading: false})
        }
    },

    getMessages: async (userId)=>{
        set({isMessagesLoading: true})
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({messages: res.data})
            console.log(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            set({isMessagesLoading: false})
        }
    },

    
    sendMessage: async (messageData)=>{
        const {selectedUser,messages} = get()
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
            set({messages: [...messages, res.data]})
        } catch (error) {
            console.log(error)
            toast.error('Error sending message')
        }
    },

    subscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;

        socket.on('getNewMessage', (newMessage) => {
            const { messages } = get();

            // Check if the message already exists
            if (!messages.some((message) => message._id === newMessage._id)) {
                set({ messages: [...messages, newMessage] });
            }
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket
        socket.off('newMessage')
    },
    
    setSelectedUser: (selectedUser) => set({selectedUser}),
}))