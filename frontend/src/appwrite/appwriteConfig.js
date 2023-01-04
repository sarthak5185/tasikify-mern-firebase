import {Client, Account, Databases} from 'appwrite'

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("63afd2a587b1df59d4c2")

export const account = new Account(client)

//Database

export const databases = new Databases(client, "63afd31e9621c0393f72")
