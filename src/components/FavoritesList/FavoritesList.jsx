
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import FavoriteDetails from "../FavoriteDetails/FavoriteDetails";
import ToolTip from '@material-ui/core/Tooltip';




const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));




function FavoritesList({ favorite }) {

    const dispatch = useDispatch();




    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    return (
        <div>
            {/* <h6 key={i}>{favorite.title}</h6>
                        <img src={favorite.image} /> */}
            <Card className={classes.root} key={favorite.id}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                             </Avatar>
                    }
                    action={
                        <ToolTip title="does nothing atm">
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        </ToolTip>
                    }
                    title={favorite.label}
                // subheader="September 14, 2016"
                />
                <CardMedia
                    className={classes.media}
                    image={favorite.image}
                    title={favorite.label}
                />
                <CardContent>
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        target="_blank"
                        rel="noopener"
                        href={favorite.url}>
                        Go to Recipe
                    </Button>
                    <h5 style={{ fontWeight: 'normal' }}><b>Source:</b> {favorite.source}</h5>
                    <h5 style={{ fontWeight: 'normal' }}><b>Calories:</b> {favorite.calories}</h5>
                    <h5 style={{ fontWeight: 'normal' }}><b>Yield:</b> {favorite.yield} servings</h5>
                </CardContent>
                <CardActions disableSpacing>
                    <ToolTip title="Delete Favorite">
                        <IconButton
                            aria-label="add to favorites"
                            onClick={() => dispatch({ type: 'DELETE_FAVORITE', payload: favorite })}
                            color="secondary"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ToolTip>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"

                    >
                        {!expanded && <h6>details</h6>}
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <FavoriteDetails favorite={favorite} />
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}


export default FavoritesList;