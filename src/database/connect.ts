require('dotenv').config()
import { DataSource } from "typeorm"
import User from "../app/entity/User"
import { CreateUsersTable1697367277508 } from "./migrations/1697400392075-CreateUsersTable"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT as string),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    "entities": [
        User
      ],
      "migrations": [
        CreateUsersTable1697367277508
      ]
     
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
 