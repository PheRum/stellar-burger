import { expect, test, describe } from "@jest/globals";
import contructorSlice, { fetchIngredients, fetchNewOrder, initialState as contructorInitialState } from "../contructorSlice";
import userSlice, {
    fetchLoginUser,
    fetchLogout,
    fetchRegisterUser,
    fetchUpdateUser,
    getUserThunk,
    initialState as userInitialState,
} from "../userSlice";
import feedSlice, { fetchFeed, initialState as feedInitialState } from "../feedSlice";
import orderSlice, { fetchUserOrders, initialState as orderInitialState } from "../orderSlice";

describe("Test async actions", () => {
    test("Test getUserThunk pending", () => {
        const state = userSlice(userInitialState, getUserThunk.pending(""));

        expect(state.loading).toBe(true);
    });

    test("Test getUserThunk fullfiled", () => {
        const mockResponse = {
            success: true,
            user: { name: "user", email: "user@mail.ru" },
        };
        const state = userSlice(userInitialState, getUserThunk.fulfilled(mockResponse, ""));

        expect(state.user).toEqual(mockResponse.user);
    });

    test("Test getUserTnunk rejected", () => {
        const mockAnswer = { name: "test", message: "error" };
        const state = userSlice(userInitialState, getUserThunk.rejected(mockAnswer, ""));

        expect(state.loading).toBe(false);
        expect(state.isAuthenticated).toBe(false);
        expect(state.user).toEqual({ name: "", email: "" });
    });

    test("Test fetchIngredients pending", () => {
        const state = contructorSlice(contructorInitialState, fetchIngredients.pending(""));

        expect(state.loading).toBe(true);
    });

    test("Test fetchIngredients fulfilled", () => {
        const mockResponse = [
            {
                _id: "643d69a5c3f7b9001cfa093c",
                name: "Краторная булка N-200i",
                type: "bun",
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: "https://code.s3.yandex.net/react/code/bun-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            },
        ];
        const state = contructorSlice(contructorInitialState, fetchIngredients.fulfilled(mockResponse, ""));

        expect(state.loading).toBe(false);
        expect(state.ingredients).toEqual(mockResponse);
    });

    test("Test fetchIngredients rejected", () => {
        const mockAnswer = { name: "test", message: "error" };
        const state = contructorSlice(contructorInitialState, fetchIngredients.rejected(mockAnswer, ""));

        expect(state.loading).toBe(false);
    });

    test("Test fetchNewOrder pending", () => {
        const mockOrder = ["testid1", "testid2", "testid3"];
        const state = contructorSlice(contructorInitialState, fetchNewOrder.pending("", mockOrder));

        expect(state.orderRequest).toBe(true);
    });

    test("Test fetchNewOrder rejected", () => {
        const mockAnswer = { name: "test", message: "error" };
        const state = contructorSlice(contructorInitialState, fetchNewOrder.rejected(mockAnswer, "", [""]));

        expect(state.orderRequest).toBe(false);
    });

    test("Test fetchNewOrder fulfilled", () => {
        const mockResponse = {
            success: true,
            name: "testname",
            order: {
                _id: "664e927097ede0001d06bdb9",
                ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093d"],
                status: "done",
                name: "Флюоресцентный люминесцентный бургер",
                createdAt: "2024-05-23T00:48:48.039Z",
                updatedAt: "2024-05-23T00:48:48.410Z",
                number: 40680,
            },
        };
        const state = contructorSlice(contructorInitialState, fetchNewOrder.fulfilled(mockResponse, "", [""]));

        expect(state.orderModalData).toEqual(mockResponse.order);
        expect(state.orderRequest).toBe(false);
    });

    test("Test fetchLoginUser pending", () => {
        const state = userSlice(userInitialState, fetchLoginUser.pending("", { email: "test@mail.ru", password: "test" }));

        expect(state.loading).toBe(true);
    });

    test("Test fetchLoginUser rejected", () => {
        const mockAnswer = { name: "test", message: "error" };
        const state = userSlice(
            userInitialState,
            fetchLoginUser.rejected(mockAnswer, "", {
                email: "test@mail.ru",
                password: "test",
            }),
        );

        expect(state.loading).toBe(false);
        expect(state.errorText).toBe("error");
    });

    test("Test fetchLoginUser fulfiled", () => {
        const state = userSlice(
            userInitialState,
            fetchLoginUser.fulfilled(
                {
                    success: true,
                    refreshToken: "testtoken",
                    accessToken: "testaccess",
                    user: { name: "testuser", email: "testuser@mail.ru" },
                },
                "",
                { password: "testuser", email: "testuser@mail.ru" },
            ),
        );

        expect(state.loading).toBe(false);
        expect(state.isAuthenticated).toBe(true);
    });

    test("Test fetchRegisterUser pending", () => {
        const state = userSlice(
            userInitialState,
            fetchRegisterUser.pending("", { name: "user", email: "test@mail.ru", password: "test" }, ""),
        );

        expect(state.loading).toBe(true);
    });

    test("Test fetchRegisterUser rejected", () => {
        const mockAnswer = { name: "test", message: "error" };
        const state = userSlice(
            userInitialState,
            fetchRegisterUser.rejected(mockAnswer, "", {
                name: "user",
                email: "test@mail.ru",
                password: "test",
            }),
        );

        expect(state.loading).toBe(false);
        expect(state.errorText).toBe("error");
    });

    test("Test fetchRegisterUser fulfilled", () => {
        const state = userSlice(
            userInitialState,
            fetchRegisterUser.fulfilled(
                {
                    success: true,
                    refreshToken: "testtoken",
                    accessToken: "testaccess",
                    user: { name: "testuser", email: "testuser@mail.ru" },
                },
                "",
                { name: "user", password: "testuser", email: "testuser@mail.ru" },
            ),
        );

        expect(state.isAuthenticated).toBe(true);
        expect(state.loading).toBe(false);
    });

    test("Test fetchFeed pending", () => {
        const state = feedSlice(feedInitialState, fetchFeed.pending(""));

        expect(state.loading).toBe(true);
    });

    test("Test fetchFeed rejected", () => {
        const mockAnswer = { name: "test", message: "error" };
        const state = feedSlice(feedInitialState, fetchFeed.rejected(mockAnswer, ""));

        expect(state.loading).toBe(false);
    });

    test("Test fetchFeed fulfilled", () => {
        const mockResponse = {
            success: true,
            total: 100,
            totalToday: 10,
            orders: [
                {
                    _id: "664e927097ede0001d06bdb9",
                    ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093d"],
                    status: "done",
                    name: "Флюоресцентный люминесцентный бургер",
                    createdAt: "2024-05-23T00:48:48.039Z",
                    updatedAt: "2024-05-23T00:48:48.410Z",
                    number: 40680,
                },
            ],
        };
        const state = feedSlice(feedInitialState, fetchFeed.fulfilled(mockResponse, ""));

        expect(state.loading).toBe(false);
        expect(state.orders).toEqual(mockResponse.orders);
        expect(state.totalOrders).toEqual(mockResponse.total);
        expect(state.ordersToday).toEqual(mockResponse.totalToday);
    });

    test("Test fetchUserOrders pending", () => {
        const state = orderSlice(orderInitialState, fetchUserOrders.pending(""));

        expect(state.loading).toBe(true);
    });

    test("Test fetchUserOrders rejected", () => {
        const mockAnswer = { name: "test", message: "error" };
        const state = orderSlice(orderInitialState, fetchUserOrders.rejected(mockAnswer, ""));

        expect(state.loading).toBe(false);
    });

    test("Test fetchUserOrders fulfilled", () => {
        const mockResponse = [
            {
                _id: "664e927097ede0001d06bdb9",
                ingredients: ["643d69a5c3f7b9001cfa093d", "643d69a5c3f7b9001cfa093e", "643d69a5c3f7b9001cfa093d"],
                status: "done",
                name: "Флюоресцентный люминесцентный бургер",
                createdAt: "2024-05-23T00:48:48.039Z",
                updatedAt: "2024-05-23T00:48:48.410Z",
                number: 40680,
            },
        ];
        const state = orderSlice(orderInitialState, fetchUserOrders.fulfilled(mockResponse, ""));

        expect(state.loading).toBe(false);
        expect(state.orders).toEqual(mockResponse);
    });

    test("Test fetchLogout pending", () => {
        const state = userSlice(userInitialState, fetchLogout.pending(""));

        expect(state.loading).toBe(true);
    });

    test("Test fetchLogout rejected", () => {
        const mockError = { name: "test", message: "error" };
        const state = userSlice(userInitialState, fetchLogout.rejected(mockError, ""));

        expect(state.loading).toBe(false);
    });

    test("Test fetchLogout fulfilled", () => {
        const mockAnswer = { success: true };
        const state = userSlice(userInitialState, fetchLogout.fulfilled(mockAnswer, ""));

        expect(state.loading).toBe(false);
        expect(state.user).toEqual({ name: "", email: "" });
        expect(state.isAuthenticated).toBe(false);
    });

    test("Test fetchUpdateUser pending", () => {
        const state = userSlice(userInitialState, fetchUpdateUser.pending("", { name: "test" }));
        expect(state.loading).toBe(true);
    });

    test("Test fetchUpdateUser rejected", () => {
        const mockError = { name: "test", message: "error" };
        const state = userSlice(userInitialState, fetchUpdateUser.rejected(mockError, "", { name: "test" }));
        expect(state.loading).toBe(false);
    });

    test("Test fetchUpdateUser fulfilled", () => {
        const mockUser = { name: "testuser", email: "changedEmail@mail.ru" };
        const mockResponse = {
            success: true,
            user: mockUser,
        };
        const state = userSlice(userInitialState, fetchUpdateUser.fulfilled(mockResponse, "", mockUser));

        expect(state.loading).toBe(false);
        expect(state.user).toEqual(mockUser);
    });
});
