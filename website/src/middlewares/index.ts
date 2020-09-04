import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import http from 'http'

export const onError = (err: any, req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {

    const isBackendError = err.response instanceof http.IncomingMessage

    let status, code, description
    let otherErrorResponse = {}

    console.log(err)
    if(isBackendError) {
        const errorResponse = err.response
        status = errorResponse.statusCode
        code = errorResponse.body?.error_code
        description = errorResponse.body?.error_description
        
        const { ['error_code']: _, ['error_description']: __ , ...others } = errorResponse.body
        otherErrorResponse = others
    }

    res.statusCode = status || 500
    code = code || 'Internal Server Error'
    description = description || 'Internal Server Error'

    res.json({
        ...otherErrorResponse,
        error_code: code,
        error_description: description
    })
}