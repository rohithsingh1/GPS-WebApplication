import {render,screen,fireEvent,waitFor} from "@testing-library/react"
import Login from "./Login";
import {useSelector, useDispatch} from 'react-redux';
import userEvent from '@testing-library/user-event'
import postUserData from "./loginApi";
import toast, { Toaster } from "react-hot-toast";
import "../../components/matchMedia"
import renderWithToastify from "../../components/renderWithToastify"
//import "../../components/mockDispatchAndmockedUsedNavigate"

//ReactReduxMock()
//ReactRouterDom()

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



describe('Login testing', () => {
    test.skip('checking the ui elements', () => {
        render(<Login />)
        const emailInput=screen.getByLabelText("Email")
        expect(emailInput).toBeInTheDocument()
    })
  
  test('form makes a api call with proper params', async () => {
        //render(<Register />)
        renderWithToastify(<Login/>)
        const emailInput=screen.getByLabelText("Email")
        const passwordInput=screen.getByLabelText("Password")
        const registerButton =  screen.getByRole('button', {
                name: /Login/i
        })
        fireEvent.change(emailInput, {'target': {'value': "test1@gmail.com"}})
        fireEvent.change(passwordInput, {'target': {'value': "Test@123456"}})
        await userEvent.click(registerButton)
        await waitFor(() => null, {
            timeout: 1000
        })
        const successMessage=await screen.findByText(/User login successfully/i, {
            exact: true,
        })
        expect(successMessage).toBeInTheDocument()
    })

})










