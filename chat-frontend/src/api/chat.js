const API_URL = "http://localhost:8000";


export async function startConversation(otherUserId) {

    const response = await fetch(
        `${API_URL}/conversations/start/${otherUserId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );


    return await response.json();
}