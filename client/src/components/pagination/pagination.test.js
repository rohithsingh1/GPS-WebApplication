import {render,screen} from "@testing-library/react"
import Pagination from "./Pagination";
import userEvent from '@testing-library/user-event'
import "../../components/matchMedia"
import renderWithToastify from "../renderWithToastify"
import "@testing-library/jest-dom";

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


describe('testing the pagination', () => {
    test('pagination component rendered correctly', () => {
        render(<Pagination currentPage="1"/>)
        const prevButton=screen.getByText(/prev/i)
        const nextButton=screen.getByText(/next/i)
        const pageValue=screen.getByText(/1/i)
        expect(prevButton).toBeInTheDocument()
        expect(nextButton).toBeInTheDocument()
        expect(pageValue).toBeInTheDocument()
    })
    
    test('testing next buttons in pagination', async () => {
        const totalPages=5
        const currentPage=1
        const setcurrentPageHandler=jest.fn()
        render(<Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setcurrentPageHandler} />)
        const listitems = screen.getAllByRole("listitem")
        const currentPageInfo = listitems[1]
        const nextButton=listitems[2]
        expect(currentPageInfo).toHaveTextContent('1')
        await userEvent.click(nextButton)
        expect(setcurrentPageHandler).toHaveBeenCalledTimes(1)
        expect(setcurrentPageHandler).toHaveBeenCalledWith(2);
    })

    test('testing prev buttons in pagination', async () => {
        const totalPages=5
        const currentPage=2
        const setcurrentPageHandler=jest.fn()
        render(<Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setcurrentPageHandler} />)
        const listitems=screen.getAllByRole("listitem")
        const prevButton = listitems[0]
        const currentPageInfo = listitems[1]
        expect(currentPageInfo).toHaveTextContent('2')
        await userEvent.click(prevButton)
        expect(setcurrentPageHandler).toHaveBeenCalledTimes(1)
        expect(setcurrentPageHandler).toHaveBeenCalledWith(1);
    })
    
})
 

















