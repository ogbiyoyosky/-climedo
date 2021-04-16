import { Request, Response, NextFunction } from "express";
import logger from "../logger";
import mongoose from "mongoose";
import * as httpStatus from "http-status";
import { any, date } from "joi";
import TabModel from "../models/Tab";
import tabSanitizer from "../middleware/validators/tabInputSanitizer";



class TabController {
    /**
     * Create a tab
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    public static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { name, description, dataPoints } = req.body;

            tabSanitizer(req.body)
            const tab = await TabModel.create({ name, description, dataPoints })
            return res.status(httpStatus.CREATED).send({
                message: "Successfully Created",
                data: tab
            })
        } catch (error) {
            if(error.name == 'ParseError') {
                return res.status(httpStatus.BAD_REQUEST).send({
                    status: 'bad request',
                    message: error.message
                })
            }
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Internal Server Error",
                status: "Internal Server Error",
                status_code: httpStatus.INTERNAL_SERVER_ERROR,
            });
        }
    }

    /**
   * Update a tab
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
    public static async update(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { tabId } = req.params;

            var isValid = mongoose.Types.ObjectId.isValid(tabId);
            const data = req.body

            if (!isValid) {
                return res.status(httpStatus.NOT_FOUND).send({
                    message: "Resource not available",
                    status: "failed"
                })
            }
            const check = tabSanitizer(req.body)
            const tabExist = await TabModel.findOne({ _id: tabId }).exec()

            if (!tabExist) {
                return res.status(httpStatus.NOT_FOUND).send({
                    message: "Resource not available",
                    status: "failed"
                })
            }
            Object.assign(tabExist, { ...data })
            await tabExist.save()

            return res.status(httpStatus.PARTIAL_CONTENT).send({
                message: "Successfully Updated",
                data: tabExist
            })

        } catch (error) {
            if(error.name == 'ValidationError') {
                return res.status(httpStatus.BAD_REQUEST).send({
                    status: 'bad request',
                    message: 'invalid allowed options'
                })
            }
            if(error.name == 'ParseError') {
                return res.status(httpStatus.BAD_REQUEST).send({
                    status: 'bad request',
                    message: error.message
                })
            }
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Internal Server Error",
                status: "Internal Server Error",
                status_code: httpStatus.INTERNAL_SERVER_ERROR,
            });
        }
    }

    /**
   * Delete a tab
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
    public static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { tabId } = req.params;
            var isValid = mongoose.Types.ObjectId.isValid(tabId);

            if (!isValid) {
                return res.status(httpStatus.NOT_FOUND).send({
                    message: "Resource not available",
                    status: "failed"
                })
            }
            const tabExist = await TabModel.findOne({ _id: tabId }).exec()

            if (!tabExist) {
                return res.status(httpStatus.NOT_FOUND).send({
                    message: "Resource not available",
                    status: "failed"
                })
            }

            const tab = await TabModel.findOneAndDelete({ _id: tabId })
            return res.status(httpStatus.OK).send({
                message: "Successfully Deleted",
                status: "success"
            })
        } catch (error) {
            console.log(error);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Internal Server Error",
                status: "Internal Server Error",
                status_code: httpStatus.INTERNAL_SERVER_ERROR,
            });
        }
    }

    /**
   * Fetch a tab
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
    public static async fetch(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {

            const tabs = await TabModel.find({})
            return res.status(httpStatus.OK).send({
                message: "Successfully fetch all tabs",
                data: tabs,
                status: "success"
            })
        } catch (error) {
            console.log(error);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                message: "Internal Server Error",
                status: "Internal Server Error",
                status_code: httpStatus.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
export default TabController;
