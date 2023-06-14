import type { NextApiRequest, NextApiResponse } from "next";

export function getOffsetAndLimitFomReq(
   req: NextApiRequest,
   maxLimit: number,
   lista: number
) {
   const limit = parseInt(req.query.limit as string);
   const offset = parseInt(req.query.offset as string);
   const finalLimit = limit <= maxLimit ? limit : 100;
   const finalOffset = offset < lista ? offset : 0;
   return { finalLimit, finalOffset };
}
