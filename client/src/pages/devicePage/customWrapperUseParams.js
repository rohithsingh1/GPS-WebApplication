import {Route,Routes, MemoryRouter, BrowserRouter} from 'react-router-dom';
import {render, screen,within} from "@testing-library/react";

export const
    renderWithRouter=(ui, {route='/'}={}) => {
        window.history.pushState({}, 'Test page', route)

        return {
            ...render(ui, {wrapper: BrowserRouter}),
        }
    }

