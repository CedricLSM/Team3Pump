import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { NextHandler } from "next-connect";
import AccountsService from '../../../service/accounts'
import {cookieHeaderValueFromAccountSession} from '../../../utils/cookie'

const handler = nextConnect();

handler.post((req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const {email, password} = req.body;

    AccountsService.login(email, password)
        .then((r) => {
            if (r) {
                res.setHeader('Set-Cookie', cookieHeaderValueFromAccountSession(r));
                res.json(r);
            } else {
                res.end();
            }
        }, next)
    
})

export default handler