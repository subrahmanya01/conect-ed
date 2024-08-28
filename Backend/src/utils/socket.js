var io;
export function connectSocket(io){
    io.on('connection', (socket)=>{
        console.log(`Connected to soket ${socket.id}`);

        socket.on('chat', (data)=>{
            console.log(`${JSON.parse(data).to}_chat`)
            io.emit(`${JSON.parse(data).to}_chat`, data);
        })

        socket.on('notification', (data)=>{
            console.log("emmited")
            console.log(typeof data)
            console.log( data)

            console.log(`${data.userId}_notification`);
            io.emit(`${data.userId}_notification`, data);
        })
    })
}