import { MongoClient, Db, Collection } from "mongodb";
import { createDatabase } from "../database/db"

export const fetchAllWord = async (language: string): Promise<any[]> => {
    const db = await createDatabase()
    const collection: Collection = db.collection(language)
    const words = await collection.find({}).toArray()
    if (words.length <= 0) {
        return Promise.reject({
            status: 404,
            msg: "no words found"
        })
    }
    return words
}

export const fetchAllUsers = async () : Promise<any[]> => {
    const db = await createDatabase()
    const collection: Collection = db.collection("users")
    const users = await collection.find({}).toArray()
    if (users.length <= 0) {
        return Promise.reject({
            status: 404,
            msg: "no users found"
        })
    }
    return users
}

export const fetchUserByUsername = async (userParam: string) : Promise<any> => {
    const db = await createDatabase()
    const collection: Collection = db.collection("users")
    const user = await collection.findOne({username : userParam})
    if (!user){
        return Promise.reject({
            status: 404,
            msg: "no user found"
        })
    }
    return user
}

export const postUser = async (body: object) : Promise<any> => {
    const db = await createDatabase()
    const collection: Collection = db.collection("users")
    const newUser = await collection.insertOne(body)
    return newUser
}
