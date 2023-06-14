import type { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimitFomReq } from "lib/requests";
import { index } from "lib/algolia";
import { base } from "lib/airtable";
import { off } from "process";

export default function (req: NextApiRequest, res: NextApiResponse) {
   // const { finalLimit, finalOffset } = getOffsetAndLimitFomReq(req, 100, 3);
   // const objetoPrueba = {
   //    name: "bruno",
   //    edad: "25",
   //    objectID: "1",
   // };
   // index
   //    .saveObjects([objetoPrueba])
   //    .then((res) => {
   //       console.log("Conectado correctamente" + res);
   //    })
   //    .catch((e) => {
   //       console.log("Error");
   //    });

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
            const respuestaAlgolia = await index.saveObjects(object);
            console.log(respuestaAlgolia);

            fetchNextPage();
         },
         function done(err) {
            if (err) {
               console.error(err);
               return;
            }
            console.log("Termino");
         }
      );

   res.send("TERMINADO");
   // const listasFinales = lista.slice(finalOffset, finalOffset + finalLimit);
}
