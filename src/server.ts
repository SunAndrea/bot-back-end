import { Tcp } from "./tcp"; 

async function startServer() {
  const tcp = new Tcp();
  await tcp.init(); 
}

startServer(); 
