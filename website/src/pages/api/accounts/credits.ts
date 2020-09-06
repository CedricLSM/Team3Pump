import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { NextHandler } from "next-connect";
import AccountsService from "../../../services/accounts";
import { parse } from 'cookie';

const handler = nextConnect();

handler.get((req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const email = parse(req.headers.cookie).userId;

    AccountsService.getCredits(email)
        .then((r) => {
            if (r) {
                res.json(r);
            } else {
                res.end();
            }
        }, next)

})

export default handler