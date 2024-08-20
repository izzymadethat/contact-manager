require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const { User, Contact } = require("../db/models");

app.use(cors());
app.use(express.json());

// create a user
app.post("/users", (req, res) => {
  res.send("POST /users");
});

// get a user by id
app.get("/users/:id", (req, res) => {
  res.send("GET /users/:id");
});

// contact routes

/*
 * Create a New Contact
 * Request:
 * Method: POST
 * Path: /:userId/contacts
 * Body: { username: string, email: string}
 *
 * Response:
 * Status: 201
 * Body: { id: number, first_name:string, last_name:string}
 *
 */
app.post("/:userId/contacts", async (req, res) => {
  const uid = req.params.userId;
  const { first_name, last_name } = req.body;

  console.log("Request to create contact", uid, first_name, last_name);

  // Validate request body
  if (!first_name || !last_name) {
    return res.status(400).send("Missing first_name or last_name parameters");
  }
  try {
    // find the user by id or return 404
    const user = await User.findByPk(uid);
    if (!user) return res.status(404).send("User not found");

    // create the contact
    const newContact = await Contact.create({
      first_name,
      last_name,
    });

    // Associate the contact with the user
    await user.addContact(newContact);

    res.status(201).json({
      message: "success",
      contact: {
        id: newContact.id,
        first_name: newContact.first_name,
        last_name: newContact.last_name,
      },
    });
  } catch (error) {
    console.log(error);
    res.send("Failed to create contact");
  }
});

/*
 * Get All Contacts
 * Request:
 * Method: GET
 * Path: /:userId/contacts
 *
 * Response:
 * Status: 200
 * Body: [{ id: number, username: string, email: string}]
 *
 */

/*
 * Get Contact
 * Request:
 * Method: GET
 * Path: /:userId/contacts/:contactId
 *
 * Response:
 * Status: 200
 * Body: { id: number, username: string, email: string}
 *
 */

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
