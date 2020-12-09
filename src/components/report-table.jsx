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
    const { row, orders } = props;
    const [open, setOpen] = React.useState(false);

function colorTheRole(role){
    if(role==="ROLE_ADMIN"||role==="ROLE_MODERATOR")
        return {color:'red'};
    return {color:'blue'};    
} 
  
    return (
      <React.Fragment>
        <StyledTableRow>
          <StyledTableCell align="center">
          {row.role!=='ROLE_ADMIN'&&row.role!=='ROLE_MODERATOR'&&<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>}
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">{row.user_id}</StyledTableCell>
          <StyledTableCell align="left">{row.username}</StyledTableCell>
          <StyledTableCell align="left">{row.email}</StyledTableCell>
          <StyledTableCell style={colorTheRole(row.role)} align="left">{row.role.substring(5)}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            {row.role!=='ROLE_ADMIN'&&row.role!=='ROLE_MODERATOR'&&<Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Order history
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Date</StyledTableCell>
                      <StyledTableCell>Order ID</StyledTableCell>
                      <StyledTableCell align="right">Total paid (DKK)</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>

                  <TableBody>
                  {orders.map(order => (
                    row.user_id===order.user_id&&
                      <StyledTableRow key={order.order_id}>
                      <StyledTableCell component="th" scope="row">{order.date}</StyledTableCell>
                      <StyledTableCell>{order.order_id}</StyledTableCell>
                      <StyledTableCell align="right">{order.total_price_for_courses}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>

                </Table>
              </Box>
            </Collapse>}
          </StyledTableCell>
        </StyledTableRow>
      </React.Fragment>
    );
  }

export default class CollapsibleTable extends Component {


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
          const sortedData = this.state.users.sort((a, b) => {
            let nameA="";
            let nameB="";
            if(column!=="user_id"){
              nameA = a[column].toUpperCase(); // ignore upper and lowercase
              nameB = b[column].toUpperCase(); // ignore upper and lowercase
            }else{
              nameA = a[column];
              nameB = b[column];
            }  
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
            users: sortedData,
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
                        <StyledTableCell style={classes.row} align="left" onClick={this.onSort('user_id')}>User ID</StyledTableCell>
                        <StyledTableCell style={classes.row} align="left" onClick={this.onSort('username')}>Username</StyledTableCell>
                        <StyledTableCell style={classes.row} align="left" onClick={this.onSort('email')}>Email</StyledTableCell>
                        <StyledTableCell style={classes.row} align="left" onClick={this.onSort('role')}>System Role</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {users.length>0 && users.map((row) => (
                        <Row key={row.user_id} row={row} orders={orders}/>
                        
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              );
        }
    
}