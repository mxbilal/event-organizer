import { Avatar, InputBase } from "@mui/material";
import React, { useState } from "react";
import Box from '@mui/material/Box';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Picker from 'emoji-picker-react';

//src
import "./PublicChat.scss";

export default function PublicChat() {
  const [showEmoji,setShowEmoji] = useState(false)
  return (
    <div className="public-chat-main">
      <div className="public-chat-inside">
        <div className="public-chat-card-main">
          <div className="public-chat-card">
            <Avatar sx={{ width: 36, height: 36 }} />
            <div className="public-chat-detail">
              <div className="public-chat-detail-name">
                <p className="name">Alfonso Dorwart</p>
                <p className="time">1hr ago</p>
              </div>
              <div className="public-chat-detail-msg">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate.
                </p>
              </div>
              <div className="public-chat-detail-option">
                <p>Like</p>
                <p>Reply</p>
              </div>
            </div>
          </div>

          <div className="public-chat-card">
            <Avatar sx={{ width: 36, height: 36 }} />
            <div className="public-chat-detail">
              <div className="public-chat-detail-name">
                <p className="name">Alfonso Dorwart</p>
                <p className="time">1hr ago</p>
              </div>
              <div className="public-chat-detail-msg">
                <p>Lorem ipsum dolor sit amet</p>
              </div>
              <div className="public-chat-detail-option">
                <p>Like</p>
                <p>Reply</p>
              </div>
            </div>
          </div>

          <div className="public-chat-card">
            <Avatar sx={{ width: 36, height: 36 }} />
            <div className="public-chat-detail">
              <div className="public-chat-detail-name">
                <p className="name">Alfonso Dorwart</p>
                <p className="time">1hr ago</p>
              </div>
              <div className="public-chat-detail-msg">
                <p>Lorem ipsum dolor sit amet</p>
              </div>
              <div className="public-chat-detail-option">
                <p>Like</p>
                <p>Reply</p>
              </div>
            </div>
          </div>
          <div className="public-chat-card">
            <Avatar sx={{ width: 36, height: 36 }} />
            <div className="public-chat-detail">
              <div className="public-chat-detail-name">
                <p className="name">Alfonso Dorwart</p>
                <p className="time">1hr ago</p>
              </div>
              <div className="public-chat-detail-msg">
                <p>Lorem ipsum dolor sit amet</p>
              </div>
              <div className="public-chat-detail-option">
                <p>Like</p>
                <p>Reply</p>
              </div>
            </div>
          </div>
        </div>
        {showEmoji && <Picker 
        pickerStyle={{
          position:'absolute',
          zIndex:'100',
          top:'47%'
        }}
        onEmojiClick={(e,emojiObject) => console.log(emojiObject)} /> }
        <Box className="send-msg" sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <EmojiEmotionsOutlinedIcon 
        onClick={() => setShowEmoji(!showEmoji)}
        sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        
        <AttachFileOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <InputBase placeholder="Send a message..." id="input-with-sx" variant="standard" />
        <SendOutlinedIcon color="primary" />
         </Box>

      </div>
    </div>
  );
}
