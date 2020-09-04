import { NextHandler } from 'next-connect'
import { NextApiRequest, NextApiResponse } from "next";
// import { ACCESS_TOKEN, checkCookies, cookieHeaderValueFromAccountSession } from '../utils/cookie';
// import SessionService  from '../services/accounts/session.service';

const auth = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {

    // const callRefreshToken = (refreshToken: string) => SessionService.refreshToken(refreshToken)
    //     .then(r => {
    //         req.cookies[ACCESS_TOKEN] = r.accessToken!

    //         res.setHeader('Set-Cookie', cookieHeaderValueFromAccountSession(r))
    //         return r.accessToken!
    //     })

    // checkCookies(req.cookies, callRefreshToken)
    //     .then(res => next())
    //     .catch(err => res.status(401).send('Unauthorized'))
}

export default auth