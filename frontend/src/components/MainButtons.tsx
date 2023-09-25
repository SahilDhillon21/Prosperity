import { Button, Grid } from "@mui/material"

export default function MainButtons() {
  const buttons = ["Dashboard", "Habits", "Productivity","Journal", "Finances"]
  return (
    // <Grid container>


    //   <Grid item>

    //       {buttons.map((button) => {
    //         return (
    //           <Button color="success">{button}</Button>
    //         )
    //       })}
    //   </Grid>

    // </Grid>

    <Grid container spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center">


      <Grid item>

        {buttons.map((button) => {
            return (
              <Button size="large" color="success" variant="contained" sx={{ borderRadius: 0 }}>{button}</Button>
            )
          })}

      </Grid>

    </Grid>



  )
}
