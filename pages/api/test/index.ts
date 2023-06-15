import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

export default methods({
   get(req: NextApiRequest, res: NextApiResponse) {
      res.send({
         message: "todo ok.",
      });
   },
});
