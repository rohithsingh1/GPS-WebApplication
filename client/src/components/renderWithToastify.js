import {render} from "@testing-library/react"
import {Toaster} from "react-hot-toast";
const renderWithToastify=(component) => (
    render(
        <div>
            {component}
            <Toaster/>
     </div>
 )   
)

export default renderWithToastify