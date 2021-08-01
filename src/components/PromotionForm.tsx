import React, { useState } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {
  CREATE_PROMOTION_REQUESTED
} from '../redux/actions/promotionAction'
import { TextField, Grid, Button } from '@material-ui/core';
import moment from 'moment';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    width: '100%',
  },
  grid: {
    width: '50%',
  },
}));

const PromotionForm = ({
  createPromotion
}: {
  createPromotion: (promotion: Promotion) => Promotion
}) => {
  const initialFormDate = {
    id: 0,
    title: '',
    endDate:''
  };

  const classes = useStyles();
  const [formData, setFromData] = useState(initialFormDate)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const def = moment(formData.endDate).diff(moment(), 'seconds');
    if (def > 0) {
      createPromotion({ ...formData, id: _.uniqueId() })
      setFromData(initialFormDate)
    } else {
      toast.error("Please select a future Date");
    }
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={onSubmit} style={{ width: '50%' }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            required
            id="outlined-required"
            label="Required"
            variant="outlined"
            onChange={onChange}
            name={'title'}
            className={classes.textField}
            value={formData.title}
          />
          <TextField
            required
            id="datetime-local"
            variant="outlined"
            name="endDate"
            label="Next appointment"
            type="datetime-local"
            value={formData.endDate}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChange}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.textField}
            type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </Grid>
  )
}

const mapStateToProps = (state: ReduxState) => ({
  promotions: state.promotion
})

const mapDispatchToProps = (dispatch: any) => ({
  createPromotion: (promotion: Promotion) => dispatch({ type: CREATE_PROMOTION_REQUESTED, payload: promotion }),
})

export default connect(mapStateToProps, mapDispatchToProps)(PromotionForm)