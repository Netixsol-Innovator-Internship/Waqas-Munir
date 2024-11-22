import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid2,
  Toolbar,
  Container,
  Button,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  icon: {
    marginRight: "20px",
  },
  btns: {
    marginTop: "40px",
  },
  cardGrid: {
    padding: "20px 0",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: "1",
  },
  footer: {
    background: "#0909",
    padding: "10px 0",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar variant="regular" sx={{ background: "#0909" }}>
          <PhotoCamera className={classes.icon} />
          <Typography variant="h6">Photo Album</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.container}>
          <Container maxWidth="sm">
            <Typography
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Photo Album
            </Typography>
            <Typography align="center" color="textSecondary" variant="h5">
              Hello everyone This is a photo album and I&apos;m trying to make
              this sentence as long as possible so we can see how does it look
              like on the screen
            </Typography>
            <div className={classes.btns}>
              <Grid2 container spacing={2} justifyContent="center">
                <Grid2>
                  <Button variant="contained" color="primary">
                    See my photos
                  </Button>
                </Grid2>
                <Grid2>
                  <Button variant="outlined" color="primary">
                    Secondary Action
                  </Button>
                </Grid2>
              </Grid2>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid2 container spacing={4}>
            {cards.map((card) => (
              <Grid2 key={card} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://images.unsplash.com/photo-1731946660299-8f091eb1caee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8"
                    title="Image Title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe
                      the content
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Something here to give footer a purpose
        </Typography>
      </footer>
    </>
  );
}
