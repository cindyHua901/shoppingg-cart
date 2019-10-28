import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    border:'1px solid #eee',
    borderRadius:'5px'
  },
  input: {
    flex: 1,
    marginLeft:theme.spacing(1),
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

  const handleChange = (e) => {
    let inputValue = e.target.value *1;
    props.handleSelectNum(state.inputValue)
    setState({ ...state, inputValue });
  };
  const handleReduce = () =>{
    if( state.inputValue *1  > 1 ){
      setState({...state, inputValue: -- state.inputValue});
    }
    props.handleSelectNum(state.inputValue)
  }
  const handleAdd = ()=>{
    if( state.inputValue *1 < state.stock ){
      setState({...state, inputValue: ++ state.inputValue})
    }
    props.handleSelectNum(state.inputValue)
  }
  return (
    <div className={classes.root} >
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
    </div>
  );
}