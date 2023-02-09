import GpsDataList from "../GpsDataList";
import {render, screen, fireEvent, waitFor} from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import "../../components/matchMedia";
import renderWithToastify from "../../components/renderWithToastify";
import {GpsMockData} from "./GpsMockData";



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



describe('testing the gps data is render in the table', () => {
  test('Gps data render/shown in the table', async () => {
    const sortByDeviceIdHandler=jest.fn()
    const sortByDeviceTypeHandler=jest.fn()
    const sortByDeviceLocationHandler=jest.fn()
    const setSearchKeyHandler = jest.fn()
    const {container} = renderWithToastify(<GpsDataList
      searchKey=""
      setSearchKey={setSearchKeyHandler}
      sortByDeviceId={sortByDeviceIdHandler}
      sortByDeviceType={sortByDeviceTypeHandler}
      sortByDeviceLocation = {sortByDeviceLocationHandler}
      renderGpsData={GpsMockData} />)
    const tableRows=screen.getAllByRole("row")
    expect(tableRows).toHaveLength(4)
    const sortDeviceIdButton =  container.querySelector('#GpsClass > div:nth-child(3) > div > div > table > thead > tr > th:nth-child(1) > i')
    const sortDeviceTypeButton=container.querySelector('#GpsClass > div:nth-child(3) > div > div > table > thead > tr > th:nth-child(2) > i')
    const sortDeviceLocationButton =  container.querySelector('#GpsClass > div:nth-child(3) > div > div > table > thead > tr > th:nth-child(4) > i')
    await userEvent.click(sortDeviceIdButton)
    await userEvent.click(sortDeviceTypeButton)
    await userEvent.click(sortDeviceLocationButton)
     expect(sortByDeviceIdHandler).toHaveBeenCalledTimes(1)
    expect(sortByDeviceTypeHandler).toHaveBeenCalledTimes(1)
    expect(sortByDeviceLocationHandler).toHaveBeenCalledTimes(1)
    //expect(setSearchKeyHandler).toHaveBeenCalledTimes(1)
     })
 })











