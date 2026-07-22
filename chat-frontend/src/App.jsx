import {
    useState
} from "react";

import Users from "./Users";
import Chat from "./components/Chat";


function App(){

    const [conversationId,setConversationId]
        = useState(null);


    const loggedInUserId = 1;


    return (

        <div>


            <Users
                openChat={setConversationId}
            />



            {
                conversationId && (

                    <Chat

                        conversationId={
                            conversationId
                        }

                        userId={
                            loggedInUserId
                        }

                    />

                )
            }


        </div>

    );

}


export default App;