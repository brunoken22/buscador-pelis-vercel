import algoliasearch from "algoliasearch";

const client = algoliasearch("PGV3O4P3KI", "787e7ec1ece9771d00aede43193565b2");
const index = client.initIndex("products");
export { index };
