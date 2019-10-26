import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    height: 30,
    fontSize:16,
  },
  input: {
    flex: 1,
    marginLeft:theme.spacing(1),
    "&:hover":{
      border:"1px solid red"
    }
  },
  iconButton: {
  
  },
  divider: {
    height: 28,
    margin: 4,
  },
  icon:{
    fontSize:16
  }
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();
  const {stock, selectNum} = props;
  const [state, setState] = React.useState({
    inputValue:selectNum,
    stock,
  });

  const handleChange = () => event => {
    props.handleSelectNum(state.inputValue)
    // setState({ ...state, inputValue: event.currentTarget.value });
  };
  const handleReduce = () =>{
    console.log("reduce SelectNum",state.inputValue);
    if( state.inputValue *1  > 1 ){
      setState({...state, inputValue: -- state.inputValue});
      console.log("reduce SelectNum",state.inputValue);
    }
  }
  const handleAdd = ()=>{
    if( state.inputValue *1 < state.stock ){
      setState({...state, inputValue: ++ state.inputValue})
      console.log("add SelectNum",state.inputValue);
    }
  }
  return (
    <Paper className={classes.root}>
      <IconButton 
        size="small" className={classes.iconButton} aria-label="add"
        onClick={handleAdd}
      >
        <AddIcon  className={classes.icon }/>
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        inputProps={{ 'aria-label': 'selectNum' }}
        value = {state.inputValue}
        className={classes.input}
        onChange={handleChange}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton 
        size="small" className={classes.iconButton} aria-label="reduce" 
        onClick={handleReduce}>
        <RemoveIcon className={classes.icon } />
      </IconButton>
    </Paper>
  );
}