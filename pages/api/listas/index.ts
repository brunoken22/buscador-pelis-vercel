import type { NextApiRequest, NextApiResponse } from "next";
function getOffsetAndLimitFomReq(
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

function getLista() {
   const arr = Array.from(Array(100).keys());
   return arr.map((valor) => {
      return { nombre: valor };
   });
}
export default function (req: NextApiRequest, res: NextApiResponse) {
   const lista = getLista();
   const { finalLimit, finalOffset } = getOffsetAndLimitFomReq(
      req,
      100,
      lista.length
   );
   const listasFinales = lista.slice(finalOffset, finalOffset + finalLimit);
   res.send({
      results: [listasFinales],
      pagination: {
         offset: finalOffset,
         limit: finalLimit,
         total: lista.length,
      },
   });
}
