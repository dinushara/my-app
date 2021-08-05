import React, { useEffect, useState } from 'react'
import {
  GET_PROMOTIONS_REQUESTED,
  DELETE_PROMOTION_REQUESTED
} from '../redux/actions/promotionAction'
import { Button, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import PromotionItem from './PromotionItem'
import moment from 'moment'
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(() => ({
  grid: {
    padding: '20px',
  },
}));

const PromotionComponent = (): JSX.Element => {

  const dispatch = useDispatch()
  const { loading, promotions } = useSelector((state: ReduxState) => state.promotion)
  const [time, setTime] = useState(moment());
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: GET_PROMOTIONS_REQUESTED })
  }, [])


  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(moment());
      dispatch({ type: GET_PROMOTIONS_REQUESTED })
    }, 1000);
    return () => clearTimeout(timer);
  });

  function handleNavigation(path: string) {
    history.push(path);
  }

  const deletePromotion = (payload: Promotion) => {
    dispatch({ type: DELETE_PROMOTION_REQUESTED, payload: payload })
  }

  return (
    <>
      {loading && 'Loading...'}
      <h2>Offer List</h2>
      <div>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          className={classes.grid}
        >
          <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() => handleNavigation('/add')}
          >
            <AddIcon />Create New
          </Button>
        </Grid>
      </div>
      <Grid container spacing={3}>
        {promotions && promotions.map((promotion, index) => (
          moment(promotion.endDate).diff(time, 'seconds') > 0 &&
          <Grid item xs={12} md={6} key={`offer-${index}`}>
            <PromotionItem
              promotion={promotion} key={index}
              deletePromotion={deletePromotion}
              currentTime={time}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default PromotionComponent