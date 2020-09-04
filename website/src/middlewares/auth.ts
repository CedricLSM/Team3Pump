import { NextHandler } from 'next-connect'
import { NextApiRequest, NextApiResponse } from "next";
import { checkCookies, cookieHeaderValueFromAccountSession } from '../utils/cookie';

const auth = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {

    checkCookies(req.cookies)
        .then(res => next())
        .catch(err => res.status(401).send('Unauthorized'))
}

export default auth