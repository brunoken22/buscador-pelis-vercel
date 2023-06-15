import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimitFomReq } from "lib/requests";
import methods from "micro-method-router";

import { index } from "lib/algolia";
import { base } from "lib/airtable";
import { off } from "process";

export default methods({
   async post(req: NextApiRequest, res: NextApiResponse) {
      base("Furniture")
         .select({
            pageSize: 10,
         })
         .eachPage(
            async function (records, fetchNextPage) {
               // records.forEach(function(record) {
               //     console.log('Retrieved', record.get('Name'));
               // });
               // res.send({
               //    results: records.map((item) => item.fields),
               //    pagination: {
               //       offset: finalOffset,
               //       limit: finalLimit,
               //       // total: lista.length,
               //    },
               // });
               const object = records.map((r) => {
                  return {
                     objectID: r.id,
                     ...r.fields,
                  };
               });
               await index.saveObjects(object);
               // console.log(respuestaAlgolia);

               fetchNextPage();
            },
            function done(err) {
               if (err) {
                  console.error(err);
                  return;
               }
               res.send("TERMINADO");
            }
         );

      // const listasFinales = lista.slice(finalOffset, finalOffset + finalLimit);
   },
});
