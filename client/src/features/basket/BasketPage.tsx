import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid } from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { LoadingButton } from "@mui/lab";
import { Add, Delete, Remove } from "@mui/icons-material";
import agent from "../../app/api/agent";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStor";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket?.items.map((items) => (
              <TableRow
                key={items.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={items.pictureUrl}
                      alt={items.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{items.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(items.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + items.productId + "rem"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: items.productId,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {items.quantity}
                  <LoadingButton
                    loading={status === "pendingAddItem" + items.productId}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({ productId: items.productId })
                      )
                    }
                    color="error"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {currencyFormat(items.price * items.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      status === "pendingRemoveItem" + items.productId + "del"
                    }
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: items.productId,
                          quantity: items.quantity,
                          name: "del",
                        })
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                  
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />

          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
