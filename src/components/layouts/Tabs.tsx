"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import RecipeReviewCard from "../Cards";
import { Grid } from "@mui/material";
import { wrap } from "module";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const collections: { [key: string]: any } = {
  "Gods Unchained": <SportsEsportsIcon />,
  "Alien Worlds": <SportsEsportsIcon />,
  Ilivium: <SportsEsportsIcon />,
  "Farmers World": <SportsEsportsIcon />,
  "Book Games": <SportsEsportsIcon />,
};

const cards: { [key: string]: any } = {
  "Gods Unchained": {
    image: "/godsunchained.png",
    desc: "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },

  Item1: {
    image: "/kart1.webp",
    desc: "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  Item2: {
    image: "/kart1.webp",
    desc: "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  Item3: {
    image: "/kart1.webp",
    desc: "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  Item4: {
    image: "/kart1.webp",
    desc: "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100vh",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {Object.keys(collections).map((text, index) => (
          <Tab
            iconPosition="start"
            label={text}
            icon={collections[text]}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>

      <TabPanel value={value} index={0}>
        <Box sx={{ width: "80vw" }}>
          <Box
            sx={{
              gap: "55px",
              flexWrap: "wrap",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {Object.keys(cards).map((key, index) => (
              <Box sx={{ flexGrow: 2 }}>
                <RecipeReviewCard
                  desc={cards[key]["desc"]}
                  image={cards[key]["image"]}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}
