import {
    useEffect,
    useState
} from "react";


function Chat({conversationId, userId}) {


    const [socket,setSocket] = useState(null);

    const [messages,setMessages] = useState([]);

    const [text,setText] = useState("");



    useEffect(()=>{


        const ws = new WebSocket(
            `ws://localhost:8000/ws/chat/${conversationId}`
        );


        ws.onopen = ()=>{

            console.log(
                "connected"
            );

        };


        ws.onmessage = (event)=>{

            const message =
                JSON.parse(event.data);


            setMessages(prev=>[
                ...prev,
                message
            ]);

        };


        setSocket(ws);



        return ()=>{

            ws.close();

        };


    },[conversationId]);




    function sendMessage(){


        socket.send(
            JSON.stringify({

                sender_id:userId,

                message:text

            })
        );


        setText("");

    }




    return (

        <div>


            <h3>
                Conversation {conversationId}
            </h3>


            {
                messages.map(msg=>(

                    <p key={msg.id}>

                        User {msg.sender_id}:
                        {msg.message}

                    </p>

                ))
            }



            <input

                value={text}

                onChange={
                    e=>setText(e.target.value)
                }

            />


            <button
                onClick={sendMessage}
            >
                Send
            </button>


        </div>

    );
}


export default Chat;