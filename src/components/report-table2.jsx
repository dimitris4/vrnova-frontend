import React, { Component } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from "@material-ui/core/styles";
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import axios from "../connections";
import authHeader from "../services/auth-header";
import "../index.css";



const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 12
  }
}))(TableCell);


const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});



  function Row(props) {
    const { row, users } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <StyledTableRow>
          <StyledTableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">{row.order_id}</StyledTableCell>
          <StyledTableCell align="left">{row.date}</StyledTableCell>
          <StyledTableCell align="left">{row.total_price_for_courses}</StyledTableCell>
          <StyledTableCell align="left">{row.courses.map(course => "(" + course + ") ")}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  User data
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>User ID</StyledTableCell>
                      <StyledTableCell>Username</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>

                  <TableBody>
                  {users.map(user => (
                    user.user_id===row.user_id&&
                      <StyledTableRow key={user.user_id}>
                      <StyledTableCell>{user.user_id}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">{user.username}</StyledTableCell>
                      <StyledTableCell>{user.email}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>

                </Table>
              </Box>
            </Collapse>
          </StyledTableCell>
        </StyledTableRow>
      </React.Fragment>
    );
  }

export default class CollapsibleTable2 extends Component {


    constructor(props) {
        super(props);
    
        this.state = {
          content: "",
          orders: [],
          users: [],
          sort: {
            column: null,
            direction: 'desc',
          }
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

        onSort = (column) => (e) => {
          const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
          const sortedData = this.state.orders.sort((a, b) => {
          
            const nameA = a[column];
            const nameB = b[column];
            
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              // names must be equal
              return 0;
          });
            
          if (direction === 'desc') {
            sortedData.reverse();
          }
          
          this.setState({
            orders: sortedData,
            sort: {
              column,
              direction,
            }
          });
        };
      
        setArrow = (column) => {
          let className = 'sort-direction';
          
          if (this.state.sort.column === column) {
            className += this.state.sort.direction === 'asc' ? ' asc' : ' desc';
          }
          
          console.log(className);
          
          return className;
        };

       


        render(){ 
          const classes = {
            container: {
              maxWidth: '40%',
              boxShadow: 'none',
              marginLeft:'8%'
              
          },
          row:{
            lineHeight:'0.5rem',
            cursor: 'pointer'
          }
          
        }

            const{users, orders}=this.state;

            return (
                <TableContainer style={classes.container} component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow >
                        <StyledTableCell/>
                        <StyledTableCell style={classes.row} align="left" onClick={this.onSort('order_id')}>Order ID</StyledTableCell>
                        <StyledTableCell style={classes.row} align="left" onClick={this.onSort('order_date')}>Date</StyledTableCell>
                        <StyledTableCell style={classes.row} align="left" onClick={this.onSort('total_price_for_courses')}>Total price(DKK)</StyledTableCell>
                        <StyledTableCell align="left" >Items</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {orders.length>0 && orders.map((row) => (
                        <Row key={row.order_id} row={row} users={users}/>
                        
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              );
        }
    
}