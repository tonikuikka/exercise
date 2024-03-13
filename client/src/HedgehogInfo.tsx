import { Paper, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Hedgehog } from "@shared/hedgehog";

interface Props {
  hedgehogId: number | null;
  setMapFeatures: Function
}

export function HedgehogInfo({ hedgehogId, setMapFeatures }: Props) {
  const [hedgehog, setHedgehog] = useState<Hedgehog | null>(null);

  useEffect(() => {
    const getHedgehog = async () => {
      if (hedgehogId === null) return;
      fetch(`/api/v1/hedgehog/${hedgehogId}`).
      then(r => {
        if (!r.ok) throw r;
        return r.json();
      })
      .then(({ hedgehog }) => {
        setHedgehog(hedgehog);
        setMapFeatures([{
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [hedgehog.lat, hedgehog.lon],
          },
          properties: {
            name: hedgehog.name,
            age: hedgehog.age,
            gender: hedgehog.gender,
          }
        }]);
      })
      .catch(err => {
        console.error('Error while fetching the hedgehog:', err);
      });
    };
    getHedgehog();
  }, [hedgehogId]);

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
          Siilin tiedot
        </Typography>
      </Box>

      { hedgehog !== null ? (
        <Box sx={{ padding: "1em" }}>
          <Typography variant="h6">
            {hedgehog.gender === 'male' ? '♂' : '♀'} {hedgehog.name} ({hedgehog.age} vuotta)
          </Typography>
          <Typography>
            Sijainti: {hedgehog.lat}, {hedgehog.lon}
          </Typography>
        </Box>
      ) : (
        <Typography sx={{
          padding: "1em",
          align: 'center',
          color: "#999999"
        }}>
          Ei siiliä valittuna.
        </Typography>
      )}
    </Paper>
  );
}
