import { Box, MenuItem, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { Hedgehog } from "@shared/hedgehog";

interface Props {
  hedgehogs: Hedgehog[];
  selectedHedgehogId: number | null;
  setSelectedHedgehogId: any;
}

export default function HedgeHogList({ hedgehogs, selectedHedgehogId, setSelectedHedgehogId }: Props) {
  // Fetch all hedgehog's during startup
  useEffect(() => {
    const getAllHedgehogs = async () => {
      try {
        const res = await fetch("/api/v1/hedgehog");
        if (!res.ok) return;

        const json = await res.json();
      } catch (err) {
        console.error(`Error while fetching hedgehogs: ${err}`);
      }
    };

    getAllHedgehogs();
  }, []);

  return (
    <Paper elevation={3} sx={{ margin: "1em", overflow: "hidden" }}>
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
        <Typography sx={{color: "darkslategrey" }}>
          Rekisteröidyt siilit
        </Typography>
      </Box>
      {hedgehogs.length ? (
        <Box sx={{ overflowY: "scroll", height: "100%" }}>
          {hedgehogs.map((hedgehog, index: number) => (
            <MenuItem key={`hedgehog-index-${index}`}
            selected={selectedHedgehogId === hedgehog.id}
            onClick={() => setSelectedHedgehogId(hedgehog.id)}>
              {hedgehog.id}
            </MenuItem>
          ))}
        </Box>
      ) : (
        <Typography sx={{
          padding: "1em",
          align: 'center',
          color: "#999999"
        }}>
          Ei tallennettuja siilejä.
        </Typography>
      )}
    </Paper>
  );
}
