import { Paper, Typography, Box, TextField, FormControl, FormLabel,
   RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import { useState } from "react";
import { Hedgehog } from "@shared/hedgehog";

interface Props {
  coordinates: number[];
  setHedgehogs: Function
}

interface Inputs {
  name: string;
  age: number;
  gender: string;
}

export function HedgehogForm({ coordinates, setHedgehogs }: Props) {
  const [inputs, setInputs] = useState({
    name: "",
    age: 0,
    gender: "male"
  });

  const handleChange = (target: HTMLInputElement) => {
    const name = target.name;
    const value = target.value;
    setInputs((values: Inputs) => ({...values, [name]: name === 'age' ? Number(value) : value}))
  }
 
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("/api/v1/hedgehog", {
      method: 'POST',
      body: JSON.stringify({...inputs, lat: coordinates[0], lon: coordinates[1]}),
      headers: { 'Content-Type': 'application/json' },
    }).then(r => {
      if (!r.ok) throw r;
      return r.json();
    })
    .then(data => {
      setHedgehogs((hedgehogs: Hedgehog[]) => [...hedgehogs, data]);
      setInputs({ name: "", age: 0, gender: "male" });
      coordinates.length = 0;
    })
    .catch(err => {
      console.error('Error while saving a hedgehog:', err);
    });
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
      <form onSubmit={(e) => onSubmit(e)} style={{padding: "1em"}}>
        <TextField
          fullWidth
          required
          id="hedgehog-name"
          label="Nimi"
          name="name"
          size="small"
          margin="normal"
          value={inputs.name} 
          onChange={(e) =>
            handleChange(e.target as HTMLInputElement)
          }
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
          onChange={(e) =>
            handleChange(e.target as HTMLInputElement)
          }
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
            onChange={(e) =>
              handleChange(e.target as HTMLInputElement)
            }
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
          onChange={(e) =>
            handleChange(e.target as HTMLInputElement)
          }
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
