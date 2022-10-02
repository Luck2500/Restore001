import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { BasketItem } from "../../app/models/Basket";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStor";
import { currencyFormat } from "../../app/util/util";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);

  return (
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
              <TableCell align="right">{currencyFormat(items.price)}</TableCell>
              <TableCell align="center">
                { isBasket && (<LoadingButton
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
                </LoadingButton>)}
                {items.quantity}
                { isBasket && (<LoadingButton
                  loading={status === "pendingAddItem" + items.productId}
                  onClick={() =>
                    dispatch(addBasketItemAsync({ productId: items.productId }))
                  }
                  color="error"
                >
                  <Add />
                </LoadingButton>)}
              </TableCell>
              <TableCell align="right">
                {currencyFormat(items.price * items.quantity)}
              </TableCell>
              {isBasket && (<TableCell align="right">
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
              </TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
