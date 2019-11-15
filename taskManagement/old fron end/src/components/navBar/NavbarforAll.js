import React from 'react'
import { Navbar} from 'react-bootstrap'

export default function NavbarforAll(props) {
    return (
        <div>

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand to="/">Task Manager</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

        </div>
    )
}
