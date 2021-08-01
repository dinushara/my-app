import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface IProps {
  promotion: Promotion,
  deletePromotion: (payload: Promotion) => void,
  currentTime: moment.Moment,
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin:'20px'
  },
  title: {
    fontWeight:'bold'
  }
});

const PromotionItem = ({ promotion, deletePromotion, currentTime }: IProps): JSX.Element => {

  const classes = useStyles();

  const calculateTimeLeft = () => {
    const def = moment(promotion.endDate).diff(currentTime, 'seconds');
    const days = Math.floor(def / (60 * 60 * 24))
    const hours = Math.floor((def % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor(def % (60 * 60) / (60))
    const seconds = Math.floor(def % (60))
    setTimeLeft(`${days}Day${days > 1 ? 's' : ''} - ${hours}Hour${hours > 1 ? 's' : ''} - ${minutes}Minute${minutes > 1 ? 's' : ''} - ${seconds}Second${seconds > 1 ? 's' : ''}`);
  }

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    calculateTimeLeft()
  }, [currentTime]);


  return (
    <div
      onDoubleClick={() => deletePromotion(promotion)}
      style={{ cursor: 'pointer' }}
    >
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom>
            {promotion.title}
          </Typography>
          <Typography variant="h5" component="h2">
            {timeLeft}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
export default PromotionItem