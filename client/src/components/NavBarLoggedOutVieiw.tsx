import { Button } from "react-bootstrap"

 interface NavBarLoggedOutVieiwProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void
 }

export const NavBarLoggedOutVieiw = ({onSignUpClicked, onLoginClicked}: NavBarLoggedOutVieiwProps) => {
  return (
    <>
        <Button onClick={onSignUpClicked}>Sing Up</Button>
        <Button onClick={onLoginClicked}>Log In</Button>
    </>
  )
}
