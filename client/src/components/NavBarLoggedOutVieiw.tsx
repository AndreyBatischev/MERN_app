import { Button } from "react-bootstrap"

 interface NavBarLoggedOutVieiwProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void
 }

export const NavBarLoggedOutVieiw = ({onSignUpClicked, onLoginClicked}: NavBarLoggedOutVieiwProps) => {
  return (
    <>
        <Button onClick={onSignUpClicked}>Log In</Button>
        <Button onClick={onLoginClicked}>Sing Up</Button>
    </>
  )
}
