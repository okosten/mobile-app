import { ApolloProvider, createNetworkInterface, ApolloClient } from 'apollo-client'

//const API_PATH = 'https://api.graph.cool/simple/v1/cj7qcfejz0ju30149c54u4ppq';
const API_PATH = 'https://api.graph.cool/simple/v1/cj7qc2xnr182w0136hm8pzfrn';
const networkInterface = createNetworkInterface({ uri: API_PATH });

export default client = new ApolloClient({ networkInterface });