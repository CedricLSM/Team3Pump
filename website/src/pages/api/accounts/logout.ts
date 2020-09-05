import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { NextHandler } from "next-connect";
import {unsetCookie} from '../../../utils/cookie'

const handler = nextConnect();

handler.get((req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Set-Cookie', unsetCookie());
    res.end();
    
})

export default handler