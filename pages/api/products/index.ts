import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimitFomReq } from "lib/requests";
import { index } from "lib/algolia";
import { base } from "lib/airtable";

export default async function (req: NextApiRequest, res: NextApiResponse) {
   const { finalLimit, finalOffset } = getOffsetAndLimitFomReq(req, 100, 3);

   const respuestaAlgolia = await index.search(req.query.search as string, {
      hitsPerPage: finalLimit,
      offset: finalOffset,
   });
   console.log(respuestaAlgolia.hits);
   const prueba = respuestaAlgolia.hits.map((r) => r["Name"]);
   console.log(prueba);

   res.send(respuestaAlgolia["hits"]);
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
}
