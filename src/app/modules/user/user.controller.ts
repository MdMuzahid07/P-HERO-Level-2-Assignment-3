import { Request, Response } from 'express'
import httpStatus from 'http-status'
import sendResponse from '../../utils/send.response'
import { UserService } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body)

    // sendResponse is an function to DRY response code
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const UserController = {
  createUser,
}
