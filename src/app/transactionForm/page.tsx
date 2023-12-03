"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import abi from "@/abi.json";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

const contractAddress = "0x70d550643E1fC1dedc3A0f416Ae2A1981F7dad93";

const ValidationTextFields = () => {
  const [storeId, setStoreId] = useState(-1);
  const [itemDetails, setItemDetails] = useState({
    storeId: "",
    details: "",
    price: "",
  });

  const handleAddItemInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    setItemDetails((prevDetails) => ({
      ...prevDetails,
      [key]: e.target.value,
    }));
  };

  const handleViewItemInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStoreId(parseInt(e.target.value));
  };

  const { refetch } = useContractRead({
    address: contractAddress,
    abi: abi,
    onSuccess: (data: any) => {
      console.log(data);
    },
    functionName: "viewStoreItems",
    args: [storeId],
    enabled: false,
  });

  const { write } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "addItem",
    args: [
      itemDetails["storeId"],
      itemDetails["details"],
      itemDetails["price"],
    ],
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await write();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleViewSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await refetch();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <CurrencyBitcoinIcon />
        </Avatar>
        AddItem
        <Typography component="h1" variant="h5"></Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="StoreId"
            name="storeId"
            autoFocus
            onChange={handleAddItemInputChange} // Handle changes in the input
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Details"
            name="details"
            onChange={handleAddItemInputChange} // Handle changes in the input
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Price"
            name="price"
            onChange={handleAddItemInputChange} // Handle changes in the input
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Tx
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <CurrencyBitcoinIcon />
        </Avatar>
        ViewItem
        <Typography component="h1" variant="h5"></Typography>
        <Box
          component="form"
          onSubmit={handleViewSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="StoreId"
            name="storeId"
            autoFocus
            value={storeId} // Set the value of the input
            onChange={handleViewItemInputChange} // Handle changes in the input
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ViewItem
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <CurrencyBitcoinIcon />
        </Avatar>
        Purchase Item
        <Typography component="h1" variant="h5"></Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="StoreId"
            name="storeId"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="ItemId"
            name="ItemId"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Purchase!
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ValidationTextFields;
