import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import { AiOutlineLeft, AiOutlineSend } from "react-icons/ai";

export default function Chat({ socket, username, room, setJoin }) {
    const [currentMessage, setCurrentMesssage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if(currentMessage !== "")
        {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }

            await socket.emit("send_message", messageData)
            setCurrentMesssage("")
            setMessageList((list) => [...list, messageData])
        }

    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])

    return (
        <div>
            <div className="card-header" style={{ background: '#007ea7', color: 'white', display: 'flex', alignItems: 'center' }}>
                <button onClick={() => setJoin(false)} style={{ background: 'white', padding: 5, borderRadius: '50%', border: 'none' }}>
                    <AiOutlineLeft size={25} color={'#007ea7'} />
                </button>
                <h3 style={{ marginLeft: 10 }}>Room: { room }</h3>
            </div>
            <div className="card-body">
                    <div style={{ height: 500, overflowX: 'auto' }} className="mb-2">
                        <ScrollToBottom>
                            {
                                messageList.map((data)=>{
                                    return (
                                        <div style={{ margin: data.author === username ? '0 0 0 200px' : '0 200px 0 0' }}>
                                            <div style={{ border: data.author === username ? '1px solid #0077b6' : '#364958', borderRadius: 5, background: data.author === username ? '#0077b6' : '#364958', color: 'white', justifyContent: data.author === username ? "flex-end" : 'flex-start', display: 'flex' }} className='p-1'>
                                                <h6>{data.message}</h6>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: data.author === username ? "flex-end" : 'flex-start' }}>
                                                <p>{data.time}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </ScrollToBottom>
                    </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <input className='form-control' type="text" placeholder='something...' value={currentMessage} onChange={(e) => {setCurrentMesssage(e.target.value)}} onKeyPress={(e) => { e.key === "Enter" && sendMessage() }} />            
                    <button className='btn' onClick={sendMessage}><AiOutlineSend /></button>
                </div>
            </div>
        </div>
    )
}
