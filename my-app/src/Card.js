import React from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

const CardItem = ({ name, description, completed }) => {
    const classes = useStyles();
    completed ? completed='true' : completed='false'

    return (
        <Card className={classes.root}>
            <CardContent>
             <Typography className={classes.title} color="textSecondary" gutterBottom>{name}</Typography>
             <Typography variant="h5" component="h2">{description}</Typography>
             <Typography className={classes.title} color="textSecondary" gutterBottom>{completed}</Typography>
            </CardContent>
        </Card>
    )
}
export default CardItem;
