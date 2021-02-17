// import from dependencies 
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import components 
import RecipeDetails from '../RecipeDetails/RecipeDetails';
// import from material ui
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import ToolTip from '@material-ui/core/Tooltip';



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginLeft: 45
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
        backgroundColor: 'green',
    },
    fav: {
        color: 'red'
    },
    notFav: {
        color: 'purple'
    }
}));


function Recipes({ recipe }) {


    const classes = useStyles();
    // conditional rendering variable
    const [expanded, setExpanded] = useState(false);
    const [favorite, setFavorite] = useState(classes.notFav)
    const dispatch = useDispatch();

    const handleExpandClick = () => {
        // render drop down
        setExpanded(!expanded);
    };

    // dispatching recipe to store in db as favorite
    const handleFavorite = () => {
        dispatch({ type: 'ADD_FAVORITE', payload: recipe.recipe });
        // change color of heart icon
        setFavorite(classes.fav);
    }

    return (
        <div>
            <div>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                R
                             </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={recipe.recipe.label}
                    />
                    <CardMedia
                        className={classes.media}
                        image={recipe.recipe.image}
                        title={recipe.recipe.label}
                    />
                    <CardContent>
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            target="_blank"
                            rel="noopener"
                            href={recipe.recipe.url}
                        >
                            Go to Recipe
                        </Button>
                        <h5 style={{fontWeight: "normal"}}><b>Source:</b> <em>{recipe.recipe.source}</em></h5>
                        <h5 style={{fontWeight: "normal"}}><b>Calories:</b> {(recipe.recipe.calories).toFixed(2)}</h5>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton
                            aria-label="add to favorites"
                            onClick={handleFavorite}
                            className={favorite}
                        >
                            <FavoriteIcon />
                        </IconButton>
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
                                <RecipeDetails ingredients={recipe.recipe.ingredients} />
                        </CardContent>
                    </Collapse>
                </Card>
            </div>


        </div>


    )
}




export default Recipes;