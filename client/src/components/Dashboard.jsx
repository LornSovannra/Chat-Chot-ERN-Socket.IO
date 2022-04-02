import React, { useState } from 'react'
import io from "socket.io-client"
import Chat from './Chat'

const socket = io.connect("http://localhost:3001")

export default function Dashboard() {
    const [username, setUsername] = useState("")
    const [room, setRoom] = useState("")
    const [join, setJoin] = useState(false)

    const joinARoom = () => {

        if(username === "")
        {
            alert("Please enter your username!");
        }else if(room === "")
        {
            alert("Please enter your room id!");
        }else{
            setJoin(true)
            socket.emit("join_room", room)
        }
    }

    return (
        <div style={{  justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <div className="card mt-5" style={{ maxWidth: 500, minWidth: 500 }}>
                {
                    !join ? (
                        <div>
                            <div className="card-header" style={{ background: '#007ea7', color: 'white' }}>
                                <h3>Create a room</h3>
                            </div>
                            <div className="card-body">
                                <div>
                                    <input className='form-control mb-2' type="text" placeholder='Username *' onChange={(e) => {setUsername(e.target.value)}} onKeyPress={(e) => { e.key === "Enter" && joinARoom() }} />
                                </div>
                                <div>
                                    <input className='form-control mb-2' type="text" placeholder='Room ID *' onChange={(e) => {setRoom(e.target.value)}} onKeyPress={(e) => { e.key === "Enter" && joinARoom() }} />
                                </div>
                                <button className='btn' style={{ width: '100%', background: '#0a9396', color: 'white' }} onClick={joinARoom}>Join</button>
                            </div>
                        </div>
                    ) : (
                        <Chat setJoin={setJoin} socket={socket} username={username} room={room} />
                    )
                }
            </div>
        </div>
    )
}