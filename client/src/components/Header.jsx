import React from 'react'
import { AiFillApi, AiOutlinePartition } from 'react-icons/ai'
import styled from 'styled-components'

export default function Header() {
  return (
    <Wrapper>
        <Logo>
            <h3 style={{ color: 'white' }}>Chat Chot <AiOutlinePartition size={30} color={'white'} /></h3>
        </Logo>
        {/* <Navigation>
            <ul>
                <li>Home</li>
                <li>Trending</li>
                <li>Notification</li>
            </ul>
        </Navigation> */}
    </Wrapper>
  )
}


const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ff206e;
    padding: 10px 50px;
`

const Logo = styled.div`

    h3{
        color: 'red';  
    }
`

const Navigation = styled.div`

    ul{
        display: flex;
        list-style: none;
        

        li{
            margin: 0 5px;
            padding: 5px 10px;
            border-radius: 5px;
            background-color: green;
            color: white;
        }
    }
`