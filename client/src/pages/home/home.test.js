import {render, screen,within} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import "../../components/matchMedia";
import renderWithToastify from "../../components/renderWithToastify";
import "@testing-library/jest-dom";
import Home from "./Home";
import {renderWithProviders} from '../../components/CustomWrapper';
import {GpsMockData} from "../../components/gpsData/GpsMockData";
import {Provider} from 'react-redux'
import store from '../../redux/store';
import ProtectedRoute from "../../components/ProtectedRoute";
import GpsDataList from "../../components/GpsDataList";

// const mockDispatch = jest.fn();
// jest.mock('react-redux', () => ({
//   useSelector: jest.fn(),
//   useDispatch: () => mockDispatch
// }));

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));


describe('testing home component', () => { 
  test('checking the deviceId, deviceType, deviceLocation are accessable', async () => {
      const {container} =  renderWithProviders(<Home />, {
          preloadedState : {gps:GpsMockData}
      })
      const sortDeviceIdButton =  container.querySelector('#GpsClass > div:nth-child(3) > div > div > table > thead > tr > th:nth-child(1) > i')
      const sortDeviceTypeButton=container.querySelector('#GpsClass > div:nth-child(3) > div > div > table > thead > tr > th:nth-child(2) > i')
      const sortDeviceLocationButton=container.querySelector('#GpsClass > div:nth-child(3) > div > div > table > thead > tr > th:nth-child(4) > i')
      expect(sortDeviceIdButton).toBeInTheDocument()
      expect(sortDeviceTypeButton).toBeInTheDocument()
      expect(sortDeviceLocationButton).toBeInTheDocument()
    })
  
  test('testing the data rendered in the table', async () => {
    renderWithProviders(<Home />, {
          preloadedState : {gps:GpsMockData}
    })
    
    const TR1C1DeciceIddata = screen.getByRole("cell", {
        name: GpsMockData[0].DeviceId
    });
    expect(TR1C1DeciceIddata).toBeInTheDocument()
    
    let localDateTime=GpsMockData[0].Time
    let datetime=new Date(localDateTime).toLocaleString()
    const TR1C2Time=screen.getByRole("cell", {
      name:datetime
    })
    expect(TR1C2Time).toBeInTheDocument()

    const TR1C4DeviceLocation=screen.getByRole("cell", {
      name:GpsMockData[0].Location
    })
    expect(TR1C4DeviceLocation).toBeInTheDocument()

    const TR2C1DeciceIddata = screen.getByRole("cell", {
        name: GpsMockData[1].DeviceId
    });
    expect(TR2C1DeciceIddata).toBeInTheDocument()
    
    localDateTime=GpsMockData[1].Time
    datetime=new Date(localDateTime).toLocaleString()
    const TR2C2Time=screen.getByRole("cell", {
      name:datetime
    })
    expect(TR2C2Time).toBeInTheDocument()

    const TR2C4DeviceLocation=screen.getAllByRole("cell", {
      name:GpsMockData[1].Location
    })
    expect(TR2C4DeviceLocation[0]).toBeInTheDocument()

    const TR3C1DeciceIddata = screen.getByRole("cell", {
        name: GpsMockData[2].DeviceId
    });
    expect(TR3C1DeciceIddata).toBeInTheDocument()
    
    localDateTime=GpsMockData[1].Time
    datetime=new Date(localDateTime).toLocaleString()
    const TR3C2Time=screen.getByRole("cell", {
      name:datetime
    })
    expect(TR3C2Time).toBeInTheDocument()

    const TR3C4DeviceLocation=screen.getAllByRole("cell", {
      name:GpsMockData[2].Location
    })
    expect(TR3C4DeviceLocation[1]).toBeInTheDocument()

  })
  
  test('sort the table data by DeviceId', async () => {
    const {container} =  renderWithProviders(<Home />, {
          preloadedState : {gps:GpsMockData}
    })
    const sortDeviceIdButton=container.querySelector('#GpsClass > div:nth-child(3) > div > div > table > thead > tr > th:nth-child(1) > i')
    await userEvent.click(sortDeviceIdButton)
    let localDateTime=GpsMockData[2].Time
    let datetime=new Date(localDateTime).toLocaleString()
    let tablerow1str=[GpsMockData[2].DeviceId, datetime, GpsMockData[2].Location].join(' ')
    const tablerow1 =  screen.getByRole("row", {
      name:tablerow1str
    })
    expect(tablerow1).toBeInTheDocument()

    localDateTime=GpsMockData[1].Time
    datetime=new Date(localDateTime).toLocaleString()
     let tablerow2str=[GpsMockData[1].DeviceId, datetime, GpsMockData[1].Location].join(' ')
    const tablerow2 =  screen.getByRole("row", {
      name:tablerow2str
    })
    expect(tablerow2).toBeInTheDocument()


    localDateTime=GpsMockData[0].Time
    datetime=new Date(localDateTime).toLocaleString()
     let tablerow3str=[GpsMockData[0].DeviceId, datetime, GpsMockData[0].Location].join(' ')
    const tablerow3 =  screen.getByRole("row", {
      name:tablerow3str
    })
    expect(tablerow3).toBeInTheDocument()


  })
  
  test('sort the table data by location', async () => {
    const {container} =  renderWithProviders(<Home />, {
          preloadedState : {gps:GpsMockData}
    })
    const sortDeviceLocationButton=container.querySelector('#GpsClass > div:nth-child(3) > div > div > table > thead > tr > th:nth-child(4) > i')
    await userEvent.click(sortDeviceLocationButton)
    let localDateTime=GpsMockData[1].Time
    let datetime=new Date(localDateTime).toLocaleString()
    const tablerow1 = [GpsMockData[1].DeviceId,datetime, GpsMockData[1].Location].join(' ')
    let tablerows=screen.getByRole("row", {
      name:tablerow1
    })
    expect(tablerows).toHaveTextContent(GpsMockData[1].DeviceId)
    expect(tablerows).toHaveTextContent(GpsMockData[1].Location)
    expect(tablerows).toHaveTextContent(datetime)

    localDateTime=GpsMockData[2].Time
    datetime=new Date(localDateTime).toLocaleString()
    const tablerow2 = [GpsMockData[2].DeviceId,datetime, GpsMockData[2].Location].join(' ')
    tablerows=screen.getByRole("row", {
      name:tablerow2
    })
    expect(tablerows).toHaveTextContent(GpsMockData[2].DeviceId)
    expect(tablerows).toHaveTextContent(GpsMockData[2].Location)
    expect(tablerows).toHaveTextContent(datetime)

    localDateTime=GpsMockData[0].Time
    datetime=new Date(localDateTime).toLocaleString()
    const tablerow3 = [GpsMockData[0].DeviceId,datetime, GpsMockData[0].Location].join(' ')
    tablerows=screen.getByRole("row", {
      name:tablerow3
    })
    expect(tablerows).toHaveTextContent(GpsMockData[0].DeviceId)
    expect(tablerows).toHaveTextContent(GpsMockData[0].Location)
    expect(tablerows).toHaveTextContent(datetime)

   })
 })





















