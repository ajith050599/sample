import './App.scss';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import sendImg from "../src/assets/send.svg";
import botImg from "../src/assets/bot.png"
import chatImg from "../src/assets/conversation.png";
import closeIcon from "../src/assets/icons8-cross-50.png";
import minimize from "../src/assets/icons8-minimize-50.png";
import maximize from "../src/assets/icons8-toggle-full-screen-50.png"

function App() {
  const [chat, setChat] = useState(false);
  const [input, setInput] = useState("");
  const [msgArray, setMsgArray] = useState([]);
  const [serverResponses, setServerResponses] = useState([]);
  const [resp, setResp] = useState("")
  const [max,setMax]=useState(false)

  const sendMessage = (event) => {
    setMsgArray([...msgArray, input]);
    setServerResponses([...serverResponses, input]);
    setInput("");
  };

  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => setResp(json.title));
  return (
    <div className="App">
      <Box className="chat-box">
      {chat ? (
        <div className={max ? "chat-box-maximise" : "chat-wrapper"}>
          <div className={max?"chat-controls-maximise":"chat-controls"}>
            <div className={max?"chatbot-name-maximise ":"chatbot-name"}> <span>Docubot</span> </div>
            <div className={max?"set-close-max-min-maximise":'set-close-max-min'}>
            {max
            ?
            <div onClick={() => setMax(!max)} className='max-min-div'>
              <img src={minimize} className={max?"close-icon-maximise":"close-icon"}></img>
            </div>
            :
            <div onClick={() => setMax(!max)} className='max-min-div'>
              <img src={maximize} className="close-icon"></img>
            </div>
            }
            <div onClick={() => setChat(!chat)} className='close-div'>
              <img src={closeIcon} className={max?"close-icon-maximise":"close-icon"}></img>
            </div>
            </div>
          </div>
          <div className={max?"msg-wrapper-maximise":"msg-wrapper"}>
            {msgArray.map((msg, index1) => (
              <div className="send-reply-div">
                <div  className='send-msg-div'>
                <div key={index1} className="individual-message">
                  {msg}
                </div>
                </div>
                {/* <div className='reply-msg-div'>
                  <div>
                    <img src={botImg} className='bot-img'></img>
                    </div>
                <div className="reply-message">
                Following this rule often makes CSS preprocessors less useful, as features like mixins and nesting are replaced by component composition. You can, however, integrate a CSS preprocessor if you find it valuable.
                </div>
                </div> */}
                {serverResponses.map((rply, index) =>
                  index1 === index ? (
                    <div className="reply-msg-div">
                     <div>
                    <img src={botImg} className='bot-img'></img>
                    </div>
                      <div key={index} className="reply-message">
                        {rply}
                      </div>
                    </div>
                  ) : null
                )}

                
              </div>
            ))}
          </div>
          <div className="input-wrapper">
            <div className={max?"text-field-maximise":"text-field"}>
              {/* <TextField
                id="outlined-basic"
                label="Send a message"
                variant="outlined"
                size="small"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                
              /> */}

              <input 
              className={max?"input-field-chat-maximise":'input-field-chat'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Send your message' 
               />

              <Button
                className="send-button"
                onClick={sendMessage}
              >
                <img src={sendImg} className="send-img"></img>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div onClick={() => setChat(!chat)} className="chat-app-widget">
          <img src={chatImg} className="chat-img"></img>
        </div>
      )}
      </Box>
    </div>
  );
}

export default App;
