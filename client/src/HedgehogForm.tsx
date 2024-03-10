import { Paper, Typography, Box, TextField, FormControl, FormLabel,
   RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import { useState } from "react";

interface Props {
  coordinates: number[];
}

interface Inputs {
  name: string;
  age: number;
  gender: string;
}

export function HedgehogForm({ coordinates }: Props) {
  const [inputs, setInputs] = useState({
    name: "",
    age: 0,
    gender: "male"
  });

  const handleChange = (event: Event) => {
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;
    setInputs((values: Inputs) => ({...values, [name]: name === 'age' ? Number(value) : value}))
  }

  const onSubmit = (event: Event) => {
    event.preventDefault();
    console.log({...inputs, location: coordinates});
  }

  return (
    <Paper
      elevation={3}
      sx={{
        margin: "1em 0em 1em 0em",
        overflow: "hidden"
      }}
    >
      <Box
        sx={{
          backgroundColor: "#a1e6df",
          height: "3em",
          display: "flex",
          zIndex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "darkslategrey" }}>
          Rekisteröi uusi siili
        </Typography>
      </Box>
      <form onSubmit={onSubmit} style={{padding: "1em"}}>
        <TextField
          fullWidth
          required
          id="hedgehog-name"
          label="Nimi"
          name="name"
          size="small"
          margin="normal"
          value={inputs.name} 
          onChange={handleChange}
        />
        <TextField
          fullWidth
          required
          id="hedgehog-age"
          label="Ikä"
          name="age"
          type="number"
          inputProps={{ min: 0 }}
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          margin="normal"
          value={inputs.age} 
          onChange={handleChange}
        />
        <FormControl
          fullWidth={true}
        >
          <FormLabel
            id="hedgehog-gender"
          >
            Sukupuoli
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="hedgehog-gender"
            value={inputs.gender}
            name="gender"
            onChange={handleChange}
          >
            <FormControlLabel id="hedgehog-male" value="male" control={<Radio size="small"/>} label="Uros" />
            <FormControlLabel id="hedgehog-female" value="female" control={<Radio size="small"/>} label="Naaras" />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          required
          id="hedgehog-location"
          label="Sijainti (valitse kartalta)"
          name="location"
          value={coordinates.join(', ')}
          InputProps={{
            readOnly: true,
          }}
          size="small"
          margin="dense"
          onChange={handleChange}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={
            coordinates.length !== 2
          }
          sx={{
            marginTop: "16px"
          }}
        >
          Rekisteröi
        </Button>
      </form>
    </Paper>
  );
}
