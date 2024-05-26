import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import { fetchIngredients, fetchUserOrders, removeUserOrders, selectUserOrders } from "../../slices/stellarBurgerSlice";
import { Preloader } from "@ui";
import { ProfileOrdersUI } from "@ui-pages";

export const ProfileOrders: FC = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectUserOrders);

    useEffect(() => {
        dispatch(removeUserOrders());
        Promise.all([dispatch(fetchIngredients()), dispatch(fetchUserOrders())]);
    }, []);

    if (!orders) {
        return <Preloader />;
    }

    return <ProfileOrdersUI orders={orders} />;
};
