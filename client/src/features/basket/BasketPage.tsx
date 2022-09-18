import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useStoreContext } from "../../app/context/StoreContext";
import { Box, Button, Grid } from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { LoadingButton } from "@mui/lab";
import { Add, Delete, Remove } from "@mui/icons-material";
import agent from "../../app/api/agent";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";

export default function BasketPage() {
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  const { basket, setBasket, removeItem } = useStoreContext();

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

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
                      status.loading &&
                      status.name === "rem" + items.productId.toString()
                    }
                    onClick={() =>
                      handleRemoveItem(
                        items.productId,
                        1,
                        "rem" + items.productId.toString()
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {items.quantity}
                  <LoadingButton
                    loading={
                      status.loading &&
                      status.name === "add" + items.productId.toString()
                    }
                    onClick={() =>
                      handleAddItem(
                        items.productId,
                        "add" + items.productId.toString()
                      )
                    }
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
                      status.loading &&
                      status.name === "del" + items.productId.toString()
                    }
                    onClick={() =>
                      handleRemoveItem(
                        items.productId,
                        items.quantity,
                        "del" + items.productId.toString()
                      )
                    }
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
            size="large" fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
