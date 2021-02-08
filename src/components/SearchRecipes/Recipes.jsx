
import React from 'react';
import {useState} from 'react';
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


import RecipeDetails from './RecipeDetails';

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


function Recipes({recipe}) {


    const classes = useStyles(); 
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    return (
        <div>

            {/* <div>
                <ul>
                    <li>{recipe.recipe.label}</li>
                </ul>
            </div> */}
                      
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
                        // subheader="September 14, 2016"
                    />
                    <CardMedia
                        className={classes.media}
                        image={recipe.recipe.image}
                        title={recipe.recipe.label}
                    />
                    <CardContent>
                        <Button variant="contained" size="small" color="primary" href={recipe.recipe.url}>
                            Go to Recipe
                        </Button>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
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
                            <Typography paragraph>Ingredients</Typography>
                            <Typography paragraph>
                                <RecipeDetails ingredients={recipe.recipe.ingredients}/>
                            </Typography>
                            
                        </CardContent>
                    </Collapse>
                </Card>
                </div>
                    
        
    )
}




export default Recipes;