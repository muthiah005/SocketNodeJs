import React, { useEffect, useState } from 'react'
import socketIOClient from "socket.io-client";

import './dashboard.css'

const DashBoard = () => {
    const SERVER = "http://localhost:8080/";

    // const [temperature,setTemperature] = useState(0);
    const [users,setUserList] = useState([])
    
    useEffect(()=>{
        var socket = socketIOClient( SERVER );
        socket.on('FromAPI', data =>{
            console.debug("data",data)
            // setTemperature(data)
            setUserList(data)
        });

    },[users])

    return <div className="container">
        <h5>Socket Communication</h5>
        {/* <h6>Temperature: {temperature}</h6> */}
        <h6>Users:{users.length}</h6>
        {users.length > 0 && <ul>
            {users.map((i)=>{
                return <li key={i.id}>{i.name}</li>
            })}
        </ul>}
        </div>
}

export default DashBoard;