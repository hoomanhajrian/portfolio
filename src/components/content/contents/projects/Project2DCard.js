import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import { Card, CardContent, CardMedia } from "@material-ui/core";

const Project2DCard = ({ data }) => {
  return (
    <Card key={data.id} className={`project-card card${data.id}`}>
      <CardContent className="project-card-content">
        <Typography className="project-card-text" gutterBottom variant="h4">
          {data.name}
        </Typography>
        <Typography className="project-card-text" gutterBottom variant="h6">
          {data.position}
        </Typography>
        <Typography className="project-card-text" gutterBottom variant="h6">
          {data.year}
        </Typography>
        <CardMedia component="img" image={data.imgUrl} />
        <Typography
          variant="body1"
          color="textSecondary"
          className="project-card-description"
          component="p"
        >
          {data.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            variant="body2"
            color="textSecondary"
            component="a"
            href={data.gitHub}
            target="_blank"
            rel="noreferrer"
            className="project-card-link"
          >
            <GitHubIcon />
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="a"
            href={data.href}
            target="_blank"
            rel="noreferrer"
            className="project-card-link"
          >
            <LanguageIcon />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Project2DCard;
