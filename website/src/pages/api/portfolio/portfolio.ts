import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { NextHandler } from "next-connect";
import PortfolioService from "../../../services/portfolio";
import {parse} from 'cookie';

const handler = nextConnect();

handler.post((req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {

    const email = parse(req.headers.cookie).userId;

    const { ticker, quantity, price, buy} = req.body;

    PortfolioService.addTransaction(email, ticker, quantity, price, buy)
        .then((r) => {
            if (r) {
                res.json(r);
            } else {
                res.status(404).end();
            }
        }, next)

})

export default handler