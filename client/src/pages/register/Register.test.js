import {render,screen,fireEvent,waitFor} from "@testing-library/react"
import Register from "./Register"
import {useSelector, useDispatch} from 'react-redux';
import userEvent from '@testing-library/user-event'
import postUserData from "./registerApi";
import toast, { Toaster } from "react-hot-toast";
import "../../components/matchMedia"
import renderWithToastify from "../../components/renderWithToastify"

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





describe('Register testing describe', () => {
    test('should render the userinput feild properly', () => {
        render(<Register />)
        const nameEle =  screen.getByRole('textbox', {
            name: /name/i
        })
        expect(nameEle).toBeInTheDocument()
    })

    test('should show an error when all elements entered correctly', async () => {
        render(<Register />)
        const registerButton =  screen.getByRole('button', {
                name: /register/i
        })
        await userEvent.click(registerButton)
     })

    test('form makes a api call with proper params', async () => {
        //render(<Register />)
        renderWithToastify(<Register/>)
        const userInput=screen.getByLabelText("Name")
        const emailInput=screen.getByLabelText("Email")
        const passwordInput=screen.getByLabelText("Password")
        const ConfirmPasswordInput=screen.getByLabelText("ConfirmPassword")
        const registerButton =  screen.getByRole('button', {
                name: /register/i
        })
        fireEvent.change(userInput, {"target": {"value": "testing"}})
        fireEvent.change(emailInput, {'target': {'value': "test1@gmail.com"}})
        fireEvent.change(passwordInput, {'target': {'value': "Test@123456"}})
        fireEvent.change(ConfirmPasswordInput, {'target': {'value': "Test@123456"}})
        await userEvent.click(registerButton)
        await waitFor(() => null, {
            timeout: 1000
        })
        const successMessage=await screen.findByText(/User created successfully/i, {
            exact: true,
        })
        expect(successMessage).toBeInTheDocument()
    })

})










