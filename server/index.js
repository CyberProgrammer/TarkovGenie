import express from 'express';

const PORT = process.env.PORT || 3001;

const app = express();

import { request, gql } from 'graphql-request'

const query = gql`
{
    task(id: 1) {
        id
        name
    }
}
`

request('https://api.tarkov.dev/graphql', query).then((data) => console.log(data))

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
