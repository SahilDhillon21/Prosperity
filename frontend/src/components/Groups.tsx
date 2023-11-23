import { useEffect, useState } from "react";
import Group from "../models/group.model";
import * as FinanceNetwork from '../network/finance.network';
import Card from '@mui/material/Card';
import { Avatar, CardContent, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";

const Groups = () => {

  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    const getGroups = async () => {
      const grps = await FinanceNetwork.getUserGroups()
      setGroups(grps)
    }

    getGroups()
  }, [])

  return (
    <>

      {groups.length === 0 ? <h5>You are currently not part of any groups.</h5>
        :

        <>
          <h5 className="mb-3 mt-3">My groups</h5>
          <h6>
            {groups.map((group) => (
              <Card variant="outlined" sx={{ marginBottom: 2, background: "#13005A" }} className="cursor-pointer text-white">
                <CardContent>
                  <Typography variant="h4" component="div" className="text-center">
                    <Link to={`/groups/${group._id}`}>{group.name}</Link>
                  </Typography>

                  <hr />

                  <Grid container spacing={2} direction="row" className="hover-enlarge mt-2">
                    {group.members.map((member) => (
                      <Col md={6} lg={6} xs={6}>
                        <ListItem key={member._id}>
                          <ListItemAvatar>
                            <Avatar alt={member.username} src={member.image} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="h5" color="white">
                                <Link to={`/users/${member.username}`}>{member.username}</Link>
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body2" color="whitesmoke">
                                {member.email}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </Col>
                    ))}
                  </Grid>

                  {group.dues.length > 0 && (
                    <>
                      <Divider sx={{ marginY: 2 }} />
                      <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                        Dues:
                      </Typography>
                      {group.dues.map((due) => (
                        <div key={due._id}>
                          <Typography variant="body2" color="white">
                            {due.borrower.username}: ${due.amount}
                          </Typography>
                        </div>
                      ))}
                    </>
                  )}

                  <hr />

                  {group.description && (
                    <>
                      <Typography variant="body1">
                        Description: {group.description}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </h6>
        </>

      }
    </>
  )
}

export default Groups