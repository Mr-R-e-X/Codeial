class chatEngine {
    constructor(chatBoxId, userEmail, userName){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userName = userName;

        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', ()=>{
            console.log('connection established using socket ...!');

            self.socket.emit('join_room',{
                user_email: self.userEmail,
                user_name: self.userName,
                chatroom: 'codeial'
            });
            self.socket.on('user_joined', (data)=>{
                console.log('a user joined', data);
            })

        })
        $('#send-message').click(()=>{
            console.log('clicked!!')
            let msg = $('#chat-message-input').val();
            if(msg != ''){
                self.socket.emit('send_message',{
                    message: msg,
                    user_email: self.userEmail,
                    user_name: self.userName,
                    chatroom: 'codeial',
                })
            }
        });

        self.socket.on('receive_message', (data)=>{
            console.log('message received', data.message);

            let newMsg = $('<p>');
            let msgType = 'other-message';
            if(data.user_email == self.userEmail){
                msgType = 'self-message';
            }
            newMsg.append($('<sub>', {
                'html': data.user_name,
            }));
            newMsg.append($('<span>', {
                'html': data.message
            }));
            
            newMsg.addClass(msgType);
            $('#chat-messages-list').append(newMsg);
        });
    }
}