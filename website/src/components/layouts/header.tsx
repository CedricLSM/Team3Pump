import { Container, Navbar, Nav } from 'react-bootstrap';
import LogoutComponent from '../login/LogoutComponent';

const Header = () => {
    return (
        <Container>
            <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Weird App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/trade">Trade</Nav.Link>
                <Nav.Link href="/learn">Learn About Investing</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <LogoutComponent />
            </Navbar>
        </Container>
    )

}

export default Header;