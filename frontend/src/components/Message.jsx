import { useEffect, useState } from 'react';

function Message() {
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/message')
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);

  return <h1>{msg}</h1>;
}

export default Message;
