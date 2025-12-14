import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import App from "./App";
import { Home } from "./pages/home";
import { Blog } from "./pages/blog";
import { Guestbook } from "./pages/guestbook";

// Root route uses App as the layout (contains Outlet)
const rootRoute = createRootRoute({
    component: App,
});

// Index route renders Home inside the Outlet
const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Home,
});

// Blog route
const blogRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/blog",
    component: Blog,
});

// Guestbook route
const guestbookRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/guestbook",
    component: Guestbook,
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    blogRoute,
    guestbookRoute,
]);

export default createRouter({ routeTree });