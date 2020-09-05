import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { NextHandler } from "next-connect";
import StockService from "../../../services/stock";

const handler = nextConnect();

handler.get((req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const ticker = req.query.ticker as string;

    StockService.getStockHistory(ticker)
        .then((r) => {
            if (r) {
                res.json(r);
            } else {
                res.end();
            }
        }, next)

})

export default handler