import React, { Component } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from "../connections";
import authHeader from "../services/auth-header";

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

// const rows = [
//     createData('1', 'admin', "a@a.aa", "ADMIN"),
//     createData('2', 'John', "b@b.bb", "USER"),
//     createData('3', 'Mike', "c@c.cc", "USER"),
//     createData('4', 'Cay', "d@d.dd", "USER"),
//     createData('5', 'Faisal', "e@e.ee", "USER")
//   ];

//   function createData(id, calories, fat, carbs, protein, price) {
//     return {
//       name,
//       calories,
//       fat,
//       carbs,
//       protein,
//       price,
//       history: [
//         { date: '2020-01-05', customerId: '11091700', amount: 3 },
//         { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
//       ],
//     };
//   }

  function Row(props) {
    const { row, orders } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">{row.user_id}</TableCell>
          <TableCell align="right">{row.username}</TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{row.role}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Order ID</TableCell>
                      <TableCell align="right">Total paid (DKK)</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>


                  {orders.map(order => (
                      
                    row.user_id===order.user_id&&
                      <TableRow key={order.order_id}>
                      <TableCell component="th" scope="row">{order.date}</TableCell>
                      <TableCell>{order.order_id}</TableCell>
                      <TableCell align="right">{order.total_price_for_courses}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

export default class CollapsibleTable extends Component {


    constructor(props) {
        super(props);
    
        this.state = {
          content: "",
          orders: [],
          users: []
        };
      }

        componentDidMount() {
            axios
            .get("reports/orders", { headers: authHeader() })
            .then((resp) => this.setState({ orders: resp.data }));
        
            axios
            .get("reports/users", { headers: authHeader() })
            .then((resp) => this.setState({ users: resp.data }));
        
        }


        render(){ 

            const{users, orders}=this.state;

            return (
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell>User ID</TableCell>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">System Role</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.length>0 && users.map((row) => (
                        <Row key={row.user_id} row={row} orders={orders}/>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              );
        }
    
}