import { NextFunction, Request, Response } from "express";
import { fetchAllWord, fetchAllUsers, fetchUserByUsername , postUser } from "../models/app.models";


export const getApi = (req: Request, res: Response, next: NextFunction) => {
    res.send({ msg: 'hello' })
}

export const getAllWords = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const language: string = req.params.language
        const words = await fetchAllWord(language)
        res.status(200).send(words)
    }
    catch (err) {
        console.error(err)
    }

}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await fetchAllUsers()
        res.status(200).send(users)
    }
    catch (err) {
        console.error(err)
    }
}

export const getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userParam: string = req.params.username
        const user = await fetchUserByUsername(userParam)
        res.status(200).send(user)
    }
    catch (err) {
        console.error(err)
    }
}

export const addNewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body: object = req.body;
        const newUser = await postUser(body)
        res.status(201).send(newUser)
    }
    catch (err) {
        console.error(err)
    }
}