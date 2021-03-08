import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as dgraph from 'dgraph-js-http'

const clientStub = new dgraph.DgraphClientStub("http://localhost:8080")
dgraph = new dgraph.DgraphClient(clientStub)

const fetchTodos = async () => {
  const query = `{
    lots_of_friends_in_20s(func: ge(count(friend), 2)) @filter(ge(age, 20) AND le(age, 29)){
      name@.
      age
      friend {
        name@.
      }
    }
  }`
  const res = await dgraph.newTxn().query(query)
  // return res.data.todos || []
  console.log('res: ', res)
}

const useStyles = makeStyles((theme) => ({
  error: {
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
}));

const QueryResult = () => {
  const classes = useStyles()

  return (
    { fetchTodos }
  )
}
export default QueryResult