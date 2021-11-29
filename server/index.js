// server/index.js

const { default: axios } = require("axios");
const express = require("express");
var zendesk = require("node-zendesk");

const PORT = process.env.PORT || 3001;

const app = express();

const email = "jintao.yang.2022@gmail.com";
const user = email + "/token";
// const password = "";
// const zccSubdomain = "zccjintaoy";
const url = "https://zccjintaoy.zendesk.com/api/v2/tickets.json";
const api_token = "cy3zIiKYAdjMa3ZTgEDzAkn6dHByY4sbZonrUUF0";
const headers = { "Content-Type": "application/json" };

// var client = zendesk.createClient({
//   username: "Jintao Yang",
// });

const getTickets = async (client, url) => {
  const response = await client.get(url);
  const data = response.data;
  if (data.next_page !== null) {
    return data.tickets.concat(await getTickets(client, data.next_page));
  } else {
    return data.tickets;
  }
};

app.get("/api", (req, res) => {
  // GET /api/v2/tickets/{ticket_id}
  // GET /api/v2/tickets/show_many?ids={ids}
  // GET /api/v2/tickets

  const client = axios.create({
    auth: {
      username: user,
      password: api_token,
    },
    headers: headers,
  });

  // client
  //   .get(url)
  //   .then((items) => {
  //     if (items.data.next_page) {
  //     }
  //     res.json({
  //       message: "Found tickets successfully",
  //       data: items.data.tickets,
  //     });
  //   })
  //   .catch((error) => {
  //     if (error.response) {
  //       console.log(error.response.data);
  //       res.status(error.response.status).json(error.response.data);
  //     } else if (error.request) {
  //       console.log(error.request);
  //     } else {
  //       console.log("Error", error.message);
  //     }
  //   });
  getTickets(client, url)
    .then((tickets) => {
      res.json({
        message: "Found tickets successfully",
        data: tickets,
      });
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
