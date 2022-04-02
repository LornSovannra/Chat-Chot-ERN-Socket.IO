import Header from "./components/Header";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import 'bootstrap/dist/css/bootstrap.css'

export default function App() {
  return (
    <Wrapper className="App">
      <Header />
      <Dashboard />
    </Wrapper>
  );
}

const Wrapper = styled.div`
 
`