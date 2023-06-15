import QRCode from "qrcode";
import axios from "axios";
const instance = axios.create();

// Gets the ip address of the server
(async () => {
  const tables = [1, 2, 3, 4, 5, 6];
  let portNumber = ":" + "8888"; // If you test this local, change this port number to the port number of your server (default is port 8080)
  let browserAddress = ""; // If you test this local, fill here your local ip address in (default is empty)

  if (!browserAddress) {
    portNumber = "";
    browserAddress = "https://niels-jansen.nl/kassasysteem";
    console.log("You're running this application online");
  } else {
    console.log("You're running this application local");
  }

  // Generates QR codes for each table and appends them to the DOM
  tables.forEach(async (table) => {
    const qrCode = await QRCode.toCanvas(
      `http://${browserAddress}${portNumber}/register?table=${table}`
    );
    qrCode.classList.add(`table_${table}`);
    document.querySelector(".qr_codes").appendChild(qrCode);
  });
})();

/*
Parcel/web socket AANZETTEN:

*/
