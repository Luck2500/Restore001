import { ButtonGroup, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStor";
import { decremented, incremented } from "./counterSlice";

export default function ContactPage() {
  const dispatch = useAppDispatch()
  const {num} = useAppSelector((state)=>state.couter)

  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button onClick={()=>dispatch(decremented(5))}>-</Button>
        <Button>{num}</Button>
        <Button onClick={()=>dispatch(incremented(5))}>+</Button>
      </ButtonGroup>
    </>
  );
}
