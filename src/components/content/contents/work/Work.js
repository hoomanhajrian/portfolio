import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function Work() {
  return (
    <div className="work">
      <h2 className="work-title">Work Experience</h2>
      <div className="work-card-container">
        <Card className="work-card card1">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Cellphone technician / Mobileklinik / Vancouver, BC
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              Feb.2020 - Present
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              <a
                href="https://www.mobileklinik.ca/"
                target="_blank"
                rel="noreferrer"
              >
                mobileklinik.ca
              </a>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="ul">
              <li>Repairing Android and IOS phones</li>
              <li>Cashier and customer services</li>
              <li>Working with designated software for diagnose or repair.</li>
            </Typography>
          </CardContent>
        </Card>
        <Card className="work-card card1">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Software developer / Gohar Shafa Co. / Tehran, Iran
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              Jan.2019 - Oct.2019
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              <a
                href="https://www.goharshafa.com/"
                target="_blank"
                rel="noreferrer"
              >
                goharshafa.com
              </a>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="ul">
              <li>Testing, maintaining, and developing new features.</li>
              <li>Keeping the servers and services alive.</li>
              <li>
                Helping in coding internal system for inventory management based
                on C#
              </li>
              <li>Finding issues and solving them with other team members.</li>
              <li>Support website for the best user experience.</li>
            </Typography>
          </CardContent>
        </Card>
        <Card className="work-card card1">
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Cellphone and laptop technician / Sun Services / Tehran, Iran
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              Jan.2017 - Jan.2019
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              <a href="http://sunservice.com/" target="_blank" rel="noreferrer">
                sunservice.com
              </a>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="ul">
              <li>
                Diagnosed the hardware problem of a device for customers,
                ranging from mobile phones to desktop computers.
              </li>
              <li>
                Enhanced device performance through assembly of new parts,
                reconstruction and chipset manipulation.
              </li>
              <li>
                Consulted with customers and clients on their tech issues and
                needs, and performed bespoke repairs and construction based on
                their feedback and concerns.
              </li>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Work;
