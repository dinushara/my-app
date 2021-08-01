import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  GET_PROMOTIONS_REQUESTED,
  DELETE_PROMOTION_REQUESTED
} from '../redux/actions/promotionAction'
import { Button, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import PromotionItem from './PromotionItem'
import moment from 'moment'
import { Dispatch } from 'redux'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: '20px',
  },
}));

const PromotionComponent = ({
  promotions: { loading, promotions },
  getPromotions,
  deletePromotion
}: {
  promotions: { loading: boolean, promotions: Promotion[] },
  getPromotions: () => void,
  deletePromotion: (payload: Promotion) => void
}) => {

  const [time, setTime] = useState(moment());
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    getPromotions()
  }, [])


  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(moment());
      getPromotions();
    }, 1000);
    return () => clearTimeout(timer);
  });

  function handleNavigation(path: string) {
    history.push(path);
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

const mapStateToProps = (state: ReduxState) => ({
  promotions: state.promotion
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPromotions: () => dispatch({ type: GET_PROMOTIONS_REQUESTED }),
  deletePromotion: (payload: Promotion) => dispatch({ type: DELETE_PROMOTION_REQUESTED, payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(PromotionComponent)