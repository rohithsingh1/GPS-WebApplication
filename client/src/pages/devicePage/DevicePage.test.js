import {render, screen,within,act} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import "../../components/matchMedia";
//import renderWithToastify from "../../components/renderWithToastify";
import "@testing-library/jest-dom";
import DevicePage from "./DevicePage";
//import {renderWithProviders} from '../../components/CustomWrapper';
//import {GpsMockData} from "../../components/gpsData/GpsMockData";
//import {Provider} from 'react-redux'
//import store from '../../redux/store';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ReactRouter from 'react-router'
import {renderWithRouter} from "./customWrapperUseParams";
//import {act} from "react-dom/test-utils";

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}));

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    DeviceId:'D-1567',
  }),
  useRouteMatch: () => ({ url: '/device/D-1567' }),
}));

jest.mock('react-apexcharts', () => ({ __esModule: true, default: () => <div /> }));


describe('testing the device page component', () => {
    test('data fetched successfully and header is present in ui', async () => {
        await act(async () => {
            renderWithRouter(<DevicePage/>, {route: '/device/D-1567'})
        })
        const headingL3 =  screen.getByRole("heading", {
            level:3
        })
        expect(headingL3).toBeInTheDocument()
     })
 })



















