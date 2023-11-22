import { RequestHandler } from "express";
import UserModel from "../models/user.model";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import generateUniqueAccountId from "../util/generateUniqueAccountId";
import Account from "../models/account.model";

export const getAuthenticatedUser: RequestHandler = async (req, res) => {
    const authenticatedUserId = req.session.userId

    try {

        if (!authenticatedUserId) {
            res.json(null)
            return;
        }

        const user = await UserModel.findById(authenticatedUserId).exec()

        res.status(200).json(user)

    } catch (error) {
        console.log(error);
    }
}

export const logout: RequestHandler = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
        } else {
            res.sendStatus(200)
        }
    })
}


interface SignupBody {
    username?: string,
    email?: string,
    password?: string
}

export const handleUserSignup: RequestHandler<unknown, unknown, SignupBody, unknown> = async (req, res, next) => {
    const username = req.body.username
    const email = req.body.email
    const passwordRaw = req.body.password

    try {
        if (!username || !email || !passwordRaw) {
            createHttpError(400, "Parameters missing.")
        }

        const existingUsername = await UserModel.findOne({ username: username }).exec();

        if (existingUsername) {
            throw createHttpError(409, "Username already taken. Please select a different one or login instead.")
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "Email already in use. Please login instead.")
        }

        const passwordHashed = await bcrypt.hash(passwordRaw!, 10);

        const accountId = generateUniqueAccountId(username)

        console.log(accountId);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
            accountId: accountId,
        })

        await Account.create({
            accountId: accountId,
            user: newUser._id,
            balance: -1,
            expenseCategories: [],
            incomeCategories: [],
        })

        req.session.userId = newUser._id

        res.status(201).json(newUser);

    } catch (error) {
        next(error);
    }
}

interface LoginBody {
    username?: string,
    password?: string
}

export const handleUserLogin: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        if (!username || !password) throw createHttpError(400, "Parameters missing")

        const user = await UserModel.findOne({ username: username }).select("+password").exec()

        if (!user) {
            res.status(200).json({})
            return 401
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) throw createHttpError(401, "Invalid credentials")

        req.session.userId = user._id
        res.status(201).json(user)

    } catch (error) {
        console.log(error);
    }
}

export const getProfileDetails: RequestHandler = async (req, res) => {
    const username = req.params.username
    try {
        const user = await UserModel.findOne({ username: username })

        if(!user){
            console.log("profile details: user doesn't exist");
            return
        }

        res.status(200).json(user)

    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers: RequestHandler = async (req, res) => {
    try {
        const userId = req.session.userId

        if (!userId) {
            res.sendStatus(401)
            return
        }

        const user = await UserModel.findById(userId)

        if (!user) {
            console.log("get all users: user doesn't exist");
            return
        }

        const accountId = user.accountId

        const allUsers = await UserModel.find({ accountId: { $ne: accountId } })

        res.status(200).json(allUsers)

    } catch (error) {
        console.log(error)
    }
}