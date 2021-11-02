import * as React from 'react';
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard({item}) {
    const history = useHistory();
	const [brands, setBrand] = React.useState(null);
	////////
	const handleRoute = (site) =>{ 
		history.push("?site=" + site);
	}
  /*React.useEffect(() => {
    axios.get(baseURL).then((response) => {
		setBrand(response.data);
    });
  }, []);*/
  return (
    <Card sx={{ maxWidth: 245, marginLeft:4 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          image={item.img} 
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            a simple site with 7 pages
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained" onClick={() => handleRoute(50)}>
          Detail
        </Button>
      </CardActions>
    </Card>
    
  );
}
