import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

// Использовать везде вместо useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Использовать везде вместо useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
