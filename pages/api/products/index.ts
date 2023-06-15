import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimitFomReq } from "lib/requests";
import methods from "micro-method-router";
import { index } from "lib/algolia";
import { base } from "lib/airtable";
export default methods({
   async get(req: NextApiRequest, res: NextApiResponse) {
      const { finalLimit, finalOffset } = getOffsetAndLimitFomReq(req);

      const respuestaAlgolia = await index.search(req.query.q as string, {
         hitsPerPage: finalLimit,
         page: finalOffset > 1 ? Math.floor(finalOffset / finalLimit) : 0,
      });

      const results = respuestaAlgolia.hits.map((r) => (r as any).Name);
      res.send({
         results,
         pagination: {
            limit: finalLimit,
            offset: finalOffset,
            total: respuestaAlgolia.nbHits,
         },
      });
   },
});

// base("Furniture")
//    .select({})
//    .firstPage(function (err, records) {
//       if (err) {
//          console.error(err);
//          return;
//       }
//       // records.forEach(function(record) {
//       //     console.log('Retrieved', record.get('Name'));
//       // });
//       res.send({
//          results: records.map((item) => item.fields),
//          pagination: {
//             offset: finalOffset,
//             limit: finalLimit,
//             // total: lista.length,
//          },
//       });
//    });
// const listasFinales = lista.slice(finalOffset, finalOffset + finalLimit);
