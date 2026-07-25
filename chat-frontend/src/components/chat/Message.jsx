function Message({ message }) {
  return (
    <div>
      <strong>
        {message.senderName}
      </strong>

      <p>
        {message.content}
      </p>

      <small>
        {message.createdAt}
      </small>
    </div>
  );
}

export default Message;