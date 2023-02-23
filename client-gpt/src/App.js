import logo from './logo.svg';
import './App.css';
import {useState} from 'react'
import ChatMessage from './ChatMessage';




function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user:"gpt",
    message:"how can I help you today"
  },{
    user:"me",
    message:"I want to use Chat GPT"
  }

  


]);




async function handleSubmit(e){
    e.preventDefault(); //stop page reload on submit
    //console.log("handling submit")
    //console.log([input])

    let chatLogNew = [...chatLog, {user: "me", message: input}]
    setInput("");
    
    setChatLog(chatLogNew)
   
    const messages = chatLogNew.map((message) => message.message).join("\n")
   

  
    const response = await fetch("http://localhost:8080/", {

    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      message: messages
    })


    })

    

    const data = await response.json();
    console.log(data.message)
    setChatLog([...chatLogNew, {user: "gpt", message: `${data.message}`}])
    console.log(chatLog)
    


  }
  return (
    <div className="App">
    <aside className="sidemenu">
       
        <div className="side-menu-button">
            <span>+</span>
            New Chat
                
        </div>
    </aside>
    {/*<div className="chatbox-scroller"> */}
    <section className="chatbox">
        
        <div className='chat-log'>
          {chatLog.map((message, index) =>(

            <ChatMessage key={index} message={message}/>
          ))}
            
      

        </div>
        
    
    <div className="chat-input-holder">
          
          <form onSubmit={handleSubmit} >
            <input className="chat-input-textarea" rows="1" value={input} onChange={(e) => setInput( e.target.value)} ></input>
          </form>
        </div>
    
    {/*</div>*/}

    </section>
    </div>
    

  );
}

export default App;
